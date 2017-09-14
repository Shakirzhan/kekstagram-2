'use strict';

(function () {
  var filters = document.querySelector('.filters');
  var closeGalleryBtn = document.querySelector('.gallery-overlay-close');
  var pictures = [];

  // обработка кликов по картинкам
  var pictureClick = function () {
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

  // функции для сортировки по заданному фильтру
  var getShuffleArray = function (array) {
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
    window.render(getShuffleArray(pictures.slice(0)), pictureClick);
  };
  var sortByLikes = function () {
    window.render(pictures.slice(0).sort(function (left, right) {
      return right.likes - left.likes;
    }), pictureClick);
  };
  var sortByComments = function () {
    window.render(pictures.slice(0).sort(function (left, right) {
      return right.comments.length - left.comments.length;
    }), pictureClick);
  };

  // обрабочтик клика по фильтру
  var onFilterClick = function (evt) {
    switch (evt.target.id) {
      case 'filter-recommend':
        window.debounce(window.render(pictures), pictureClick);
        break;
      case 'filter-popular':
        window.debounce(sortByLikes);
        break;
      case 'filter-discussed':
        window.debounce(sortByComments);
        break;
      case 'filter-random':
        window.debounce(sortByShuffle);
        break;
    }
  };
// загрузка массива для фотографий
  var onLoad = function (data) {
    pictures = data;

    // добавление картинок и фильтров
    window.render(data, pictureClick);
    filters.classList.remove('hidden');

    // обработка кликов по фильтрам
    filters.addEventListener('click', onFilterClick);
  };

  window.backend.load(onLoad, window.util.onError);

// закрытие галлерии
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
