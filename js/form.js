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
  var resizeControls = uploadForm.querySelector('.upload-resize-controls');
  var effectDrag = uploadForm.querySelector('.upload-effect-level-pin');
  var effectValue = uploadForm.querySelector('.upload-effect-level-val');
  var effectLine = uploadForm.querySelector('.upload-effect-level-line');
  var effectLevel = uploadForm.querySelector('.upload-effect-level');

  // значения фильтров
  var filterValue = null;
  var filterName = null;
  var DEFAULT_EFFECT = 20;
  var FILTERS = {
    'effect-none': {
      'default': function () {
        return '';
      },
      'custom': function () {
        return '';
      }
    },
    'effect-chrome': {
      'default': function () {
        return 'grayscale(' + (DEFAULT_EFFECT / 100) + ')';
      },
      'custom': function () {
        return 'grayscale(' + (filterValue / 100) + ')';
      }
    },
    'effect-sepia': {
      'default': function () {
        return 'sepia(' + (DEFAULT_EFFECT / 100) + ')';
      },
      'custom': function () {
        return 'sepia(' + (filterValue / 100) + ')';
      }
    },
    'effect-marvin': {
      'default': function () {
        return 'invert(' + DEFAULT_EFFECT + '%)';
      },
      'custom': function () {
        return 'invert(' + filterValue + '%)';
      }
    },
    'effect-phobos': {
      'default': function () {
        return 'blur(' + (DEFAULT_EFFECT / 33.3) + 'px)';
      },
      'custom': function () {
        return 'blur(' + (filterValue / 33.3) + 'px)';
      }
    },
    'effect-heat': {
      'default': function () {
        return 'brightness(' + (DEFAULT_EFFECT / 33.3) + ')';
      },
      'custom': function () {
        return 'brightness(' + (filterValue / 33.3) + ')';
      }
    }
  };

  // для обработчика кнопок минус и плюc
  var adjustScale = function (value) {
    effectPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  // обработчик изменения фильтров
  var onEffectControlsClick = function (evt) {
    if (evt.target.name === 'effect') {
      if (evt.target.value === 'none') {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }

      filterName = 'effect-' + evt.target.value;

      var applyFilter = function (newValue) {
        effectPreview.removeAttribute('class');
        effectPreview.classList.add('effect-image-preview');
        effectPreview.classList.add('effect-' + newValue);
      };
      window.initializefilters(evt.target, applyFilter);

      effectDrag.style.left = DEFAULT_EFFECT + '%';
      effectValue.style.width = DEFAULT_EFFECT + '%';

      effectPreview.style.filter = FILTERS[filterName].default();
    }
  };

  effectDrag.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var onMouseMove = function (moveevt) {
      moveevt.preventDefault();

      var shiftX = startX - moveevt.clientX;
      startX = moveevt.clientX;
      var positionX = ((effectDrag.offsetLeft - shiftX) / effectLine.offsetWidth) * 100;

      if (positionX >= 0 && positionX <= 100) {
        effectDrag.style.left = positionX + '%';
        effectValue.style.width = positionX + '%';
        filterValue = positionX;
      }

      effectPreview.style.filter = FILTERS[filterName].custom();
    };

    var onMouseUp = function (upevt) {
      upevt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // проверка поля с хэштегом
  var validHashtags = function (evt) {
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
  var validDescriptionInput = function (evt) {
    if (uploadDescription.validity.tooLong) {
      uploadDescription.setCustomValidity('не более 140 символов');
      uploadDescription.classList.add('upload-message-error');
    } else {
      uploadDescription.setCustomValidity('');
      uploadDescription.classList.remove('upload-message-error');
    }
  };
  // общая проверка инпутов
  var validInputs = function (evt) {
    if (evt.target === uploadHashtags) {
      validHashtags();
    } else if (evt.target === uploadDescription) {
      validDescriptionInput();
    }
  };
  // функция открытия формы кадрирования
  var openUploadOverlay = function () {
    uploadImage.classList.add('hidden');
    effectLevel.classList.add('hidden');
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeUploadOverlay, uploadDescription);
    });
    uploadForm.addEventListener('input', validInputs);
    uploadForm.addEventListener('submit', function (evt) {
      onSubmitClick(evt);
    });
    resizeControls.addEventListener('click', function (evt) {
      window.initializeScale(evt, resizeControls, adjustScale);
    });
    effectControls.addEventListener('click', onEffectControlsClick);
  };
  // функция закрытия формы кадрирования
  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeUploadOverlay, uploadDescription);
    });
    uploadForm.removeEventListener('input', validInputs);
    uploadForm.removeEventListener('submit', function (evt) {
      onSubmitClick(evt);
    });
    resizeControls.removeEventListener('click', function (evt) {
      window.initializeScale(evt, resizeControls, adjustScale);
    });
    effectControls.removeEventListener('click', onEffectControlsClick);
  };

  // события закрытия и открытия формы кадрирования
  uploadFileInput.addEventListener('change', openUploadOverlay);

  uploadCancel.addEventListener('click', closeUploadOverlay);
  uploadCancel.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeUploadOverlay);
  });
  // module6
  var onSubmitClick = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      closeUploadOverlay();
    }, window.util.onError);
    uploadForm.reset();
  };
})();
