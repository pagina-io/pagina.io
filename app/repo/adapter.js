import ENV from 'jikkyll/config/environment';
import ApplicationAdapter from './../application/adapter';

export
default ApplicationAdapter.extend({
  pathForType: function(type) {
    return 'users/current/scanrepos';
  },
});
