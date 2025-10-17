( function() {

	var app = {

		initNavigation: function() {
			var $nav = jQuery( '#nav' );
			if ( $nav.length > 0 ) $nav.navTabDoubleTap();
		},
		initFeaturedProperties: function() {
			/* Put featured properties code here */
		},
		initFeaturedCommunities: function() {
			/* Put featured communities code here */
			let slick_cont = jQuery('.fc-items');
			let slick_nav = jQuery('.fc-nav-cont')
			slick_cont.on('init', function(event, slick){
				slick_cont.css({'max-height': 'initial', 'overflow': 'inherit'});
			});
			slick_cont.slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 4000,
				fade: true,
				appendArrows: slick_nav,
				prevArrow:`<div type='button' class='slick-prev' title='Previous'></button>`,
				nextArrow:`<div type='button' class='slick-next' title='Next'></button>`,
			});
		},
		initTestimonials: function() {
			/* Put testimonials code here */
			let slick_cont = jQuery('.testi-items');
			let slick_nav = jQuery('.testi-nav-cont')
			slick_cont.on('init', function(event, slick){
				slick_cont.css({'max-height': 'initial', 'overflow': 'inherit'});
			});
			slick_cont.slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 4000,
				appendArrows: slick_nav,
				prevArrow:`<div type='button' class='slick-prev' title='Previous'></button>`,
				nextArrow:`<div type='button' class='slick-next' title='Next'></button>`,
			});
		},
		initQuickSearch: function() {
			/* Put quick search code here */
		},
		initFeaturedListings: function(){
			let slick_cont = jQuery('.fl-items');
			let slick_nav = jQuery('.fl-nav-cont')
			slick_cont.on('init', function(event, slick){
				slick_cont.css({'max-height': 'initial', 'overflow': 'inherit'});
			});
			slick_cont.slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 4000,
				centerMode: true,
				centerPadding: '20%',
				appendArrows: slick_nav,
				prevArrow:`<div type='button' class='slick-prev' title='prev'></div>`,
				nextArrow:`<div type='button' class='slick-next' title='next'></div>`,
				responsive: [
					{
						breakpoint: 991,
						  settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: 'inherit',
						}
					}
				]
			});
		},
		initAOS: function() {
			// Initial Settings for AOS plugin
			AOS.init();
			// You can also pass an optional settings object
			// below listed default settings
			AOS.init({
				// Global settings:
				disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
				startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
				initClassName: 'aos-init', // class applied after initialization
				animatedClassName: 'aos-animate', // class applied on animation
				useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
				disableMutationObserver: false, // disables automatic mutations' detections (advanced)
				debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
				throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
				// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
				offset: 120, // offset (in px) from the original trigger point
				delay: 200, // values from 0 to 3000, with step 50ms
				duration: 1000, // values from 0 to 3000, with step 50ms
				easing: 'ease', // default easing for AOS animations
				once: true, // whether animation should happen only once - while scrolling down
				mirror: false, // whether elements should animate out while scrolling past them
				anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
			});
		},
		initCustomFunction: function() {
			/* See the pattern? Create more functions like this if needed. */

			//Display Sticky Header on scroll
			jQuery(document).on('scroll', function(){
				if(jQuery('html').scrollTop() > 95){
					jQuery('header').addClass('sticky-header');
				}else{
					jQuery('header').removeClass('sticky-header');
				}
			});
			if(jQuery('html').scrollTop() > 95){
				jQuery('header').addClass('sticky-header');
			}

			console.log(jQuery('html').scrollTop());
			jQuery('.header-nav-btn').on('click', function(e){
				toggle_expanded_nav();
			});
			jQuery('.close-nav-btn').on('click', function(e){
				// toggle_expanded_nav();
			});
			function toggle_expanded_nav(){
				let body = jQuery('.main-header');
				if(!body.hasClass('open-nav')){
					body.addClass('open-nav');
				}else{
					body.removeClass('open-nav');
				}
			}

			jQuery(document).on('click', '.scroll-down', function(){
				$([document.documentElement, document.body]).animate({
					scrollTop: $('#hp-fl-cont').offset().top - 100
				}, 600);
			});
		},
		idxDetailsCTA: function () {
			if (jQuery('body').hasClass('page-id-0')) {
			  jQuery('.button-preset').addClass('button-legacy');
			}

		  },
		initAgentSlide: function(){
			jQuery('.team-cont').slick({
			    slidesToShow: 3, 
			    dots: false,
			    arrows: true,
			    autoplay: true,
			    autoplaySpeed: 5000,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 992,
						  settings: {
							slidesToShow: 1,
						}
					}
				]
			});
		},
		detailsBreadcrumbs: function() {
		    if (jQuery('body').hasClass('aios-custom-ihomefinder-details-template')){
		        jQuery('.breadcrumb_last').text(jQuery('.listings-address strong').text() + ', '+ jQuery('.listings-address span').text());
		    }
		}


	}


	jQuery(document).ready( function() {

		/* Initialize navigation */
		app.initNavigation();

		/* Initialize featured properties */
		app.initFeaturedProperties();

		/* Initialize featured communities */
		app.initFeaturedCommunities();

		/* Initialize testimonials */
		app.initTestimonials();

		/* Initialize quick search */
		app.initQuickSearch();
		app.initFeaturedListings();
		app.initAOS();
		app.initCustomFunction();
		app.idxDetailsCTA();
		app.initAgentSlide();
		app.detailsBreadcrumbs();
	});

	jQuery(window).on('load', function(){


	})


})();
