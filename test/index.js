var expect = require('chai').expect,
    middleServer

describe('middle-server', function() {
  it('should load', function(done) {
    middleServer = require('..')
    done()
  })

  var expected = ["hello", "world"]
  var expectedString = JSON.stringify(expected)
  it('should eaual ' + expectedString, function(done) {
    var test = middleServer(expected)
    var json = JSON.stringify(test)
    expect(json).to.equal(expectedString)
    done()
  })
})
