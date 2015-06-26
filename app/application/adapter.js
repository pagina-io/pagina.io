import ENV from 'jikkyll/config/environment';
import Ember from 'ember';
import DS from 'ember-data';

export
default DS.ActiveModelAdapter.reopen({

  coalesceFindRequests: true,

  headers: function() {
    var object = {
      'Access-Control-Allow-Credentials': true,
      'Accept': 'application/vnd.app+json'
    };
    if (window.localStorage && window.localStorage.access_token) {
      object.Authorization = 'Token ' + window.localStorage.access_token;
    }
    return object;
  }.property().volatile(),

  host: ENV.HOSTS.api,

  ajax: function(url, method, hash) {
    hash = hash || {}; // hash may be undefined
    hash.crossDomain = true;
    hash.xhrFields = {
      withCredentials: true
    };
    return this._super(url, method, hash);
  },

  ajaxError: function(jqXHR) {
    Ember.Logger.error('Ajax error, jqXHR:', JSON.stringify(jqXHR));
    return this._super(jqXHR);
  }

});
