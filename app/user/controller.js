import Ember from 'ember';

export
default Ember.Controller.extend({

  isScanning: false,
  hasResults: false,
  repos: [],

  scan: function() {
    this.set('isScanning', true);
    this.store.find('repo').then(function(repos) {
      this.set('isScanning', false);
      this.set('repos', repos);
    }.bind(this), function() {
      this.set('isScanning', false);
    }.bind(this));
  }.on('init')

});
