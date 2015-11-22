import Ember from 'ember';

export
default Ember.Route.extend({

  isNew: false,
  repo: null,

  model: function(params, transition) {

    this.set('repo', transition.params['user.repo'].repo);

    if (params.filePath === 'new') {
      this.set('isNew', true);
      return;
    }

    var repo = transition.params['user.repo'].repo;
    return this.store.queryRecord('repofile', {
      filename: params.filePath,
      repo_name: repo
    }).then(function(file) {
      if (Ember.isEmpty(file.get('id'))) {
        return;
      }
      this.store.unloadRecord(file);
      return this.store.findRecord('repofile', file.get('id'));
    }.bind(this));
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('isNew', this.get('isNew'));
    controller.set('repo', this.get('repo'));
  }

});
