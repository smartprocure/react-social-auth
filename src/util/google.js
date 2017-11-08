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

  export let onMount = async ({
    appId,
    scope = 'profile email',
    fetchBasicProfile = true
  }) => {
      await loadScript(
        'google-platform',
        'https://apis.google.com/js/platform.js'
      )
      let load = bluebird.promisify(window.gapi.load)
      await load('auth2')
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: _.trimEnd(appId, '.apps.googleusercontent.com'),
          fetch_basic_profile: fetchBasicProfile,
          scope,
        })
      }
  }

  export let onClick = async ({appId, onSuccess}) => {
    let auth2 = window.gapi.auth2.getAuthInstance()
    let user = await auth2.signIn()
    onSuccess(getAuthPayload(appId, user))
  }
