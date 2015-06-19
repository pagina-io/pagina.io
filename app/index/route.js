import Ember from 'ember';

export
default Ember.Route.extend({

  actions: {
    logout: function() {
      delete window.localStorage.access_token;
      this.set('controller.isAuthenticated', false);
    }
  }

});
