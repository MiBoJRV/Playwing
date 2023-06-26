document.addEventListener("DOMContentLoaded", function () {

  // Slider
  const createDots = (slider) => {
    const sliderContainer = slider.parentElement;
    const slides = Array.from(slider.children);
    const dotsContainer = sliderContainer.querySelector('.dots');

    slides.forEach((slide, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        showSlide(slider, index);
      });

      dotsContainer.appendChild(dot);
    });

    showSlide(slider, 0);
  };

  const showSlide = (slider, index) => {
    const slides = Array.from(slider.children);
    const dots = slider.parentElement.querySelector('.dots').children;

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
      dots[i].classList.toggle('active', i === index);
    });
  };

  const handleArrowClick = (slider, direction) => {
    const slides = Array.from(slider.children);
    const currentIndex = slides.findIndex((slide) => slide.style.display === 'block');
    const lastIndex = slides.length - 1;

    let nextIndex;
    if (direction === 'left') {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    } else {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    }

    showSlide(slider, nextIndex);
  };

  const sliders = document.querySelectorAll('.main__slider .slider');

  sliders.forEach((slider) => {
    createDots(slider);
  });

  const arrowLeft = document.querySelector('.main__slider .arrow-left');
  arrowLeft.addEventListener('click', (event) => {
    event.preventDefault();
    const slider = event.target.closest('.main__slider').querySelector('.slider');
    handleArrowClick(slider, 'left');
  });

  const arrowRight = document.querySelector('.main__slider .arrow-right');
  arrowRight.addEventListener('click', (event) => {
    event.preventDefault();
    const slider = event.target.closest('.main__slider').querySelector('.slider');
    handleArrowClick(slider, 'right');
  });

// Open Popup
  const buttonOpenPopup = document.querySelector('.subscribe-button');
  const subscribePopup = document.querySelector('.subscribe-popup');

  buttonOpenPopup.addEventListener('click', (event) => {
    event.preventDefault();
    subscribePopup.style.display = 'block';
  });

//Form
  const phoneForm = document.querySelector('.phone-form');
  const phoneCode = document.querySelector('.phone-code');
  const phoneInput = document.querySelector('#phone');
  const phoneValid = document.querySelector('.phone-valid');
  const getOtpButton = document.querySelector('.get-otp');

  const pinInputs = document.querySelectorAll('.pin-input');
  const pinForm = document.querySelector('.pin-form');
  const subscribeButton = pinForm.querySelector('.subscribe');
  const notification = document.querySelector('.notification');
  const notReceivedPin = document.querySelector('.not-received-pin');
  const resendSms = document.querySelector('.resend-sms');
  const changeNumber = document.querySelector('.change-number');

  function formatPhoneNumber(value) {
    const num = value.replace(/\D/g, '');
    const formattedNumber = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    return formattedNumber;
  }

  function clearPinInputs() {
    pinInputs.forEach(input => {
      input.value = '';
    });
    subscribeButton.setAttribute('disabled', 'disabled');
  }

  function isPinFormValid() {
    return Array.from(pinInputs).every(input => input.value.length === input.maxLength);
  }

  phoneForm.addEventListener('submit', (e) => {
    e.preventDefault();

    setTimeout(() => {
      const phoneNumber = phoneInput.value.replace(/\s/g, '');
      phoneValid.style.display = 'flex';
      const fullPhoneNumber = `${phoneCode.textContent}${phoneNumber}`;
      console.log(fullPhoneNumber);
      console.log('Fake server request success');

      phoneForm.style.display = 'none';
      pinForm.style.display = 'flex';
      phoneInput.value = '';
      notReceivedPin.style.display = 'block';
    }, 1000);
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');

    if (phoneInput.value.length > 9) {
      phoneInput.value = phoneInput.value.slice(0, 9);
    }

    const phoneNumber = phoneInput.value;
    phoneInput.value = formatPhoneNumber(phoneNumber);

    const digitsOnly = phoneNumber.replace(/\s/g, '');
    const phonePattern = /^\d{9}$/;
    if (phonePattern.test(digitsOnly)) {
      phoneValid.style.display = 'flex';
      getOtpButton.removeAttribute('disabled');
    } else {
      phoneValid.style.display = 'none';
      getOtpButton.setAttribute('disabled', 'disabled');
    }
  });

  pinInputs.forEach(input => {
    input.addEventListener('input', () => {
      const inputValue = input.value;
      const isValidInput = /^\d$/.test(inputValue);
      if (isValidInput) {
        if (input.value.length >= input.maxLength) {
          const nextInput = input.nextElementSibling;
          if (nextInput !== null) {
            nextInput.focus();
          }
        }
      } else {
        input.value = '';
      }
    });
  });

  pinForm.addEventListener('input', () => {
    if (isPinFormValid()) {
      subscribeButton.removeAttribute('disabled');
    } else {
      subscribeButton.setAttribute('disabled', 'disabled');
    }
  });

  resendSms.addEventListener('click', () => {
    clearPinInputs();
    console.log('Resend sms with pin code')
  });

  changeNumber.addEventListener('click', () => {
    pinForm.style.display = 'none';
    notReceivedPin.style.display = 'none';
    phoneForm.style.display = 'flex';
    phoneValid.style.display = 'none';

    getOtpButton.setAttribute('disabled', 'disabled');

    clearPinInputs();
  });

  subscribeButton.addEventListener('click', (event) => {
    event.preventDefault();

    setTimeout(() => {
      const pinValue = Array.from(pinInputs).map(input => input.value).join('');
      console.log(pinValue);
      console.log('Fake server subscribe success');

      clearPinInputs();
      getOtpButton.setAttribute('disabled', 'disabled');

      phoneValid.style.display = 'none';
      subscribePopup.style.display = 'none';
      pinForm.style.display = 'none';
      notReceivedPin.style.display = 'none';
      phoneForm.style.display = 'flex';
    }, 1000);

    const message = 'Your subscription to Bite Games premium has been successfully processed';
    notification.style.display = 'flex';
    notification.textContent = message;

    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  });

// Read more
  const readMore = document.querySelector(".read-more__link");
  const readMoreLink = document.querySelector(".read-more__link a");
  const readMoreText = document.querySelector(".read-more__text");

  readMoreLink.addEventListener("click", (event) => {
    event.preventDefault();

    readMoreText.style.display = (readMoreText.style.display === "none" || readMoreText.style.display === "") ? "block" : "none";

    const bodyLang = document.querySelector("body").getAttribute("data-lang");
    if (bodyLang === "ar") {
      readMoreLink.textContent = (readMoreText.style.display === "none") ? 'اقرأ أكثر' : 'أقرأ أقل';
    } else {
      readMoreLink.textContent = (readMoreText.style.display === "none") ? 'Read More' : 'Read Less';
    }

    readMore.classList.toggle('more');
  });


});