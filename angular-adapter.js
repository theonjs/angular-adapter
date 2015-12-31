/*! theon-angular-adapter - v0.1.0 - MIT License - https://github.com/theonjs/theon-angular-adapter */
angular.module('theon.adapter', [])

  .factory('$theonAdapter', ['$http', '$theonResponseAdapter', function ($http, adapter) {
    var httpAgent = $http

    function $httpAdapter (req, res, done) {
      var opts = {
        url: req.url,
        method: req.method,
        auth: req.opts.auth,
        params: req.query,
        headers: req.headers,
        data: req.body,
        cache: req.agentOpts.cache,
        timeout: +req.opts.timeout || +req.agentOpts.timeout,
        withCredentials: req.agentOpts.withCredentials,
        xsrfHeaderName: req.agentOpts.xsrfHeaderName,
        xsrfCookieName: req.agentOpts.xsrfCookieName,
        transformRequest: req.agentOpts.transformRequest,
        transformResponse: req.agentOpts.transformResponse,
        paramSerializer: req.agentOpts.paramSerializer,
        responseType: req.agentOpts.responseType
      }

      httpAgent(opts).then(function (_res) {
        done(null, adapter(res, _res))
      }, function (err) {
        done(adapter(res, err))
      })
    }

    $httpAdapter.setAgent = function (agent) {
      httpAgent = agent
    }

    return $httpAdapter
  }])

  .factory('$theonResponseAdapter', ['$q', function ($q) {
    return function responseAdapter (res, _res) {
      if (!_res) return res

      // Expose the agent-specific response
      res.setOriginalResponse(_res)

      // Define recurrent HTTP fields
      res.setStatus(_res.status)
      res.setStatusText(_res.statusText)
      res.setHeaders(_res.headers)

      // Define body, if present
      if (_res.data) res.setBody(_res.data)

      return res
    }
  }])
