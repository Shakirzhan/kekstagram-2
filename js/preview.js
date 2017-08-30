'use strict';

(function () {
  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.preview = {
    renderOverlay: function (array) {
      window.galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', array.url);
      window.galleryOverlay.querySelector('.comments-count').textContent = array.comments.length;
      window.galleryOverlay.querySelector('.likes-count').textContent = array.likes;
    },
    getPicture: function (element) {
      window.galleryOverlay.querySelector('.gallery-overlay-image').src = element.querySelector('img').getAttribute('src');
      window.galleryOverlay.querySelector('.comments-count').textContent = element.querySelector('.picture-comments').textContent;
      window.galleryOverlay.querySelector('.likes-count').textContent = element.querySelector('.picture-likes').textContent;
    }
  };
})();
