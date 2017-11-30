import _ from 'lodash/fp'
import { loadScript, hasRequiredSettings } from './common'
import bluebird from 'bluebird'

let getAuthPayload = (appId, user) => {
  let profile = user.getBasicProfile()
  let authResponse = user.getAuthResponse()
  return {
    type: 'google',
    profile: {
      id: profile.getId(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
    },
    authResponse: {
      clientId: appId,
      token: authResponse.id_token,
    },
  }
}

export let onMount = ({
  appId,
  scope = 'profile email',
  fetchBasicProfile = true,
}) => {
  loadScript('google-platform', 'https://apis.google.com/js/platform.js').then(
    () => {
      let load = bluebird.promisify(window.gapi.load)
      load('auth2').then(() => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init({
            client_id: _.trimEnd(appId, '.apps.googleusercontent.com'),
            fetch_basic_profile: fetchBasicProfile,
            scope,
          })
        }
      })
    }
  )
}

export let onClick = ({ appId, onSuccess }) => {
  let auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signIn().then(user => {
    onSuccess(getAuthPayload(appId, user))
  })
}
