import _ from 'lodash/fp'
import { loadScript } from './common'

let getAuthPayload = (appId, onSuccess) => {
  window.FB.api('/me', { fields: 'name, email' }, (profile) => {
    return onSuccess({
      type: 'facebook',
      profile: profile,
      authResponse: {
        clientId: appId,
        token: window.FB.getAccessToken(),
      }
    })
  })
}

export let init = ({
  appId,
  version = '6.0',
  xfbml = true,
  status = true,
}) => {
  loadScript('facebook-platform', 'https://connect.facebook.net/en-US/sdk.js').then(
    () => {
      window.fbAsyncInit = () => {
        window.FB.init({
          version,
          appId,
          status,
          xfbml,
        })
      }
    }
  )
}

export let onClick = ({ appId, onSuccess }) => {
  window.FB.getAuthResponse() ? 
    getAuthPayload(appId, onSuccess) : window.FB.login(() => getAuthPayload(appId, onSuccess))
}
