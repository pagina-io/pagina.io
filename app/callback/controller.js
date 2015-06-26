import Ember from 'ember';

export
default Ember.Controller.extend({

  hasLocalStorage: function() {
    return !!window.localStorage;
  }.property()

});
