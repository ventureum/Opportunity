'use strict'

var _regenerator = require('babel-runtime/regenerator')

var _regenerator2 = _interopRequireDefault(_regenerator)

var _stringify = require('babel-runtime/core-js/json/stringify')

var _stringify2 = _interopRequireDefault(_stringify)

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

var populateProjects = (function () {
  var _ref = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee () {
    var i, projectData, rv
    return _regenerator2.default.wrap(function _callee$ (_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('populating projects ...')
            _context.prev = 1
            i = 0

          case 3:
            if (!(i < 10)) {
              _context.next = 12
              break
            }

            projectData = {
              projectId: _web2.default.utils.sha3('project #' + i),
              admin: '0xe980CCBe5bF7740CFFb677deF1E266850AD78a22',
              content: (0, _stringify2.default)(projectContent),
              blockTimestamp: 1539292649
            }
            _context.next = 7
            return _axios2.default.post(endpoint + '/project', projectData)

          case 7:
            rv = _context.sent

            console.log(rv.data)

          case 9:
            i++
            _context.next = 3
            break

          case 12:
            _context.next = 17
            break

          case 14:
            _context.prev = 14
            _context.t0 = _context['catch'](1)

            console.log(_context.t0)

          case 17:
          case 'end':
            return _context.stop()
        }
      }
    }, _callee, this, [[1, 14]])
  }))

  return function populateProjects () {
    return _ref.apply(this, arguments)
  }
}())

var populateMilestones = (function () {
  var _ref2 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee2 () {
    var i, j, rv
    return _regenerator2.default.wrap(function _callee2$ (_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('populating milestones ...')
            _context2.prev = 1
            i = 0

          case 3:
            if (!(i < 10)) {
              _context2.next = 16
              break
            }

            j = 1

          case 5:
            if (!(j <= 4)) {
              _context2.next = 13
              break
            }

            _context2.next = 8
            return _axios2.default.post(endpoint + '/milestone', {
              projectId: _web2.default.utils.sha3('project #' + i),
              milestoneId: j,
              content: (0, _stringify2.default)({
                title: 'milestone #' + j,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula.'
              }),
              startTime: 1539200000,
              endTime: 15392100000,
              state: j <= 2 ? 'COMPLETE' : j === 3 ? 'IN_PROGRESS' : 'PENDING',
              blockTimestamp: 1539295454
            })

          case 8:
            rv = _context2.sent

            console.log(rv.data)

          case 10:
            j++
            _context2.next = 5
            break

          case 13:
            i++
            _context2.next = 3
            break

          case 16:
            _context2.next = 21
            break

          case 18:
            _context2.prev = 18
            _context2.t0 = _context2['catch'](1)

            console.log(_context2.t0)

          case 21:
          case 'end':
            return _context2.stop()
        }
      }
    }, _callee2, this, [[1, 18]])
  }))

  return function populateMilestones () {
    return _ref2.apply(this, arguments)
  }
}())

var populateObjs = (function () {
  var _ref3 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee3 () {
    var i, j, k, rv
    return _regenerator2.default.wrap(function _callee3$ (_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('populating milestones ...')
            _context3.prev = 1
            i = 0

          case 3:
            if (!(i < 10)) {
              _context3.next = 21
              break
            }

            j = 1

          case 5:
            if (!(j <= 4)) {
              _context3.next = 18
              break
            }

            k = 1

          case 7:
            if (!(k <= 4)) {
              _context3.next = 15
              break
            }

            _context3.next = 10
            return _axios2.default.post(endpoint + '/objective', {
              projectId: _web2.default.utils.sha3('project #' + i),
              milestoneId: j,
              objectiveId: k,
              content: (0, _stringify2.default)({
                title: 'obj #' + j,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed posuere nulla, at bibendum mauris. Nunc aliquam augue quis aliquam porttitor. Ut auctor nunc sit amet dui sodales hendrerit. Sed pulvinar purus at egestas interdum. In et tellus ut dolor lobortis pulvinar. Vivamus lectus ligula, pretium in sapien nec, laoreet pellentesque ligula.'
              }),
              blockTimestamp: 1539295454
            })

          case 10:
            rv = _context3.sent

            console.log(rv.data)

          case 12:
            k++
            _context3.next = 7
            break

          case 15:
            j++
            _context3.next = 5
            break

          case 18:
            i++
            _context3.next = 3
            break

          case 21:
            _context3.next = 26
            break

          case 23:
            _context3.prev = 23
            _context3.t0 = _context3['catch'](1)

            console.log(_context3.t0)

          case 26:
          case 'end':
            return _context3.stop()
        }
      }
    }, _callee3, this, [[1, 23]])
  }))

  return function populateObjs () {
    return _ref3.apply(this, arguments)
  }
}())

