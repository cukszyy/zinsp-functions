const functions = require('firebase-functions')
const app = require('express')()
const FBAuth = require('./util/FBAuth')
const { getAllScreams, postScream, getScream, commentOnScream } = require('./handlers/screams')
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')
 
// Scream Routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postScream)
app.get('/scream/:screamId', getScream)
// TODO: deleteScream
// TODO: likeScream
// TODO: unlikeScream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

// User Routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image/', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(app)