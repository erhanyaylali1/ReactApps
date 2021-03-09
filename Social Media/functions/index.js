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

        const newPost = {
            content: req.body.content,
            userId: req.body.userId,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            commentCount: 0
        };
    
        db.collection('posts')
            .add(newPost)
            .then(() => {
                return res.json({
                    message: "Post Succesfully Created."
                });
            })
            .catch((err) => {
                return res.json(err);
            })
    }
});


app.post('/signup', (req, res) => {    

    const newUser = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        createdAt: new Date().toLocaleDateString()
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


app.post('/user/image', (req, res) => {

    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.once('file', (fieldname, file, filename, encoding, mimetype) => {
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() * 100000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
    })
    .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        console.log(imageUrl);
    })

})

exports.api = functions.https.onRequest(app);