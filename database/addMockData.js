import 'babel-polyfill'
import axios from 'axios'
import Web3 from 'web3'

const endpoint = 'https://mfmybdhoea.execute-api.ca-central-1.amazonaws.com/beta'

const projectContent = {
  projectName: 'Blockcloud',
  logo: 'https://icobench.com/images/icos/icons/datablockchain.jpg',
  wideLogo: 'https://icodrops.com/wp-content/uploads/2018/06/Haja-banner.jpg',
  shortDescription: 'A Blockchain-based Advanced TCP/IP Architecture Providing Constant Connectivity for Dynamic Networks',
  video: 'https://www.youtube.com/watch?v=64kQLRZeE_E',
  description: 'While BigData has traditionally been available only to big companies, Blockcloud.io lowers the barrier for entry and expands our potential client base to include small, medium and large businesses around the globe as well as ICOs seeking data for their new ventures.',
  corporationInfo: {
    location: {
      country: 'CA',
      city: 'Toronto'
    },
    team: {
      teamSize: 6,
      members: [
        {
          name: 'Raul Romero',
          title: 'CEO',
          link: 'www.google.com'
        }, {
          name: 'Zi Wen Zhang',
          title: 'CTO',
          link: 'www.google.com'
        }, {
          name: 'Lawrence Duerson',
          title: 'COO',
          link: 'www.google.com'
        }, {
          name: 'Raul Romero',
          title: 'CEO',
          link: 'www.google.com'
        }, {
          name: 'Zi Wen Zhang',
          title: 'CTO',
          link: 'www.google.com'
        }, {
          name: 'Lawrence Duerson',
          title: 'COO',
          link: 'www.google.com'
        }
      ]
    }
  },
  category: 'Artificial Intelligence',
  website: 'www.google.com',
  whitepaper: 'www.google.com',
  token: {
    symbol: 'BLOC',
    price: '10',
    platform: 'Ethereum',
    accept: ['ETH', 'BTC'],
    KYC: true,
    cantParticipate: ['CN', 'US']
  },
  socialLinks: [
    {
      type: 'telegram',
      link: 'www.google.com'
    }, {
      type: 'github',
      link: 'www.google.com'
    }, {
      type: 'reddit',
      link: 'www.google.com'
    }, {
      type: 'twitter',
      link: 'www.google.com'
    }, {
      type: 'facebook',
      link: 'www.google.com'
    }, {
      type: 'slack',
      link: 'www.google.com'
    }
  ]
}

async function populateProjects () {
  console.log('populating projects ...')
  try {
    for (let i = 0; i < 10; i++) {
      let projectData = {
        projectId: Web3.utils.sha3('project #' + i),
        admin: '0xe980CCBe5bF7740CFFb677deF1E266850AD78a22',
        content: JSON.stringify(projectContent),
        blockTimestamp: 1539292649
      }
      let rv = await axios.post(endpoint + '/project', projectData)
      console.log(rv.data)
    }
  } catch (error) {
    console.log(error)
  }
}

async function populateMilestones () {
  console.log('populating milestones ...')
  try {
    for (let i = 0; i < 10; i++) { // for each project
      for (let j = 1; j <= 4; j++) { // for each milestone
        let rv = await axios.post(endpoint + '/milestone', {
          projectId: Web3.utils.sha3('project #' + i),
          milestoneId: j,
          content: JSON.stringify({
            title: 'milestone #' + j,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula.'
          }),
          startTime: 1539200000,
          endTime: 15392100000,
          state: j <= 2 ? 'COMPLETE' : (j === 3 ? 'IN_PROGRESS' : 'PENDING'),
          blockTimestamp: 1539295454
        })
        console.log(rv.data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function populateObjs () {
  console.log('populating milestones ...')
  try {
    for (let i = 0; i < 10; i++) { // for each project
      for (let j = 1; j <= 4; j++) { // for each milestone
        for (let k = 1; k <= 4; k++) {
          let rv = await axios.post(endpoint + '/objective', {
            projectId: Web3.utils.sha3('project #' + i),
            milestoneId: j,
            objectiveId: k,
            content: JSON.stringify({
              title: 'obj #' + j,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula.'
            }),
            blockTimestamp: 1539295454
          })
          console.log(rv.data)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function print () {
  console.log('printing ...')
  try {
    for (let i = 0; i < 10; i++) {
      let rv = await axios.post(endpoint + '/get-project', {
        projectId: Web3.utils.sha3('project #' + i)
      })
      console.log(rv.data)
    }
  } catch (error) {
    console.log(error)
  }
}

async function main () {
  await populateProjects()
  await populateMilestones()
  await populateObjs()
  await print()
}

main()
