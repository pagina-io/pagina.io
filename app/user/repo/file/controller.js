/* globals showdown, jsyaml */

import Ember from 'ember';

export
default Ember.Controller.extend({

  editing: false,

  html: function() {
    var converter = new showdown.Converter();
    return converter.makeHtml(this.get('model.content'));
  }.property('model.content'),

  yaml: function() {
    var header = this.get('model.content').split('---')[1].trim();
    return jsyaml.load(header);
  }.property('model.content'),

  layout: function() {
    return this.get('yaml').layout;
  }.property('yaml'),

  title: function() {
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
      this.toggleProperty('editing');
    }

  }

});
