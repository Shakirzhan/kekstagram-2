'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadImage = uploadForm.querySelector('.upload-image');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadCancel = uploadForm.querySelector('.upload-form-cancel');
  var uploadDescription = uploadForm.querySelector('.upload-form-description');
  var uploadHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var effectControls = uploadForm.querySelector('.upload-effect-controls');
  var effectPreview = uploadForm.querySelector('.effect-image-preview');
  var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
  var resizeDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeInc = uploadForm.querySelector('.upload-resize-controls-button-inc');

  // обработчик кнопки масштаба минус и плюс
  var onDecClick = function () {
    var value = parseInt(resizeValue.value, 10);
    value -= 25;
    value = (value < 25) ? 25 : value;
    resizeValue.value = value + '%';
    effectPreview.style.transform = 'scale(' + (value / 100) + ')';
  };
  var onIncClick = function () {
    var value = parseInt(resizeValue.value, 10);
    value += 25;
    value = (value > 100) ? 100 : value;
    resizeValue.value = value + '%';
    effectPreview.style.transform = 'scale(' + (value / 100) + ')';
  };
  // обработчик изменения фильтров
  var onEffectControlsClick = function (event) {
    if (event.target.name === 'effect') {
      effectPreview.removeAttribute('class');
      effectPreview.classList.add('effect-image-preview');
      effectPreview.classList.add(event.target.id.slice(7));
    }
  };
  // проверка поля с хэштегом
  var validHashtags = function (event) {
    var arrHashtags = uploadHashtags.value.split(' ');

    var isContentValid = function () {
      for (var i = 0; i < arrHashtags.length; i++) {
        if (arrHashtags[i].slice(0, 1) !== '#' || arrHashtags[i].length === 1 || arrHashtags[i].length > 20) {
          return false;
        }
      }
      return true;
    };
    var isRepeatValid = function () {
      var newArr = [];
      for (var i = 0; i < arrHashtags.length; i++) {
        if (newArr.indexOf(arrHashtags[i]) === -1) {
          newArr[newArr.length] = arrHashtags[i];
        } else {
          return false;
        }
      }
      return true;
    };
    var isMissingSpace = function () {
      for (var i = 0; i < arrHashtags.length; i++) {
        if (arrHashtags[i].indexOf('#', 1) !== -1) {
          return false;
        }
      }
      return true;
    };

    if (arrHashtags.length > 5) {
      uploadHashtags.setCustomValidity('не более 5-ти хэштегов');
      uploadHashtags.classList.add('upload-message-error');
    } else if (arrHashtags.length > 0 && isContentValid() === false) {
      uploadHashtags.setCustomValidity('хэш-тег должен начинаеться с символа `#` и быть не более 20 символов');
      uploadHashtags.classList.add('upload-message-error');
    } else if (isMissingSpace() === false) {
      uploadHashtags.setCustomValidity('хэштеги должны разделяться пробелом');
      uploadHashtags.classList.add('upload-message-error');
    } else if (isRepeatValid() === false) {
      uploadHashtags.setCustomValidity('одинаковые хэштеги');
      uploadHashtags.classList.add('upload-message-error');
    } else {
      uploadHashtags.setCustomValidity('');
      uploadHashtags.classList.remove('upload-message-error');
    }
  };

  // проверка поля с комментариями
  var validDescriptionInput = function (event) {
    if (uploadDescription.validity.tooShort) {
      uploadDescription.setCustomValidity('напишите, пожалуйста, минимум 30 символов');
      uploadDescription.classList.add('upload-message-error');
    } else if (uploadDescription.validity.tooLong) {
      uploadDescription.setCustomValidity('не более 100 символов');
      uploadDescription.classList.add('upload-message-error');
    } else if (uploadDescription.validity.valueMissing) {
      uploadDescription.setCustomValidity('Обязательное напиште комментарий');
      uploadDescription.classList.add('upload-message-error');
    } else {
      uploadDescription.setCustomValidity('');
      uploadDescription.classList.remove('upload-message-error');
    }
  };
  // общая проверка инпутов
  var validInputs = function (event) {
    if (event.target === uploadHashtags) {
      validHashtags();
    } else if (event.target === uploadDescription) {
      validDescriptionInput();
    }
  };
  // функция открытия формы кадрирования
  var openUploadOverlay = function () {
    uploadImage.classList.add('hidden');
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (event) {
      window.util.isEscEvent(event, closeUploadOverlay, uploadDescription);
    });
    uploadForm.addEventListener('input', validInputs);
    resizeDec.addEventListener('click', onDecClick);
    resizeInc.addEventListener('click', onIncClick);
    effectControls.addEventListener('click', onEffectControlsClick);
  };
  // функция закрытия формы кадрирования
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', function (event) {
      window.util.isEscEvent(event, closeUploadOverlay, uploadDescription);
    });
    uploadForm.removeEventListener('input', validInputs);
    resizeDec.removeEventListener('click', onDecClick);
    resizeInc.removeEventListener('click', onIncClick);
    effectControls.removeEventListener('click', onEffectControlsClick);
  };

  // события закрытия и открытия формы кадрирования
  uploadFileInput.addEventListener('change', openUploadOverlay);

  uploadCancel.addEventListener('click', closeUploadOverlay);
  uploadCancel.addEventListener('keydown', function (event) {
    window.util.isEnterEvent(event, closeUploadOverlay);
  });

})();
