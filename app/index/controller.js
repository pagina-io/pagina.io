import Ember from 'ember';
import ENV from 'pagina/config/environment';

export
default Ember.Controller.extend({

  username: function() {
    if (!window.localStorage.auth) {
      return false;
    }
    return JSON.parse(window.localStorage.auth).username || false;
  }.property(),

  isAuthenticated: function() {
    return !!window.localStorage.access_token;
  }.property(),

  githubUrl: function() {
    return ENV.HOSTS.api + '/auth/github';
  }.property()

});
