'use strict';

(function () {
  var filters = document.querySelector('.filters');
  var closeGalleryBtn = document.querySelector('.gallery-overlay-close');
  var pictures = [];

  var getShuffleArray = function (array) {
    // var newArray = [];
    // for (var i = 0; i < array.length; i++) {
    //   var j = Math.floor(Math.random() * array.length);
    //   newArray.push(array[j]);
    // }
    // return newArray;
    var currentIndex = array.length;
    var randomIndex;
    var temp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * array.length);
      currentIndex--;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  };
  var sortByShuffle = function () {
    window.render(getShuffleArray(pictures.slice(0)));
  };
  var sortByLikes = function () {
    window.render(pictures.slice(0).sort(function (left, right) {
      return right.likes - left.likes;
    }));
  };
  var sortByComments = function () {
    window.render(pictures.slice(0).sort(function (left, right) {
      return right.comments.length - left.comments.length;
    }));
  };

  var onFilterClick = function (evt) {
    switch (true) {
      case evt.target.id === 'filter-recommend':
        window.debounce(window.render(pictures));
        break;
      case evt.target.id === 'filter-popular':
        window.debounce(sortByLikes);
        break;
      case evt.target.id === 'filter-discussed':
        window.debounce(sortByComments);
        break;
      case evt.target.id === 'filter-random':
        window.debounce(sortByShuffle);
        break;
    }
  };

  var onLoad = function (data) {
    pictures = data;

    // добавление картинок и фильтров
    window.render(data);
    filters.classList.remove('hidden');

    // обработка кликов по фильтрам
    filters.addEventListener('click', onFilterClick);

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
