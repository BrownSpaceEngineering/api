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

describe('Testing suite capabilities...', () => {
  it('confirms basic arithmetic', () => {
    expect(1 + 3).to.equal(4);
  });

  it('confirms setTimeout\'s timer accuracy', (done) => {
    let start = new Date();
    setTimeout(() => {
      let duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });

  it('will invoke a function once per element', () => {
    const arr = ['x', 'y', 'z'];
    let logNth = (val, idx) => {
      console.log('Logging elem #' + idx + ':', val);
    };

    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);

  });

});

describe('Testing the server...', () => {
  // Run the rest of tests
});
