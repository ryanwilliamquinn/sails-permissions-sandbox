/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    /*
  connection: ['rabbitCluster', 'pgdev'],
  routingKey: ['stream'],
  */
  attributes: {
    text: 'string',
    author: {
      model: 'user'
    },
    stream: {
      model: 'stream',
    }
  }
};
