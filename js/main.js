$(document).ready(function () {
    'use strict';
    var hamburger = $("#menu");

    hamburger.on('click', function () {
        $(".navs-container").slideToggle();
        $(".hamburger").toggleClass('open');
        $('.navbar').toggleClass('open');
    });

    // Hack to make sure everything is fixed on window resize (slideToggle affects html and overwrites the css)
    $(window).on('resize', function () {
        if ((!$(".navs-container").is(":visible")) && $(window).width() > 615) {
            $(".navs-container").toggle();
            $('.navbar').removeClass('open');
        }

        if ($(".navs-container").is(":visible") && $(window).width() <= 615) {
            $(".hamburger").removeClass('open');
            $('.navbar').removeClass('open');
            $(".navs-container").css('display', "none");
        }
    });

    $(".project-photo").hover(function () {
        $(this).find('.project-info').addClass('mouseover');
    }, function () {
        $(this).find('.project-info').removeClass('mouseover');
    });
});