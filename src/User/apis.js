import axios from 'axios'

let baseUrl = 'https://7g1vjuevub.execute-api.ca-central-1.amazonaws.com/exp'

const apiFeed = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

const hashMap = {
  post: '0x2fca5a5e',
  comment: '0x6bf78b95',
  airdrop: '0x04bc4e7a',
  milestone: '0xf7003d25'
}

const responseCheck = (responseData) => {
  if (!responseData.data.ok) {
    throw responseData.data
  }
  return responseData.data
}

async function getProfile (uuid) {
  return responseCheck(await apiFeed.post('/get-profile', { actor: uuid }))
}

export function userActive (username) {
  return apiFeed.post('/profile', {
    Actor: username,
    UserType: 'USER'
  })
}

export function getVoteList (username) {
  return apiFeed.post('/get-recent-votes', {
    actor: username,
    limit: 20
  })
    .then((res) => {
      if (res.data.ok && res.data.recentVotes) {
        let hashList = []
        let mergeList = []
        res.data.recentVotes.forEach((item) => {
          hashList.push(item.postHash)
          mergeList.push({
            voteType: item.voteType,
            deltaMilestonePoints: item.deltaMilestonePoints,
            createdAt: item.createdAt
          })
        })
        return getBatchPosts(hashList, 'voteList', mergeList)
      } else {
        return Promise.resolve(null)
      }
    })
}

export function getPostList (username) {
  return apiFeed.post('/get-recent-posts', {
    actor: username,
    typeHash: hashMap['post'],
    limit: 20
  })
    .then((res) => {
      if (res.data.ok && res.data.recentPosts) {
        let hashList = []
        let mergeList = []
        res.data.recentPosts.forEach((item) => {
          hashList.push(item.postHash)
          mergeList.push({
            deltaMilestonePoints: item.deltaMilestonePoints,
            createdAt: item.createdAt
          })
        })
        return getBatchPosts(hashList, 'postList', mergeList)
      } else {
        return Promise.resolve(null)
      }
    })
}

export function getReplyList (username) {
  return apiFeed.post('/get-recent-posts', {
    actor: username,
    typeHash: hashMap['comment'],
    limit: 20
  })
    .then((res) => {
      if (res.data.ok && res.data.recentPosts) {
        let hashList = []
        let mergeList = []
        res.data.recentPosts.forEach((item) => {
          hashList.push(item.postHash)
          mergeList.push({
            deltaMilestonePoints: item.deltaMilestonePoints,
            createdAt: item.createdAt
          })
        })
        return getBatchPosts(hashList, 'replyList', mergeList)
      } else {
        return Promise.resolve(null)
      }
    })
}

export function getBatchPosts (hashList, stateName, mergeList) {
  return apiFeed.post('/get-batch-posts', {
    postHashes: hashList
  })
    .then((res) => {
      if (res.data.ok) {
        if (mergeList) {
          res.data.posts = res.data.posts.map((post, i) => {
            return Object.assign(post, mergeList[i])
          })
        }
        return Promise.resolve(res.data.posts)
      }
    })
}

export { getProfile }
