function setUserAgent(window, userAgent) {
  if (window.navigator.userAgent != userAgent) {
      var userAgentProp = { get: function () { return userAgent; } };
      try {
          Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
      } catch (e) {
          window.navigator = Object.create(navigator, {
              userAgent: userAgentProp
          });
      }
  }
}
setUserAgent(document.querySelector('#mobile_view').contentWindow, 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25');