let db = {
  screams: [
    {
      userHandle: 'user',
      body: 'scream text',
      createdAt: '2019-04-03T01:30:19.900Z',
      likeCount: 5,
      commentCount: 2,
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'askdjfxzcvg8798s',
      body: 'ok comment',
      createdAt: '2019-03-29T13:23:12.332Z',
    }
  ]
}

// Redux data
const userDetails = {
  credentials: {
    userId: '2NNASDJF92NASDF22UE9FAUDF',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-04-15T13:23:12.332Z',
    imageUrl: 'image/samplepath',
    bio: 'Hello, friend.',
    website: 'https://evilcorp.com',
    location: 'New York, US'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'hh4h08suf0sfdsfKKea'
    },
    {
      userHandle: 'user',
      screamId: '2r2390jsdajf902dasO'
    },
  ]
}