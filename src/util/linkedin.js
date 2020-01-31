import { getQueryParameter } from './common'
import generateState from 'simple-random/browser'

export let onMount = ({ appId, onSuccess }) => {
  if (localStorage.linkedInLoginState) {
    let redirectUri = localStorage.linkedInReactLoginRedirectUri
    let code = getQueryParameter('code')
    let state = getQueryParameter('state')
    window.history.replaceState(null, null, redirectUri)
    if (state === localStorage.linkedInLoginState) {
      localStorage.linkedInLoginState = null
      onSuccess({
        type: 'linkedin',
        authResponse: {
          grant_type: 'authorization_code',
          code,
          client_id: appId,
          redirect_uri: redirectUri,
        },
      })
    }
  }
}

export let onClick = ({
  appId,
  scope = 'r_basicprofile r_emailaddress',
  redirectUri = window.location.href,
}) => {
  localStorage.linkedInReactLoginRedirectUri = redirectUri
  localStorage.linkedInLoginState = generateState({ length: 8 })
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${localStorage.linkedInLoginState}&scope=${encodeURIComponent(
    scope
  )}`
}
