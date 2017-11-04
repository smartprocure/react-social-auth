# react-social-auth
Simple client side social authentication for [React](https://reactjs.org/) applications.

# Installing
`npm install react-social-auth`

This package requires `lodash/fp`, so make sure that's available in your app.

# Usage

Client Side Code:

```
import React from 'react';
import {Button} from 'reactstrap'
import Flex from './Flex'
import {GoogleAuth, LinkedInAuth} from "react-social-auth"

let GoogleButton = ({ onClick }) => (
  <Button style={{width: 175}}
    className="cursor-pointer"
    color="primary"
    onClick={onClick}>
    <Flex>
      <i className='fa fa-google-plus' />
      Log in with Google
    </Flex>
  </Button>
)

let LinkedInButton = ({ onClick }) => (
  <Button style={{width: 175}}
    className="cursor-pointer"
    color="primary"
    onClick={onClick}>
    <Flex>
      <i className='fa fa-linkedin-square' />
      Log in with LinkedIn
    </Flex>
  </Button>
)

let onSignIn = (authPayload) => {  
  // Use the authentication payload to verify 
  // the identity of the request using server
  // side authentication procedures.
  console.log(authPayload)
}

export default () => (
  <Flex>
    <GoogleAuth
      appId="[YOUR_GOOGLE_APP_ID]"
      onSuccess={onSignIn}
      component={GoogleButton}
    />
    <LinkedInAuth
      appId="[YOUR_LINKEDIN_APP_ID]"
      onSuccess={onSignIn}
      component={LinkedInButton}
    />
  </Flex>
)
```
Server side authentication procedures:

- [Google](https://developers.google.com/identity/sign-in/web/backend-auth)
- [LinkedIn](https://developer.linkedin.com/docs/oauth2) (Step 2)
