/*-----------------------------------------------------------
* Template Name    : Payne - Creative Portfolio Template
* Author           : gtomdesign
* Version          : 1.0
* Created          : June 2020
* File Description : Main Js file of the template
*------------------------------------------------------------
*/

! function($) {
    "use strict";


    var image = document.getElementsByClassName('parallax-right');
    new simpleParallax(image, {
        orientation: 'left',
        transition: 'cubic-bezier(0,0,0,1)'
    });

    var image = document.getElementsByClassName('parallax-image');
    new simpleParallax(image, {
        transition: 'cubic-bezier(0,0,0,1)'
    });

    /* ---------------------------------------------- /*
    * Preloader & Scroll init
    /* ---------------------------------------------- */

    $(window)
    .on('load', function() {
        $('#preloader').addClass("loaded");

        setTimeout(function(){
            $('#preloader').remove();
        }, 5000)

        let didScroll = false;
        let paralaxTitlesL = document.querySelectorAll('.trans-left');
        let paralaxTitlesR = document.querySelectorAll('.trans-right');

        const scrollInProgress = () => {
            didScroll = true
        }

        const raf = () => {
            if(didScroll) {
                paralaxTitlesL.forEach((element, index) => {
                    element.style.transform = "translate(-"+ window.scrollY / 30 + "% , 0px)"
                })
                paralaxTitlesR.forEach((element, index) => {
                    element.style.transform = "translate("+ window.scrollY / 30 + "% , 0px)"
                })
                didScroll = false;
            }
            requestAnimationFrame(raf);
        }


        requestAnimationFrame(raf);
        window.addEventListener('scroll', scrollInProgress)

    })


    .on("scroll",function() {

        $(".portfolio-item--content").each(function() {
            if (isScrolledIntoView($(this))) {
                $(this).addClass("reveal");
            }
        });

        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top - 200;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

    });

    /* ---------------------------------------------- /*
    * Section Scroll - Navbar
    /* ---------------------------------------------- */
    
    $(".scroll-up").on('click', function(e){
        e.preventDefault();
       $("html, body").animate({scrollTop: 0}, 1000);
    });

    $('.nav-content a').on('click', function(event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500);

        $("body").removeClass("nav-active")
        
        event.preventDefault();
    });

    /* ---------------------------------------------- /*
    * Initialize shuffle plugin
    /* ---------------------------------------------- */

    var $portfolioContainer = $('.list-items-container');

    $('#filter li').on('click', function (e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).addClass('active');

        var group = $(this).attr('data-group');
        var groupName = $(this).attr('data-group');

        $portfolioContainer.shuffle('shuffle', groupName );
    });

    /* ---------------------------------------------- /*
    * Swipper - Init
    /* ---------------------------------------------- */

    // Testimony init

    var swipertest = new Swiper('.swiper-testimony', {
        spaceBetween: 30,
        pagination: {
            el: '.testimony-pagination',
            clickable: true,
        }
    });

    // Home Banner Init

    var swiper = new Swiper('.swiper-home', {
        spaceBetween: 3,
        effect: 'fade',
        pagination: {
            el: '.home-pagination',
            clickable: true,
        }
    });


    /* ---------------------------------------------- /*
    * Progress 
    /* ---------------------------------------------- */

    $(window).scroll(function () {

        if($(".progressbar").length > 0) {

        var s = $(window).scrollTop(),
                d = $(document).height(),
                c = $(window).height();
                var scrollPercent = (s / (d-c)) * 100;
                var position = scrollPercent;

           $(".progressbar .line").css('height', position+"%");

        }

    });


    /* ---------------------------------------------- /*
    * Custom Cursor Follower - init
    /* ---------------------------------------------- */
    
    var cursor   = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.016, {
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
            css: {
            left: posX - 12,
            top: posY - 12
            }
        });

        TweenMax.set(cursor, {
            css: {
            left: mouseX,
            top: mouseY
            }
        });
      }
    });

    $(document).on("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    $("a, h1").on("mouseenter", function() {
        if($(this).hasClass('text-inverse')){
            cursor.addClass("active-inverse");
            follower.addClass("active-inverse"); 
        } else {
            cursor.addClass("active");
            follower.addClass("active"); 
        }
    });

    $("a, h1").on("mouseleave", function() {
        if($(this).hasClass('text-inverse')){
            cursor.removeClass("active-inverse");
            follower.removeClass("active-inverse");
        } else {
            cursor.removeClass("active");
            follower.removeClass("active");
        }
        
    });

    $(".navbar-toggler").on("mouseleave", function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });

    

    /* ---------------------------------------------- /*
    * mouse follower remove area 
    /* ---------------------------------------------- */

    // console.clear();

    const app = (() => {
      let body;
      let menu;
      let menuItems;

      const init = () => {
        body = document.querySelector('body');
        menu = document.querySelector('.menu-icon');
        menuItems = document.querySelectorAll('.nav-link');

        applyListeners();
      };

      const applyListeners = () => {
        menu.addEventListener('click', () => toggleClass(body, 'nav-active'));
      };

      const toggleClass = (element, stringClass) => {
        if (element.classList.contains(stringClass))
        element.classList.remove(stringClass);else

        element.classList.add(stringClass);
      };

      init();
    })();


/* ---------------------------------------------- /*
* Magenic Hams
/* ---------------------------------------------- */

var hoverMouse = function($el) {
  $el.each(function() {
    var $self = $(this);
    var hover = false;
    var offsetHoverMax = $self.attr("offset-hover-max") || .2;
    var offsetHoverMin = $self.attr("offset-hover-min") || .2;

    var attachEventsListener = function() {
      $(window).on("mousemove", function(e) {
        //
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY - $(window).scrollTop()
        };

        // size
        var width = $self.outerWidth();
        var height = $self.outerHeight();

        // position
        var offset = $self.offset();
        var elPos = {
          x: offset.left + width / 2,
          y: offset.top + height / 2
        };

        // comparaison
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;

        // dist
        var dist = Math.sqrt(x * x + y * y);

        // mutex hover
        var mutHover = false;

        // anim
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };

    var onHover = function(x, y) {

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        TweenMax.to($self, 0.4, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0
        });
      } else {

        TweenMax.to($self, 0.4, {
          x: x * 0.8,
          y: y * 0.8,
          //scale: .9,
          rotation: x * 0.05,
          ease: Power2.easeOut
        });
      }
    };
    var onLeave = function() {
      TweenMax.to($self, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4)
      });
    };

    attachEventsListener();
  });
};


hoverMouse($('.section-head'));


}(window.jQuery);

