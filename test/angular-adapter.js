describe('$theonAdapter', function () {
  var $theonAdapter

  beforeEach(module('theon.adapter'))

  beforeEach(inject(function (_$theonAdapter_) {
    $theonAdapter = _$theonAdapter_
  }))

  describe('API', function () {
    it('should expose the resilient API', function () {
      expect($theonAdapter).to.be.a('function')
    })
  })

  describe('use adapter', function () {
    var resStub = null

    beforeEach(function () {
      resStub = {
        setStatus: function (status) {
          this.status = status
        },
        setStatusText: function (text) {
          this.statusText = text
        },
        setHeaders: function (headers) {
          this.headers = headers
        },
        setBody: function (body) {
          this.body = body
        },
        setOriginalResponse: function (res) {
          this._res = res
        }
      }
    })

    beforeEach(inject(function ($q) {
      $theonAdapter.setAgent(function (opts) {
        return {
          then: function (fn) {
            fn({ status: 200, data: 'foo', headers: { foo: 'bar' } })
          }
        }
      })
    }))

    it('should perform a valid request', function (done) {
      $theonAdapter({
        url: '/foo',
        headers: { foo: 'bar' },
        opts: {},
        agentOpts: {}
      }, resStub, function (err, res) {
        expect(err).to.be.null
        expect(res).to.be.an('object')
        expect(res._res).to.be.an('object')
        expect(res.status).to.be.equal(200)
        expect(res.headers).to.be.an('object')
        expect(res.body).to.be.a('string')
        expect(res.body).to.be.equal('foo')
        done()
      })
    })
  })
})
