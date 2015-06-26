import ENV from 'jikkyll/config/environment';
import ApplicationSerializer from './../application/serializer';

export
default ApplicationSerializer.extend({

  normalizePayload: function(payload) {

    var result = [];
    var obj;

    // Check if the payload.events is an Array
    if (Object.prototype.toString.call(payload.repos) !== '[object Array]') {
      return {
        'repos': result
      };
    }

    payload.repos.forEach(function(el, index) {
      el['id'] = index;
      result.push(el);
    });
    return {
      'repos': result
    };
  }

});
