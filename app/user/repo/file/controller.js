/* globals showdown, jsyaml */

import Ember from 'ember';

export
default Ember.Controller.extend({

  editing: false,
  saving: false,

  completeFile: function() {
    return this.get('model.content');
  }.property('model.content'),

  html: function() {
    if (Ember.isEmpty(this.get('completeFile'))) {
      return;
    }
    var html = this.get('completeFile').split('---')[2].trim();
    var converter = new showdown.Converter();
    return converter.makeHtml(html);
  }.property('completeFile'),

  yaml: function() {
    if (Ember.isEmpty(this.get('completeFile'))) {
      return;
    }
    var header = this.get('completeFile').split('---')[1].trim();
    return jsyaml.load(header);
  }.property('completeFile'),

  layout: function() {
    if (Ember.isEmpty(this.get('yaml'))) {
      return;
    }
    return this.get('yaml').layout;
  }.property('yaml'),

  title: function() {
    if (Ember.isEmpty(this.get('yaml'))) {
      return;
    }
    return this.get('yaml').title || 'Title is not found';
  }.property('yaml'),

  actions: {

    edit: function() {
      this.toggleProperty('editing');
    },

    cancel: function() {
      this.toggleProperty('editing');
    },

    save: function() {
      this.set('saving', true);
      this.get('model').save().then(function() {
        this.set('saving', false);
        this.toggleProperty('editing');
      }.bind(this), function() {
        this.set('saving', false);
      }.bind(this));
    }

  }

});
