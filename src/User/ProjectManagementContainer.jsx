import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectManagement from './ProjectManagementComponent'

class ProjectManagementContainer extends Component {
  componentDidMount () {
  }

  render () {
    let { profile, requestStatus } = this.props
    let project = {
      'projectId': '0x34b0720df51fc665a1a1c2c161c0d5ed75191f138329f83051ad7208fc0a06a2',
      'admin': '0xd1592ff5cc1f2B6c85161B682777232630914bF0',
      'content': '{"projectName":"Blockcloud","logo":"https://icobench.com/images/icos/icons/datablockchain.jpg","wideLogo":"https://icodrops.com/wp-content/uploads/2018/06/Haja-banner.jpg","shortDescription":"A Blockchain-based Advanced TCP/IP Architecture Providing Constant Connectivity for Dynamic Networks","video":"https://www.youtube.com/watch?v=64kQLRZeE_E","description":"While BigData has traditionally been available only to big companies, Blockcloud.io lowers the barrier for entry and expands our potential client base to include small, medium and large businesses around the globe as well as ICOs seeking data for their new ventures.","corporationInfo":{"location":{"country":"CA","city":"Toronto"},"team":{"teamSize":6,"members":[{"name":"Raul Romero","title":"CEO","link":"https://www.google.com"},{"name":"Zi Wen Zhang","title":"CTO","link":"https://www.google.com"},{"name":"Lawrence Duerson","title":"COO","link":"https://www.google.com"},{"name":"Raul Romero","title":"CEO","link":"https://www.google.com"},{"name":"Zi Wen Zhang","title":"CTO","link":"https://www.google.com"},{"name":"Lawrence Duerson","title":"COO","link":"https://www.google.com"}]}},"category":"Artificial Intelligence","website":"https://www.google.com","whitepaper":"https://www.google.com","token":{"symbol":"BLOC","price":"10","platform":"Ethereum","accept":["ETH","BTC"],"KYC":true,"cantParticipate":["CN","US"]},"socialLinks":[{"type":"telegram","link":"https://www.google.com"},{"type":"github","link":"https://www.google.com"},{"type":"reddit","link":"https://www.google.com"},{"type":"twitter","link":"https://www.google.com"},{"type":"facebook","link":"https://www.google.com"},{"type":"slack","link":"https://www.google.com"}]}',
      'blockTimestamp': 1542402475,
      'avgRating': 0,
      'milestonesInfo': {
        'currentMilestone': 0,
        'numMilestones': 1,
        'numMilestonesCompleted': 1,
        'milestones': [
          {
            'projectId': '0x34b0720df51fc665a1a1c2c161c0d5ed75191f138329f83051ad7208fc0a06a2',
            'milestoneId': 1,
            'content': '{"title":"milestone #1","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula.","expectedStartTime":1541617885,"expectedEndTime":1541717885}',
            'startTime': 1542410568,
            'endTime': 1542410569,
            'blockTimestamp': 1542410569,
            'state': 'PENDING',
            'numObjectives': 2,
            'avgRating': 0,
            'objectives': [
              {
                'projectId': '0x34b0720df51fc665a1a1c2c161c0d5ed75191f138329f83051ad7208fc0a06a2',
                'milestoneId': 1,
                'objectiveId': 1,
                'content': '{"title":"obj #1","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula."}',
                'blockTimestamp': 1542402481,
                'avgRating': 0
              },
              {
                'projectId': '0x34b0720df51fc665a1a1c2c161c0d5ed75191f138329f83051ad7208fc0a06a2',
                'milestoneId': 1,
                'objectiveId': 2,
                'content': '{"title":"obj #2","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula."}',
                'blockTimestamp': 1542402483,
                'avgRating': 0
              }
            ]
          }
        ]
      }
    }

    project.content = JSON.parse(project.content)
    project.milestonesInfo.milestones.map((ms) => {
      ms.content = JSON.parse(ms.content)
      ms.objectives.map((obj) => {
        obj.content = JSON.parse(obj.content)
      })
    })

    return (
      <ProjectManagement
        project={project}
        profile={profile}
        requestStatus={requestStatus}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userReducer.profile,
    requestStatus: state.requestReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectManagementContainer)
