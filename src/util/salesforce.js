import { loadScript } from './common'
import bluebird from 'bluebird'

export let onMount = ({ appId, redirectUri }) => {
  loadScript(
    'salesforce-platform',
    'https://cdnjs.cloudflare.com/ajax/libs/jsforce/1.9.1/jsforce.min.js'
  ).then(() => {
    // window.jsforce.browser.init({
    //   clientId: appId,
    //   redirectUri,
    // })
    // window.jsforce.browser.on('connect', conn => {
    //   let query = bluebird.promisify(conn.query)
    //   query('SELECT Id, Name FROM Account').error(sales_force_error => {
    //     // eslint-disable-next-line no-console
    //     console.log({ sales_force_error })
    //   })
    // })
  })
}

export let onClick = window.jsforce.browser.login
