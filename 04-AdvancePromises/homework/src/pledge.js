'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
const $Promise = function (executor) {
  if (typeof executor !== 'function') throw new TypeError('executor.+function');

  this._state = 'pending';
  this._handlerGroups = []

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === 'pending') {
    this._state = 'fulfilled'
    this._value = data
    this._callHandlers();
  }
}

$Promise.prototype._internalReject = function (data) {
  if (this._state === 'pending') {
    this._state = 'rejected'
    this._value = data
    this._callHandlers();
  }
}

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof (successCb) !== 'function') successCb = false
  if (typeof (errorCb) !== 'function') errorCb = false
  
  const downstreamPromise = new $Promise(() => { });
  this._handlerGroups.push({
    successCb,
    errorCb, 
    downstreamPromise
  })
  if (this._state !== 'pending') this._callHandlers();
  return downstreamPromise;

}

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let handlers = this._handlerGroups.shift();
    if (this._state === 'fulfilled') {
      if (!handlers.successCb) {
        handlers.downstreamPromise._internalResolve(this._value);
      } else {
        try {
          const result = handlers.successCb(this._value)
          if (result instanceof $Promise) {
            result.then( value => {
              handlers.downstreamPromise._internalResolve(value);
            }, error => {
              handlers.downstreamPromise._internalReject(error);
            })
          } else {
            handlers.downstreamPromise._internalResolve(result);
          }

        } catch (e) {
          handlers.downstreamPromise._internalReject(e);
        }
      }
    } else {
      if (!handlers.errorCb) {
        handlers.downstreamPromise._internalReject(this._value)
      } else {
        try {
          const result = handlers.errorCb(this._value);
          if (result instanceof $Promise) {
            result.then(value => {
              handlers.downstreamPromise._internalResolve(value)
            }, error => {
              handlers.downstreamPromise._internalReject(error);
            })
          } else {
            handlers.downstreamPromise._internalResolve(result);
          }
        } catch (e) {
           handlers.downstreamPromise._internalReject(e)
        }
      }
    }
    
    if (this._state === 'rejected') {
    }
  }
}

$Promise.prototype.catch = function (errorCb) {
  this.then(null, errorCb);
}

$Promise.prototype.resolve = function () {
  
}





module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
