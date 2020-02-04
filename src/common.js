import _ from 'lodash/fp'
import * as F from 'futil-js'

export let loadScript = (id, src) =>
  new Promise(resolve => {
    if (typeof document !== 'undefined') {
      if (!document.getElementById(id)) {
        let siblingElement = _.head(document.getElementsByTagName('script'))
        let scriptElement = document.createElement('script')
        F.extendOn(scriptElement, { id, src, onload: resolve, async: true })
        siblingElement.parentNode.insertBefore(scriptElement, siblingElement)
      }
    }
  })

let hasProperties = _.curry((properties, instance) =>
  _.every(
    property => _.has(property, instance) && !_.isNil(property, instance),
    properties
  )
)

export let hasRequiredSettings = instance => {
  let requiredSettings = ['provider', 'appId', 'onSuccess', 'component']
  if (!hasProperties(requiredSettings, instance)) {
    throw `[Social Authentication] - A valid value for the following setting is required ${requiredSettings.join(
      ', '
    )}.`
  } else {
    return true
  }
}

export let getQueryParameter = name => {
  if (typeof window !== 'undefined') {
    let search = window.location.search
    if (!search && localStorage.rawHref && localStorage.rawHref.match(/\?./)) {
      search = `?${localStorage.rawHref.split('?')[1]}`
    }
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }
}
