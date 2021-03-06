let slider = document.querySelector(".slider-container"),
    sliderList = document.querySelector(".teachers_container"),
    sliderTrack = document.querySelector(".teachers_list"),
    slides = document.querySelector(".teachers_item"),
    arrows = document.querySelector(".arrows"),
    prev = document.querySelector(".teachers_arrow-prev"),
    next = document.querySelector(".teachers_arrow-next"),
    slideWidth = slides.offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides.offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    dots = document.querySelectorAll(".teachers_dot"),

    getEvent = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {

        //активные точки
        indexDot = $(".teachers_dot").get(slideIndex),
        indexDot.classList.add("active-dot");
        indexDot.classList.remove("dot");
        $(".dot").removeClass("active-dot");
        indexDot.classList.add("dot");

      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }

      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
  
      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === 7);      

      console.log(slideIndex);
    },
    swipeStart = function() {
      let evt = getEvent();
  
      if (allowSwipe) {
  
        transition = true;
  
        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;
  
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
  
        sliderTrack.style.transition = '';
  
        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
  
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    },
    swipeAction = function() {
  
      let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
  
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
  
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
  
      // определение действия свайп или скролл
      if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
        }
      }
  
      if (isSwipe) {
        // запрет ухода влево на первом слайде
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет ухода вправо на последнем слайде
        if(window.matchMedia('(min-width: 1920px)').matches){
            if (slideIndex === 4) {
                if (posInit > posX1) {
                  setTransform(transform, lastTrf);
                  return;
                } else {
                  allowSwipe = true;
                }
              }
        }

        if(window.matchMedia('(min-width: 1024px)').matches){
            if (slideIndex === 5) {
                if (posInit > posX1) {
                  setTransform(transform, lastTrf);
                  return;
                } else {
                  allowSwipe = true;
                }
              }
        }

        if (slideIndex === 7) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет протаскивания дальше одного слайда
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }
  
        // двигаем слайд
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }
  
    },
    swipeEnd = function() {
      posFinal = posInit - posX1;
  
      isScroll = false;
      isSwipe = false;
  
      document.removeEventListener('touchmove', swipeAction);
      document.removeEventListener('mousemove', swipeAction);
      document.removeEventListener('touchend', swipeEnd);
      document.removeEventListener('mouseup', swipeEnd);
  
      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');
  
      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }
  
        if (posInit !== posX1) {
          allowSwipe = false;
          slide();
        } else {
          allowSwipe = true;
        }
  
      } else {
        allowSwipe = true;
      }
  
    },
    setTransform = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    },
    reachEdge = function() {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };
  
  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);

  //событие клика по стрелкам

    if (window.matchMedia('(min-width: 1920px)').matches){

        next.addEventListener("click", function() {
            slideIndex++;
            if (slideIndex >= 5) {
                slideIndex = 4;
                return;
            }
            slide();
        })
    }

    if (window.matchMedia('(min-width: 1024px) and (max-width: 1919px)').matches){

        next.addEventListener("click", function() {
            slideIndex++;
            if (slideIndex >= 6) {
                slideIndex = 5;
                return;
            }
            slide();
        })
    }

    if (window.matchMedia('(max-width: 1023px)').matches){

        next.addEventListener("click", function() {
            slideIndex++;
            if (slideIndex >= 8) {
                slideIndex = 7;
                return;
            }
            slide();
        })
    }

    prev.addEventListener("click", function() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = 0;
            return;
        }
        slide();
    })

    //событие клика по точкам

    $(".teachers_dot").click(
        function(){
            $(this).addClass("active-dot").removeClass("dot");
            $(".dot").removeClass("active-dot");
            $(this).addClass("dot");

            slideIndex = $(this).index();
            slide();
        }
    )

    $(".teachers_dot").focus(
        function(){
            $(this).addClass("active-dot").removeClass("dot");
            $(".dot").removeClass("active-dot");
            $(this).addClass("dot");

            slideIndex = $(this).index();
            slide();
        }
    )