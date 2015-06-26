import DS from 'ember-data';

export
default DS.Model.extend({
  name: DS.attr('string'),
  repos: DS.hasMany('repo', {
    async: true
  })
});
