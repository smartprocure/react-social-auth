import React from 'react'
import { hasRequiredSettings } from './util/common'
import * as google from './util/google'
import * as linkedin from './util/linkedin'
import * as salesforce from './util/salesforce'

let providers = { google, linkedin, salesforce }

export default props => {
  let { provider, component: Component } = props
  let { init, onClick } = providers[provider]
  hasRequiredSettings(props)
  init(props)
  return <Component onClick={() => onClick(props)} />
}
