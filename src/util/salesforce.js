import _ from 'lodash/fp'
import { getQueryParameter } from './common'
import bluebird from 'bluebird'
import jsforce from 'jsforce'
import generateState from 'simple-random/browser'

export let onMount = ({ appId, redirectUri, onSuccess }) => {
  jsforce.browser.init({
    clientId: appId,
    redirectUri,
  })
  jsforce.browser.on('connect', conn => {
    let query = bluebird.promisify(conn.query)
    query('SELECT Id, Name FROM Account').error(sales_force_error => {
      // eslint-disable-next-line no-console
      console.error({ sales_force_error })
    })
  })
  if (
    _.contains('salesforce.com', document.referrer) &&
    localStorage.salesforceLoginState
  ) {
    let code = getQueryParameter('code')
    let state = getQueryParameter('state')
    window.history.replaceState(null, null, redirectUri)
    if (state === localStorage.salesforceLoginState) {
      localStorage.salesforceLoginState = null
      onSuccess({
        type: 'salesforce',
        authResponse: {
          code,
          redirectUri,
        },
      })
    }
  }
}

export let onClick = ({ appId, redirectUri }) => {
  localStorage.salesforceLoginState = generateState({ length: 8 })
  window.location.href = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=${localStorage.salesforceLoginState}`
}
