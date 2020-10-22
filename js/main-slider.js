let sliderMa = document.querySelector(".main-slider"),
    sliderListMa = document.querySelector(".main-slider_slick"),
    sliderTrackMa = document.querySelector(".main-slider_sliders"),
    slidesMa = document.querySelector(".main-slider_content"),
    slideWidthMa = slidesMa.offsetWidth,
    slideIndexMa = 0,
    posInitMa = 0,
    posX1Ma = 0,
    posX2Ma = 0,
    posY1Ma = 0,
    posY2Ma = 0,
    posFinalMa = 0,
    isSwipeMa = false,
    isScrollMa = false,
    allowSwipeMa = true,
    transitionMa = true,
    nextTrfMa = 0,
    prevTrfMa = 0,
    lastTrfMa = --slidesMa.length * slideWidthMa,
    lastIndexMa = $(".main-slider_sliders").children(slidesMa).length,
    posThresholdMa = slidesMa.offsetWidth * 0.35,
    trfRegExpMa = /([-0-9.]+(?=px))/,
    nextSlideMa = document.querySelector(".main-slider_next-slide"),
    prevSlideMa = document.querySelector(".main-slider_prev-slide"),
    buttonSlide = document.querySelector(".main-slider_button"),
    // dots = document.querySelectorAll(".teachers_dot"),

    getEventMa = function() {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slideMa = function() {

        //активные номера
      indexDotMa = $(".main-slider_number").get(slideIndexMa),
      indexDotMa.classList.add("main-slider_active-number");
      indexDotMa.classList.remove("slide-number");
      $(".slide-number").removeClass("main-slider_active-number");
      indexDotMa.classList.add("slide-number");

      if (transitionMa) {
        sliderTrackMa.style.transition = 'transform .5s';
      }

      console.log(slideIndexMa),


      sliderTrackMa.style.transform = `translate3d(-${slideIndexMa * slideWidthMa}px, 0px, 0px)`;  
    },

    swipeStartMa = function() {
      let evtMa = getEventMa();
  
      if (allowSwipeMa) {
  
        transitionMa = true;
  
        nextTrfMa = (slideIndexMa + 1) * -slideWidthMa;
        prevTrfMa = (slideIndexMa - 1) * -slideWidthMa;
  
        posInitMa = posX1Ma = evtMa.clientX;
        posY1Ma = evtMa.clientY;
  
        sliderTrackMa.style.transition = '';
  
        document.addEventListener('touchmove', swipeActionMa);
        document.addEventListener('mousemove', swipeActionMa);
        document.addEventListener('touchend', swipeEndMa);
        document.addEventListener('mouseup', swipeEndMa);
  
        sliderListMa.classList.remove('grab');
        sliderListMa.classList.add('grabbing');
      }
    },
    swipeActionMa = function() {
  
      let evtMa = getEventMa(),
        style = sliderTrackMa.style.transform,
        transform = +style.match(trfRegExpMa)[0];
  
      posX2Ma = posX1Ma - evtMa.clientX;
      posX1Ma = evtMa.clientX;
  
      posY2Ma = posY1Ma - evtMa.clientY;
      posY1Ma = evtMa.clientY;
  
      // определение действия свайп или скролл
      if (!isSwipeMa && !isScrollMa) {
        let posYMa = Math.abs(posY2Ma);
        if (posYMa > 7 || posX2Ma === 0) {
          isScrollMa = true;
          allowSwipeMa = false;
        } else if (posYMa < 7) {
          isSwipeMa = true;
        }
      }
  
      if (isSwipeMa) {
        // запрет ухода влево на первом слайде
        if (slideIndexMa === 0) {
          if (posInitMa < posX1Ma) {
            setTransformMa(transform, 0);
            return;
          } else {
            allowSwipeMa = true;
          }
        }

        // запрет ухода вправо на последнем слайде 
        if (slideIndexMa === (lastIndexMa - 1)) {
          if (posInitMa > posX1Ma) {
            setTransformMa(transform, lastTrf);
            return;
          } else {
            allowSwipeMa = true;
          }
        }
  
        // запрет протаскивания дальше одного слайда
        if (posInitMa > posX1Ma && transform < nextTrfMa || posInitMa < posX1Ma && transform > prevTrfMa) {
          reachEdgeMa();
          return;
        }
  
        // двигаем слайд
        sliderTrackMa.style.transform = `translate3d(${transform - posX2Ma}px, 0px, 0px)`;
      }
  
    },
    swipeEndMa = function() {
      posFinalMa = posInitMa - posX1Ma;
  
      isScrollMa = false;
      isSwipeMa = false;
  
      document.removeEventListener('touchmove', swipeActionMa);
      document.removeEventListener('mousemove', swipeActionMa);
      document.removeEventListener('touchend', swipeEndMa);
      document.removeEventListener('mouseup', swipeEndMa);
  
      sliderListMa.classList.add('grab');
      sliderListMa.classList.remove('grabbing');
  
      if (allowSwipeMa) {
        if (Math.abs(posFinalMa) > posThresholdMa) {
          if (posInitMa < posX1Ma) {
            slideIndexMa--;
          } else if (posInitMa > posX1Ma) {
            slideIndexMa++;
          }
        }
  
        if (posInitMa !== posX1Ma) {
          allowSwipeMa = false;
          slideMa();
        } else {
          allowSwipeMa = true;
        }
  
      } else {
        allowSwipeMa = true;
      }
  
    },
    setTransformMa = function(transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrackMa.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipeMa = false;
    },
    reachEdgeMa = function() {
      transitionMa = false;
      swipeEndMa();
      allowSwipeMa = true;
    };
  
  sliderTrackMa.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderListMa.classList.add('grab');
  
  sliderTrackMa.addEventListener('transitionend', () => allowSwipeMa = true);
  sliderMa.addEventListener('touchstart', swipeStartMa);
  sliderMa.addEventListener('mousedown', swipeStartMa);

  //событие клика по стрелкам

  nextSlideMa.addEventListener("click", function() {
      slideIndexMa++;
      if (slideIndexMa >= (lastIndexMa)) {
          slideIndex = (lastIndexMa);
          return;
      }
      slideMa();
  })

  prevSlideMa.addEventListener("click", function() {
      slideIndexMa--;
      if (slideIndexMa < 0) {
          slideIndexMa = 0;
          return;
      }
      slideMa();
  })

  //событие фокуса на кнопки записаться
 /*
  $(".main-slider_button").focus(function() {
      
    let thisIndex = $(this).parent("main-slider_content");
    console.log(thisIndex.index());
    console.log(slideIndexMa);
    slideMa();
    return;
})
*/
/*
  $(document).ready(function () {

    var timeList = 300;
    var TimeView = 5000;
    var RadioBut = true;
    
    $('.main-slider_content').hide().eq(0).show();
    var slideNum = 0;
    var slideTime;
    slideCount = $(".main-slider_content").length;
    
    var animSlide = function(arrow){
        clearTimeout(slideTime); 
            
        function slideDirectionHide(slideFloatNum, directTo){
                $('.main-slider_content').eq(slideFloatNum).fadeOut(timeList); 
        }
    
        function slideDirectionShow(slideFloatNum, directTo, pause){
                $('.main-slider_content').eq(slideFloatNum).fadeIn(timeList, function() {
                    if(pause == true) { rotator(); }
                }); 
        }
        
        var old_slideNum = slideNum;
            
        if(arrow == "next"){
                slideDirectionHide(slideNum, "left");
                if(slideNum == (slideCount-1)){slideNum=0;}
                else{slideNum++}
                slideDirectionShow(slideNum, "right", true);
                }
        else if(arrow == "prew")
        {
                slideDirectionHide(slideNum, "right");
                if(slideNum == 0){slideNum=slideCount-1;}
                else{slideNum-=1}
                slideDirectionShow(slideNum, "left", true);
        }else{
                    if(arrow !== old_slideNum)
                    { 
                        if(arrow > old_slideNum)
                        {
                            slideDirectionHide(slideNum, "left");
                            slideNum = arrow;
                            slideDirectionShow(slideNum, "right", true);
                        }else if(arrow < old_slideNum) {
                            slideDirectionHide(slideNum, "right");
                            slideNum = arrow;
                            slideDirectionShow(slideNum, "left", true);
                        }
    
                    }
        }
    
        $(".ctrl-select.active").removeClass("active");
        $('.ctrl-select').eq(slideNum).addClass('active');
    }
    
    
        if(RadioBut){
        var linkArrow = $('<a id="prewBut" href="#">&lt;</a><a id="nextBut" href="#">&gt;</a>')
            .prependTo('#slider');
            $('#nextBut').click(function(){
               animSlide("next");
               return false;
               })
            $('#prewBut').click(function(){
               animSlide("prew");
               return false;
               })
        }
            var addSpan ='';
            $('.slide').each(function(index) {
                   addSpan += '<span class = "ctrl-select">' + index + '</span>';
               });
            $('<div class ="Radio-But">' + addSpan +'</div>').appendTo('#slider-wrap');
            $(".ctrl-select:first").addClass("active");
            $('.ctrl-select').click(function(){
            var goToNum = parseFloat($(this).text());
            animSlide(goToNum);
            });
            var pause = false;
            var rotator = function(){
                   if(!pause){slideTime = setTimeout(function(){animSlide('next')}, TimeView);}
                   }
            $('#slider-wrap').hover(
               function(){clearTimeout(slideTime); pause = true;},
               function(){pause = false; rotator();
               });
            
        var clicking = false;
        var prevX;
        $('.slide').mousedown(function(e){
            clicking = true;
            prevX = e.clientX;
        });
    
        $('.slide').mouseup(function() {
         clicking = false;
        });
    
        $(document).mouseup(function(){
            clicking = false;
        });
    
        $('.slide').mousemove(function(e){
            if(clicking == true)
             {
                 if(e.clientX < prevX) { animSlide("next"); clearTimeout(slideTime); }
                 if(e.clientX > prevX) { animSlide("prew"); clearTimeout(slideTime); }
               clicking = false;
            }
        });
        $('.slide').hover().css('cursor', 'pointer');
        rotator();  
    
    });

    */