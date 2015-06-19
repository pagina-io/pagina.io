import Ember from 'ember';

export
default Ember.Route.extend({
  beforeModel: function(transition) {
    var params = transition.queryParams;
    if (!window.localStorage) {
      Ember.Logger.error('No window.localStorage available');
    }
    if (params.status === 'success' && params.access_token) {
      window.localStorage.access_token = params.access_token;
      return this.replaceWith('index');
    }
  }
});
