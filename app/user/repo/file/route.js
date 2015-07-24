import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params, transition) {
    var repo = transition.params['user.repo'].repo;
    return this.store.find('repofile', {
      filename: params.filePath,
      repo_name: repo
    }).then(function(files) {
      if (Ember.isEmpty(files.get('firstObject.id'))) {
        return;
      }
      this.store.unloadRecord(files.get('firstObject'));
      return this.store.find('repofile', files.get('firstObject.id'));
    }.bind(this));
  }

});

