### Installation
    npm i react-native-sso-authentication

### Generate Files
Before generate library files to your react-native-project, make sure that `lussatech-cli` is installed globally in your machine, otherwise use this command to install it:

    npm i lussatech-cli -g

If `lussatech-cli` have been installed, change directory to your react-native-project and run this command:

    lussatech generate react-native-sso-authentication

then the library files will be added automatically inside your react-native-project, e.g.

    react-native-project
    |_ ...
    |_ lib
      |_ react-native-sso-authentication
        |_ ...
        |_ index.js
        |_ ...

### Usage
```javascript
...
import SSOAuth, {   // sample app
/* available components */
  Navbar,               // sample navigation bar
  Facebook,             // sample facebook view
  Google,               // sample google view
/* available constants  */  
  Server,               // sample api end-point
  Key,                  // sample key for asynstorage
  OAuthFacebook,        // sample oauth facebook setting
  OAuthGoogle,          // sample oauth google setting
  Style                 // sample styles
} from './lib/react-native-sso-authentication';

class Name extends Component {
  render() {
    return (
      <SSOAuth />       // sample calling component
    );
  }
}
...
```

###### Manage OAuth credentials
To manage oauth credentials, update `Server.js` based on your oauth credentials, e.g.

```javascript
# lib/react-native-sso-authentication/Server.js

...
export const key = '@lussatech:session'; // key for asynstorage
export const facebook = {
      client_id: '', // The id of your facebook app (Facebook App ID)
  client_secret: '', // The secret of your facebook app (Facebook App Secret)
   oauth_dialog: '', // The uri to display facebook login dialog
   redirect_uri: '', // The uri to capture response (code) from login dialog
    oauth_token: '', // The uri to exchange response (code) for an accessing token (short-lived-token)
   oauth_access: '', // The uri to exchange short-lived-token for long-lived-token
  oauth_profile: '', // The uri to get logged in user profile
   oauth_logout: '', // The uri to logged out user
};
export const google = {
      client_id: '', // The id of your google app (Google App ID)
  client_secret: '', // The secret of your google app (Google App Secret)
   oauth_dialog: '', // The uri to display google login dialog
   redirect_uri: '', // The uri to capture response (code) from login dialog
    oauth_token: '', // The uri to exchange response (code) for an accessing token
  oauth_profile: '', // The uri to get logged in user profile
   oauth_logout: '', // The uri to logged out user
};
...
```

###### Customize navigation bar
To customize navigation bar, update `Navbar.js` based on your need, e.g.

```javascript
# lib/react-native-sso-authentication/Navbar.js

...
export default class extends Component {
  /* to validate props value */
  static propTypes = {
    onRefresh: PropTypes.func,
    ...
  };
  ...

  /* when a menu is selected */
  onActionSelected(position) {
    switch (position) {
       case 0: this.onSearch(); break;
       case 1: this.onRefresh(); break;
       ...
      default: ToastAndroid.show(`${actions[position].title} selected.`, ToastAndroid.SHORT);
    }
  }
  ...

  /* when selected menu is `Refresh` */
  onRefresh() {
    /* calling onRefresh props action if available */
    this.props.onRefresh && this.props.onRefresh();
  }
  ...
}

/* list of menu */
const actions = [
  {title: 'Search', icon: icons.search, show: 'always'},
  {title: 'Refresh', icon: icons.refresh, show: 'ifRoom'},
  ...
];
...
```

#### Customize views
To customize views, update `Facebook.js` and `Google.js` based on your need, e.g.

```javascript
# lib/react-native-sso-authentication/Google.js

  ...
  render() {
    if (this.state.response) return this.renderResponse();
    if (this.state.token) return this.fetchProfile();
    if (this.state.code) return this.fetchToken();

    return this.renderScene();
  }

  renderScene() {
    return (
      <WebView
        url={`${google.oauth_dialog}?scope=email profile&redirect_uri=${google.redirect_uri}&response_type=code&client_id=${google.client_id}`}
        javaScriptEnabledAndroid={true}
        automaticallyAdjustContentInsets={false}
        scalesPageToFit={true}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }

  renderResponse() {
    let profile = JSON.parse(this.state.response);

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: profile.picture}} />
        <Text style={styles.welcome}>{profile.name}</Text>
        <TouchableHighlight
          style={[styles.button, (this.state.loading ? styles.buttonDisabled : styles.buttonActive)]}
          underlayColor={stylesheet.buttonDisabled.backgroundColor}
          onPress={() => this.onLogout()}>
          <Text style={styles.buttonText}>{this.state.loading ? `Please Wait . . .` : `Logout`}</Text>
        </TouchableHighlight>
      </View>
    );
  }
  ...
```
