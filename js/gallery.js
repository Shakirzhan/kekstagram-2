'use strict';

(function () {
  var picturesBlock = document.querySelector('.pictures');
  var closeGalleryBtn = document.querySelector('.gallery-overlay-close');

  var onLoad = function (pictures) {
    // добавление картинок
    picturesBlock.appendChild(window.picture.renderFragment(pictures));

    // обработка кликов по картинкам
    var onPictureClick = function (evt) {
      evt.preventDefault();
      window.preview.getPicture(evt.currentTarget);
      openGallery();
      return;
    };
    var pictureCollection = document.querySelectorAll('.picture');
    if (pictureCollection.length > 0) {
      [].forEach.call(pictureCollection, function (picture) {
        picture.addEventListener('click', onPictureClick);
      });
    }
    if (pictureCollection.length > 0) {
      [].forEach.call(pictureCollection, function (picture) {
        picture.addEventListener('keydown', function (evt) {
          window.util.isEnterEvent(evt, onPictureClick);
        });
      });
    }
  };

  window.backend.load(onLoad, window.util.onError);

  var openGallery = function () {
    window.galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeGallery);
    });
  };

  var closeGallery = function () {
    window.galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeGallery);
    });
  };

  closeGalleryBtn.addEventListener('click', function () {
    closeGallery();
  });
  closeGalleryBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeGallery);
  });
})();
