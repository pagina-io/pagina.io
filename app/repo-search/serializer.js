import ApplicationSerializer from './../application/serializer';
import DS from 'ember-data';

export
default DS.JSONAPISerializer.extend({

  normalizeQueryResponse: function(store, primaryModelClass, payload, id, requestType) {
    let repos = payload.repos;
    let newPayload = {
      data: []
    };

    for (var i = repos.length - 1; i >= 0; i--) {
      let object = {};
      object.id = repos[i].id;
      object.type = 'repo-search';
      object.attributes = repos[i];
      delete object.attributes.id;
      newPayload.data.push(object)
    };

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

});
