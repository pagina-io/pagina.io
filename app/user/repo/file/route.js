import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params, transition) {

    var repo = transition.params['user.repo'].repo;

    return this.store.find('repofile', {
      filename: params.filePath,
      repo_name: repo
    });
  }

});
