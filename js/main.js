$(document).ready(function () {
    'use strict';
    var hamburger = $("#menu");

    hamburger.on('click', function () {
        $(".navs-container").slideToggle();
        $(".hamburger").toggleClass('open');
        $('.navbar').toggleClass('open');
    });

    function closeHamburgerIfOpen() {
        if ($(".navs-container").is(":visible") && $(window).width() <= 670) {
            $(".hamburger").removeClass('open');
            $('.navbar').removeClass('open');
            $(".navs-container").css('display', "none");
        }
    }

    // Hack to make sure everything is fixed on window resize (slideToggle affects html and overwrites the css)
    $(window).on('resize', function () {
        if ((!$(".navs-container").is(":visible")) && $(window).width() > 670) {
            $(".navs-container").toggle();
            $('.navbar').removeClass('open');
        }

        closeHamburgerIfOpen();
    });

    $(".project-photo").hover(function () {
        $(this).find('.project-info').addClass('mouseover');
    }, function () {
        $(this).find('.project-info').removeClass('mouseover');
    });

    $('#articles-link').click(function(){
        if ($("#articles").length) {
            closeHamburgerIfOpen();
            $('html, body').animate({
                scrollTop: $('#articles').offset().top
            }, 500);
        } else {
            window.location = $(this).attr('href');
        }
        return false;
    });

    $('#projects-link').click(function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });
});