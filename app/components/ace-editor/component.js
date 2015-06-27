import Ember from 'ember';

export
default Ember.Component.extend({

  classNames: ['ace-editor'],

  didInsertElement: function() {
    this.editor = window.ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    // this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.getSession().setValue(this.get('content'));
    this.editor.on('change', function() {
      this.set('content', this.editor.getValue());
    }.bind(this));
  }
});
