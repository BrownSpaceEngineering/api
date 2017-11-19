var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;

var Chance = require('chance');
var chance = new Chance();

var supertest = require('supertest');
var app = require('../../server');
var agent = supertest.agent(app);

describe('http preamble routes', function() {

})
