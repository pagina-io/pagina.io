import Ember from 'ember';

export
default Ember.Controller.extend({

  editing: false,

  actions: {

    edit: function() {
      this.toggleProperty('editing');
    },

    save: function() {
      this.toggleProperty('editing');
    }

  }

});
