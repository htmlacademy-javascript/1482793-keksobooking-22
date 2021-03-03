const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const AVATAR_DEFAULT_PICTURE = 'img/muffin-grey.svg';

const avatarFileChooser = document.querySelector('.ad-form-header__input');

const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoFileChooser = document.querySelector('.ad-form__input');

const photoPreview = document.querySelector('.ad-form__photo');


const readImage = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const createNewPhotoPreview = () => {
  const newPhotoPreview = document.createElement('img');
  newPhotoPreview.width = `${photoPreview.offsetWidth}`;
  newPhotoPreview.height = `${photoPreview.offsetHeight}`;
  newPhotoPreview.alt = 'Фотография жилья в аренду';
  photoPreview.innerHTML = '';
  photoPreview.append(newPhotoPreview);
  readImage(photoFileChooser, newPhotoPreview);
};

avatarFileChooser.addEventListener('change', () => readImage(avatarFileChooser, avatarPreview));

photoFileChooser.addEventListener('change', createNewPhotoPreview);

const resetPhotoPreview = () => {
  avatarPreview.src = AVATAR_DEFAULT_PICTURE;
  photoPreview.innerHTML = '';
};

export {resetPhotoPreview};
