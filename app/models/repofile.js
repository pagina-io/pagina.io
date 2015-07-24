import DS from 'ember-data';

export
default DS.Model.extend({
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  filename: DS.attr('string'),
  content: DS.attr('string'),
  repo: DS.belongsTo('repo'),
  title: function() {
    if (this.get('filename').split('/')[0] !== '_posts') {
      return;
    }
    var filename = this.get('filename').split('/')[1];
    var parts = filename.split('-');
    var date = [parts[0], parts[1], parts[2]].join('-');
    delete(parts[0]);
    delete(parts[1]);
    delete(parts[2]);
    var title = parts.join(' ').trim();
    var noExtension = title.replace(/\.[^/.]+$/, '');
    var capital = noExtension.charAt(0).toUpperCase() + noExtension.slice(1);
    return capital + ' (' + date + ')';
  }.property('filename')
});

