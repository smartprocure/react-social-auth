import _ from 'lodash/fp'
import { loadScript, getQueryParameter } from './common'
import bluebird from 'bluebird'

export let onMount = ({ appId, redirectUri, onSuccess }) => {
  loadScript(
    'salesforce-platform',
    'https://cdnjs.cloudflare.com/ajax/libs/jsforce/1.9.1/jsforce.min.js'
  ).then(() => {
    window.jsforce.browser.init({
      clientId: appId,
      redirectUri,
    })
    window.jsforce.browser.on('connect', conn => {
      let query = bluebird.promisify(conn.query)
      query('SELECT Id, Name FROM Account').error(sales_force_error => {
        // eslint-disable-next-line no-console
        console.log({ sales_force_error })
      })
    })
    if (_.contains('salesforce.com', document.referrer)) {
      let code = getQueryParameter('code')
      window.history.replaceState(null, null, redirectUri)
      onSuccess({
        type: 'salesforce',
        authResponse: {
          code,
          redirectUri,
        },
      })
    }
  })
}

export let onClick = ({ appId, redirectUri }) => {
  window.location.href = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}&state=mystate`
}
