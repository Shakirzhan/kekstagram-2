'use strict';
(function () {
  var COUNT_PICTURES = 25;
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderPicturesElement = function (array) {
    var picturesElement = pictureTemplate.cloneNode(true);

    picturesElement.querySelector('img').setAttribute('src', array.url);
    picturesElement.querySelector('.picture-comments').textContent = array.comments.length;
    picturesElement.querySelector('.picture-likes').textContent = array.likes;

    return picturesElement;
  };

  var renderFragment = function (data) {
    var takeNumber = data.length > COUNT_PICTURES ? COUNT_PICTURES : data.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPicturesElement(data[i]));
    }

    return fragment;
  };

  window.render = function (data) {
    pictures.innerHTML = '';
    pictures.appendChild(renderFragment(data));
  };
})();
