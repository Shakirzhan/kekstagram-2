'use strict';

(function () {
  window.initializeFilters = function (element, change) {
    var newValue = element.value;

    if (typeof change === 'function') {
      change(newValue);
    }
  };
})();
