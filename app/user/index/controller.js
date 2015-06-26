import Ember from 'ember';

export
default Ember.Controller.extend({

  isScanning: false,
  hasResults: false,
  repos: [],

  username: function() {
    return window.localStorage.username || false;
  }.property(),

  scan: function() {
    this.set('isScanning', true);
    this.store.find('scan').then(function(repos) {
      this.set('isScanning', false);
      this.set('repos', repos);
    }.bind(this), function() {
      this.set('isScanning', false);
    }.bind(this));
  }.on('init')

});
