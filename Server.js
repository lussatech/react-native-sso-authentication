'use strict';

export const facebook = {
      client_id: '1505435769762540',
  client_secret: '210bdcf50efa27bc5bfc93b81a8b903d',
   oauth_dialog: 'https://www.facebook.com/dialog/oauth',
   redirect_uri: 'https://www.facebook.com/connect/login_success.html',
    oauth_token: 'https://graph.facebook.com/v2.3/oauth/access_token',
   oauth_access: 'https://graph.facebook.com/oauth/access_token',
  oauth_profile: 'https://graph.facebook.com/v2.5/me',
};

export const google = {
      client_id: '119869562795-rtsscilu9cb895r35dkokrvi6no9hvcd.apps.googleusercontent.com',
  client_secret: '87bg-4ElD3iUHI9kwR_Z1w2v',
   oauth_dialog: 'https://accounts.google.com/o/oauth2/v2/auth',
   redirect_uri: 'https://www.facebook.com/connect/login_success.html',
    oauth_token: 'https://www.googleapis.com/oauth2/v4/token',
  oauth_profile: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

export default {
  facebook: {
    token: function (data) {
      let url = ([facebook.oauth_token,'?client_id=',facebook.client_id,'&client_secret=',facebook.client_secret,'&redirect_uri=',facebook.redirect_uri,'&code=',data]).join(''),
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    access: function (data) {
      let url = ([facebook.oauth_access,'?grant_type=fb_exchange_token&client_id=',facebook.client_id,'&client_secret=',facebook.client_secret,'&fb_exchange_token=',data]).join(''),
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    profile: function (data) {
      let url = ([facebook.oauth_profile,'?fields=id,name,email,about,age_range,picture&access_token=',data]).join(''),
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    }
  },
  google: {
    token: function (data) {
      let url = ([google.oauth_token,'?grant_type=authorization_code&client_id=',google.client_id,'&client_secret=',google.client_secret,'&redirect_uri=',google.redirect_uri,'&code=',data]).join(''),
          opt = {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

      return fetch(url, opt);
    },
    profile: function (data) {
      let url = ([google.oauth_profile,'?alt=json&access_token=',data]).join(''),
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    }
  }
};
