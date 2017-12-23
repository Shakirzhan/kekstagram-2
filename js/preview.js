'use strict';

(function () {
  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    getPicture: function (element) {
      window.galleryOverlay.querySelector('.gallery-overlay-image').src = element.querySelector('img').getAttribute('src');
      window.galleryOverlay.querySelector('.comments-count').textContent = element.querySelector('.picture-comments').textContent;
      window.galleryOverlay.querySelector('.likes-count').textContent = element.querySelector('.picture-likes').textContent;
    }
  };
})();
