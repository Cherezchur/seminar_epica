//кнопка мобильного меню

var navMane = document.querySelector(".header_menu");
var navToggle = document.querySelector(".header_navbar-toggler");

navToggle.addEventListener("click", function(){
    if (navMane.classList.contains("header_menu--opend")) {
        navMane.classList.remove("header_menu--opend");
        navMane.classList.add("header_menu--closed");
    } else {
        navMane.classList.add("header_menu--opend");
        navMane.classList.remove("header_menu--closed");
    }
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

$(".seminar-des_button--des").click(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--des").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--des").addClass("tab");
    }
)

$(".seminar-des_button--steps").click(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--steps").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--steps").addClass("tab");
    }
)

$(".seminar-des_button--doc").click(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--doc").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--doc").addClass("tab");
    }
)

$(".seminar-des_button--des").focus(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--des").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--des").addClass("tab");
    }
)

$(".seminar-des_button--steps").focus(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--steps").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--steps").addClass("tab");
    }
)

$(".seminar-des_button--doc").focus(
    function(){
        $(this).addClass("active-button").removeClass("tabButton");
        $(".tabButton").removeClass("active-button");
        $(this).addClass("tabButton");
        $(".seminar-des_item--doc").addClass("active-tab").removeClass("tab");
        $(".tab").removeClass("active-tab");
        $(".seminar-des_item--doc").addClass("tab");
    }
)

//события дял отктытия и скрытия информации о семинарах


$(".seminar_text-content").click(function(){
    let hiddenText = $(this).find(".seminar_hidden");
    hiddenText.removeClass("visually-hidden");
})

$(".seminar-text_content").hover(function(){
    let hiddenText = $(this).find(".seminar_hidden");
    hiddenText.removeClass("visually-hidden");
})

$(".seminar_button").focus(function(){
    let hiddenText = $(this).parent(".seminar_hidden");
    hiddenText.removeClass("visually-hidden");
})

$(".seminar_button").blur(function(){
    let hiddenText = $(this).parent(".seminar_hidden");
    hiddenText.addClass("visually-hidden");
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