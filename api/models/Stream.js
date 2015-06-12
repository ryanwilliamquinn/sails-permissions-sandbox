/**
 * Stream.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
      name: 'string',
      messages: {
        collection: 'message',
        via: 'stream'
      },
      subscribers: {
        collection: 'user',
        via: 'subscribedStreams',
        dominant: true
      }
  }
};
