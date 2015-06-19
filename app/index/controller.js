import Ember from 'ember';
import ENV from 'jikkyll/config/environment';

export
default Ember.Controller.extend({

  isAuthenticated: function() {
    return !!window.localStorage.access_token;
  }.property(),

  githubUrl: function() {
    return ENV.HOSTS.api + '/auth/github';
  }.property()

});
