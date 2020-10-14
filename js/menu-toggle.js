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

var prev = document.querySelector(".main-slider_prev-slide");
var next = document.querySelector(".main-slider_next-slide");
var slider = document.querySelector(".main-slider_sliders");

next.addEventListener("click", function(){
    slider.setAttribute("style", "transform: translate3d(-320px; 0; 0);");

})