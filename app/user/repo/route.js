import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params) {

    var user = this.modelFor('user');

    return this.store.createRecord('repo', {
      name: params.repo,
      userId: user.user_id
    }).save().then(function(repo) {
      return repo;
    });
  }

});
