function onLogin (loginData) {
  return {
    type: 'LOGIN_DATA_FETCHED',
    payload: loginData
  }
}

export { onLogin }
