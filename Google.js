'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
  ToastAndroid
} from 'react-native';

import api, {
  google
} from './Server';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: undefined,
      token: undefined,
      response: undefined
    };
  }

  render() {
    if (this.state.response) return this.renderResponse();
    if (this.state.token) return this.fetchProfile();
    if (this.state.code) return this.fetchToken();

    return this.renderScene();
  }

  renderScene() {
    return (
      <View style={{flex:1}}>
        <WebView
          url={([google.oauth_dialog,'?scope=email profile&redirect_uri=',google.redirect_uri,'&response_type=code&client_id=',google.client_id]).join('')}
          javaScriptEnabledAndroid={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }

  fetchToken() {
    if (this.state.token) return null;

    api.google.token(this.state.code)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        if (responseData && responseData.access_token) {
          this.setState({
            token: responseData.access_token
          });
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.LONG);
      })
      .done();

    return null;
  }

  fetchProfile() {
    if (this.state.response) return null;

    api.google.profile(this.state.token)
      .then((response) => {
        console.log(response);
        if (!response.ok) throw Error(response.statusText || response._bodyText);
        return response.json()
      })
      .then((responseData) => {
        this.setState({
          response: JSON.stringify(responseData)
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.LONG);
      })
      .done();

    return null;
  }

  renderResponse() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{this.state.response}</Text>
      </View>
    );
  }

  onNavigationStateChange(navState) {
    if ((/code=/g).test(String(navState.url))) {
      this.setState({
        code: String(navState.url).replace(([google.redirect_uri,'?code=']).join(''),'')
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
