import React from 'react'
import { loadScript, hasRequiredSettings } from './util/common'

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

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props)
    hasRequiredSettings(this.props)
  }

  componentDidMount() {
    let {
      appId,
      scope = 'profile email',
      fetchBasicProfile = true,
    } = this.props

    loadScript(
      'google-platform',
      'https://apis.google.com/js/platform.js',
      () => {
        let gapi = window.gapi
        gapi.load('auth2', () => {
          if (!gapi.auth2.getAuthInstance()) {
            gapi.auth2.init({
              client_id: appId,
              fetch_basic_profile: fetchBasicProfile,
              scope,
            })
          }
        })
      }
    )
  }

  clickHandler() {
    let gapi = window.gapi
    let auth2 = gapi.auth2.getAuthInstance()
    auth2
      .signIn()
      .then(user =>
        this.props.onSuccess(getAuthPayload(this.props.appId, user))
      )
  }

  render() {
    let { component: Component } = this.props
    return <Component onClick={this.clickHandler.bind(this)} />
  }
}
