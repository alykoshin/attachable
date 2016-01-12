[![npm version](https://badge.fury.io/js/attachable.svg)](http://badge.fury.io/js/attachable)
[![Build Status](https://travis-ci.org/alykoshin/attachable.svg)](https://travis-ci.org/alykoshin/attachable)
[![Coverage Status](https://coveralls.io/repos/alykoshin/attachable/badge.svg?branch=master&service=github)](https://coveralls.io/github/alykoshin/attachable?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/attachable/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/attachable)
[![Inch CI](https://inch-ci.org/github/alykoshin/attachable.svg?branch=master)](https://inch-ci.org/github/alykoshin/attachable)

[![Dependency Status](https://david-dm.org/alykoshin/attachable/status.svg)](https://david-dm.org/alykoshin/attachable#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/attachable/dev-status.svg)](https://david-dm.org/alykoshin/attachable#info=devDependencies)


# attachable

Simple object to bidirectionally track its attachments (links,connections) to other `attachable` objects

You can 
```
obj1.attachTo(obj2)
```
And later
```
console.log( obj2.isAttachedTo(obj1) );
// true
```

If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/attachable/issues).


## Installation

```sh
npm install --save attachable
```

## Usage

```
// var attachable=require('attachable');
var attachable=require('./index.js');
var obj1={}; attachable(obj1);
var obj2={}; attachable(obj2);

obj1.attachTo(obj2);

obj2.isAttachedTo(obj1);
// true
obj1.isAttachedTo(obj2);
// true

obj2.detachFrom(obj1)
obj2.isAttachedTo(obj1);
// false
obj1.isAttachedTo(obj2);
// false

```

## Methods

```
attachTo(attachable)
```
Attach to specific `attachable` object (and also attach that object to this one)

```
detachFrom(attachable)
```
Detach from specific `attachable` object (and also attach that object from this one)

```
detachAll() 
```
Detach object from all currently attached `attachable` objects

```
boolean hasAttached()
```
Allows to check if this object has other `attachable` objects attached to it (it is attached to some other `attachable` objects) 

```
boolean isAttachedTo(attachable)
```
Allows to check if the object attached to another `attachable` object


## Credits
[Alexander](https://github.com/alykoshin/)


## Links to package pages:

[github.com](https://github.com/alykoshin/attachable) &nbsp; [npmjs.com](https://www.npmjs.com/package/attachable) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/attachable) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/attachable) &nbsp; [inch-ci.org](https://inch-ci.org/github/alykoshin/attachable)


## License

MIT