var print = (function () {
  var _ref4 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee4 () {
    var i, rv
    return _regenerator2.default.wrap(function _callee4$ (_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('printing ...')
            _context4.prev = 1
            i = 0

          case 3:
            if (!(i < 10)) {
              _context4.next = 11
              break
            }

            _context4.next = 6
            return _axios2.default.post(endpoint + '/get-project', {
              projectId: _web2.default.utils.sha3('project #' + i)
            })

          case 6:
            rv = _context4.sent

            console.log(rv.data)

          case 8:
            i++
            _context4.next = 3
            break

          case 11:
            _context4.next = 16
            break

          case 13:
            _context4.prev = 13
            _context4.t0 = _context4['catch'](1)

            console.log(_context4.t0)

          case 16:
          case 'end':
            return _context4.stop()
        }
      }
    }, _callee4, this, [[1, 13]])
  }))

  return function print () {
    return _ref4.apply(this, arguments)
  }
}())

var printProjectList = (function () {
  var _ref5 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee5 () {
    var rv
    return _regenerator2.default.wrap(function _callee5$ (_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('printing project list ...')
            _context5.next = 3
            return _axios2.default.post(endpoint + '/get-project-list', {
              limit: 10,
              cursor: ''
            })

          case 3:
            rv = _context5.sent

            console.log(rv.data)

          case 5:
          case 'end':
            return _context5.stop()
        }
      }
    }, _callee5, this)
  }))

  return function printProjectList () {
    return _ref5.apply(this, arguments)
  }
}())

var main = (function () {
  var _ref6 = (0, _asyncToGenerator3.default)(/* #__PURE__ */_regenerator2.default.mark(function _callee6 () {
    return _regenerator2.default.wrap(function _callee6$ (_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2
            return populateProjects()

          case 2:
            _context6.next = 4
            return populateMilestones()

          case 4:
            _context6.next = 6
            return populateObjs()

          case 6:
            _context6.next = 8
            return print()

          case 8:
            _context6.next = 10
            return printProjectList()

          case 10:
          case 'end':
            return _context6.stop()
        }
      }
    }, _callee6, this)
  }))

  return function main () {
    return _ref6.apply(this, arguments)
  }
}())

require('babel-polyfill')

var _axios = require('axios')

var _axios2 = _interopRequireDefault(_axios)

var _web = require('web3')

var _web2 = _interopRequireDefault(_web)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

var endpoint = 'https://mfmybdhoea.execute-api.ca-central-1.amazonaws.com/beta'

var projectContent = {
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
      members: [{
        name: 'Raul Romero',
        title: 'CEO',
        link: 'https://www.google.com'
      }, {
        name: 'Zi Wen Zhang',
        title: 'CTO',
        link: 'https://www.google.com'
      }, {
        name: 'Lawrence Duerson',
        title: 'COO',
        link: 'https://www.google.com'
      }, {
        name: 'Raul Romero',
        title: 'CEO',
        link: 'https://www.google.com'
      }, {
        name: 'Zi Wen Zhang',
        title: 'CTO',
        link: 'https://www.google.com'
      }, {
        name: 'Lawrence Duerson',
        title: 'COO',
        link: 'https://www.google.com'
      }]
    }
  },
  category: 'Artificial Intelligence',
  website: 'https://www.google.com',
  whitepaper: 'https://www.google.com',
  token: {
    symbol: 'BLOC',
    price: '10',
    platform: 'Ethereum',
    accept: ['ETH', 'BTC'],
    KYC: true,
    cantParticipate: ['CN', 'US']
  },
  socialLinks: [{
    type: 'telegram',
    link: 'https://www.google.com'
  }, {
    type: 'github',
    link: 'https://www.google.com'
  }, {
    type: 'reddit',
    link: 'https://www.google.com'
  }, {
    type: 'twitter',
    link: 'https://www.google.com'
  }, {
    type: 'facebook',
    link: 'https://www.google.com'
  }, {
    type: 'slack',
    link: 'https://www.google.com'
  }]
}

main()
