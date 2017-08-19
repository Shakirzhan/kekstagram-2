'use strict';
//добавить проверку на повтор, добавить диапозон генерации
var getRandom = function (maxNumber) {
  return Math.floor(Math.random() * maxNumber);
};
var getRandomUrl = function (maxNumber) {
  return 'photos/' + getRandom(maxNumber) + '.jpg';
};

var getRandomLike = function (maxNumber) {
  return getRandom(maxNumber);
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
  var random = Math.floor(Math.random() * commentsList.length)
  var commentsArray = [];
  for (var i = 0; i < random; i++) {
    commentsArray[i] = commentsList[random];
  }
  return commentsArray;
};

var photos = [];
var generatePhotosArray = function (count) {
  for (var i = 0; i < count; i++) {
    photos[i] = {url: getRandomUrl(25), likes: getRandomLike(200), comments: getRandomComment().length};
  }
  return photos;
};
generatePhotosArray(25);

var pictureTemplate = document.querySelector('#picture-template').content;
var renderPicturesElement = function (i) {
  var picturesElement = pictureTemplate.cloneNode(true);

  picturesElement.querySelector('img').setAttribute('src', photos[i].url);
  picturesElement.querySelector('.picture-likes').textContent = photos[i].likes;
  picturesElement.querySelector('.picture-comments').textContent = photos[i].comments;

  return picturesElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicturesElement(i));
};

var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(fragment);

var uploadOverlayElement = document.querySelector('.upload-overlay');
uploadOverlayElement.classList.add('hidden');

var galleryOverlayElement = document.querySelector('.gallery-overlay');
galleryOverlayElement.classList.remove('hidden');
galleryOverlayElement.querySelector('.gallery-overlay-image').setAttribute('src', photos[1].url);
galleryOverlayElement.querySelector('.likes-count').textContent = photos[1].likes;
galleryOverlayElement.querySelector('.comments-count').textContent = photos[1].comments;
