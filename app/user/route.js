import Ember from 'ember';

export
default Ember.Route.extend({

  model: function() {
    if (!window.localStorage.auth) {
      return;
    }
    return JSON.parse(window.localStorage.auth);
  }
});

