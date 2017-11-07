import _ from 'lodash/fp'
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

    loadScript('google-platform', 'https://apis.google.com/js/platform.js')
    .then(window.gapi.load('auth2'))
    .then(() => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: _.trimEnd(appId, '.apps.googleusercontent.com'),
          fetch_basic_profile: fetchBasicProfile,
          scope,
        })
      }
    })
  }

  clickHandler() {
    let auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn()
    .then(user =>
      this.props.onSuccess(getAuthPayload(this.props.appId, user))
    )
  }

  render() {
    let { component: Component } = this.props
    return <Component onClick={this.clickHandler.bind(this)} />
  }
}
