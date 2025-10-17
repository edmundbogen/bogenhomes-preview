;(function ($, w, d, h, b) {

    var app = {
        slideshow: {
            helper: {
                slickImgError: function ($slider) {
                    $slider.on({
                        slickImgError: function (event, slick, image, imageSource) {
                            var errorSrc = image.data('error');
                            image.attr('src', errorSrc);
                        }
                    });
                },
                bindThumbnailToMainSlider: function ($main, $thumbnail) {
                    $main.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        $thumbnail.slick('slickGoTo', nextSlide);
                    });
                },
                matchThumbnailCurrentSlideToMain: function ($main, $thumbnail) {
                    var $mainSlick = $main.slick('getSlick');
                    
                    $thumbnail.on('init', function () {
                        $thumbnail.slick('slickGoTo', $mainSlick.currentSlide);
                    });
                },
                lazyImages: function ($images, node = 'img') {
                    $.each($images, function (i, image) {
                        var $image = $(image);
                        var mainSource = $image.data('lazy');
                        var errorSource = $image.data('error');

                        var $fakeImg = $('<img />', {
                            src: mainSource
                        });

                        $fakeImg.one({
                            load: function () {
                                if (node != 'img') {
                                    $image
                                        .css({
                                            'background-image': 'url("' + mainSource + '")',
                                        })
                                        .animate({
                                            opacity: 1
                                        })
                                        .parent()
                                        .addClass('hide-loader');
                                }
                                else {
                                    $image
                                        .attr('src', mainSource)
                                        .animate({
                                            opacity: 1
                                        })
                                        .parent()
                                        .addClass('hide-loader');
                                }
                            },
                            error: function () {
                                if (node != 'img') {
                                    $image
                                        .css({
                                            'background-image': 'url("' + errorSource + '")',
                                        })
                                        .animate({
                                            opacity: 1
                                        })
                                        .addClass('lazy-error');
                                }
                                else {
                                    $image
                                        .attr('src', errorSource)
                                        .animate({
                                            opacity: 1
                                        })
                                        .addClass('lazy-error');
                                }

                                $image
                                    .closest('.aios-custom-ihomefinder-template-img-loader')
                                    .addClass('hide-loader');
                            },
                        });
                    });
                },
            },
            variants: {
                slick: {
                    default: function () {
                        var $html = $(h);
                        var $main = $('.listings-slideshow');
                        var $thumbnail = $('.listings-slideshow-thumbnail');
                        
                        if (w.aiosCustomIHomefinderHelpers.isMobile()) {
                            $thumbnail
                                .closest('.listings-hero')
                                .addClass('thumbnails-remove');
                            $thumbnail.remove();
                        }
                        
                        var mainSlick = function ($slider) {
                            // stop if slideshow doesn't exist
                            if ($slider.length == 0) return;
                            
                            // initialized slick
                            $slider.slick({
                                infinite: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                prevArrow: '.listings-slideshow-prev',
                                nextArrow: '.listings-slideshow-next',
                                fade: true,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                responsive: [
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            infinite: false,
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                        }
                                    }
                                ]
                            });
                            
                            // slick img error
                            app.slideshow.helper.slickImgError($slider);
                        }
                        mainSlick($main);

                        var thumbnailSlick = function ($slider, $thumbnail) {
                            // stop if thumbnail doesn't exist
                            if ($thumbnail.length == 0) return;
                            
                            // initialized slick
                            $thumbnail.slick({
                                infinite: true,
                                slidesToShow: 7,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                arrows: false,
                                focusOnSelect: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                centerMode: true,
                                centerPadding: '0px',
                                asNavFor: $slider,
                            });

                            // slick img error
                            app.slideshow.helper.slickImgError($thumbnail);

                            // update thumbnail position base on main slideshow
                            app.slideshow.helper.matchThumbnailCurrentSlideToMain($thumbnail, $slider);

                            // bind main slide to thumbnail
                            app.slideshow.helper.bindThumbnailToMainSlider($slider, $thumbnail);
                        }
                        thumbnailSlick($main, $thumbnail);
                    },
                    frame1: function () {
                        var $html = $(h);
                        var $main = $('.listings-slideshow-layout-a');
                        var $thumbnail = $('.listings-slideshow-layout-a-thumbnail');
                        
                        if (w.aiosCustomIHomefinderHelpers.isMobile()) {
                            $thumbnail
                                .closest('.listings-hero')
                                .addClass('thumbnails-remove');
                            $thumbnail.remove();
                        }
                        
                        var mainSlick = function ($slider) {
                            // stop if slideshow doesn't exist
                            if ($slider.length == 0) return;

                            // initialized slick
                            $slider.slick({
                                fade: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                prevArrow: '.listings-slideshow-layout-a-prev',
                                nextArrow: '.listings-slideshow-layout-a-next',
                                focusOnSelect: true,
                                lazyLoad: 'ondemand',
                            });
                            
                            // slick img error
                            app.slideshow.helper.slickImgError($slider);
                        }
                        mainSlick($main);
                        
                        var thumbnailSlick = function ($slider, $thumbnail) {
                            // stop if thumbnail doesn't exist
                            if ($thumbnail.length == 0) return;
                            
                            // initialized slick
                            $thumbnail.slick({
                                infinite: true,
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                arrows: false,
                                focusOnSelect: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                asNavFor: $slider,
                            });

                            // slick img error
                            app.slideshow.helper.slickImgError($thumbnail);

                            // update thumbnail position base on main slideshow
                            app.slideshow.helper.matchThumbnailCurrentSlideToMain($thumbnail, $slider);

                            // bind main slide to thumbnail
                            app.slideshow.helper.bindThumbnailToMainSlider($slider, $thumbnail);
                        }
                        thumbnailSlick($main, $thumbnail);
                        
                        var headerAdjustment = function () {
                            // response margin top that depends on the header's height 
                            // only available if the innerpage banner setting on details page was set to hide
                            // (only applicable for Legacy, Amante II, Element and Iconic AgentPro themes)
                            if (!$(b).hasClass('defaultSlick-innerpage-banner-show')) {
                                $(w).on('load resize orientationchange', function (e) {
                                    var windowWidth = $(w).width();
                                    var $slideshow = $('#listings-details .listings-hero');

                                    if (windowWidth > 991 && $(b).hasClass('slideshow-variation-frame-1')) {

                                        // for legacy
                                        if ($(b).hasClass('agentpro-legacy')) {
                                            var headerHeight = $('.main-header').outerHeight();
                                        }

                                        // for amante
                                        if ($(b).hasClass('agentpro-amante-ii')) {
                                            var headerHeight = $('header.header-wrapper').outerHeight();
                                        }

                                        // for element
                                        if ($(b).hasClass('agentpro-element')) {
                                            // we need to clone the header and put it on the dom
                                            // since the header's height will change on a specific scroll amount
                                            if ($('header.cloned-header').length == 0) {
                                                var $clonedHeader = $('header.header').clone().addClass('cloned-header').removeClass('active');
                                                $clonedHeader.css({
                                                    'opacity': '0',
                                                    'visibility': 'hidden',
                                                    'pointer-events': 'none'
                                                });
                                                $clonedHeader.appendTo('#main-wrapper');
                                            }

                                            // get the cloned header height
                                            var headerHeight = $('header.cloned-header').outerHeight();
                                        }

                                        // for iconic
                                        if ($(b).hasClass('agentpro-iconic')) {
                                            var headerHeight = $('#main-header').outerHeight();
                                        }

                                        $slideshow.css({
                                            'margin-top': headerHeight + 'px',
                                        });
                                    } else {
                                        $slideshow.css({
                                            'margin-top': '0px',
                                        });
                                    }
                                });
                            }
                        }
                        headerAdjustment();
                    },
                    frame2: function () {
                        var $html = $(h);
                        var $main = $('.listings-slideshow-layout-b');
                        var $thumbnail = $('.listings-slideshow-layout-b-thumbnail');
                        
                        if (w.aiosCustomIHomefinderHelpers.isMobile()) {
                            $thumbnail
                                .closest('.listings-hero')
                                .addClass('thumbnails-remove');
                            $thumbnail.remove();
                        }
                        
                        var mainSlick = function ($slider) {
                            // stop if slideshow doesn't exist
                            if ($slider.length == 0) return;
                            
                            // initialized slick
                            $slider.slick({
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                prevArrow: '.listings-slideshow-layout-b-prev',
                                nextArrow: '.listings-slideshow-layout-b-next',
                                focusOnSelect: true,
                                fade: true,
                                lazyLoad: 'ondemand',
                            });
                            
                            // slick img error
                            app.slideshow.helper.slickImgError($slider);
                        }
                        mainSlick($main);
                        
                        var thumbnailSlick = function ($slider, $thumbnail) {
                            // stop if thumbnail doesn't exist
                            if ($thumbnail.length == 0) return;
                            
                            // initialized slick
                            $thumbnail.slick({
                                infinite: true,
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                arrows: false,
                                focusOnSelect: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                asNavFor: $slider,
                            });

                            // slick img error
                            app.slideshow.helper.slickImgError($thumbnail);

                            // update thumbnail position base on main slideshow
                            app.slideshow.helper.matchThumbnailCurrentSlideToMain($thumbnail, $slider);

                            // bind main slide to thumbnail
                            app.slideshow.helper.bindThumbnailToMainSlider($slider, $thumbnail);
                        }
                        thumbnailSlick($main, $thumbnail);
                        
                    },
                    frame3: function () {
                        var $html = $(h);
                        var $main = $('.listings-slideshow-layout-c');
                        var $thumbnail = $('.listings-slideshow-layout-c-thumbnail');
                        
                        if (w.aiosCustomIHomefinderHelpers.isMobile()) {
                            $thumbnail
                                .closest('.listings-hero')
                                .addClass('thumbnails-remove');
                            $thumbnail.remove();
                        }
                        
                        var mainSlick = function ($slider) {
                            // stop if slideshow doesn't exist
                            if ($slider.length == 0) return;
                            
                            // initialized slick
                            $slider.slick({
                                inifinite: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                prevArrow: '.listings-slideshow-layout-c-prev',
                                nextArrow: '.listings-slideshow-layout-c-next',
                                focusOnSelect: true,
                                lazyLoad: 'anticipated',
                                responsive: [
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            fade: true,
                                        }
                                    }
                                ]
                            });
                            
                            // slick img error
                            app.slideshow.helper.slickImgError($slider);
                        }
                        mainSlick($main);

                        var thumbnailSlick = function ($slider, $thumbnail) {
                            // stop if thumbnail doesn't exist
                            if ($thumbnail.length == 0) return;
                            
                            // initialized slick
                            $thumbnail.slick({
                                infinite: true,
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                arrows: false,
                                focusOnSelect: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                asNavFor: $slider,
                            });

                            // slick img error
                            app.slideshow.helper.slickImgError($thumbnail);

                            // update thumbnail position base on main slideshow
                            app.slideshow.helper.matchThumbnailCurrentSlideToMain($thumbnail, $slider);

                            // bind main slide to thumbnail
                            app.slideshow.helper.bindThumbnailToMainSlider($slider, $thumbnail);
                        }
                        thumbnailSlick($main, $thumbnail);
                    },
                    frame4: function () {
                        var $html = $(h);
                        var $main = $('.listings-slideshow-layout-d');
                        var $thumbnail = $('.listings-slideshow-layout-d-thumbnail');
                        
                        if (w.aiosCustomIHomefinderHelpers.isMobile()) {
                            $thumbnail
                                .closest('.listings-hero')
                                .addClass('thumbnails-remove');
                            $thumbnail.remove();
                        }
                        
                        var mainSlick = function ($slider) {
                            // stop if slideshow doesn't exist
                            if ($slider.length == 0) return;
                            
                            // initialized slick
                            $slider.slick({
                                infinite: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: false,
                                prevArrow: '.listings-slideshow-layout-d-prev',
                                nextArrow: '.listings-slideshow-layout-d-next',
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                focusOnSelect: true,
                                lazyLoad: 'anticipated',
                                responsive: [
                                    {
                                        breakpoint: 992,
                                        settings: {
                                            fade: true,
                                        }
                                    }
                                ]
                            });
                            
                            // slick img error
                            app.slideshow.helper.slickImgError($slider);
                        }
                        mainSlick($main);

                        var thumbnailSlick = function ($slider, $thumbnail) {
                            // stop if thumbnail doesn't exist
                            if ($thumbnail.length == 0) return;
                            
                            // initialized slick
                            $thumbnail.slick({
                                infinite: true,
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 4000,
                                dots: false,
                                arrows: false,
                                focusOnSelect: true,
                                swipe: false,
                                swipeToSlide: false,
                                draggable: false,
                                lazyLoad: 'ondemand',
                                asNavFor: $slider,
                            });

                            // slick img error
                            app.slideshow.helper.slickImgError($thumbnail);

                            // update thumbnail position base on main slideshow
                            app.slideshow.helper.matchThumbnailCurrentSlideToMain($thumbnail, $slider);

                            // bind main slide to thumbnail
                            app.slideshow.helper.bindThumbnailToMainSlider($slider, $thumbnail);
                        }
                        thumbnailSlick($main, $thumbnail);
                    },
                    init: function () {
                        var slick = app.slideshow.variants.slick;
                        var helper = app.slideshow.helper;

                        if (typeof $().slick !== 'undefined') {
                            slick.default();
                            slick.frame1();
                            slick.frame2();
                            slick.frame3();
                            slick.frame4();
                        } else {
                            var $images = $('.listings-hero [data-lazy]');
                            app.slideshow.helper.lazyImages($images);

                            console.error(
                                'Please enqueue slick on your functions.php: ',
                                '\n',
                                'https://kenwheeler.github.io/slick/',
                                '\n',
                                '\n',
                                'You may also do this via AIOS Initial Setup plugin: ',
                                '\n',
                                window.location.origin + '/wp-admin/admin.php?page=aios-initial-setup&panel=enqueue-libraries'
                            );
                        }
                    },
                },
                splide: {
                    render: function () {
                        var $baseTarget = $('#listings-details .listings-slideshow-splide');
                        var mainSettings = $baseTarget.attr('data-main') ? JSON.parse($baseTarget.attr('data-main')) : {};
                        var thumbnailsSettings = $baseTarget.attr('data-thumbnails') ? JSON.parse($baseTarget.attr('data-thumbnails')) : {};

                        var defaultSettings = {
                            rewind: true,
                            pagination: false,
                            speed: 600,
                            focus: 'center',
                            autoplay: true,
                            interval: 5000,
                            pauseOnHover: false,
                            updateOnMove: true,
                            lazyLoad: 'nearby',
                        };

                        // check if slider exist
                        if ($baseTarget.length <= 0) return; 
                        
                        mainSettings = $.extend(
                            {}, 
                            defaultSettings, 
                            {
                                type: 'fade',
                                arrows: true,
                                breakpoints: {
                                    991: {
                                        arrows: true
                                    }
                                }
                            },
                            mainSettings
                        );
                        var main = new Splide($baseTarget.find('.splide__main')[0], mainSettings);

                        thumbnailsSettings = $.extend(
                            {},
                            defaultSettings,
                            {
                                rewind: false,
                                type: 'loop',
                                arrows: false,
                                perPage: 7,
                                focus: 'center',
                                lazyLoad: 'nearby',
                                isNavigation: true,
                                gap: 2,
                            },
                            thumbnailsSettings
                        );
                        var thumbnails = new Splide($baseTarget.find('.splide__thumbnails')[0], thumbnailsSettings);
                        var fnLazyloadError = function (splide) {
                            splide
                                .on('lazyload:loaded', function (img) {
                                    $(img).addClass('onload');
                                })
                                .on('mounted moved', function () {
                                    var $currentSlide = $(splide.Components.Elements.slides[splide.index]);
                                    var $img = $currentSlide.find('img');

                                    var $fakeImg = $('<img />', {
                                        src: $img.attr('src')
                                    });

                                    $fakeImg.one('error', function () {
                                        $img
                                            .attr('src', $img.attr('data-splide-error'))
                                            .addClass('lazyerror');

                                        $img
                                            .closest('div')
                                            .addClass('hide-loader');
                                    });
                                });
                        }

                        // lazyloads
                        fnLazyloadError(main);
                        fnLazyloadError(thumbnails);

                        // mounts
                        main.sync(thumbnails);
                        main.mount();
                        thumbnails.mount();

                        // refresh mounts onload
                        main.refresh();
                        thumbnails.refresh();
                    },
                    init: function() {
                        var splide = app.slideshow.variants.splide;
                        var helper = app.slideshow.helper;

                        if (typeof Splide !== 'undefined') {
                            splide.render();
                        } else {
                            var $images = $('.listings-hero [data-splide-lazy]');
                            helper.lazyImages($images);

                            console.error(
                                'Please enqueue Splide resources on your functions.php: ',
                                '\n',
                                'https://splidejs.com/',
                                '\n',
                                '\n',
                                'You may also do this via AIOS Custom IHomefinder plugin: ',
                                '\n',
                                window.location.origin + '/wp-admin/admin.php?page=aios-custom-ihomefinder&panel=settings'
                            );
                        }
                    }
                }
            },
            init: function () {
                var slideshow = app.slideshow;
                var variants = slideshow.variants;
                
                // slick variants
                variants.slick.init();

                // splide variants
                variants.splide.init();
            }
        },
        shareListings: function () {
            $('.listings-smi a').on('click', function (e) {
                var $this = $(this),
                    href = $this.attr('href'),
                    title = $this.data('title');

                if (!$this.hasClass('mailto')) {
                    e.preventDefault();

                    var newWindow = window.open(href, title, 'width=700,height=500');
                    newWindow.focus();
                }
            });
        },
        accordion: function () {
            $('.listings-accordion-title').on('click', function () {
                var $this = $(this);
                var $icon = $this.find('i');
                var $content = $this.next();
                var $wrapper = $this.parent();

                if ($this.hasClass('active')) {
                    $content.prop('aria-hidden', 'true');
                    $icon.text($icon.data('icon-open'));
                } else {
                    $content.prop('aria-hidden', 'false');
                    $icon.text($icon.data('icon-close'));
                }

                $content.stop(false, true).slideToggle(300);
                $this.toggleClass('active');
            });
        },
        interestedInForm: function () {
            $(w).on('load', function () {
                var $form = $('#listings-details .listings-form');
                var $listingsAddressField = $form.find('.listings-field #listings-address');
                var listingsAddressValue = $form.find('h2 span').text();

                $listingsAddressField.val(listingsAddressValue);
            });
        },
        saveListingButton: function () {
            // trigger save form if loggedIn
            $('.listings-save-ajax').on('click', function (e) {
                e.preventDefault();

                var $signInForm = $('#ihf-save-listing-form');
                var $emailField = $signInForm.find('input[name="username"]');
                var subscriberEmail = $signInForm.parent().data('ihf-subscriber-email');

                $emailField.val(subscriberEmail);
                $('#ihf-save-listing-form').trigger('submit');
            });
            
            $('.listing-cta-save-trigger').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                var buttonText = $this.html();
                
                // prevents spamming
                if ($this.hasClass('saving')) return;
                $this.addClass('saving');
                
                var $form = $('#ihf-leadcapture-btns [data-ihf-event="save-listing-form-submit"]');
                var method = 'GET';
                var action = $form.attr('action');

                // button text
                var savingText = buttonText.replace('Save To Favorites', 'Saving');
                var savedText = buttonText.replace('Save To Favorites', 'Saved');
                var errorText = buttonText.replace('Save To Favorites', 'Error');
                
                $.ajax({
                    url: action,
                    type: method,
                    beforeSend: function () {
                        // replace text to saving...
                        $this.html(savingText);
                    },
                    success: function () {
                        // replace text to saved
                        $this.html(savedText);

                        // remove trigger class
                        $this.removeClass('listing-cta-save-trigger saving');

                        // add active class
                        $this.addClass('active');
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.error(xhr, ajaxOptions, thrownError);
                        
                        // replace text to error
                        $this.html(errorText);

                        // reload page after 1.5secs
                        setTimeout(function () {
                            window.location.reload();
                        }, 1500);
                    },
                });
            });
        },
        init: function () {
            this.slideshow.init();
            this.shareListings();
            this.accordion();
            this.interestedInForm();
            this.saveListingButton();
        }
    }

    $(document).ready(function () {
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
