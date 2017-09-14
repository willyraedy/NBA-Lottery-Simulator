/*eslint-env node*/
/*eslint-env mocha*/

const chai = require('chai')
const spies = require('chai-spies')
chai.use(spies)
chai.should()
const expect = require('chai').expect;

const Model = require('../model/Model.js')
const ModelForYear = require('../model/ModelForYear.js')

let model
describe('Model model', () =>{
  beforeEach(() =>{
    model = new Model()
  })
  describe('_simulate', () =>{
    it('should run a simulation on one year', () =>{
      expect()
    })
  })
})

describe('ModelForYear model', () => {
  describe('constructor', () => {
    it('should properly set yearData', () =>{

    })
  })
})
