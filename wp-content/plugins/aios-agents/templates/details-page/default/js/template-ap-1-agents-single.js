;( function($, w, d, h, b) {
    
	var app = {
        listings: function () {
            var $listingsSlider = $('.agents-listings-slider');
            
            if ($listingsSlider.length) {
                $listingsSlider.slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    centerMode: false,
                    centerPadding: 0,
                    dots: false,
                    prevArrow: '.agents-listings-prev',
                    nextArrow: '.agents-listings-next',
                    responsive: [
                      
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: false,
                            }
                        }
                    ]
                });
            }
        },
        testimonials: function () {
            var $testiSlider = $('.agents-testi-slider');
            
            if ($testiSlider.length) {
                $testiSlider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    fade: true,
                    dots: false,
                    prevArrow: '.agents-testi-prev',
                    nextArrow: '.agents-testi-next',
                });
            }
        },

        videos: function(){
            
            $('.video-plyr').each(function(){
                new Plyr($(this));
            });
          
            $('.agent-videos').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                fade: true,
                dots: true,
                arrows: false
            });
        },

        additionalInfo: function(){
            $('.agents-additional-info-head').click(function(){
                $('.agents-additional-info ul').slideToggle('fast', function(){
                    if($('.agents-additional-info-head > span').text() == '+'){
                        $('.agents-additional-info-head > span').text('-');
                    }else{
                        $('.agents-additional-info-head > span').text('+');
                    }
                });
            });
        },

		init: function() {
            this.listings();
            this.testimonials();
            this.videos();
            this.additionalInfo();
		}
	}
    
	$(document).ready( function() {
        /* Initialize all app functions */
        app.init();
	});
    
    /** 
    *
    * Please do add your custom script functions similar to the current file structure.
    * You may also add your uncategorized script functions inside the `app.others` function.
    *
    */
})(jQuery, window, document, 'html', 'body');