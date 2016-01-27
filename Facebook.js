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
  facebook
} from './Server';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: undefined,
      token: undefined,
      access: undefined,
      response: undefined
    };
  }

  render() {
    if (this.state.response) return this.renderResponse();
    if (this.state.access) return this.renderAccess();
    if (this.state.token) return this.renderToken();
    if (this.state.code) return this.renderCode();

    return this.renderScene();
  }

  renderScene() {
    return (
      <View style={{flex:1}}>
        <WebView
          url={([facebook.oauth_dialog,'?client_id=',facebook.client_id,'&redirect_uri=',facebook.redirect_uri]).join('')}
          javaScriptEnabledAndroid={true}
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }

  renderCode() {
    if (this.state.token) return null;

    api.facebook.code(this.state.code)
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

  renderToken() {
    if (this.state.access) return null;

    api.facebook.token(this.state.token)
      .then((response) => {
        if ((/access_token=/g).test(response._bodyText)) {
          this.setState({
            access: String(response._bodyText.split('&')[0]).replace('access_token=','')
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

  renderAccess() {
    if (this.state.response) return null;

    api.facebook.profile(this.state.access)
      .then((response) => {
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
        code: String(navState.url).replace(([facebook.redirect_uri,'?code=']).join(''),'')
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
