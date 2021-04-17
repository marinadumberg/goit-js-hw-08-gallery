import galleryOfPictures from "/gallery-items.js";
console.log(galleryOfPictures);

const refs = {
  pictureContainer: document.querySelector('ul.js-gallery'),
  picturesMarkup: createGalleryMarkup(galleryOfPictures),
  modalOpen: document.querySelector('.js-lightbox'),
  imgSubstitution: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  closeOverlay: document.querySelector('div.lightbox__overlay'),
  
}
refs.pictureContainer.insertAdjacentHTML('beforeend', refs.picturesMarkup.join(''));
refs.pictureContainer.addEventListener('click', ZoomImage);
refs.closeBtn.addEventListener('click',closeModalBtn);
refs.closeOverlay.addEventListener('click', closeModalOverlay);


let activeIndex = null;


function createGalleryMarkup(galleryOfPictures) {
    return galleryOfPictures.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
  <a
    class="gallery__link"
    href='${original}'
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>`;
    });
};
console.log(createGalleryMarkup(galleryOfPictures));



// const createGalleryMarkup =(template,{ preview, original, description }) => {
//         return `${template}
//         <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href='${original}'
//   >
//     <img
//       class="gallery__image"
//       src='${preview}'
//       data-source='${original}'
//       alt='${description}'
//     />
//   </a>
// </li>`;
// };
// console.log(galleryOfPictures.reduce(createGalleryMarkup)); 

function ZoomImage(evt) {
    evt.preventDefault();
  
    refs.picturesMarkup.forEach((el, ind) => {
        if (el.includes(evt.target.src)) {
            activeIndex = ind;
            return;
        }
    });

    if (evt.target.nodeName !== 'IMG') {
        return
    }


    refs.modalOpen.classList.add('is-open');
    refs.imgSubstitution.setAttribute('src', `${evt.target.getAttribute('data-source')}`);
    refs.imgSubstitution.setAttribute('alt', `${evt.target.getAttribute('alt')}`);

    if (refs.modalOpen.classList.contains('is-open')) {
        window.addEventListener("keydown", methodsOnKeyListener);

    };
    function methodsOnKeyListener(e) {
        if (e.code === 'ArrowRight') {
            if (activeIndex !== galleryOfPictures.length) {
                activeIndex += 1;
                
                refs.imgSubstitution.src = galleryOfPictures[activeIndex].original;
                return;
            } else {
                activeIndex = 0;
                refs.imgSubstitution.src = galleryOfPictures[activeIndex].original;
                return;
            }
        }
        if (e.code === 'ArrowLeft' && activeIndex > 0) {
            activeIndex -= 1;
            refs.imgSubstitution.src = galleryOfPictures[activeIndex].original;
            return;
        }
        if (e.code === 'ArrowLeft' && activeIndex === 0) {
            activeIndex = galleryOfPictures.length - 1;
            refs.imgSubstitution.src = galleryOfPictures[activeIndex].original;
            return;
        }
        if (e.code === 'Escape') {
            refs.modalOpen.classList.remove('is-open');
            refs.imgSubstitution.setAttribute('src', '');
            window.removeEventListener("keydown", methodsOnKeyListener)
        };
    };


    
}

function closeModalBtn (e) {
        if (e.target.nodeName !== 'BUTTON') {
            return
        }
   
  
        refs.modalOpen.classList.remove('is-open');
        refs.imgSubstitution.setAttribute('src', '');

};
    

function closeModalOverlay(e) {
        console.log(e.target);
    
        refs.modalOpen.classList.remove('is-open');
        refs.imgSubstitution.setAttribute('src', '');
};