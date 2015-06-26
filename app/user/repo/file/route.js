import Ember from 'ember';

export
default Ember.Route.extend({

  model: function(params, transition) {


    return this.store.find('repofile', {
      filename: params.filePath,
    });
  }

});
