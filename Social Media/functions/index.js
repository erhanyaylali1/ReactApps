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
app.use(cors());
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

//GET IS LOGGED IN
app.get('/islogged', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            db.collection('users')
                .doc(user.uid)
                .get()
                .then((doc) => res.status(201).json({ ...doc.data(), userId: user.uid }))
                .catch((err) => res.status(500).json({ error: err.message }))
        } else {
            return res.json({ error: "User Not Signed In! "});
        }
    })
})


// SIGN UP
// EMAIL, PASSWORD, USERNAME, NAME, SURNAME, PHONE
app.post('/signup', (req, res) => {    

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        followersCount: 0,
        followsCount: 0,
        createdAt: new Date().toLocaleDateString(),
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
                console.error(err);
                return res.status(500).json({ error: err.code });
            });
        })

   
});


// LOGIN
// EMAIL, PASSWORD
app.post('/login', (req, res) => {

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            return data.user.uid;
        })
        .then((userId) => {
            db.collection("users")
            .doc(userId)
            .get()
            .then((doc) => {
                return res.status(201).json({...doc.data(), userId: doc.id});
            })
            .catch((err) => res.status(501).json({ error: err.message }))
        })
        .catch((err) => {
            return res.status(501).json({ error: err.message });    
        }
    )
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
app.get('/user/:userId', (req, res) => {

    let userData = {};
    db.collection('users')
        .doc(req.params.userId)
        .get()
        .then((doc) => {
            userData.credentials = doc.data();
            return db.collection('posts')
                    .where('userId', '==', req.params.userId)
                    .orderBy('createdAt', 'desc')
                    .get();
        })
        .then((data) => {
            userData.posts = []
            if(data){
                data.forEach((doc) => {
                    userData.posts.push({...doc.data(), postId: doc.id });
                })
            }
        }).then(() => {
            return db.collection('notifications')
                    .where('reciepent','==', req.params.userId)
                    .orderBy('createdAt','desc')
                    .limit(10)
                    .get();
        })
        .then((data) => {
            userData.notifications = []
            if(data){
                data.forEach((doc) => {
                    userData.notifications.push(doc.data())
                });
            }
            return res.json(userData);
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message })
        })
});

// GET FOLLOWED USERS POSTS
app.get('/user/:userId/home', async (req, res) => {
    const userIds = [];
    const postsArray = [];
    db.collection('follows')
        .where('followerId', '==', req.params.userId)
        .get()
        .then((items) => {
            items.forEach((item) => {""
                userIds.push(item.data().userId)
            })
        })
        .then(() => {
            userIds.forEach((id) => {
                db.collection('posts')
                    .where('userId','==', id)
                    .get()
                    .then((posts) => {
                        posts.forEach((post) => {
                            db.collection('posts')
                            .doc(post.id)
                            .collection('likes')
                            .get()
                            .then((likes) => {
                                const likesArray = []
                                likes.forEach((like) => likesArray.push({...like.data(), likeId: like.id}))
                                return likesArray;
                            })
                            .then((likesArray) => {
                                postsArray.push({...post.data(), postId: post.id, likes: likesArray})
                            })
                        })
                    })
            })
        })
        .then(() => {
            return res.json(postsArray);
        })
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
                createdAt: new Date().toISOString()
            }
            db.collection('follows')
                .add(newFollowing)
                .then(() => res.json({ message: "User Successfully Followed!" }));
        })
        .catch((err) => res.json({ error: err.message }))
})

// POST USER IMAGE
app.post('/user/:userId/image', (req, res) => {

    const BusBoy = require("busboy");
    const path = require("path");
    const os = require("os");
    const fs = require("fs");
    const { uuid } = require("uuidv4");
  
    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    let generatedToken = uuid();

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
            return;
        })
        .then(() => {
            return res.json({ message: "Image Uploaded Succesfully." });
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
                    createdAt: new Date().toLocaleString(),
                    likesCount: 0,
                    commentsCount: 0,
                    imageUrl: doc.data().imageUrl,
                    name: doc.data().name,
                    surname: doc.data().surname,
                };
                console.log(newPost);
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
                    console.log(comments);
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
                createdAt: new Date().toLocaleString(),
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
        createdAt: new Date().toLocaleString(),
        content: req.body.content
    };

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


exports.api = functions.https.onRequest(app);

exports.createLikeNotification = functions.firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
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
                        createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
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