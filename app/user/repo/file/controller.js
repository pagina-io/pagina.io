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
    var splitter = this.get('completeFile').split('---');
    var html;
    if (splitter.length < 3) {
      html = this.get('completeFile');
    }
    else {
      html = splitter[2].trim();
    }
    var converter = new showdown.Converter();
    return converter.makeHtml(html);
  }.property('completeFile'),

  body: function() {
    if (Ember.isEmpty(this.get('completeFile'))) {
      return;
    }
    var splitter = this.get('completeFile').split('---');
    if (splitter.length < 3) {
      return this.get('completeFile');
    }
    return splitter[2].trim();
  }.property('completeFile'),

  yaml: function() {
    if (Ember.isEmpty(this.get('completeFile'))) {
      return;
    }
    var splitter = this.get('completeFile').split('---');
    if (splitter.length < 3) {
      return;
    }
    var header = splitter[1].trim();
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
    return this.get('yaml').title || '[Untitled]';
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
      var yaml = "---\n" + jsyaml.dump(this.get('yaml')) + "---\n";
      var totalFile = yaml + "\n" + this.get('body');
      this.set('model.content', totalFile);
      this.get('model').save().then(function() {
        this.set('saving', false);
        this.toggleProperty('editing');
      }.bind(this), function() {
        this.set('saving', false);
      }.bind(this));
    }

  }

});

