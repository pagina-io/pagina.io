import Ember from 'ember';

export
default Ember.Controller.extend({

  isScanning: false,
  isLoading: false,
  hasResults: false,
  repos: [],
  error: null,

  results: function() {
    var searchTerm = this.get('keyword');
    var regExp = new RegExp(searchTerm, 'i');
    var filteredResults = this.get('repos').filter(function(repos) {
      return regExp.test(repos.get('owner') + '/' + repos.get('name'));
    });
    return filteredResults;
  }.property('@each.repos', 'keyword'),

  username: function() {
    if (!window.localStorage.auth) {
      return false;
    }
    return JSON.parse(window.localStorage.auth).username || false;
  }.property(),

  scan: function() {
    this.set('isScanning', true);
    this.store.find('scan').then(function(repos) {
      this.set('isScanning', false);
      this.set('repos', repos);
    }.bind(this), function() {
      this.set('isScanning', false);
    }.bind(this), function(error) {
      this.set('isScanning', false);
      if (error.message) {
        this.set('error', error.message);
      }
    }.bind(this));
  }.on('init'),

  actions: {

    createRepo: function(repo) {
      this.set('isLoading', true);
      var user = this.get('model');
      this.store.createRecord('repo', {
        owner: repo.get('owner'),
        name: repo.get('name'),
        userId: user.user_id
      }).save().then(function(newRepo) {
        this.set('isLoading', false);
        this.transitionTo('user.repo', newRepo.get('name'));
      }.bind(this));
    }

  }

});
