import Ember from 'ember';

export
default Ember.Route.extend({

  model: function() {},

  actions: {

    createRepo: function(repo) {
      var user = this.modelFor('user');

      this.store.createRecord('repo', {
        name: repo.get('name'),
        userId: user.user_id
      }).save().then(function(newRepo) {
        this.transitionTo('user.reop', newRepo.get('name'));
      }.bind(this));
    }

  }

});

