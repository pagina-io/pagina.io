import Ember from 'ember';

export
default Ember.Controller.extend({

  isLoading: false,
  timeout: undefined,
  results: [],

  findResults: function() {
    let timeout = this.get('timeout');

    window.clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      const keyword = this.get('keyword');
      return this.store.query('repo-search', {
        repo_name: keyword
      }).then((repos) => {
        this.set('results', repos);
      })
    }, 200);

    this.set('timeout', timeout);

  }.observes('keyword'),

  username: function() {
    if (!window.localStorage.auth) {
      return false;
    }
    return JSON.parse(window.localStorage.auth).username || false;
  }.property(),

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
        this.transitionToRoute('user.repo', newRepo.get('name'));
      }.bind(this));
    }
  }

});
