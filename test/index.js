/* globals describe, before, beforeEach, afterEach, after, it */

'use strict';

var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var attachable = require('../index.js');

describe('attachable tests', function () {

  it('attachable should have attachTo, detachFrom, getAttached', function () {
    var obj1 = {};
    attachable(obj1);

    obj1.should.have.property('attachTo');
    obj1.attachTo.should.be.function;

    obj1.should.have.property('detachFrom');
    obj1.detachFrom.should.be.function;

    obj1.should.have.property('getAttached');
    obj1.getAttached.should.be.function;
    obj1.getAttached().should.be.instanceof(Array);

    obj1.should.have.property('isAttachedTo');
    obj1.isAttachedTo.should.be.function;

    obj1.should.have.property('hasAttached');
    obj1.hasAttached.should.be.function;

  });

  it('attachable should be able to attach and detach to itself', function () {
    var obj1 = {};
    attachable(obj1);

    obj1.isAttachedTo(obj1).should.be.false;
    obj1.getAttached().should.have.length(0);
    obj1.hasAttached().should.be.false;

    obj1.attachTo(obj1).should.be.true;

    obj1.isAttachedTo(obj1).should.be.true;
    obj1.getAttached().should.have.length(1);
    obj1.hasAttached().should.be.true;


    obj1.detachFrom(obj1).should.be.true;

    obj1.isAttachedTo(obj1).should.be.false;
    obj1.getAttached().should.have.length(0);
    obj1.hasAttached().should.be.false;
  });

  it('attachable should be able to attach and detach another object', function () {
    var obj1 = {};
    attachable(obj1);
    var obj2 = {};
    attachable(obj2);

    obj1.isAttachedTo(obj2).should.be.false;
    obj2.isAttachedTo(obj1).should.be.false;
    obj1.getAttached().should.have.length(0);
    obj2.getAttached().should.have.length(0);
    obj1.hasAttached().should.be.false;
    obj2.hasAttached().should.be.false;

    obj1.attachTo(obj2).should.be.true;

    obj1.isAttachedTo(obj2).should.be.true;
    obj2.isAttachedTo(obj1).should.be.true;
    obj1.getAttached().should.have.length(1);
    obj2.getAttached().should.have.length(1);
    obj1.hasAttached().should.be.true;
    obj2.hasAttached().should.be.true;

    obj2.detachFrom(obj1).should.be.true;

    obj1.isAttachedTo(obj2).should.be.false;
    obj2.isAttachedTo(obj1).should.be.false;
    obj1.getAttached().should.have.length(0);
    obj2.getAttached().should.have.length(0);
    obj1.hasAttached().should.be.false;
    obj2.hasAttached().should.be.false;
  });

  it('attachable should be able to detachAll', function () {
    var obj1 = {};
    attachable(obj1);
    var obj2 = {};
    attachable(obj2);
    var obj3 = {};
    attachable(obj3);

    obj1.attachTo(obj3).should.be.true;   // in reverse order to `cover` more
    obj1.attachTo(obj2).should.be.true;

    obj1.isAttachedTo(obj2).should.be.true;
    obj1.isAttachedTo(obj3).should.be.true;

    obj1.detachAll().should.be.true;

    obj1.isAttachedTo(obj2).should.be.false;
    obj1.isAttachedTo(obj3).should.be.false;
    obj2.isAttachedTo(obj1).should.be.false;
    obj3.isAttachedTo(obj1).should.be.false;
  });

  it('attachable should warn when detachFrom not attached object', function () {
    var obj1 = {};
    attachable(obj1);

    var obj2 = {};
    attachable(obj2);

    obj1.isAttachedTo(null).should.be.false;
    obj1.isAttachedTo(obj2).should.be.false;

    obj1.detachFrom(null).should.be.false;
    obj1.detachFrom(obj2).should.be.false;
  });

});
