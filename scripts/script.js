$(document).ready(function () {
  new WOW({
  animateClass: "animate__animated",
}).init();

$(".order__button").click(function () {
  $(".order__button").removeClass("active");
  $(this).addClass("active");
});

$("#phone").inputmask("+375 (99) 999-99-99");

  const swiper = new Swiper($(".mySwiper")[0], {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    watchSlidesProgress: true,
    grabCursor: true,
    navigation: {
      nextEl: $(".swiper-button-next")[0],
      prevEl: $(".swiper-button-prev")[0],
    },
    pagination: {
      el: $(".swiper-pagination")[0],
      clickable: true,
    },
  });

  // Галерея //
  new Swiper($(".gallerySwiper")[0], {
    slidesPerView: 3,
    spaceBetween: 40,

    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    navigation: {
      nextEl: $(".gallery__btn--next")[0],
      prevEl: $(".gallery__btn--prev")[0],
      addIcons: false,
    },

    pagination: {
      el: $(".gallery__pagination")[0],
      clickable: true,
    },
  });

  /* --- Отзывы --- */
  new Swiper($(".reviewsSwiper")[0], {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: $(".reviews__btn--next")[0],
      prevEl: $(".reviews__btn--prev")[0],
      addIcons: false,
    },
    pagination: {
      el: $(".reviews__pagination")[0],
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 24 },
      1200: { slidesPerView: 3, spaceBetween: 42 },
    },
  });

  /* --- Lightbox --- */
  $(".liner__top").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
  });

  $(".gallerySwiper").magnificPopup({
    delegate: "a",
    type: "image",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    closeOnContentClick: false,
    closeBtnInside: false,
  });
  const nav = $("#nav");
  const overlay = $(".overlay");
  const body = $("body");

  function openMenu() {
    nav.addClass("active");
    overlay.addClass("active");
    body.css("overflow", "hidden");
  }

  function closeMenu() {
    nav.removeClass("active");
    overlay.removeClass("active");
    body.css("overflow", "");
  }

  $(".burger").on("click", openMenu);
  $("#close, .overlay, .nav__list a").on("click", closeMenu);

  $(window).on("resize", function () {
    if ($(window).width() >= 1200) {
      closeMenu();
    }
  });
  $(".order__form").submit(function (event) {
  event.preventDefault();
  const name = $("#name");
  const phone = $("#phone");
  const agree = $("#agree");
  let hasError = false;

  $(".error-input").hide();
  $(".order__form-input").css("border-color", "");

  if (!name.val().trim()) {
    name.css("border-color", "red");
    name.next().show();
    hasError = true;
  }

  if (!phone.val().trim()) {
    phone.css("border-color", "red");
    phone.next().show();
    hasError = true;
  }

  if (!agree.is(":checked")) {
    agree.closest("label").next().show();
    hasError = true;
  }

  if (!hasError) {
    $.ajax({
      method: "POST",
      url: "https://testologia.ru/checkout",
      data: {
        name: name.val(),
        phone: phone.val(),
      },
    }).done(function (msg) {
      const form = $(".order__form");
      if (msg.success === 1) {
        const orderText = $(".order__description");
        const successBlock = $(".order-success");
        form.hide();
        orderText.hide();
        successBlock.css("display", "flex");
        setTimeout(function () {
          successBlock.hide();
          form.show();
          form[0].reset();
          orderText.show(); 
        }, 15000);
      } else {
        alert(
          "Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!",
        );
        form[0].reset();
      }
    });
  }
});
});









// $(document).ready(function () {
//   $(".burger").on("click", function () {
//     $("#nav").addClass("active");
//     $(".overlay").addClass("active");
//     $("body").css("overflow", "hidden");
//   });

//   $("#close, .overlay, .nav__list a").on("click", function () {
//     $("#nav").removeClass("active");
//     $(".overlay").removeClass("active");
//     $("body").css("overflow", "");
//   });
//   $(window).on("resize", function () {
//     if ($(window).width() >= 1200) {
//       $("#nav").removeClass("active");
//       $(".overlay").removeClass("active");
//       $("body").css("overflow", "");
//     }
//   });
// });
