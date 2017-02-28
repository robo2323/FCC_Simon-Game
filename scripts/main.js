/*global $, document, window */

$(document).ready(function () {
    "use strict";

    var $sectionAboutOffset = $("#about").offset().top,
        $sectionPortfolioOffset = $("#portfolio").offset().top,
        $sectionContactOffset = $("#contact").offset().top,
        $navHeight = $('.navbar').height();

    $("nav a").addClass('nav-a-style-normal');
    $('#title-name').css('opacity', '1');




    //window resize handler
    $(window).resize(function () {
        //recalculate navbar height for scrolling function
        $navHeight = $('.navbar').height();
    });

    //page scroll on nav clicks
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this),
            $offset;
        if ($anchor.attr('href') !== "page-top") {
            $offset = $navHeight - $(window).height() * 0.03;
        } else {
            $offset = 0;
        }

        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - $offset)
        }, 1200, 'easeInOutQuint');
        event.preventDefault();
    });

    //var $oldScrollPos = $(window).scrollTop();

    //change navbar for different sections/scrolling
    $(window).scroll(function () {

        var $scrollPos = $(window).scrollTop();

        if ($scrollPos < 10) {
            $("nav").css("background-color", "rgba(34, 34, 34, 0.1)");
            $('.navbar-up-home').css('opacity', '0');

        }
        if ($scrollPos > 9) {
            $('.navbar-up-home').css('opacity', '1');

        }

        if ($scrollPos > 10 && $scrollPos < $sectionAboutOffset - $navHeight) {
            $("nav").css("background-color", "rgba(34, 34, 34, .1)");
            $("nav a").removeClass('nav-a-style-alt nav-a-style-green');
            $('nav h1').css('opacity', '0');
            $('#title-name').css('opacity', '1');

        }

        if ($scrollPos > ($sectionContactOffset - $navHeight - 1)) {
            $("[href]").removeClass('nav-active');
            $("[href='#contact']").addClass('nav-active');
            $("nav").css("background-color", "#FE7251");
            $('nav h1').css('opacity', '0');
            $('#title-contact').css('opacity', '1');
            $("nav a").removeClass('nav-a-style-green').addClass('nav-a-style-alt');


        }
        if ($scrollPos < $sectionAboutOffset - $navHeight) {
            $("[href]").removeClass('nav-active');


        }
        if ($scrollPos > $sectionAboutOffset - $navHeight - 1 && $scrollPos < $sectionPortfolioOffset - $navHeight) {
            $("[href]").removeClass('nav-active');
            $("[href='#about']").addClass('nav-active');
            $("nav").css("background-color", "rgba(34, 34, 34, 1)");
            $("nav a").removeClass('nav-a-style-alt').addClass('nav-a-style-normal');
            $('nav h1').css('opacity', '0');
            $('#title-about').css('opacity', '1');
        }
        if ($scrollPos > $sectionPortfolioOffset - $navHeight - 1 && $scrollPos < $sectionContactOffset - $navHeight - 1) {
            $("[href]").removeClass('nav-active');
            $("[href='#portfolio']").addClass('nav-active');
            $("nav").css("background-color", "#3AB76D");
            $('nav h1').css('opacity', '0');
            $('#title-portfolio').css('opacity', '1');
            $("nav a").removeClass('nav-a-style-green').addClass('nav-a-style-alt');


        }
    });



});