const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyAN2u2YcTD7YxTk9DlJzHmf2DzjpvbKOQ4",
  authDomain: "zinsp-8bf06.firebaseapp.com",
  databaseURL: "https://zinsp-8bf06.firebaseio.com",
  projectId: "zinsp-8bf06",
  storageBucket: "zinsp-8bf06.appspot.com",
  messagingSenderId: "83975740903"
};

admin.initializeApp()
firebase.initializeApp(config)

const db = admin.firestore()
const app = express()

app.get('/screams', (req, res) => {
  db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      const screams = []
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        })
      })
      return res.json(screams)
    })
    .catch(err => {
      console.error(err)
    })
})

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  } 

  db
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  // TODO: validate data
  let token, userId
  db
    .doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'This handle is already taken.' })
      }
      return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(tokenId => {
      token = tokenId
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      }
      
      db
        .doc(`/users/${newUser.handle}`)
        .set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email already in use.' })
      }
      return res.status(500).json({ error: err.code })
    })
})

exports.api = functions.https.onRequest(app)