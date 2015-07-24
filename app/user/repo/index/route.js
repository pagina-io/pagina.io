import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params, transition) {

    var user = this.modelFor('user');
    var repo = transition.params['user.repo'].repo;

    var repo = this.store.find('repo', {
      name: repo,
      userId: user.user_id
    }).then(function(repo) {
      return repo.get('firstObject');
    });

    return Ember.RSVP.hash({
      repo: repo,
      user: user
    });

  }

});

