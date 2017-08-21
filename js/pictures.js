'use strict';
var getRandom = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


var test = [];
var getRandomUrlArray = function (min, max, arr) {
  for (var i = 0; i < max; i++) {
    var url = 'photos/' + getRandomInt(min, max) + '.jpg';
    arr[arr.length] = url;

    // if (arr.indexOf(url) === -1) {
    //   arr[arr.length] = url;
    // } else {
    //   getRandomUrlArray(min, max, arr);
    // }
  }
  return arr;
};
getRandomUrlArray(1, 5, test);
console.log(test);

// var getRandomUrl = function (min, max, arr) {
//   var url = 'photos/' + getRandomInt(min, max) + '.jpg';
//   if (arr.indexOf(url) === -1) {
//     arr[arr.length] = url;
//     console.log('сгенерировал ' + url);
//   } else {
//     getRandomUrl(min, max, arr);
//   }
//   return url;
// };

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

var photos = [];
var generatePhotosArray = function (count) {

  var randomUrlArray = [];
  getRandomUrlArray(1, 25, randomUrlArray);

  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: randomUrlArray[i],
      likes: getRandomLike(15, 200),
      comments: getRandomComment()};
  }
  return photos;
};
generatePhotosArray(25);

var pictureTemplate = document.querySelector('#picture-template').content;
var renderPicturesElement = function (i) {
  var picturesElement = pictureTemplate.cloneNode(true);

  picturesElement.querySelector('img').setAttribute('src', photos[i].url);
  picturesElement.querySelector('.picture-likes').textContent = photos[i].likes;
  picturesElement.querySelector('.picture-comments').textContent = photos[i].comments.length;

  return picturesElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicturesElement(i));
}

var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(fragment);

var uploadOverlayElement = document.querySelector('.upload-overlay');
uploadOverlayElement.classList.add('hidden');

var galleryOverlayElement = document.querySelector('.gallery-overlay');
galleryOverlayElement.classList.remove('hidden');
galleryOverlayElement.querySelector('.gallery-overlay-image').setAttribute('src', photos[1].url);
galleryOverlayElement.querySelector('.likes-count').textContent = photos[1].likes;
galleryOverlayElement.querySelector('.comments-count').textContent = photos[1].comments.length;
