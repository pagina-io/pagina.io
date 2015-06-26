import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('user', {
    path: '/:username'
  }, function() {
    this.route('repo', {
      path: '/:repo'
    }, function() {
      this.route('file', {
        path: '/*filePath'
      });
    });
  });
  this.route('callback');
});

export
default Router;
