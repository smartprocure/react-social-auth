import React from 'react'
import { hasRequiredSettings } from './util/common'
import { requestAuthenticationCode, getAuthPayload } from './util/linkedin'

export default class LinkedInAuth extends React.Component {
  constructor(props) {
    super(props)
    hasRequiredSettings(this.props)
  }

  componentDidMount() {
    let authPayload = getAuthPayload(this.props)
    if (authPayload) {
      this.props.onSuccess(authPayload)
    }
  }

  clickHandler() {
    let { appId, scope = 'r_basicprofile r_emailaddress'} = this.props
    requestAuthenticationCode({ appId, scope })
  }

  render() {
    let { component: Component } = this.props
    return <Component onClick={this.clickHandler.bind(this)} />
  }
}
