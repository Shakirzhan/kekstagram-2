'use strict';
(function () {
  var COUNT_PICTURES = 25;

  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderPicturesElement = function (array) {

    var picturesElement = pictureTemplate.cloneNode(true);

    picturesElement.querySelector('img').setAttribute('src', array.url);
    picturesElement.querySelector('.picture-comments').textContent = array.comments.length;
    picturesElement.querySelector('.picture-likes').textContent = array.likes;

    return picturesElement;
  };
  window.picture = {
    renderFragment: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < COUNT_PICTURES; i++) {
        fragment.appendChild(renderPicturesElement(array[i]));
      }
      return fragment;
    }
  };
})();
