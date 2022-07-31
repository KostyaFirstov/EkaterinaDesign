$(document).ready(function(){
    $(".header__carousel").owlCarousel({
          loop: true,
          margin: 10,
          dots: true,
          autoplay: true, 
          smartSpeed: 1000,
          autoplayTimeout: 10000,
          items: 1,
          mouseDrag: false,
          nav: false, 
          center: true
})
});





const scrollImations = (entries, observer) => {
  entries.forEach((entry) => {

    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}

const options = {
  threshold: 0
};
const observer = new IntersectionObserver(scrollImations);

const boxes = document.querySelectorAll('.anim');
boxes.forEach((box) => {
  observer.observe(box);
});


function slowScroll(id) {
  $('html,body').animate({
      scrollTop: $(id).offset().top
  }, 1000);
}




const navActive = document.querySelector('.header');

window.addEventListener('scroll', function() {
  if(window.pageYOffset >= 30){
    navActive.classList.add('active');
  }if(window.pageYOffset < 30){
    navActive.classList.remove('active');
  }
})


const modalButtons = document.querySelectorAll('[data-modal-button]');
const modalClosebuttons = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');


modalButtons.forEach(function (item) {
  item.addEventListener('click', function () {
  const modalId = this.dataset.modalButton;
  const modal = document.querySelector('#' + modalId);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'

  modal.querySelector('.modal__container').addEventListener('click', function (e) {
    e.stopPropagation();
  });
})
})


modalClosebuttons.forEach(function (item) {
  item.addEventListener('click', function () {
      const modal = this.closest('[data-modal]');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto'
  })


  allModals.forEach(function (item) {
    item.addEventListener('click', function () {
        this.classList.remove('active');
        document.body.style.overflow = 'auto'
  });
});
})



const navMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-link');
const navBtn = document.querySelector('.menu-btn');


  menuLinks.forEach(function(item){
    item.addEventListener('click', function() {
      const modal = this.closest('[data-modal]');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto'
      navBtn.classList.remove('active');
    })
  });



const servicesBtn = document.querySelectorAll('.services__change');
const serviceInfo = document.querySelectorAll('.services__column');

servicesBtn.forEach(function(btn){
  btn.addEventListener('click', function(){
    let parentBtn = btn.parentElement;
    let parentParentBtn = parentBtn.parentElement;
    let mainParentBtn = parentParentBtn.parentElement;
    mainParentBtn.classList.toggle('active');
  });
});


let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
	menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  if(menu.classList.contains('active')){
    document.body.style.overflow = 'hidden';
  }else {
    document.body.style.overflow = 'auto';
  }
})



document.addEventListener("DOMContentLoaded", function(){
        
  let phoneInputs = document.querySelectorAll('input[data-tel-input]');

  let getInputNumbersValue = function(input){
    return input.value.replace(/\D/g,"");
  }

  let onPhoneInput = function(e){
    let input = e.target,
    inputNumbersValue = getInputNumbersValue(input);
    formattedInputValue = "";
    selectionStart = input.selectionStart;

    if(!inputNumbersValue){
      return  input.value = "";
    }

    if(input.value.length != selectionStart){
      if(e.data && /\D/g.test(e.data)){
        input.value = inputNumbersValue;
      }
      return
    }


    if(["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1){
      if(inputNumbersValue[0] == "9"){
        inputNumbersValue = "7" + inputNumbersValue;
      }
      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";
      if(inputNumbersValue.length > 1){
        formattedInputValue += "(" + inputNumbersValue.substring(1,4)
      }
      if(inputNumbersValue.length >= 5){
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if(inputNumbersValue.length >= 8){
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if(inputNumbersValue.length >= 10){
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    }
    else{
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }


  let onPhoneKeyDown = function(e){
    let input = e.target;
    if(e.keyCode == 8 && getInputNumbersValue(input).length ==1){
      input.value = "";
    }
  }

  let onPhonePaste = function(e){
    let pasted = e.clipboardData || window.clipboardData,
    input = e.target,
    inputNumbersValue = getInputNumbersValue(input);

    if(pasted){
      let pastedText = pasted.getData("Text");
      if(/\D/g.test(pastedText)){
        input.value = inputNumbersValue;
      }
    }
  }

  for(i=0; i<phoneInputs.length; i++){
    let input =  phoneInputs[i];
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
    }
  })




  