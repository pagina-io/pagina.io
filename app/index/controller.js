import Ember from 'ember';
import ENV from 'jikkyll/config/environment';

export
default Ember.Controller.extend({

  username: function() {
    return JSON.parse(window.localStorage.auth).username || false;
  }.property(),

  isAuthenticated: function() {
    return !!window.localStorage.access_token;
  }.property(),

  githubUrl: function() {
    return ENV.HOSTS.api + '/auth/github';
  }.property()

});
