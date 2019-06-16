/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/

/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style, headerHeight;
	

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	$(window).on('scroll', function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
		if ( winScr > 100 ) {
			$('header').addClass('headerScrolled');
		} else {
			$('header').removeClass('headerScrolled');
		}
		
		if ( winScr > headerHeight + 100 ) {
			$('header').addClass('responsiveHeaderSrolled');
		} else {
			$('header').removeClass('responsiveHeaderSrolled');
		}
		
	};
	
	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		headerHeight = $('header').outerHeight();
		$('.headerClearFix').css('height', headerHeight );
		$('.navScroll').css('max-height', winH - $('.headerBottomInfo').outerHeight() );
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
	$('.SelectBox').SumoSelect();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).on('load', function(){
		_functions.initSwiper();
		$('body').addClass('loaded');
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				effect: ($t.is('[data-effect]'))?($t.data('effect'), 'fade'):'slide',
				autoplayDisableOnInteraction: false
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(){
		$('.popup-wrapper, .popup-content').removeClass('active');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tab-menu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabs-block'),
        	tabsMenu = tabsWrapper.find('.tab-menu'),
        	tabsItem = tabsWrapper.find('.tab-entry'),
        	index = tabsMenu.index(this);
        
        tabsItem.filter(':visible').fadeOut(function(){
        	tabsItem.eq(index).fadeIn(function(){
        		tabsFinish = 0;
        	});
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

	//Accordeon
	$('.accordion-title').on('click', function(){
		$(this).closest('.accordion').find('.accordion-title').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});
    
	//Smooth Scroll
    if(!_ismobile) {
        SmoothScroll({ stepSize: 100 })
    };
	
	//lightbox gallery
	var lightbox = $('.lightbox').simpleLightbox({
		disableScroll: false,
		captionSelector: 'self',
		closeText: '',
		alertErrorMessage: "Error",
		history: false,
		navText: ['','']
	});
	
	//Drop downs
	$('nav i.fa').on('click', function() {
		$(this).toggleClass('DDopen');
		$(this).parent().find('> ul').slideToggle(350);
	});
	
	//Responsive menu
	$('.menuIcon').on('click', function() {
		$(this).toggleClass('menuIconActive');
		$(this).closest('header, .middble_menu_area').find('.responsiveWrapper').toggleClass('openMenu');
	});
//	$('.menuIcon').on('click', function() {
//		$(this).toggleClass('menuIconActive');
//		$(this).closest('header, .middble_menu_area').find('.responsiveWrapper').toggleClass('openMenu');
//	});
	
	//Side bar
	$('.resonsiveSideBar').on('click', function() {
		$(this).find('i.fa').toggleClass('sideBarOpen');
		$(this).parent().find('.sideBar').slideToggle(350);
	});

	//Img zoom
	if (!_ismobile && winW > 768 && $('.imgBox').length) {
		$('.imgBox').imgZoom();
	}
	
	//Check out
	$('.difAddres input').change(function() {
		$('.shipAddress').slideToggle(350);
	});
	
	//Tabs
	$('.tabs').on('click', function() {
		$(this).closest('.tabs-block').find('.tabMenuWrapper').slideToggle(350);
		$(this).find('i.fa').toggleClass('tabsOpen');
	});
    
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider(){
        if ( $('#main_slider').length ){
            $("#main_slider").revolution({
                sliderType:"fullscreen",
                sliderLayout:"auto",
                delay:1000000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style: "Gyges",
                        enable: false,
                        hide_onmobile: false,
                        hide_onleave: false,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,1000,750,450,290],
                gridheight:[800,800,800,600,480],
            })
        }
    }
    main_slider();
    
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function green_slider(){
        if ( $('#green_slider').length ){
            $("#green_slider").revolution({
                sliderType:"fullscreen",
                sliderLayout:"auto",
                delay:1000000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style: "Gyges",
                        enable: false,
                        hide_onmobile: false,
                        hide_onleave: false,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,1000,750,450,290],
                gridheight:[1078,800,800,500,480],
            })
        }
    }
    green_slider();
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function middle_slider(){
        if ( $('#middle_slider').length ){
            $("#middle_slider").revolution({
                sliderType:"fullscreen",
                sliderLayout:"auto",
                delay:1000000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style: "Gyges",
                        enable: false,
                        hide_onmobile: false,
                        hide_onleave: false,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 60,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,1000,750,450,290],
                gridheight:[730,730,730,500,480],
            })
        }
    }
    middle_slider();
    
    if ($('.popup-youtube').length) {
        $('.popup-youtube').magnificPopup({
    		disableOn: 700,
    		type: 'iframe',
    		mainClass: 'mfp-fade',
    		removalDelay: 160,
    		preloader: false,

    		fixedContentPos: false
    	});
    };
    
    /*---------------------------------------
			Service2 Slider
	---------------------------------------*/
    function service2_slider(){
        var service2_slider = $(".service2_slider");
        if( service2_slider.length ){
            service2_slider.owlCarousel({
                loop:true,
                margin: 30,
                items: 4,
                nav:true,
                navContainer: '.service2_slider',
                autoplay: false,
                smartSpeed: 2000,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive:{
                    0:{
                        items:1
                    },
                    565:{
                        items:2
                    },
                    992:{
                        items:3
                    },
                    1199:{
                        items:4
                    }
                }
            })
        }
    }
    service2_slider();
    /*---------------------------------------
			Service2 Slider
	---------------------------------------*/
    function clients_slider(){
        var clients_slider = $(".clients_slider_active");
        if( clients_slider.length ){
            clients_slider.owlCarousel({
                loop:true,
                margin: 30,
                items: 1,
                nav:true,
                navContainer: '.clients_slider_inner',
                autoplay: true,
                smartSpeed: 2000,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
            })
        }
    }
    clients_slider();
    /*---------------------------------------
			Service2 Slider
	---------------------------------------*/
    function award_slider(){
        var award_slider = $(".award_slider");
        if( award_slider.length ){
            award_slider.owlCarousel({
                loop:true,
                margin: 0,
                items: 6,
                nav:false,
                autoplay: true,
                smartSpeed: 2000,
                responsive:{
                    0:{
                        items:1
                    },
                    480:{
                        items:2
                    },
                    650:{
                        items:4
                    },
                    992:{
                        items:5
                    },
                    1199:{
                        items:6
                    }
                }
            })
        }
    }
    award_slider();
    if ($('#datetimepicker4').length) {
        $('#datetimepicker4').datetimepicker({
            pickTime: false
        });
    };
    
    if ($('#datetimepicker3').length) {
        $('#datetimepicker3').datetimepicker({
            pickDate: false
        });
    };
    
    /*----------------------------------------------------*/
    /*  Counter up js
    /*----------------------------------------------------*/
    function counterup(){
        if ( $('.counter').length ){
            $('.counter').counterUp({
                delay: 20,
                time: 1000
            });
        }
    }
    counterup();
    
    /*========== menu scroll js ===========*/
    function stickyHeader () {
		if ($('.middble_menu_area').length) {
			var strickyScrollPos = 200;
			if($(window).scrollTop() > strickyScrollPos) {
				$('.middble_menu_area').removeClass('fadeIn animated');
				$('.middble_menu_area').addClass('stricky-fixed fadeInDown animated')
			}
			else if($(window).scrollTop() <= strickyScrollPos) {
				$('.middble_menu_area').removeClass('stricky-fixed fadeInDown animated');
				$('.middble_menu_area').addClass('slideIn animated')
			}
		}
	}
    // instance of fuction while Window Scroll event
	$(window).on('scroll', function () {	
		stickyHeader()
	})
	
});