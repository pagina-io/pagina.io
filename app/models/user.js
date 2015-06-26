import DS from 'ember-data';

export
default DS.Model.extend({
  repos: DS.hasMany('repo', {
    async: true
  })
});
