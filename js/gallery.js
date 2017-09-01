'use strict';

(function () {
  var COUNT_PICTURES = 25;
  var picturesBlock = document.querySelector('.pictures');
  var picturesArray = window.data.generatePhotosArray(COUNT_PICTURES);
  var closeGalleryBtn = document.querySelector('.gallery-overlay-close');


  picturesBlock.appendChild(window.picture.renderFragment(picturesArray));
  window.preview.renderOverlay(picturesArray[0]);


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
})();
