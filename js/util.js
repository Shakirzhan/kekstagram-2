'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action, field) {
      if (evt.keyCode === ESC_KEYCODE && evt.target !== field) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    onError: function (errorMsg) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.textAlign = 'center';
      node.style.backgroundColor = 'red';

      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMsg;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
