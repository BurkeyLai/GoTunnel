/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.proto = require('./service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.BroadcastClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.BroadcastPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Connect,
 *   !proto.proto.Message>}
 */
const methodDescriptor_Broadcast_CreateStream = new grpc.web.MethodDescriptor(
  '/proto.Broadcast/CreateStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.Connect,
  proto.proto.Message,
  /**
   * @param {!proto.proto.Connect} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Message.deserializeBinary
);


/**
 * @param {!proto.proto.Connect} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.proto.BroadcastClient.prototype.createStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.Broadcast/CreateStream',
      request,
      metadata || {},
      methodDescriptor_Broadcast_CreateStream);
};


/**
 * @param {!proto.proto.Connect} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Message>}
 *     The XHR Node Readable Stream
 */
proto.proto.BroadcastPromiseClient.prototype.createStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.Broadcast/CreateStream',
      request,
      metadata || {},
      methodDescriptor_Broadcast_CreateStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Message,
 *   !proto.proto.Close>}
 */
const methodDescriptor_Broadcast_BroadcastMessage = new grpc.web.MethodDescriptor(
  '/proto.Broadcast/BroadcastMessage',
  grpc.web.MethodType.UNARY,
  proto.proto.Message,
  proto.proto.Close,
  /**
   * @param {!proto.proto.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Close.deserializeBinary
);


/**
 * @param {!proto.proto.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.proto.Close)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Close>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.BroadcastClient.prototype.broadcastMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.Broadcast/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_Broadcast_BroadcastMessage,
      callback);
};


/**
 * @param {!proto.proto.Message} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Close>}
 *     Promise that resolves to the response
 */
proto.proto.BroadcastPromiseClient.prototype.broadcastMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.Broadcast/BroadcastMessage',
      request,
      metadata || {},
      methodDescriptor_Broadcast_BroadcastMessage);
};


module.exports = proto.proto;

