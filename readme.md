## Requirements:

    lussatech-cli

-----
## Content:
* [Step 1: Get the code](#step1)
* [Step 2: Generate files](#step2)
* [Step 3: Customize files](#step3)

-----
<a name="step1"></a>
### Step 1: Get the code

    npm install react-native-sso-authentication

-----
<a name="step2"></a>
### Step 2: Generate files

    lussatech generate react-native-sso-authentication

-----
<a name="step3"></a>
### Step 3: Customize files

    react-native-project
    ...
    |_ lib
      |_ react-native-sso-authentication
        |_ Example
        |_ ...
        |_ Facebook.js
        |_ ...
        |_ Server.js
    ...

#### Setting up your oauth credentials at `Server.js`
```javascript
# lib/react-native-sso-authentication/Server.js

...
export const facebook = {
      client_id: '', // The id of your facebook app (Facebook App ID)
  client_secret: '', // The secret of your facebook app (Facebook App Secret)
   oauth_dialog: '', // The uri to display facebook login dialog
   redirect_uri: '', // The uri to capture response (code) from login dialog
    oauth_token: '', // The uri to exchange response (code) for an accessing token (short-lived-token)
   oauth_access: '', // The uri to exchange short-lived-token for long-lived-token
  oauth_profile: '', // The uri to get logged in user profile
};

export const google = {
      client_id: '', // The id of your google app (Google App ID)
  client_secret: '', // The secret of your google app (Google App Secret)
   oauth_dialog: '', // The uri to display google login dialog
   redirect_uri: '', // The uri to capture response (code) from login dialog
    oauth_token: '', // The uri to exchange response (code) for an accessing token
  oauth_profile: '', // The uri to get logged in user profile
};
...
```

#### Import `Facebook.js` and or `Google.js` to your _react-native-project_, e.g.
```javascript
# index.android.js

...
import Facebook from './lib/react-native-sso-authentication/Facebook';

class Name extends Component {
  render() {
    return <Facebook />;
  }
}
...
```

#### Or import `Example` to your _react-native-project_ to see an example, e.g.
```javascript
# index.android.js

...
import Example from './lib/react-native-sso-authentication/Example';

class Name extends Component {
  render() {
    return <Example />;
  }
}
...
```
