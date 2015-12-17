/**
 * Created by alykoshin on 17.02.15.
 */

'use strict';

if ( typeof module !== 'undefined' && typeof require !== 'undefined') {
  var debug = require('mini-debug');
  //var emitter = require('mini-emitter');
}

//var
// SingleAttachable = function(that) {
//
//  that.attached = null;
//
//  that.attachTo = function(attachable) {
//    that.attached = attachable;
//    attachable.attachingTo(that);
//  };
//
//  that.detachFrom = function(attachable) {
//    if (attachable !== that.attached) {
//      throw 'SingleAttachable.detachFrom: attachable !== attached';
//    }
//    attachable.detachingFrom(that);
//    that.attached = null;
//  };
//
//  return that;
//};

/**
 *
 * @class Attachable
 * @param {object} self
 * @returns {object}
 * @constructor
 */
var Attachable = function(self) {
  //if (!self.emit) {
  //  emitter(self);
  //}

  // Private properties

  // Array of object to which this MultiAttachable is Attached
  var attachedTo = [];


  // Protected properties

  /**
   * name attachingTo
   * memberOf Attachable
   * @param {Attachable} attachable
   */
  self._attachingTo = function( attachable ) {
    //debug.debug('Attachable.attachingTo(', attachable, ')');
    attachedTo.push(attachable);
    return true;
  };

  self._detachingFrom = function( attachable ) {
    //debug.debug('Attachable.detachingFrom(', attachable, ')');
    for (var i = attachedTo.length-1; i >= 0; i--) {
      if (attachedTo[i] === attachable) {
        attachedTo.splice(i, i+1);
        return true;
      }
    }
    debug.error('Attachable.detachingFrom(): Unable to detachFrom(): object not attached');
    return false;
  };

  // Public methods

  self.attachTo = function(attachable) {
    //debug.debug('Attachable.attachTo(', attachable, ')');
    var res = self._attachingTo(attachable);
    if (self !== attachable) {
      res = res && attachable._attachingTo(self);
    }
    return res;
  };

  self.detachFrom = function(attachable) {
    //debug.debug('Attachable.detachFrom(', attachable, ')');
    var res = self._detachingFrom(attachable);
    if (self !== attachable) {
      res = res && attachable._detachingFrom(self);
    }
    return res;
  };

  self.detachAll = function() {
    debug.debug('Attachable.detachAll()');
    var res = true;
    for (var i = attachedTo.length-1; i >= 0; i--) {
      res = res && self.detachFrom( attachedTo[i] ); // Attachable.detach() will call self.detachingFrom()
    }
    return res;
  };

  self.hasAttached = function () {
    //debug.debug('Attachable.isAttached()');
    return ( attachedTo.length > 0 );
  };

  self.isAttachedTo = function (attachable) {
    //debug.debug('Attachable.isAttached(', attachable, ')');
    for (var i = attachedTo.length-1; i >= 0; i--) {
      if (attachedTo[i] === attachable) {
        return true;
      }
    }
    return false;
  };

  self.getAttached = function() {
    return attachedTo;
  };

  return self;
};

//

if (typeof module !== 'undefined') {
  module.exports = Attachable;
}

if (typeof window !== 'undefined') {
  window.Attachable = Attachable;
}
