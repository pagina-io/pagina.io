import ENV from 'pagina/config/environment';
import ActiveModelAdapter from 'active-model-adapter';

export
default ActiveModelAdapter.reopen({

  coalesceFindRequests: true,

  headers: function() {
    var object = {
      // 'Access-Control-Allow-Credentials': true,
      'Accept': 'application/vnd.app+json'
    };
    if (window.localStorage && window.localStorage.access_token) {
      // object.Authorization = 'Token ' + window.localStorage.access_token;
    }
    return object;
  }.property().volatile(),

  host: ENV.HOSTS.api,

  ajax: function(url, method, hash) {
    hash = hash || {}; // hash may be undefined
    hash.crossDomain = true;
    // hash.xhrFields = {
    //   withCredentials: true
    // };
    if (window.localStorage && window.localStorage.auth) {
      var accessToken = JSON.parse(window.localStorage.auth).access_token;
      if (!hash.data) {
        hash.data = {
          access_token: accessToken
        };
      } else {
        hash.data.access_token = accessToken;
      }
    }
    return this._super(url, method, hash);
  }

});
