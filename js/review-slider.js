let sliderRe = document.querySelector(".review_slider"),
    sliderListRe = document.querySelector(".review_container"),
    sliderTrackRe = document.querySelector(".review_list-slider"),
    slidesRe = document.querySelector(".review_item-slide"),
    slideWidthRe = slidesRe.offsetWidth,
    slideIndexRe = 0,
    posInitRe = 0,
    posX1Re = 0,
    posX2Re = 0,
    posY1Re = 0,
    posY2Re = 0,
    posFinalRe = 0,
    isSwipeRe = false,
    isScrollRe = false,
    allowSwipeRe = true,
    transitionRe = true,
    nextTrfRe = 0,
    prevTrfRe = 0,
    lastTrfRe = --slidesRe.length * slideWidthRe,
    posThresholdRe = slidesRe.offsetWidth * 0.35,
    trfRegExpRe = /([-0-9.]+(?=px))/,

    getEvent1 = function() {
       return (event.type.search('touch') !== -1) ? event.touches[0] : event;
     },
    slideRe = function() {

      //активные точки

      indexDotRe = $(".review_dot").get(slideIndexRe);
      indexDotRe.classList.add("review_active-dot");
      indexDotRe.classList.remove("dot-buffer");
      $(".dot-buffer").removeClass("review_active-dot");
      indexDotRe.classList.add("dot-buffer");

      //порядковое число слайда

      indexNumber = $(".review_number").get(slideIndexRe);
      indexNumber.classList.add("active-number");
      indexNumber.classList.remove("review_number");
      $(".review_number").removeClass("active-number");
      indexNumber.classList.add("review_number");

      // if (slideIndexRe === 0) {
      //   $(slideNumber).css("content", "02");
      // }

      if (transitionRe) {
        sliderTrackRe.style.transition = 'transform .5s';
      }

      sliderTrackRe.style.transform = `translate3d(-${slideIndexRe * slideWidthRe}px, 0px, 0px)`;
  
    //   prev.classList.toggle('disabled', slideIndex === 0);
    //   next.classList.toggle('disabled', slideIndex === 7);      

      console.log(slideIndexRe);
    },
    swipeStart1 = function() {
      let evtRe = getEvent1();
  
      if (allowSwipeRe) {
  
        transitionRe = true;
  
        nextTrfRe = (slideIndexRe + 1) * -slideWidthRe;
        prevTrfRe = (slideIndexRe - 1) * -slideWidthRe;
  
        posInitRe = posX1Re = evtRe.clientX;
        posY1Re = evtRe.clientY;
  
        sliderTrackRe.style.transition = '';
  
        document.addEventListener('touchmove', swipeAction1);
        document.addEventListener('mousemove', swipeAction1);
        document.addEventListener('touchend', swipeEnd1);
        document.addEventListener('mouseup', swipeEnd1);
  
        sliderListRe.classList.remove('grab');
        sliderListRe.classList.add('grabbing');
      }
    },
    swipeAction1 = function() {
  
      let evtRe = getEvent1(),
        style = sliderTrackRe.style.transform,
        transform = +style.match(trfRegExpRe)[0];
  
      posX2Re = posX1Re - evtRe.clientX;
      posX1Re = evtRe.clientX;
  
      posY2Re = posY1Re - evtRe.clientY;
      posY1Re = evtRe.clientY;
  
      // определение действия свайп или скролл
      if (!isSwipeRe && !isScrollRe) {
        let posYRe = Math.abs(posY2Re);
        if (posYRe > 7 || posX2Re === 0) {
          isScrollRe = true;
          allowSwipeRe = false;
        } else if (posYRe < 7) {
          isSwipeRe = true;
        }
      }
  
      if (isSwipeRe) {
        // запрет ухода влево на первом слайде
        if (slideIndexRe === 0) {
          if (posInitRe < posX1Re) {
            setTransformRe(transform, 0);
            return;
          } else {
            allowSwipeRe = true;
          }
        }
  
        // запрет ухода вправо на последнем слайде
        if(window.matchMedia('(min-width: 1920px)').matches){
            if (slideIndexRe === 4) {
                if (posInitRe > posX1Re) {
                  setTransformRe(transform, lastTrfRe);
                  return;
                } else {
                  allowSwipeRe = true;
                }
              }
        }

        if(window.matchMedia('(min-width: 1024px)').matches){
            if (slideIndexRe === 5) {
                if (posInitRe > posX1Re) {
                  setTransformRe(transform, lastTrfRe);
                  return;
                } else {
                  allowSwipeRe = true;
                }
              }
        }

        if (slideIndexRe === 6) {
          if (posInitRe > posX1Re) {
            setTransformRe(transform, lastTrfRe);
            return;
          } else {
            allowSwipeRe = true;
          }
        }
  
        // запрет протаскивания дальше одного слайда
        if (posInitRe > posX1Re && transform < nextTrfRe || posInitRe < posX1Re && transform > prevTrfRe) {
          reachEdgeRe();
          return;
        }
  
        // двигаем слайд
        sliderTrackRe.style.transform = `translate3d(${transform - posX2Re}px, 0px, 0px)`;
      }
  
    },
    swipeEnd1 = function() {
      posFinalRe = posInitRe - posX1Re;
  
      isScrollRe = false;
      isSwipeRe = false;
  
      document.removeEventListener('touchmove', swipeAction1);
      document.removeEventListener('mousemove', swipeAction1);
      document.removeEventListener('touchend', swipeEnd1);
      document.removeEventListener('mouseup', swipeEnd1);
  
      sliderListRe.classList.add('grab');
      sliderListRe.classList.remove('grabbing');
  
      if (allowSwipeRe) {
        if (Math.abs(posFinalRe) > posThresholdRe) {
          if (posInitRe < posX1Re) {
            slideIndexRe--;
          } else if (posInitRe > posX1Re) {
            slideIndexRe++;
          }
        }
  
        if (posInitRe !== posX1Re) {
          allowSwipeRe = false;
          slideRe();
        } else {
          allowSwipeRe = true;
        }
  
      } else {
        allowSwipeRe = true;
      }
  
    },
    setTransformRe = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrackRe.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipeRe = false;
    },
    reachEdgeRe = function() {
      transitionRe = false;
      swipeEnd1();
      allowSwipeRe = true;
    };
  
  sliderTrackRe.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderListRe.classList.add('grab');
  
  sliderTrackRe.addEventListener('transitionend', () => allowSwipeRe = true);
  sliderRe.addEventListener('touchstart', swipeStart1);
  sliderRe.addEventListener('mousedown', swipeStart1);

  //событие клика по точкам

  $(".review_dot").click(
    function(){
        $(this).addClass("review_active-dot").removeClass("dot-buffer");
        $(".dot-buffer").removeClass("review_active-dot");
        $(this).addClass("dot-buffer");

        slideIndexRe = $(this).index();
        slideRe();
    }
  )

  $(".review_dot").focus(
    function(){
        $(this).addClass("review_active-dot").removeClass("dot-buffer");
        $(".dot-buffer").removeClass("review_active-dot");
        $(this).addClass("dot-buffer");

        slideIndexRe = $(this).index();
        slideRe();
    }
  )


