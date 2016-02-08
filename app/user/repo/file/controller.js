/* globals showdown, jsyaml */
/* exported dasherize, decamelize */

import Ember from 'ember';
import moment from 'moment';
import markdown from 'npm:markdown';
import toMarkdown from 'npm:to-markdown';

const Markdown = markdown.markdown;

var dasherize = Ember.String.dasherize;
var decamelize = Ember.String.decamelize;

export
default Ember.Controller.extend({

  editing: false,
  saving: false,

  runOnInit: function() {
    // console.log(Markdown);
    // Use double markdown here because ember-browserify does not support names imports
    const html = Markdown.toHTML(
      `Hello.\n\n* This is *markdown*.
* It is fun
* <em>Love</em> it or leave it.

<script type="text/javascript">alert('tada');</script>`);
    console.log(toMarkdown(html, { gfm: true }));
  }.on('init'),

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
    } else {
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

    saveNew: function() {
      this.set('saving', true);
      var yaml = "---\n" + jsyaml.dump({
        title: this.get('title')
      }) + "---\n";
      var body = this.get('body') || '';
      var totalFile = yaml + "\n" + body;
      var filename = moment().format("YYYY-MM-DD") + '-' + this.get('title');
      filename = filename.replace(/[^a-zA-Z0-9- ]/gi, '').decamelize().dasherize() + '.md';
      filename = '_posts/' + filename;

      var userId = JSON.parse(window.localStorage.auth).user_id;

      this.store.queryRecord('repo', {
        name: this.get('repo'),
        userId: userId
      }).then(function(repo) {
        this.store.createRecord('repofile', {
          content: totalFile,
          filename: filename,
          repo: repo
        }).save().then(function() {
          this.set('saving', false);
          this.transitionTo('user.repo.file', filename);
        }.bind(this));
      }.bind(this));
    },

    save: function() {
      var yaml;
      if (this.get('yaml')) {
        yaml = "---\n" + jsyaml.dump(this.get('yaml')) + "---\n";
      } else {
        yaml = "---\n---\n";
      }
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
