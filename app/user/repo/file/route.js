import Ember from 'ember';
import ENV from 'jikkyll/config/environment';

export
default Ember.Route.extend({

  model: function(params, transition) {
    var env = ENV.default || ENV;
    var repo = transition.params['user.repo'].repo;
    var token = JSON.parse(window.localStorage.auth).access_token;
    var url = env.HOSTS.api + '/git/repos/' + transition.params['user'].username + '/' +
      transition.params['user.repo'].repo + '/contents/' + params.filePath + '?access_token=' + token;

    return Ember.$.ajax(url).then(function(data) {
      var result = data.result;
      this.store.pushPayload('file', {
        files: [{
          id: result.sha,
          content: window.atob(result.content)
        }]
      });
      return this.store.find('file', result.sha);
    }.bind(this));
  }

});

