/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pagina',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    HOSTS: {
      // We will put our host urls here
    }
  };

  if (environment === 'development') {
    ENV.HOSTS.api = 'https://api.pagina.io';
  }

  if (environment === 'acceptance') {
    ENV.HOSTS.api = 'https://api.pagina.io';
  }

  if (environment === 'production') {
    ENV.HOSTS.api = 'https://api.pagina.io';
  }

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self' https://netdna.bootstrapcdn.com",
    'connect-src': "'self' " + ENV.HOSTS.api,
    'img-src': "'self' https://assets.pagina.io",
    'style-src': "'self'",
    'media-src': "'self'"
  }

  return ENV;
};
