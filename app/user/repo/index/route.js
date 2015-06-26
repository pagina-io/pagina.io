import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params, transition) {

    var user = this.modelFor('user');
    var repo = transition.params['user.repo'].repo;

    return this.store.createRecord('repo', {
      name: repo,
      userId: user.user_id
    }).save().then(function(repo) {
      return repo;
    });
  }

});
