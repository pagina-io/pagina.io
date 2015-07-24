import Ember from 'ember';

export
default Ember.Component.extend({

  classNames: ['ace-editor'],

  didInsertElement: function() {
    if (!window.ace) {
      return;
    }
    this.editor = window.ace.edit('editor');
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setValue(this.get('content'));
    this.editor.on('change', function() {
      this.set('content', this.editor.getValue());
    }.bind(this));

    Ember.$(window).keydown(function(e) {
      if (e.keyCode === 83 && e.metaKey) {
        e.preventDefault();
        return this.sendAction();
      }
    }.bind(this));

  }
});

