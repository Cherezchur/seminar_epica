//кнопка мобильного меню

var navMane = document.querySelector(".header_menu");
var navToggle = document.querySelector(".header_navbar-toggler");
var navList = document.querySelector(".header_main-list");
var navLink = document.querySelector(".nav-link");

if (window.matchMedia('(min-width: 1024px)').matches){
    navMane.classList.add("header_menu--opend");
    navMane.classList.remove("header_menu--closed");
    navList.classList.remove("visually-hidden");
}

navToggle.addEventListener("click", function(){
    if (navMane.classList.contains("header_menu--opend")) {
        navMane.classList.remove("header_menu--opend");
        navMane.classList.add("header_menu--closed");
    } else {
        navMane.classList.add("header_menu--opend");
        navMane.classList.remove("header_menu--closed");
    }

    if (navList.classList.contains("visually-hidden")) {
        navList.classList.remove("visually-hidden");
    } else {
        navList.classList.add("visually-hidden")
    }
});

navLink.addEventListener("focus", function(){
    navMane.classList.add("header_menu--opend");
    navMane.classList.remove("header_menu--closed");
    navList.classList.remove("visually-hidden");
})

//события дял отктытия и скрытия информации о семинарах


$(".seminar_button").focus(function(){
    let hiddenText = $(this).parent(".seminar_hidden");
    hiddenText.removeClass("visually-hidden");
    if (window.matchMedia('(max-width: 767px)').matches){
        let hiddenBlock = hiddenText.parent(".seminar_text-content");
        hiddenBlock.addClass("height-text");
    }
    console.log(hiddenBlock);
})

$(".seminar_button").blur(function(){
    let hiddenText = $(this).parent(".seminar_hidden");
    hiddenText.addClass("visually-hidden");
    if (window.matchMedia('(max-width: 767px)').matches){
        let hiddenBlock = hiddenText.parent(".seminar_text-content");
        hiddenBlock.removeClass("height-text");
    }
})

$(".seminar_text-content").mouseenter(function(){
    let hiddenText = $(this).find(".seminar_hidden");
    if (hiddenText.hasClass("visually-hidden")) {
        hiddenText.removeClass("visually-hidden");
        if (window.matchMedia('(max-width: 767px)').matches){
            $(this).addClass("height-text");
        }
    }
})

$(".seminar_text-content").mouseleave(function(){
    let hiddenText = $(this).find(".seminar_hidden");
    if (hiddenText.hasClass("visually-hidden")) {
        return;
    } else {
        hiddenText.addClass("visually-hidden");
        $(this).removeClass("height-text");
    }
})

$(document).click( function(e){
    if ( $(e.target).closest('.seminar_text-content').length ) {
        // клик внутри элемента
        return;
    }
    // клик снаружи элемента
    let hiddenText = $(this).find(".seminar_hidden");
    hiddenText.addClass("visually-hidden");
});

//Отображение активных картинок в галерее

var picture = document.querySelectorAll(".gallery_item");

$(".gallery_item").click(
    function () {
        $(this).addClass("active-image").removeClass("picture");
        $(".picture").removeClass("active-image");
        $(this).addClass("picture");
    },
)

//переключение активных окон на странице семинаров

function tabActive(className){
    $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        className.addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        className.addClass("tab");
}

$(".seminar-des_button--des").click(
    function () {
        tabActive($(".seminar-des_item--des"))
    }
)

$(".seminar-des_button--steps").click(
    function () {
        tabActive($(".seminar-des_item--steps"))
    }
)

$(".seminar-des_button--doc").click(
    function () {
        tabActive($(".seminar-des_item--doc"))
    }
)

$(".seminar-des_button--des").focus(
    function () {
        tabActive($(".seminar-des_item--des"))
    }
)

$(".seminar-des_button--steps").focus(
    function () {
        tabActive($(".seminar-des_item--steps"))
    }
)

$(".seminar-des_button--doc").focus(
    function () {
        tabActive($(".seminar-des_item--doc"))
    }
)

//вызов popup

$(".popup_close-button").click(function(){
    $(".popup").removeClass("modal-show");
})
function popupOpend () {
    $(".popup").addClass("modal-show")
}

$(".popup-show").click(function(){
    popupOpend();
})