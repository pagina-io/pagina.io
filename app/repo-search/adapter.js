import ApplicationAdapter from './../application/adapter';

export
default ApplicationAdapter.extend({
  pathForType: function() {
    return 'github/repos/search';
  },
});
