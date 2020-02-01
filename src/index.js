import React from 'react'
import { hasRequiredSettings } from './util/common'
import * as google from './util/google'
import * as linkedin from './util/linkedin'
import * as salesforce from './util/salesforce'

let providers = { google, linkedin, salesforce }

export let SocialAuth = props => {
  let { provider, component: Component } = props
  let { init, onClick } = providers[provider]
  hasRequiredSettings(props)
  init(props)
  return <Component onClick={() => onClick(props)} />
}

export let GoogleAuth = props => <SocialAuth {...props} provider="google" />
export let LinkedInAuth = props => <SocialAuth {...props} provider="linkedin" />
export let SalesForceAuth = props => (
  <SocialAuth {...props} provider="salesforce" />
)
