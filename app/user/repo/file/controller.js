import Ember from 'ember';

export
default Ember.Controller.extend({

  editing: false,

  html: function() {

    var converter = new showdown.Converter();
    return converter.makeHtml(this.get('model.content'));

  }.property('model.content'),

  actions: {

    edit: function() {
      this.toggleProperty('editing');
    },

    save: function() {
      this.toggleProperty('editing');
    }

  }

});
