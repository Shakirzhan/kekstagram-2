'use strict';

(function () {
  window.initializeScale = function (evt, element, adjust) {
    var resizeDec = element.querySelector('.upload-resize-controls-button-dec');
    var resizeInc = element.querySelector('.upload-resize-controls-button-inc');
    var value = parseInt(element.querySelector('input').value, 10);

    switch (true) {
      case evt.target === resizeDec:
        value -= 25;
        value = (value < 25) ? 25 : value;
        element.querySelector('input').value = value + '%';
        break;
      case evt.target === resizeInc:
        value += 25;
        value = (value > 100) ? 100 : value;
        element.querySelector('input').value = value + '%';
        break;
    }
    if (typeof adjust === 'function') {
      adjust(value);
    }
  };
})();
