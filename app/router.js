import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {
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
