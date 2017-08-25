'use strict';

var COUNT_PICTURES = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var photos = [];
var generatePhotosArray = function (count) {
  var randomUrlArray = [];
  getUrlArray(1, 25, randomUrlArray);

  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: randomUrlArray[i],
      likes: getRandomLike(15, 200),
      comments: getRandomComment()};
  }
  return photos;
};
generatePhotosArray(COUNT_PICTURES);

var pictureTemplate = document.querySelector('#picture-template').content;
var renderPicturesElement = function (array, i) {

  var picturesElement = pictureTemplate.cloneNode(true);

  picturesElement.querySelector('img').setAttribute('src', array[i].url);
  picturesElement.querySelector('.picture-comments').textContent = array[i].comments.length;
  picturesElement.querySelector('.picture-likes').textContent = array[i].likes;

  return picturesElement;
};

var fragment = document.createDocumentFragment();
var renderFragment = function (array) {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPicturesElement(array, i));
  }
};
renderFragment(photos);

var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(fragment);

var galleryOverlayElement = document.querySelector('.gallery-overlay');
var closeGalleryBtn = document.querySelector('.gallery-overlay-close');

var onEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
};
var openGallery = function () {
  galleryOverlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};
var closeGallery = function () {
  galleryOverlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
};

closeGalleryBtn.addEventListener('click', function () {
  closeGallery();
});
closeGalleryBtn.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeGallery();
  }
});

var renderOverlayElement = function (array) {
  galleryOverlayElement.querySelector('.gallery-overlay-image').setAttribute('src', array.url);
  galleryOverlayElement.querySelector('.comments-count').textContent = array.comments.length;
  galleryOverlayElement.querySelector('.likes-count').textContent = array.likes;
};

var getPicture = function (element) {
  galleryOverlayElement.querySelector('.gallery-overlay-image').src = element.querySelector('img').getAttribute('src');
  galleryOverlayElement.querySelector('.comments-count').textContent = element.querySelector('.picture-comments').textContent;
  galleryOverlayElement.querySelector('.likes-count').textContent = element.querySelector('.picture-likes').textContent;
};

var onPictureClick = function (event) {
  event.preventDefault();
  getPicture(event.currentTarget);
  openGallery();
  return;
};

var pictureCollection = document.querySelectorAll('.picture');

renderOverlayElement(photos[1]);

openGallery();

if (pictureCollection.length > 0) {
  [].forEach.call(pictureCollection, function (picture) {
    picture.addEventListener('click', onPictureClick);
  });
}

if (pictureCollection.length > 0) {
  [].forEach.call(pictureCollection, function (picture) {
    picture.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEYCODE) {
        onPictureClick(event);
      }
    });
  });
}

// module4-task2
var uploadForm = document.querySelector('#upload-select-image');
var uploadFileInput = uploadForm.querySelector('#upload-file');
var uploadImage = uploadForm.querySelector('.upload-image');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
var uploadDescription = uploadForm.querySelector('.upload-form-description');

var onUploadOverlayEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE && event.target !== uploadDescription) {
    closeUploadOverlay();
  }
};
var openUploadOverlay = function () {
  uploadImage.classList.add('hidden');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
};
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  uploadImage.classList.remove('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
};

uploadFileInput.addEventListener('click', openUploadOverlay);
uploadCancel.addEventListener('click', closeUploadOverlay);
uploadCancel.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeUploadOverlay();
  }
});
