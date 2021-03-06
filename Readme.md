http://ichernobuk.github.io/kekstagram/

## Техническое задание на Кекстаграм
### Описание функциональности
Сценарий поведения пользователя на сайте:
загрузка нового изображения
изменение масштаба изображения
изменение положения изображения перетаскиванием
применение одного из заранее заготовленных эффектов
выбор глубины эффекта с помощью ползунка
добавление текстового комментария
просмотр и фильтрация изображений, загруженных другими пользователями
Загрузка нового изображения осуществляется перетаскиванием изображения на логотип или выбором файла изображения вручную с помощью стандартного контрола загрузки файла, который стилизован под букву «О» в логотипе. После выбора изображения показывается форма применения эффекта и кадрирования изображения.

После отправки формы все поля должны сбрасываться. Т. е. если отправлено одно изображение, а затем второе, то должны быть восстановлены значения по умолчанию.

Реализация загрузки изображения перетаскиванием, изменения положения изображения необязательна.

Ограничения, накладываемые на поля
Масштаб
задаётся в диапазоне от 25 до 100
значение изменяется с шагом 25
начальное значение 100
Эффект
на изображение может накладываться только один эффект
интенсивность эффекта регулируется слайдером сверху
при выборе эффекта слайдер отражает текущую интенсивность эффекта
при выборе эффекта «Оригинал» слайдер прячется
Хэш-теги
хэш-теги не обязательны
хэш-тег начинается с символа # (решётка) и состоит из одного слова
хэш-теги разделяются пробелами
один и тот же хэш-тег не может быть использован дважды
нельзя указать больше пяти хэш-тегов
максимальная длина одного хэш-тега 20 символов
Комментарий
комментарий не обязателен
длина комментария не может составлять больше 140 символов
Просмотр загруженных изображений
Все загруженные изображения показаны на главной странице в виде миниатюр. При наведении на миниатюру можно увидеть кол-во комментариев и лайков. При нажатии на миниатюру показывается полноэкранное изображение с количеством лайков и комментариев.

Фильтрация изображений
Рекомендуемые — фотографии в том порядке, в котором они были загружены с сервера.
Популярные — фотографии, отсортированные в порядке убывания количества лайков.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
Случайные — просто случайные фотографии. Ни в коем случае не должны повторяться.
