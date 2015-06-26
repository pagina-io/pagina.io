import Ember from 'ember';

export
default Ember.Route.extend({
  beforeModel: function(transition) {
    var params = transition.queryParams;
    if (!window.localStorage) {
      Ember.Logger.error('No window.localStorage available');
    }
    if (params.access_token) {
      window.localStorage.access_token = params.access_token;
      if (params.username) {
        window.localStorage.username = params.username;
        return this.replaceWith('user', params.username);
      }
      return this.replaceWith('index');
    }
  }
});
