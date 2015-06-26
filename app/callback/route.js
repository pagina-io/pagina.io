import Ember from 'ember';

export
default Ember.Route.extend({
  beforeModel: function(transition) {
    var params = transition.queryParams;
    if (!window.localStorage) {
      return Ember.Logger.error('No window.localStorage available');
    }
    if (params.access_token && params.username && params.user_id) {
      var auth = {
        access_token: params.access_token,
        username: params.username,
        user_id: params.user_id
      };
      window.localStorage.auth = JSON.stringify(auth);
      return this.replaceWith('user', params.username);
    }
  }
});
