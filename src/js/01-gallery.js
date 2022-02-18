import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

const createMarkup = ({ original, preview, description }) => {
  return `<div class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>`;
};

const renderGallery = () => {
  const markup = galleryItems.map(item => createMarkup(item)).join('');
  return markup;
};

const onModalClick = event => {
  event.preventDefault();
  if (event.target === event.currentTarget) return;
  const instance = basicLightbox.create(
    `
    <img src=${event.target.dataset.source} alt=${event.target.alt}>
`,
    {
      onShow: instance => {
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape') instance.close();
        });
      },

      onClose: instance => {
        window.removeEventListener('keydown', event => {
          if (event.code === 'Escape') instance.close();
        });
      },
    },
  );
  instance.show();
};

galleryRef.insertAdjacentHTML('beforeend', renderGallery());

galleryRef.addEventListener('click', onModalClick);
