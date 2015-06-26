import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params) {
    return this.store.createRecord('repo', {
      name: params.repo,
      userId: 1
    }).save().then(function(repo) {
      return repo;
    });
  }

});
