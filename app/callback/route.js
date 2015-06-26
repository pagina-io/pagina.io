import Ember from 'ember';

export
default Ember.Route.extend({
  beforeModel: function(transition) {
    var params = transition.queryParams;
    if (!window.localStorage) {
      Ember.Logger.error('No window.localStorage available');
    }
    if (params.access_token) {
      var auth = {
        access_token: params.access_token
      };
      if (params.username) {
        auth.username = params.username;
        window.localStorage.auth = JSON.stringify(auth);
        return this.replaceWith('user', params.username);
      }
      window.localStorage.auth = JSON.stringify(auth);
      return this.replaceWith('index');
    }
  }
});
