'use strict';

(function () {
  var MAX_PHOTOS_URL = 25;
  var MIN_COUNT_LIKE = 15;
  var MAX_COUNT_LIKE = 200;

  var getRandom = function (maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  };
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var getRandomUrl = function (min, max, arr) {
    var url = 'photos/' + getRandomInt(min, max) + '.jpg';
    if (arr.indexOf(url) === -1) {
      arr[arr.length] = url;
    } else {
      getRandomUrl(min, max, arr);
    }
  };
  var getUrlArray = function (min, max, arr) {
    for (var i = 0; i < max; i++) {
      getRandomUrl(min, max, arr);
    }
    return arr;
  };
  var getRandomLike = function (min, max) {
    return getRandomInt(min, max);
  };
  var getRandomComment = function () {
    var commentsList = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    var random = getRandom(commentsList.length);
    var commentsArray = [];
    for (var i = 0; i < random; i++) {
      commentsArray[i] = commentsList[getRandom(commentsList.length)];
    }
    return commentsArray;
  };

// генерация массива с данными для миниатюр
  window.data = {
    photos: [],
    generatePhotosArray: function (count) {
      var randomUrlArray = [];
      getUrlArray(1, MAX_PHOTOS_URL, randomUrlArray);

      for (var i = 0; i < count; i++) {
        this.photos[i] = {
          url: randomUrlArray[i],
          likes: getRandomLike(MIN_COUNT_LIKE, MAX_COUNT_LIKE),
          comments: getRandomComment()};
      }
      return this.photos;
    }
  };
})();
