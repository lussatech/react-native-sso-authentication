'use strict';

export const key = '@lussatech:session';

export const facebook = {
      client_id: '1505435769762540',
  client_secret: '210bdcf50efa27bc5bfc93b81a8b903d',
   oauth_dialog: 'https://www.facebook.com/dialog/oauth',
   redirect_uri: 'https://www.facebook.com/connect/login_success.html',
    oauth_token: 'https://graph.facebook.com/v2.3/oauth/access_token',
   oauth_access: 'https://graph.facebook.com/oauth/access_token',
  oauth_profile: 'https://graph.facebook.com/v2.5/me',
   oauth_logout: 'https://www.facebook.com/logout.php',
};

export const google = {
      client_id: '119869562795-rtsscilu9cb895r35dkokrvi6no9hvcd.apps.googleusercontent.com',
  client_secret: '87bg-4ElD3iUHI9kwR_Z1w2v',
   oauth_dialog: 'https://accounts.google.com/o/oauth2/v2/auth',
   redirect_uri: 'https://www.facebook.com/connect/login_success.html',
    oauth_token: 'https://www.googleapis.com/oauth2/v4/token',
  oauth_profile: 'https://www.googleapis.com/oauth2/v3/userinfo',
   oauth_logout: 'https://accounts.google.com/o/oauth2/revoke',
};

export default {
  facebook: {
    token: function (code) {
      let url = `${facebook.oauth_token}?client_id=${facebook.client_id}&client_secret=${facebook.client_secret}&redirect_uri=${facebook.redirect_uri}&code=${code}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    access: function (token) {
      let url = `${facebook.oauth_access}?grant_type=fb_exchange_token&client_id=${facebook.client_id}&client_secret=${facebook.client_secret}&fb_exchange_token=${token}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    profile: function (access) {
      let url = `${facebook.oauth_profile}?fields=id,name,email,about,age_range,picture&access_token=${access}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    logout: function (access) {
      let url = `${facebook.oauth_logout}?next=${facebook.redirect_uri}&access_token=${access}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
  },
  google: {
    token: function (code) {
      let url = `${google.oauth_token}?grant_type=authorization_code&client_id=${google.client_id}&client_secret=${google.client_secret}&redirect_uri=${google.redirect_uri}&code=${code}`,
          opt = {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

      return fetch(url, opt);
    },
    profile: function (token) {
      let url = `${google.oauth_profile}?alt=json&access_token=${token}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    logout: function (token) {
      let url = `${google.oauth_logout}?token=${token}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
  }
};
