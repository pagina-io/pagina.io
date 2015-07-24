import Ember from 'ember';

export
default Ember.Route.extend({

  isNew: false,

  model: function(params, transition) {

    if (params.filePath === 'new') {
      this.set('isNew', true);
      return;
    }

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
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('isNew', this.get('isNew'));
  }

});

