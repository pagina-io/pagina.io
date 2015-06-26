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
    });
  });

  // this.resource('repository', {
  //   path: '/:username'
  // }, function() {
  //   this.route('file', {
  //     path: '/:file'
  //   }, function() {
  //     this.route('add', {
  //       path: '/add'
  //     });
  //     this.route('edit', {
  //       path: '/edit'
  //     });
  //   });
  // });

  // this.route('repository', function() {
  //   this.route('file');
  // });
  this.route('callback');
  this.route('user');
});

export
default Router;
