function snakeToCamel (s) {
  return s.replace(/(_\w)/g, function (m) { return m[1].toUpperCase() })
}

function processRequestState (name, payload) {
  if (name.endsWith('_PENDING')) {
    name = snakeToCamel(name.replace('_PENDING', '').toLowerCase())
    return {
      [name]: false,
      [name + 'Error']: ''
    }
  } else if (name.endsWith('_REJECTED')) {
    name = snakeToCamel(name.replace('_REJECTED', '').toLowerCase())
    return {
      [name + 'Error']: payload
    }
  } else if (name.endsWith('_FULFILLED')) {
    name = snakeToCamel(name.replace('_FULFILLED', '').toLowerCase())
    return {
      [name]: true
    }
  }
}

const requestReducer = (state = {}, action) => {
  return {
    ...state,
    ...processRequestState(action.type, action.payload)
  }
}

export default requestReducer
