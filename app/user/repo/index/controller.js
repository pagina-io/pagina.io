import Ember from 'ember';

export
default Ember.Controller.extend({

  showAllFiles: false,

  blogFiles: function() {
    return this.get('model.repo.repofiles').filter(function(file) {
      return file.get('filename').substring(0, 7) === '_posts/';
    });
  }.property('@each.model.repo.repofiles'),

  actions: {
    toggleAllFiles: function() {
      this.toggleProperty('showAllFiles');
    }
  }

});

