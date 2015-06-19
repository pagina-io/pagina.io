import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('repository', {
    path: '/:username/:repository'
  }, function() {
    this.route('file', {
      path: '/:file'
    }, function() {
      this.route('add', {
        path: '/add'
      });
      this.route('edit', {
        path: '/edit'
      });
    });
  });

  this.route('repository', function() {
    this.route('file');
  });
  this.route('callback');
});

export
default Router;
