import DS from 'ember-data';

export
default DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  filename: DS.attr('string'),
  repo: DS.belongsTo('repo')
});
