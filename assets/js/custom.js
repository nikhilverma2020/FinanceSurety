(function($) {
    "use strict";

    var tpj = jQuery;
    var revapi24;
	
	// Preloader 
	jQuery(window).on('load', function() {
		jQuery("#status").fadeOut();
		jQuery("#preloader").delay(350).fadeOut("slow");
	});
	
	// on ready function
    jQuery(document).ready(function($) {
		
		
		// Menu js for Position fixed
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 800) {
			$('.sb_main_header_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.sb_main_header_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});	
	
	// ===== Scroll to Top ==== //
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        });		
		
	// Menu button
	$('#menu_click').on('click', function(){
		this.classList.toggle("change");
		$('.ss_menu').slideToggle();
	});
		
	// Magnific popup-video

	$('.test-popup-link').magnificPopup({ 
    type: 'iframe',
    iframe: {
        markup: '<div class="mfp-iframe-scaler">'+
            '<div class="mfp-close"></div>'+
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
            '<div class="mfp-title">Some caption</div>'+
            '</div>',
        patterns: {
            youtube: {
                index: 'youtube.com/', 
                id: 'v=',
                src: 'https://www.youtube.com/embed/H4p6njjPV_o'
            }
        }
    }
    // other options
});		
		
	
	//------- Contact Form Submition ---------//
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			formDetail.append('form_type' , _this.attr('form-type'));
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});
	
	
	//Single page scroll js
	$('.os_navigation_wrapper ul li a').on('click' , function(e){
	  $('.os_navigation_wrapper ul li').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[data-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('80', 10);
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.os_navigation_wrapper ul li');
	  if (windscroll >= 0) {
	   $('[data-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 90) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.os_navigation_wrapper ul li:first').addClass('active');
	  }

	});
	
	
	
	// scrolling animation js
	
	 var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
            $('.animated-row').each(function() {
                var $this = $(this);
                $this.find('.animate').each(function(i) {
                    var $item = $(this);
                    var animation = $item.data('animate');
                    $item.on('inview', function(event, isInView) {
                        if (isInView) {
                            setTimeout(function() {
                                $item.addClass('animated ' + animation).removeClass('animate');
                            }, i * 50);
                        } else if (!screencheck(767)) {
                            $item.removeClass('animated ' + animation).addClass('animate');
                        }
                    });
                });
            });
	
	//-------------------------------------------------------
    // counter-section
    //-------------------------------------------------------
    $('.counter-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });
	
	
	
	
/*** CHECKOUT PAGE FORM TOGGLE ICON ***/
$(".form-toggle.accordion_toggle a").click(function(){
	$(this).toggleClass("pointed");
});	



/*** Side Panel Functions ***/
$(".panel-icon").click(function(){
	$(".side-panel").toggleClass("show");
});	


$(".boxed-style").click( function(){
	$(".theme-layout").addClass("boxed");
	$("body").addClass('bg-body1');
});

$(".full-style").click( function(){
	$(".theme-layout").removeClass("boxed");
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});
$(".pat1").click( function(){
	$("body").addClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});
$(".pat2").click( function(){
	$("body").removeClass('bg-body1');
	$("body").addClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});
$(".pat3").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").addClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});
$(".pat4").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").addClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});
$(".pat5").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").addClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});	
$(".pat6").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").addClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});	
$(".pat7").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").addClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").removeClass('bg-body9');
});	
$(".pat8").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").addClass('bg-body8');
	$("body").removeClass('bg-body9');
});	
$(".pat9").click( function(){
	$("body").removeClass('bg-body1');
	$("body").removeClass('bg-body2');
	$("body").removeClass('bg-body3');
	$("body").removeClass('bg-body4');
	$("body").removeClass('bg-body5');
	$("body").removeClass('bg-body6');
	$("body").removeClass('bg-body7');
	$("body").removeClass('bg-body8');
	$("body").addClass('bg-body9');
});


// collection Slider
		var swiper = new Swiper('.swiper-container', {
	      effect: 'coverflow',
	      loop: !0, 
	      mode:'horizontal',
	      grabCursor: true,
	      centeredSlides: !0,
	      parallax: !0,
	      grabCursor: true,
	      effect: 'coverflow',
	      slidesPerView: 'auto',
	      coverflowEffect: {
	        rotate:  20, 
	        stretch: 0,
	        depth: 90,
	        modifier: 1,
	        slideShadows : !1,
	      },
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: !0
	      },
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	    });
		
		
		//-------------------------------------------------------
    // counter-section
    //-------------------------------------------------------
    $('.counter-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).off('inview');
        }
    });
	
	
	$(document).ready(function() {
              $('.sb_testimonial_slider_wrapper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
				autoplay:true,
                responsiveClass: true,
				smartSpeed: 1200,
				navText : ['<i class="flaticon-left-arrow" aria-hidden="true"></i>','<i class="flaticon-right-arrow" aria-hidden="true"></i>'],
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 1,
                    nav: true
                  },
                  1000: {
                    items: 1,
                    nav: true,
                    loop: true,
                    margin: 20
                  }
                }
              })
            })
	

			var wind = $(window);
			$(".loading").fadeOut(500);
			wind.on('scroll', function () {
			$(".skills-progress span").each(function () {
				var bottom_of_object = 
				$(this).offset().top + $(this).outerHeight();
				var bottom_of_window = 
				$(window).scrollTop() + $(window).height();
				var myVal = $(this).attr('data-value');
				if(bottom_of_window > bottom_of_object) {
					$(this).css({
					  width : myVal
					});
				}
			});
		});
	
 });

})(jQuery);	



