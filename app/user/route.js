import Ember from 'ember';

export
default Ember.Route.extend({

  model: function() {
    return JSON.parse(window.localStorage.auth);
  }

});
