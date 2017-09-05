'use strict';

(function () {
  window.initializefilters = function (element, change) {
    var newValue = element.value;

    if (typeof change === 'function') {
      change(newValue);
    }
  };
})();
