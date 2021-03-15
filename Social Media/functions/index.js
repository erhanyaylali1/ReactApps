const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');
const cors = require('cors');

const firebaseConfig = {
    apiKey: "AIzaSyBIx9cMuT2QGpen69G8CS_RvUfuAhOV7Bw",
    authDomain: "socialony.firebaseapp.com",
    projectId: "socialony",
    storageBucket: "socialony.appspot.com",
    messagingSenderId: "12629594156",
    appId: "1:12629594156:web:e8fca32ef819721e608189",
    measurementId: "G-TR03GHN2HR"
  };

admin.initializeApp();
const app = express();
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();
app.use(cors());
app.use(express.json());

// ASYNC FOREACH FUNCTION 
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// SIGN UP
// EMAIL, PASSWORD, USERNAME, NAME, SURNAME, PHONE
app.post('/signup', (req, res) => {    

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name[0].toUpperCase() + req.body.name.substr(1),
        surname: req.body.surname[0].toUpperCase() + req.body.surname.substr(1),
        phone: req.body.phone,
        followersCount: 0,
        followsCount: 0,
        createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/socialony.appspot.com/o/no-img.png?alt=media&token=d7d666ee-60dd-4487-ba4b-ef76e961fe4b`
    };

    db.collection('users')
        .get()
        .then((data) => {
            data.forEach((doc) => { 
                if(doc.data().username === newUser.username){
                    return res.status(400).json({ error: "This username is already taken." });
                } else if(doc.data().phone === newUser.phone){
                    return res.status(400).json({ error: "This phone is already taken." });
                }
            })
        })
        .then(() => {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((data) => {
                db.collection('users')
                .doc(data.user.uid)
                .set(newUser);
                return res.status(201).json({ message: `User ${data.user.uid} signed up successfully.` });
            })
            .catch((err) => {
                return res.status(404).json(err);
            });
        })

   
});

// LOGIN
// EMAIL, PASSWORD
app.post('/login', cors(), (req, res) => {
    const userData = {};
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
        return data.user.uid;
    })
    .then((userId) => {
        db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
            userData.credentials = doc.data();
            userData.userId = doc.id;
            return (doc.id)
        })
        .then((userId) => {
            db.collection('follows')
            .where('followerId','==',userId)
            .get()
            .then(async(docs) =>{
                const ids = []
                for await(let doc of docs.docs){
                    ids.push(doc.data().userId)
                };
                userData.follows = ids;
            })
            .then(async() => {
                db.collection('follows')
                .where('userId','==',userId)
                .get()
                .then(async(docs) =>{
                    const ids = []
                    for await(let doc of docs.docs){
                        ids.push(doc.data().followerId)
                    };
                    userData.followers = ids;
                })
                .then(() => res.status(201).json(userData));
            })
            
        })
        .catch((err) => res.status(501).json({ error: err.message }))
    })
    .catch((err) => {
        return res.status(501).json({ error: err.message });    
    })
});

// LOGOUT
app.post('/logout', (req, res) => {
    firebase.auth().signOut();
    return res.status(201).json({ message: "Signed Out Succesfully!" });
})

// ADD USER DETAIL
// BIO, WEBSITE, LOCATION
app.post('/user/:userId/add-detail', (req, res) => {
    
    const userDetails = {
        bio: req.body.bio,
        website: req.body.website,
        location: req.body.location
    };
    
    db.collection('users').doc(req.params.userId).update(userDetails)
    .then(() => {
        return res.json({ message: "Details Added Successfully."});
    })
    .catch((err) => {
        return res.status(500).json({ error: err.message })
    })
});

// GET USER DETAILS
app.get('/user/:userId', async(req, res) => {

    let userData = {};

    db.collection('users').doc(req.params.userId).get()
    .then((user) => {
        userData.credentials = user.data();
        userData.userId = user.id;
    })
    .then(async() => {
        let UserPosts = [];
        await db.collection('posts').where('userId', '==', req.params.userId).get()
        .then(async(posts) => {
            await asyncForEach(posts.docs, async (post) => {
                const likesArr = [];
                const commentsArr = [];
                await db.collection('posts').doc(post.id).collection('likes').get()
                .then(async(likes) => {
                    await asyncForEach(likes.docs, async(like) => {
                        likesArr.push({...like.data(), likeId: like.id});
                    })
                })
                await db.collection('posts').doc(post.id).collection('comments').get()
                .then(async(comments) => {
                    await asyncForEach(comments.docs, async(comment) => {
                        commentsArr.push({...comment.data(), commentId: comment.id});
                    })
                })                    
                UserPosts.push({...post.data(),postId: post.id,likes: likesArr, comments: commentsArr})
            })
            userData.posts = UserPosts;
        })
        .then(async() => {
            await db.collection('follows').where('followerId', '==', req.params.userId).get()
            .then((follows) => userData.credentials.followsCount = follows.size)
            await db.collection('follows').where('userId', '==', req.params.userId).get()
            .then((followers) => userData.credentials.followersCount = followers.size)
        })
        .then(() => {
            function sortByKey(array, key) {
                return array.sort(function(a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });
            }
            userData.posts = sortByKey(userData.posts, "createdAt");
        })
        .then(() => res.status(201).json(userData))
    })
});

// GET USER FOLLOWS
app.get('/user/:userId/follows', (req, res) => {
    const userData = {}
    const userId = req.params.userId;

    db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
        userData.credentials = doc.data();
        userData.userId = doc.id;
        return (doc.id)
    })
    .then((userId) => {
        db.collection('follows')
        .where('followerId','==',userId)
        .get()
        .then(async(docs) =>{
            const ids = []
            for await(let doc of docs.docs){
                ids.push(doc.data().userId)
            };
            userData.follows = ids;
        })
        .then(async() => {
            db.collection('follows')
            .where('userId','==',userId)
            .get()
            .then(async(docs) =>{
                const ids = []
                for await(let doc of docs.docs){
                    ids.push(doc.data().followerId)
                };
                userData.followers = ids;
            })
            .then(() => res.status(201).json(userData));
        })
        
    })
    .catch((err) => res.status(501).json({ error: err.message }))
})

// GET FOLLOWED USERS POSTS
app.get('/user/:userId/home', cors(), async (req, res) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Origin", "*");
    const userIds = [];
    const UserPosts = [];
    userIds.push(req.params.userId);

    db.collection('follows')
    .where('followerId','==', req.params.userId)
    .get()
    .then((users) => users.forEach((user) => userIds.push(user.data().userId)))
    .then(async() => {
        await asyncForEach(userIds, async(userId) => {
            await db.collection('posts').where('userId','==',userId).get()
            .then(async(posts) => {
                await asyncForEach(posts.docs, async (post) => {
                    const likesArr = [];
                    const commentsArr = [];
                    await db.collection('posts').doc(post.id).collection('likes').get()
                    .then(async(likes) => {
                        await asyncForEach(likes.docs, async(like) => {
                            likesArr.push({...like.data(), likeId: like.id});
                        })
                    })
                    await db.collection('posts').doc(post.id).collection('comments').get()
                    .then(async(comments) => {
                        await asyncForEach(comments.docs, async(comment) => {
                            commentsArr.push({...comment.data(), commentId: comment.id});
                        })
                    })                    
                    UserPosts.push({...post.data(),postId: post.id,likes: likesArr, comments: commentsArr})
                })
            })
        })
    })
    .then(() => {
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        res.status(201).json(sortByKey(UserPosts, 'createdAt'));
    })
    .catch((err) => res.status(400).json({ error: err.message }));

})

// FOLLOW A USER
// FOLLOWERID
app.post('/user/:userId/follow', (req, res) => {   
    db.collection('follows')
        .where('followerId','==',req.body.followerId)
        .where('userId', '==', req.params.userId)
        .get()
        .then((docs) => {
            if(!docs.empty) return res.status(500).json({ error: "This User Already Followed!" });
            const newFollowing = {
                followerId: req.body.followerId,
                userId: req.params.userId,
                createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})
            }
            db.collection('follows')
                .add(newFollowing)
                .then(() => res.json({ message: "User Successfully Followed!" }));
        })
        .catch((err) => res.json({ error: err.message }))
})

// UNFOLLOW A USER
// FOLLOWERID
app.post('/user/:userId/unfollow', (req, res) => {
    db.collection('follows')
    .where('followerId','==',req.body.followerId)
    .where('userId','==', req.params.userId)
    .get()
    .then((docs) => {
        if(docs.empty) return res.status(500).json({ error: "This User Not Following!" })
        let id;
        docs.forEach((doc) => id = doc.id);
        db.collection('follows')
        .doc(id)
        .delete()
        .then(() => res.status(201).json({ message: "User Unfollowed!" }))
        .catch((err) => res.status(500).json({ error: err.message }))
    })
    .catch((err) => res.status(500).json({ error: err.message }))
})

// POST USER IMAGE
app.post('/user/:userId/image', (req, res) => {

    
    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
    const { v4: uuidV4 } = require('uuid');

  
    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    let generatedToken = uuidV4();

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
          return res.status(400).json({ error: "Wrong file type submitted" });
        }
        const imageExtension = filename.split(".")[filename.split(".").length - 1];
        imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
      });

    busboy.on('finish', () => {
        admin.storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype,
                    firebaseStorageDownloadTokens: generatedToken,
                },
            },
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
            db.collection('users').doc(req.params.userId).update({ imageUrl });
            return imageUrl;
        })
        .then(async(imageUrl) => {
            await db.collection('posts').where('userId','==', req.params.userId).get()
            .then(async(posts) => {
                await asyncForEach(posts.docs, async(post) => {
                    db.collection('posts').doc(post.id).update({ imageUrl })
                })
            })
            return imageUrl;
        })
        .then(async(imageUrl) => {
            await db.collection('posts').get()
            .then(async(posts) => {
                await asyncForEach(posts.docs, async(post) => {
                    await db.collection('posts').doc(post.id).collection('comments').where('userId','==',req.params.userId).get()
                    .then(async(comments) => {
                        await asyncForEach(comments.docs,(comment) => {
                            db.collection('posts').doc(post.id).collection('comments').doc(comment.id).update({ imageUrl })
                        })
                    })
                })
            })
            return imageUrl
        })
        .then((imageUrl) => {
            return res.json({ message: "Image Uploaded Succesfully.", imageUrl });
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message });
        })
    })
    
    busboy.end(req.rawBody);  
});

// CREATE A POST
// USERID, CONTENT
app.post('/post', (req, res) => {

    if(req.method !== "POST"){
        return res.status(400).json({ error: "Method not allowed." });
    } else {
        db.collection('users')
            .doc(req.body.userId)
            .get()
            .then((doc) => {
                const newPost = {
                    content: req.body.content,
                    userId: req.body.userId,
                    createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
                    likesCount: 0,
                    commentsCount: 0,
                    imageUrl: doc.data().imageUrl,
                    name: doc.data().name,
                    surname: doc.data().surname,
                };
                db.collection('posts')
                .add(newPost)
                .then(() => res.json({ message: "Post Succesfully Created." }));
            })
            .catch((err) => {
                return res.json(err);
            })
    }
});

// GET A POST
app.get('/post/:postId', (req, res ) => {

    let postData = {};
    const selectedPost = db.collection('posts').doc(req.params.postId);

    selectedPost
    .get()
    .then((doc) => {
        if(!doc.exists) return res.status(404).json({ error: "Post not found." });
        
        postData = doc.data();
        postData.id = doc.id;

        selectedPost
        .collection('likes')
        .get()
        .then((items) => {
            if(!items.empty){
                const likes = [];
                items.forEach((like) => likes.push({...like.data(), likeId: like.id}))
                postData.likes = likes;
            }
        })
        .then(() => {
            selectedPost
            .collection('comments')
            .get()
            .then((items) => {
                if(!items.empty){
                    const comments = [];
                    items.forEach((comment) => comments.push({...comment.data(), commentId: comment.id}))
                    postData.comments = comments;
                }
            })
            .then(() => res.json(postData))      
        })      
    })
    .catch((err) => {
        return res.status(500).json({ message: err.message});
    })
});

// DELETE A POST
app.delete('/post/:postId', (req, res) => {
    db.collection('posts')
    .doc(req.params.postId)
    .delete()
    .then(() => res.json({ message: "Post Deleted!" }))
    .catch((err) => res.json({ error: err.message }));
        
})

// LIKE A POST
// userId
app.post('/post/:postId/like', (req, res) => {

    const selectedPost = db.collection('posts').doc(req.params.postId);

    selectedPost
    .collection('likes')
    .where('userId','==', req.body.userId)
    .get()
    .then((items) => {
        if(!items.empty) res.status(400).json({ message: "Post Already Liked!" })
        else {
            const newLike = {
                createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
                userId: req.body.userId
            }
            selectedPost
            .collection('likes')
            .add(newLike)
            .then(() => {
                selectedPost.get()
                .then((doc) => doc.data().likesCount + 1)
                .then((likesCount) => {
                    selectedPost.update({ likesCount })
                })
                .then(() => res.json({ message: "Post Liked!" }))
            })
            .catch((err) => res.json({ error: err.message }));
        }
    })
});

// UNLIKE A POST
// userId
app.post('/post/:postId/unlike', (req, res) => {
    const selectedPost = db.collection('posts').doc(req.params.postId);

    selectedPost
    .collection('likes')
    .where('userId','==', req.body.userId)
    .get()
    .then((items) => {
        if(items.empty) res.status(400).json({ message: "Post Already Not Liked!" })
        else {
            let id;
            items.forEach((item) => {
                id = item.id;
            })
            selectedPost
            .collection('likes')
            .doc(id)
            .delete()
            .then(
                selectedPost.get().then((doc) => doc.data().likesCount -1)
                .then((likesCount) => {
                    selectedPost.update({ likesCount })
                })
                .then(() => res.status(201).json({ message: "Post Unliked!" }))
                .catch((err) => res.status(400).json({ err: err.message }))
            )
        }
    })
    .catch((err) => res.json({ err: err.message }))
});

// POST A COMMENT TO A POST
// userId, content
app.post('/post/:postId/comment', (req, res) => {

    const newComment = {
        userId: req.body.userId,
        createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
        content: req.body.content
    };


    db.collection('users').doc(req.body.userId).get()
    .then((doc) => {
        newComment.name = doc.data().name;
        newComment.surname = doc.data().surname;
        newComment.imageUrl = doc.data().imageUrl
    }).then(() => {

        const selectedPost = db.collection('posts').doc(req.params.postId);

        selectedPost
        .collection('comments')
        .add(newComment)
        .then(() => {
            selectedPost.get()
            .then((doc) => doc.data().commentsCount + 1)
            .then((commentsCount) => {
                selectedPost.update({ commentsCount })
            })
            .then(() => res.json({ message: "Comment Posted!" }))
            .catch((err) => res.status(400).json({ error: err.message }));
        })
        .catch((err) => res.json({ error: err.message }));
    })
    

    

});

// DELETE A COMMENT
// commentId
app.delete('/post/:postId/comment', (req, res) => {

    const selectedPost = db.collection('posts').doc(req.params.postId);

    selectedPost
    .collection('comments')
    .doc(req.body.commentId)
    .delete()
    .then(() => {
        selectedPost.get().then((doc) => doc.data().commentsCount -1)
        .then((commentsCount) => {
            selectedPost.update({ commentsCount })
        })
        .then(() => res.status(201).json({ message: "Comment Deleted!" }))
        .catch((err) => res.status(400).json({ err: err.message }))
    })
    .catch((err) => res.json({ err: err.message }))
})

// MARK NOTIFICATION READ
app.post('/notifications', (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification, { read: true });
    });
    batch.commit()
        .then(() => res.json({ message: "Notifications marked read!" }))
        .catch((err) => res.status(500).json({ error: err.message })); 
})

// Search user
app.get('/search/:key', (req, res) => {

    const results = [];
    db
    .collection('users')
    .where('name','>=', req.params.key[0].toUpperCase() + req.params.key.substr(1))
    .where('name', '<=', req.params.key[0].toUpperCase() + req.params.key.substr(1) + '\uf8ff')
    .limit(5)
    .get()
    .then((docs) => {
        docs.forEach((doc) => {
            results.push({id: doc.id, name: doc.data().name, surname: doc.data().surname, imageUrl: doc.data().imageUrl });
        })
    })
    .then(() => res.json(results))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// GET MESSAGEBOX
app.get('/chat/:userId', (req, res) => {

    const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    const messagesArr = [];
    db.collection('chat')
    .where('users','array-contains', req.params.userId)
    .orderBy('lastMessageTime','desc')
    .get()
    .then(async(docs) => {
        await asyncForEach(docs.docs, async(doc) => {
            const chatArr = {};
            chatArr.messages = []
            await db.collection(`chat/${doc.id}/messages`)
            .orderBy('createdAt','asc')
            .get()
            .then((messages) => {
                asyncForEach(messages.docs, (message) => {
                    chatArr.messages.push(message.data())
                })
            })
            let otherId;
            await db.collection('chat').doc(doc.id).get()
            .then((doc) => otherId = doc.data().users.filter((id) => id !== req.params.userId))
            .then(async () => {
                await db.collection('users').doc(otherId[0]).get()
                .then((doc) => {
                    chatArr.name = doc.data().name;
                    chatArr.imageUrl = doc.data().imageUrl;
                    chatArr.id = doc.id;
                })
            })
            .then(() => messagesArr.push(chatArr))
            
        })
    })
    .then(() => res.json(messagesArr))
})

// SEND A MESSAGE
// SENDERID, RECIEVERID, CONTENT
app.post('/chat/message', (req, res) => {
    const list = [[req.body.senderId, req.body.recieverId],[req.body.recieverId, req.body.senderId]]
    db.collection('chat')
    .where('users', '==', list[1])
    .get()
    .then((chats) => {
        if(chats.empty) {   
            db.collection('chat')
            .where('users', '==', list[0])
            .get()
            .then((chats2) => {
                if(chats2.empty) {
                    const newChat = {
                        lastMessageTime: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
                        users: [req.body.senderId, req.body.recieverId]
                    }
                    let id;
                    db.collection('chat').add(newChat).then((doc) => id = doc.id);
                    db.collection('users').doc(req.body.senderId).get()
                    .then((doc) => {
                        const newMessage = {
                            name: doc.data().name,
                            imageUrl: doc.data().imageUrl,
                            content: req.body.content,
                            sender: doc.id,
                            createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})
                        }
                        return newMessage
                    })
                    .then((newMessage) => {
                        db.collection('chat').doc(id).collection('messages').add(newMessage);
                    })
                    .then(() => res.json({ message: "Message Sent!" }))
                } else {
                    chats2.forEach((chat) => {
                        db.collection('users').doc(req.body.senderId).get()
                        .then((doc) => {
                            const newMessage = {
                                name: doc.data().name,
                                imageUrl: doc.data().imageUrl,
                                content: req.body.content,
                                sender: doc.id,
                                createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})
                            }
                            return newMessage;
                        })
                        .then((newMessage) => {
                            db.collection('chat').doc(chat.id.toString()).collection('messages').add(newMessage);
                            db.collection('chat').doc(chat.id.toString()).update({ lastMessageTime: newMessage.createdAt })
                        })
                        .then(() => res.json({ message: "Message Sent!" }))
                    })
                }
            })
        } else {
            chats.forEach((chat) => {
                db.collection('users').doc(req.body.senderId).get()
                .then((doc) => {
                    const newMessage = {
                        name: doc.data().name,
                        imageUrl: doc.data().imageUrl,
                        content: req.body.content,
                        sender: doc.id,
                        createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})
                    }
                    return newMessage;
                })
                .then((newMessage) => {
                    db.collection('chat').doc(chat.id.toString()).collection('messages').add(newMessage);
                    db.collection('chat').doc(chat.id.toString()).update({ lastMessageTime: newMessage.createdAt })
                })
                .then(() => res.json({ message: "Message Sent!" }))
            })
        }
    })
})



exports.api = functions.https.onRequest(app);

exports.createLikeNotification = functions.firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
            recipient: doc.data().userId,
            sender: snapshot.data().userId,
            type: 'like',
            read: false,
            screamId: doc.id
          });
        }
      )
      .catch((err) => console.error(err));
  });


exports.deleteLikeNotification = functions.firestore.document('likes/{id}')
.onDelete((snapshot) => {
    db.collection('notifications')
        .doc(snapshot.id)
        .delete()
        .then(() => { return; })
        .catch((err) => console.log(err));
})


exports.createCommentNotification = functions.firestore.document('comments/{id}')
.onCreate((snapshot) => {
    db.collection('posts')
        .doc(snapshot.data().postId)
        .get()
        .then((doc) => {
            return db.collection('notifications')
                    .doc(snapshot.id)
                    .set({
                        createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
                        reciepent: doc.data().userId,
                        sender: snapshot.data().userId,
                        type: 'comment',
                        read: false,
                        postId: doc.id
                    })
        })
        .then(() => { return; })
        .catch((err) => console.log(err));
}) 


exports.deleteCommentNotification = functions.firestore.document('comments/{id}')
.onDelete((snapshot) => {
    db.collection('notifications')
        .doc(snapshot.id)
        .delete()
        .then(() => { return; })
        .catch((err) => console.log(err));
})

exports.createFollowNotification = functions.firestore.document('follows/{id}')
.onCreate((snapshot) => {
    db.collection('notifications')
        .doc(snapshot.id)
        .set({
            createdAt: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
            reciepent: snapshot.data().userId,
            sender: snapshot.data().followerId,
            type: 'follow',
            read: false,
            postId: snapshot.id
        })
})

exports.deleteFollowNotification = functions.firestore.document('follows/{id}')
.onDelete((snapshot) => {
    db.collection('notifications')
        .doc(snapshot.id)
        .delete()
        .then(() => { return; })
        .catch((err) => console.log(err));
})