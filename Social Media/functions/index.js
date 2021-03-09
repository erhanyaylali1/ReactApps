const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');

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


app.post('/signup', (req, res) => {    

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
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
        });

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
});

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
                return res.status(201).json(doc.data());
            });
        })
        .catch((err) => {
            return res.status(501).json({ error: err.message });    
        }
    )
});

app.post('/user/add-detail', (req, res) => {
    
    const userDetails = {
        bio: req.body.bio,
        website: req.body.website,
        location: req.body.location
    };
    
    db.collection('users').doc(req.body.userId).update(userDetails)
    .then(() => {
        return res.json({ message: "Details Added Successfully."});
    })
    .catch((err) => {
        return res.status(500).json({ error: err.message })
    })
})

app.get('/user', (req, res) => {

    let userData = {};
    db.collection('users')
        .doc(req.body.userId)
        .get()
        .then((doc) => {
            userData.credentials = doc.data();
            return db.collection('posts')
                    .where('userId', '==', req.body.userId)
                    .orderBy('createdAt', 'desc')
                    .get();
        })
        .then((data) => {
            userData.posts = []
            if(data){
                data.forEach((doc) => {
                    userData.posts.push(doc.data());
                })
            }
            return res.json(userData);
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message })
        })
})

app.post('/user/image', (req, res) => {

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
        console.log(fieldname, file, filename, encoding, mimetype);
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
            db.collection('users').doc(req.body.id).update({ imageUrl });
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
})

app.get('/posts', (req, res) => {

    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let posts = [];
        data.forEach((doc) => {
            posts.push({
                postId: doc.id,
                content: doc.data().content,
                userId: doc.data().userId,
                createdAt: doc.data().createdAt,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount
            });
        });
        return res.json(posts);
    })
    .catch((err) => console.error(err));
});

app.post('/createpost', (req, res) => {

    if(req.method !== "POST"){
        return res.status(400).json({ error: "Method not allowed." });
    } else {

        db.collection('users')
            .doc(req.body.userId)
            .get()
            .then((doc) => doc.data().imageUrl)
            .then((imageUrl) => {

                const newPost = {
                    content: req.body.content,
                    userId: req.body.userId,
                    createdAt: new Date().toISOString(),
                    likesCount: 0,
                    commentsCount: 0,
                    imageUrl
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

app.get('/post/:postId', (req, res ) => {

    let postData = {};
    db.collection('posts')
        .doc(req.params.postId)
        .get()
        .then((doc) => {
            if(!doc.exists) return res.status(404).json({ error: "Post not found." });
            postData = doc.data();
            postData.id = doc.id;
            return db.collection('comments')
                .where('postId', '==', req.params.postId)
                .orderBy('createdAt', 'asc')
                .get();
                
        })
        .then((data) => {
            postData.comments = [];
            if(data){
                data.forEach((doc) => {
                    postData.comments.push(doc.data());
                });
            }            
            return res.json(postData);
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message});
        })
})

app.post('/post/:postId/comment', (req, res) => {

    let commentsCount = 0;
    db.collection('posts')
        .doc(req.params.postId)
        .get()
        .then((doc) => {
            if(!doc) return res.json({ error: "Post Not Found!" });
            commentsCount = doc.data().commentsCount + 1;
            return commentsCount
        })
        .then((commentsCount) => {
            db.collection('posts')
                .doc(req.params.postId)
                .update({ commentsCount })
        })
        .then(() => {
            return db.collection('users')
                .doc(req.body.userId)
                .get()
                .then((doc) => doc.data().imageUrl)
        })
        .then((imageUrl) => {
            console.log(imageUrl);
            const newComment = {
                content: req.body.content,
                createdAt: new Date().toISOString(),
                postId: req.params.postId,
                userId: req.body.userId,
                imageUrl
            };
            db.collection('comments')
                .add(newComment)
                .then(() => res.json({ message: "Comment Posted Successfully! "}));
        })
        .catch((err) => res.status(500).json({ error: err.message }));      
})

app.post('/post/:postId/like', (req, res) => {
    db.collection('likes')
    .where('userId','==', req.body.userId)
    .where('postId','==',req.params.postId)
    .get()
        .then((doc) => {
            if(doc._size) return res.status(404).json({ error: 'This Post Already Liked' }); 
            else {
                db.collection('posts')
                    .doc(req.params.postId)
                    .get()
                    .then((doc) => doc.data().likesCount + 1)
                    .then((likesCount) => {
                        db.collection('posts')
                            .doc(req.params.postId)
                            .update({ likesCount })
                    })
                    .then(() => {
                        const newLike = {
                            userId: req.body.userId,
                            postId: req.params.postId,
                            createdAt: new Date().toISOString()
                        };
                        db.collection('likes')
                            .add(newLike)
                            .then(() => res.json({ message: "Post Liked Successfully! "}));
                    })
            }
        })
        .catch((err) => res.status(500).json({ error: err.message }));
})


// TO DO
// UNLIKE A POST
// DELETE A POST
// DELETE A COMMENT
// FOLLOW A USER

exports.api = functions.https.onRequest(app);