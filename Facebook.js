'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
  ToastAndroid,
  AsyncStorage,
  Image,
  TouchableHighlight
} from 'react-native';

import api, {key, facebook} from './Server';
import stylesheet from './Style';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
          code: undefined,
         token: undefined,
        access: undefined,
      response: undefined,
       loading: false,
    };
  }

  render() {
    if (this.state.response) return this.renderResponse();
    if (this.state.access) return this.fetchProfile();
    if (this.state.token) return this.fetchAccess();
    if (this.state.code) return this.fetchToken();

    return this.renderScene();
  }

  renderScene() {
    return (
      <WebView
        url={`${facebook.oauth_dialog}?client_id=${facebook.client_id}&redirect_uri=${facebook.redirect_uri}`}
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
        <Image style={styles.image} source={{uri: profile.picture.data.url}} />
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

  fetchToken() {
    if (this.state.token) return null;

    api.facebook.token(this.state.code)
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
        this.onError(error);
      })
      .done();

    return null;
  }

  fetchAccess() {
    if (this.state.access) return null;

    api.facebook.access(this.state.token)
      .then((response) => {
        if ((/access_token=/g).test(response._bodyText)) {
          this.setState({
            access: String(response._bodyText.split('&')[0]).replace('access_token=','')
          });
        }
      })
      .catch((error) => {
        this.onError(error);
      })
      .done();

    return null;
  }

  fetchProfile() {
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
        this.saveResponse().done();
      })
      .catch((error) => {
        this.onError(error);
      })
      .done();

    return null;
  }

  onNavigationStateChange(navState) {
    if ((/code=/g).test(String(navState.url))) {
      this.setState({
        code: String(navState.url).replace(`${facebook.redirect_uri}?code=`,'')
      });
    }
  }

  onLogout() {
    if (this.state.loading) {
      ToastAndroid.show(`Please Wait . . .`, ToastAndroid.SHORT);
      return null;
    }

    this.setState({loading: true});

    api.facebook.logout(this.state.access)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText || response._bodyText);

        this.setState({
              code: undefined,
             token: undefined,
            access: undefined,
          response: undefined
        });

        this.removeResponse().done();
      })
      .catch((error) => {
        this.onError(error);
      })
      .done(() => {
        this.setState({loading: false});
      });

    return null;
  }

  onError(argument) {
    console.log(argument);
    ToastAndroid.show(String(argument).replace('Error: ',''), ToastAndroid.LONG);
  }

  async saveResponse() {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(this.state.response));
    } catch (error) {
      this.onError(error);
    }
  }

  async removeResponse() {
    try {
      await AsyncStorage.removeItem(key);
      ToastAndroid.show(`Logout successfully!`, ToastAndroid.SHORT);
    } catch (error) {
      this.onError(error);
    }
  }
}

const styles = StyleSheet.create(stylesheet);
