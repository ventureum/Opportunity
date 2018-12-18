import axios from 'axios'

let baseUrl = `${process.env.REACT_APP_FEED_ENDPOINT}/${process.env.REACT_APP_FEED_STAGE}`
let authUrl = `${process.env.REACT_APP_AUTH_ENDPOINT}/${process.env.REACT_APP_AUTH_STAGE}`

const apiFeed = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiAuth = axios.create({
  baseURL: authUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiFeed.interceptors.response.use(function (response) {
  if (!response.data.ok) {
    throw response.data
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

apiAuth.interceptors.response.use(function (response) {
  if (!response.data.ok) {
    throw response.data
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

const hashMap = {
  post: '0x2fca5a5e',
  comment: '0x6bf78b95',
  airdrop: '0x04bc4e7a',
  milestone: '0xf7003d25'
}

async function getProfile (uuid, withPrivateKey = true) {
  let rv = await apiFeed.post('/get-profile', { actor: uuid })
  let profile = rv.data.profile

  if (withPrivateKey) {
    let privateKeyResponse = await apiFeed.post('/get-actor-private-key', { actor: uuid })
    // auto retrieve privateKey, do not check error in this step
    profile.privateKey = privateKeyResponse.data.privateKey
  }

  return profile
}

async function setActorPrivateKey (uuid, privateKey) {
  await apiFeed.post('/set-actor-private-key',
    { actor: uuid,
      privateKey: privateKey
    })
}

async function getActorPrivateKey (uuid) {
  let response = await apiFeed.post('/get-actor-private-key', { actor: uuid })
  let { privateKey } = response
  return privateKey
}

export function userActive (username) {
  return apiFeed.post('/profile', {
    Actor: username,
    UserType: 'USER'
  })
}

async function getWallets (actor) {
  let rv = await apiFeed.post('/get-tracked-wallet-addresses', {
    actor
  })
  return rv.data.walletAddressList || []
}

async function getBatchProfiles (actors) {
  let rv = await apiFeed.post('/get-batch-profiles', {
    actors
  })
  if (rv.data.profiles === null) {
    rv.data.profiles = []
  }
  return rv.data.profiles
}

async function getVoteList (actor) {
  let rv = await apiFeed.post('/get-recent-votes', {
    actor,
    limit: 20
  })
  if (rv.data.recentVotes) {
    let hashList = []
    let mergeList = []
    rv.data.recentVotes.forEach((item) => {
      hashList.push(item.postHash)
      mergeList.push({
        voteType: item.voteType,
        deltaMilestonePoints: item.deltaMilestonePoints,
        createdAt: item.createdAt
      })
    })
    let posts = await getBatchPosts(hashList, 'voteList', mergeList)
    return posts
  } else {
    return []
  }
}

async function getPostList (actor) {
  let rv = await apiFeed.post('/get-recent-posts', {
    actor,
    typeHash: hashMap['post'],
    limit: 20
  })
  if (rv.data.recentPosts) {
    let hashList = []
    let mergeList = []
    rv.data.recentPosts.forEach((item) => {
      hashList.push(item.postHash)
      mergeList.push({
        deltaMilestonePoints: item.deltaMilestonePoints,
        createdAt: item.createdAt
      })
    })
    let posts = await getBatchPosts(hashList, 'postList', mergeList)
    return posts
  } else {
    return []
  }
}

async function getReplyList (actor) {
  let rv = await apiFeed.post('/get-recent-posts', {
    actor,
    typeHash: hashMap['comment'],
    limit: 20
  })
  if (rv.data.recentPosts) {
    let hashList = []
    let mergeList = []
    rv.data.recentPosts.forEach((item) => {
      hashList.push(item.postHash)
      mergeList.push({
        deltaMilestonePoints: item.deltaMilestonePoints,
        createdAt: item.createdAt
      })
    })
    let posts = await getBatchPosts(hashList, 'replyList', mergeList)
    return posts
  } else {
    return []
  }
}

async function getBatchPosts (hashList, stateName, mergeList) {
  let rv = await apiFeed.post('/get-batch-posts', {
    postHashes: hashList
  })
  if (mergeList) {
    rv.data.posts = rv.data.posts.map((post, i) => {
      return Object.assign(post, mergeList[i])
    })
  }
  return rv.data.posts
}

async function addWallet (actor, walletAddress) {
  await apiFeed.post('/add-tracked-wallet-addresses', {
    actor,
    walletAddressList: [walletAddress]
  })
  let wallets = getWallets(actor)
  return wallets
}

async function removeWallet (actor, walletAddress) {
  await apiFeed.post('/delete-tracked-wallet-addresses', {
    actor,
    walletAddressList: [walletAddress]
  })
  let wallets = getWallets(actor)
  return wallets
}

async function fetchAccessToken (requestToken) {
  let rv = await apiAuth.get(`/get-access-token?key=${requestToken}`)
  return rv.data.accessToken
}

export { getProfile, setActorPrivateKey, getActorPrivateKey, getWallets, getBatchProfiles, getVoteList, getPostList, getReplyList, getBatchPosts, addWallet, removeWallet, fetchAccessToken, apiAuth, apiFeed }
