'use strict';

(function () {
  var MIN = 25;
  var MAX = 100;
  var STEP = 25;
  window.initializeScale = function (evt, element, adjust) {
    var resizeDec = element.querySelector('.upload-resize-controls-button-dec');
    var resizeInc = element.querySelector('.upload-resize-controls-button-inc');
    var value = parseInt(element.querySelector('input').value, 10);

    switch (evt.target) {
      case resizeDec:
        value -= STEP;
        value = (value < MIN) ? MIN : value;
        break;
      case resizeInc:
        value += STEP;
        value = (value > MAX) ? MAX : value;
        break;
    }
    element.querySelector('input').value = value + '%';
    if (typeof adjust === 'function') {
      adjust(value);
    }
  };
})();
