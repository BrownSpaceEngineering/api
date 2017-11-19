// switch to our TEST DB
require('dotenv').config({path: '.env.test'});

console.log(process.env);

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const testObj = {
  foobar: () => {
    console.log('foo');
    return 'bar';
  }
};

// Spying on a function
chai.spy.on(testObj, 'foobar');

describe('Testing suite capabilities...', function () {
  it('confirms basic arithmetic', function () {
    expect(1 + 3).to.equal(4);
  });

  it('confirms setTimeout\'s timer accuracy', function (done) {
    let start = new Date();
    setTimeout(function () {
      let duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });

  it('will invoke a function once per element', function () {
    const arr = ['x', 'y', 'z'];
    let logNth = function (val, idx) {
      console.log('Logging elem #' + idx + ':', val);
    };

    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);

  });

});


const db = require('../server/database');

// Run test of the tests
// require('./models/preamble.test.js');
// require('./routes/preamble.test.js');
