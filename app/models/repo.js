import DS from 'ember-data';

export
default DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.attr('string'),
  userId: DS.attr('number'),
  repofiles: DS.hasMany('repofile', {
    embedded: 'always'
  })
});

