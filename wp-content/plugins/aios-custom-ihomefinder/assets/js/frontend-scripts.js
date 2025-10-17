;(function ($, w, d, h, b) {

    var app = {
        runAOS: function () {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    disable: 'mobile',
                    once: true,
                    easing: 'ease-in-out',
                });
            }
            else {
                console.warn(
                    'To enable Animation on Scroll function on this page,',
                    '\n',
                    'please enqueue AOS library on your functions.php: ',
                    '\n',
                    'https://github.com/michalsnik/aos',
                    '\n',
                    '\n',
                    'You may also do this via AIOS Initial Setup plugin: ',
                    '\n',
                    window.location.origin + '/wp-admin/admin.php?page=aios-initial-setup&panel=enqueue-libraries',
                    '\n',
                );
            }
        },
        popupForm: {
            addPlaceholder: function ($modal, resetTextarea = true) {
                var $fields = $modal.find('input:not([type="submit"]):not([type="hidden"]), select, textarea:not(.g-recaptcha-response)');
                $fields.each(function (i, field) {
                    var $field = $(field);
                    var fieldNodeName = $field[0].nodeName.toLowerCase();
                    var id = $field.attr('id');
                    var placeholder = $field.closest('.form-group').find('label[for="' + id + '"]').text().trim();
                    
                    if ($field.attr('placeholder') === '' || $field.attr('placeholder') === undefined) {
                        // remove form-control class
                        $field.removeClass('form-control');

                        // for custom placeholders
                        var reservedPlaceholders = {
                            ihf_schedshow_pref_time: 'Preferred Time',
                            ihf_schedshow_pref_date: 'Preferred Date',
                            ihf_schedshow_alt_time: 'Alternate Time',
                            ihf_schedshow_alt_date: 'Alternate Date'
                        };

                        if (reservedPlaceholders[id] != undefined && reservedPlaceholders[id]) {
                            placeholder = reservedPlaceholders[id];
                        }

                        // reset value to null/empty
                        if (fieldNodeName === 'textarea' && resetTextarea) {
                            $field.val('');
                            if (placeholder === '') placeholder = $field.prev('label').text().trim();
                        }

                        if (fieldNodeName === 'select') {
                            // time 
                            if ( 
                                id.indexOf( 'time' ) > 0 && 
                                $field.find('option.added-placeholder').length < 1
                            ) {
                                var value = '8:00 AM';
                                var option = '<option value="' + value + '" selected class="added-placeholder">' + placeholder + '</option>';

                                $(option).prependTo($field);
                            }
                        }
                        else {
                            $field.attr('placeholder', placeholder);
                        }
                    }
                });
            },
            modal: function () {
                var popupForm = app.popupForm;
                var $modals = [
                    '#ihfScheduleShowing.modal',
                    '#ihfMoreInfo.modal',
                    '#ihfsaveListing.modal',
                    '#ihfEmailListing.modal',
                    '#ihf-user-registration-modal',
                    '#ihf-email-alert-modal',
                    '#ihfSaveSearch',
                ];
                $.each($modals, function (i, modal) {
                    var $modal = $(modal);
    
                    // adding placeholder on forms
                    popupForm.addPlaceholder($modal);
                    
                    // wrap button element
                    $button = $modal.find('[type="submit"]');
                    $button.wrap('<div class="ihf-modal-submit"></div>');
                    $button.attr('class', 'btn btn-primary mt-10');
                    
                    // add ajax loader to button
                    $('<span class="ihf-modal-form-loader"></span>').appendTo($button.parent());
                    
                    // add response output
                    $('<div class="ihf-modal-form-response-output"></div>').insertAfter($button.parent());
                    
                    // remove script tag
                    $modal.find('script').remove();
                        
                    // fix container issue
                    $.each([
                        '.ihf-captcha',
                        '.ihf-modal-submit'
                    ], function (i, target) {
                        $modal.find(target).closest('[class*="col-"]').removeClass('col-sm-6 col-md-6 col-lg-6');
                    });
                    
                    ihfJquery(modal).on('shown.bs.modal', function () {
                        // re-create forms
                        var $forms = $modal.find('form');
                        $.each($forms, function(i, form) {
                            var $form = $(form);
                            var formID = $form.attr('id');
                            var $formContainer = $form.closest('.panel-body');

                            popupForm.addPlaceholder($modal);
                            
                            if (formID !== 'ihf-user-registration-ignore-form') {
                                var formAttr = {
                                    id: formID,
                                    action: $form.attr('action'),
                                    method: $form.attr('method'),
                                }
    
                                $form.contents().unwrap();
                                $formContainer.wrapInner('<form></form>');
                                var $form = $formContainer.find('form');
                                $.each(formAttr, function (key, attr) {
                                    $form.attr(key, attr);
                                });
    
                                // init input date fields
                                var $datepickerFields = $modal.find('.date');
                                if ($datepickerFields.length != 0) {
                                    $datepickerFields.each(function (i, field) {
                                        if (typeof $().datepicker === 'function') {
                                            $(field).datepicker({
                                                defaultDate: null,
                                                minDate: new Date(),
                                                dateFormat: "yy-mm-dd"
                                            });
                                        }
    
                                        if (
                                            typeof $().datepicker !== 'undefined' && 
                                            typeof ihfJquery().datepicker === 'function'
                                        ) {
                                            ihfJquery(field).datepicker({
                                                defaultDate: null,
                                                minDate: new Date(),
                                                dateFormat: "yy-mm-dd"
                                            });
                                        }
                                    });
                                }
    
                                $form.off('submit', '**');
                                $form.on('submit', function (e) {
                                    e.preventDefault();
    
                                    var $this = $(this);
                                    var $submitButton = $this.find('button[type="submit"]');
                                    var $loader = $this.find('.ihf-modal-form-loader');
                                    var $response = $this.find('.ihf-modal-form-response-output');
                                    var $saveCtaButton = $('#listings-cta-save');
    
                                    var action = $this.attr('action');
                                    var method = $this.attr('method');
                                    var serializedData = $this.serializeArray();
    
                                    $response.hide();
                                    $loader.addClass('active');
    
                                    $.ajax({
                                        url: action,
                                        type: method,
                                        data: serializedData,
                                        success: function (message) {
                                            var $message = $(message);
                                            var $errorMessages = $message.find('[id*="errors"], [class*="text-danger"]');
    
                                            if ($errorMessages.length > 0) {
                                                if (typeof grecaptcha === 'object') {
                                                    grecaptcha.reset();
                                                }
    
                                                // filter duplicate messages
                                                var filteredMessages = [];
    
                                                $.each($errorMessages, function (i, e) {
                                                    var message = $(e).text();
                                                    if ($.inArray(message, filteredMessages) == -1) {
                                                        filteredMessages.push(message);
                                                    }
                                                });
    
                                                filteredMessages = filteredMessages.join('<br>');
    
                                                $response.removeClass('output-success output-invalid');
                                                $response.addClass('output-error');
    
                                                $response.html(filteredMessages).hide().fadeIn('fast');
                                            } else {
                                                var $message = $(message);
                                                $message.find('script').remove();
                                                $message.find('span').remove();
                                                var message = $message.text().replace(/^\s+|\s+$/gm,'');
        
                                                $modal.find('.modal-body').hide();
                                                if (message !== '' && $modal.attr('id') == 'ihfSaveSearch') {
                                                    $modal.find('.modal-title').html(message).hide().fadeIn();
                                                }
    
                                                $response.removeClass('output-error output-invalid');
                                                $response.addClass('output-success');
    
                                                // for cta button
                                                if ($modal.attr('id') == 'ihfsaveListing') {
                                                    $saveCtaButton.addClass('active');
                                                    $saveCtaButton.removeClass('aios-content-popup');
                                                    $saveCtaButton.removeAttr('href');
                                                    $saveCtaButton.text('Saved');
                                                }
    
                                                // for results save search
                                                var $searchButton = $('[data-saved-search]');
                                                if ($modal.attr('id') == 'ihfSaveSearch' && $searchButton.length > 0 ) {
                                                    $searchButton
                                                        .attr('data-saved-search', 'ajax')
                                                        .addClass('savesearch-disabled')
                                                        .find('em')
                                                        .text('Saved');
                                                }
                                            }
    
                                            $loader.removeClass('active');
                                            popupForm.addPlaceholder($modal);
                                        },
                                        error: function (error) {
                                            var $message = $(message);
                                            $message.find('script').remove();
                                            $message.find('span').remove();
                                            var message = $message.text().replace(/^\s+|\s+$/gm,'');
    
                                            $modal.find('.modal-body').hide();
                                            if (message !== '') {
                                                $modal.find('.modal-title').html(message).hide().fadeIn();
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            },
            validationError: function () {
                var $body = $(b);
                $body.on('mouseenter mouseover', '.ihf-modal-container .form-group span.text-danger', function () {
                    $(this).fadeOut(400);
                });
            },
            init: function () {
                if (typeof window.URLSearchParams === 'function') {
                    var params = new window.URLSearchParams(window.location.search);
                    if (params.get('filterContent') == 'false') return;
                }
            
                // output an if ihfJquery is missing
                if (typeof ihfJquery !== 'function') {
                    console.error('ihfJquery is missing, all IHF popup forms will not work properly!');
                    return;
                }

                var popupForm = app.popupForm;
                popupForm.modal();
                popupForm.validationError();
            }
        },
        resultsPage: {
            sort: function () {
                // for input
                $('[data-aios-sort-dropdown]').on('input', 'input[name="minListPrice"], input[name="maxListPrice"]', function (e) {
                    var $form = $(this).closest('form');
                    var $minPrice = $form.find('input[name="minListPrice"]');
                    var $maxPrice = $form.find('input[name="maxListPrice"]');

                    var minPriceValue = parseInt($minPrice.val() ? $minPrice.val().replace(/[^0-9]/ig, '') : 0);
                    var maxPriceValue = parseInt($maxPrice.val() ? $maxPrice.val().replace(/[^0-9]/ig, '') : 0);

                    // return error if min price is greater than max price
                    if (minPriceValue >= maxPriceValue) {
                        $form.addClass('has-errors');
                        
                        if ($form.find('p.form-error').length < 1) {
                            $('<p class="form-error">Minimum price can\'t be greater than Maximum price.</p>')
                                .insertAfter($form.find('[type="submit"]'));
                        }
                    }

                    // remove error if min is less than max price or 
                    // both min and max price have no values
                    if (
                        minPriceValue < maxPriceValue ||
                        ($minPrice.val() === '' && $maxPrice.val() === '')
                    ) {
                        $form.removeClass('has-errors');

                        $form
                            .find('p.form-error')
                            .remove();
                    }
                });

                // for refine search
                $('[data-aios-sort-dropdown]').on('submit', 'form', function (e) {
                    var $form = $(this);
                    if ($form.hasClass('has-errors')) e.preventDefault();
                });

                // for sort values
                $('[data-aios-sort-values] a[data-ihf-sort-value]').on('click', function (e) {
                    e.preventDefault();

                    var $this = $(this);
                    var value = $this.data('ihf-sort-value');
                    var pageUrl = new URL(window.location.href);
    
                    // adds or updates sort parameters
                    pageUrl.searchParams.set('sortBy', value);
                    window.location.href = pageUrl.href;
                });
            },
            savedSearch: function () {
                $('[data-saved-search="ajax"]').on('click', function (e) {
                    e.preventDefault();

                    var $button = $(this);
                    var url = window.location.origin + '/wp-admin/admin-ajax.php?action=ihf_save_search_subscriber_session';
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function (message) {
                            if (message.replace(/(saved)/gmi,'')) {
                                $button
                                    .addClass('savesearch-disabled')
                                    .find('em')
                                    .text('Saved');
                            }
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });
                });
            },
            map: function () {
                // remove default ihf map
                $('.ihf-listing-data .ihf-listing-search-results #ihf-map-canvas').remove();

                // leaflet map
                var fnLeafletMap = function ($map) {
                    var id = $map.attr('id');
                    if (
                        $map.length < 1 && 
                        (typeof id == 'undefined' || id == '')
                    ) {
                        return false;
                    }
                    
                    $mapAddress = $map.data('address');
        
                    // Initialize map to specified coordinates
                    var map = L.map(id, {
                        center: [33.9276214, -118.3977387], // CAREFULL!!! The first position corresponds to the lat (y) and the second to the lon (x)
                        zoom: 15,
                        gestureHandling: true,
                    });
        
                    const mapIcon = L.icon({
                        iconUrl: 'https://resources.agentimage.com/libraries/images/map-marker/52.png',
                        iconSize: [52, 52]
                    });
                    
                    // Add tiles (streets, etc)
                    L.mapboxGL({
                        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                        accessToken: 'not-needed',
                        style: 'https://api.maptiler.com/maps/596f856e-8da8-4219-a343-f1cf70a960ef/style.json?key=3i8dcrACEAmtPrc6lzeW'
                    }).addTo(map);
                    
                    // this function sets the map marker 
                    // by the given coordinates (long, lat)
                    var setMapMarker = function (long, lat) {
                        // label (address)
                        var label = $mapAddress;
                        
                        // coordinates (long and lat)
                        var x_coor = long;
                        var y_coor = lat;
                        
                        if (
                            (x_coor != '' && y_coor != '') && 
                            (parseFloat(x_coor) != 0 && parseFloat(y_coor) != 0)
                        ) {
                            // marker position base on coordinates
                            var marker = L.marker([y_coor, x_coor], {icon: mapIcon}).addTo(map);
        
                            // binds the label on the map as a popup
                            marker.bindPopup(label).openPopup();
        
                            // set the map view base on coordinates
                            map.setView([y_coor, x_coor]);
        
                            // add initialized class on the map
                            $map.addClass('map-initialized');
                        }
                    }
                    
                    // getting lat long on map data attributes
                    if ($map.data('longitude') && $map.data('latitude')) {
                        
                        // run setMapMarker function
                        setMapMarker($map.data('longitude'), $map.data('latitude'));
                    }
                    
                    // hack on getting lat long if latlong values on the page is incorrect
                    // if lat long on map data doesn't exist
                    if (!$map.hasClass('map-initialized')) {
                        var wholePageHtml = $(h).html();
                        
                        // getting the latitude on html string
                        var lat = wholePageHtml.match(/(latitude|lat)\:\".*?\"/);
                        
                        // getting the longtidue on html string
                        var long = wholePageHtml.match(/(longitude|long)\:\".*?\"/);
        
                        if (lat != null && long != null) {
                            lat = (lat[0].match(/(\"\-?.*?\")/)[0].replace(/\"/g, '')).trim();
                            long = (long[0].match(/(\"\-?.*?\")/)[0].replace(/\"/g, '')).trim();
                            
                            // run setMapMarker function
                            setMapMarker(long, lat);
                        }
                    }
                    
                    // getting lat long on how IHF gets it
                    // in some case it will not work due to call limit
                    var clientID = $map.data('client-id');
                    if (!$map.hasClass('map-initialized') && clientID) {
                        
                        $.ajax({
                            url: '//www.idxhome.com/service/geocode/ajax/' + clientID,
                            data: {
                                address: $mapAddress
                            },
                            dataType: 'jsonp',
                            crossDomain: true,
                            success: function (response) {
                                lat = response.features[0].geometry.coordinates[1];
                                long = response.features[0].geometry.coordinates[0];
        
                                // run setMapMarker function
                                setMapMarker(long, lat);
                            },
                            error: function(xhr, status, error) {
                                // remove map and display error
                                $map.remove();
                                console.log(xhr, status, error);
                            }
                        });
                    }
                }
                $target = $('[data-aios-custom-ihomefinder-leaflet-map]');
                if ($target.length == 1) {
                    fnLeafletMap($target);
                }
                else if ($target.length > 1) {
                    console.error(
                        'AIOS Custom iHomefinder Leaflet Map does not support multiple instances...',
                    );
                }
            },
            init: function () {
                var resultsPage = app.resultsPage;

                resultsPage.sort();
                resultsPage.savedSearch();
                resultsPage.map();
            },
        },
        init: function () {
            this.runAOS();
            this.popupForm.init();
            this.resultsPage.init();
        }
    }

    // global functions
    w.aiosCustomIHomefinderHelpers = {
        isMobile: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        debounce: function (func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        },
    };

    $(document).ready(function () {
        /* Initialize all app functions */
        app.init();
    });
    
})(jQuery, window, document, 'html', 'body');