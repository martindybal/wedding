! function (a) {
    "use strict";

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    var homeCarouselMove = function () {
        var activeItem = $('.home-carousel').find('.item.active');
        var nextItem = activeItem.next();
        if (nextItem.length) {
            nextItem.addClass('active');
            activeItem.animate({ height: '0' },
                1000,
                function () {
                    activeItem.removeClass('active').removeAttr('style');
                });
        } else {
            nextItem = $('.home-carousel .item').first();
            nextItem.css('height', 0).addClass('active').animate({ height: '100vh' },
                1000,
                function () {
                    nextItem.removeAttr('style');
                    activeItem.removeClass('active');
                });

        }
    }

    var startHomeCarousel = function () {
        setInterval(homeCarouselMove, 5000);
    }

    $(function () {
        setTimeout(function () {
            var $h1 = $('.announcement-wrapper h1');
            var $h2 = $('.announcement-wrapper h2');

            $h2.fadeOut(1000, function () {
                $h2.text('Budeme se brát!').fadeIn(500, function () {
                    setTimeout(function () {
                        $h1.show().animate({ height: "45px" }, 500, function () {
                            $('.scroll-down').fadeIn(function () {
                                $('section.section-hero').addClass('animation-completed');
                                setTimeout(function () {
                                    homeCarouselMove();
                                    startHomeCarousel();
                                }, 3000);
                            });
                        });
                    }, 1000);
                });
            });
        }, 2000);
    });
    
    $('#hero').on('DOMMouseScroll mousewheel', function (event) {
        //scroll down
        if ($(window).scrollTop() < 100) {
            if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
                scrollToElement('#couple');
                event.preventDefault();
                return false;
            }
        }
    });

    function f() {
        c.data("waypoint").context.refresh(), e.each(function (b, c) {
            var d = a(c);
            void 0 !== d.data("waypoint") && d.data("waypoint").context.refresh();
        }), i();
    }

    function g() {
        a(".img-as-bg").each(function (b, c) {
            var d = a(c);
            d.parent().css("background-image", 'url("' + d.attr("src") + '")'), d.remove();
        });
    }

    function h() {
        a("button.open-menu").on("click", function () {
            c.toggleClass("opened");
        }), i();
    }

    function i() {
        var a = c.find("ul.menu").innerHeight(),
            b = c.find(".menu-wrapper");
        a <= window.innerHeight ? b.css("max-height", a).css("overflow", "hidden") : b.css("max-height", window.innerHeight).css("overflow", "auto");
    }

    var waypointFirstHandler = true;
    function j() {
        var a = new Waypoint({
            element: c.get(0),
            handler: function (a) {
                if ("up" === a) {
                    c.removeClass("nav-fixed");
                    scrollToElement('#hero');
                } else {
                    if (waypointFirstHandler) {
                        if ($(window).scrollTop() > 100) {
                            waypointFirstHandler = false;
                            c.addClass("nav-fixed");
                        }
                    } else {
                        c.addClass("nav-fixed");
                    }
                }
            }
        });
        c.data("waypoint", a);
    }

    function k() {
        a(".scroll-link").on("click", function (d) {
            d.preventDefault();
            var e = a(this);
            var f = e.attr("href");
            scrollToElement(f);
            a('nav.opened').removeClass("opened");
        });
    }

    function scrollToElement(elementSelector) {
        var g = (b.hasClass("admin-bar") ? 32 : 0) + (b.hasClass("nav-vertical") ? 0 : 48);
        0 !== elementSelector.indexOf("#") || b.hasClass("scrolling") || b.addClass("scrolling").add("html").animate({
            scrollTop: a(elementSelector).offset().top - g + 1
        }, 1000, function () {
            b.removeClass("scrolling"), e.parents("nav").length > 0 && c.removeClass("opened").find(".menu-wrapper").animate({
                scrollTop: 0
            }, 1000);
        });
    }

    function l() {
        e.each(function (d, e) {
            var f = a(e),
                g = f.attr("id"),
                h = (b.hasClass("admin-bar") ? 32 : 0) + (b.hasClass("nav-vertical") ? 0 : 48) + c.innerHeight(),
                i = null;
            if (c.find("a").each(function (a, b) {
                b.hash === "#" + g && (i = b);
            }), null === i) return true;
            f.data("menu", i);
            var j = new Waypoint({
                element: e,
                handler: function (b) {
                    var c = a(f.data("menu")).parent();
                    "up" === b && (c.removeClass("current-menu-item"), c = a(f.prevAll("section").eq(0).data("menu")).parent()), c.addClass("current-menu-item"), c.siblings().removeClass("current-menu-item");
                },
                offset: h
            });
            f.data("waypoint", j);
        });
    }

    function m() {
        var b = a(window),
            c = window.innerHeight,
            d = 0,
            e = b.scrollTop();
        e - d >= 0 && a(".animation-chain").each(function (b, d) {
            var f = a(d);
            if (e > f.offset().top - c / 4 * 3) {
                var g = f.data("animation");
                (void 0 === g || "" === g) && (g = "fadeInUp"), f.animateCssChain(g);
            }
        }), d = e, window.requestAnimationFrame(m);
    }

    function n() {
        var d = a("section.section-hero .owl-carousel");
        d.imagesLoaded(function () {
            d.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                items: 1,
                autoHeight: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 8e3,
                autoplayHoverPause: false,
                smartSpeed: 1e3,
                lazyLoad: true,
                animateOut: "fadeOut"
            }).on('loaded.owl.lazy', function (event) {
                $(event.element).addClass('img-as-bg');
                g();
            }), setTimeout(function () {
                window.requestAnimationFrame(m), setTimeout(function () {
                    a(".section-hero .cta").animateCss("fadeInUp");
                }, 1e3);
            }, 600);
        }), a(".section-hero .scroll-down").on("click", function () {
            b.add("html").animate({
                scrollTop: c.offset().top
            }, 1e3);
        });
    }

    function o() {
        var html = ' <div class="owl-carousel owl-theme">' +
            '<div class="item"><img src="img/photos_compressed/carousel_1.jpg" srcset="img/photos_compressed/responsive/carousel_1_300.jpg, img/photos_compressed/responsive/carousel_1_450.jpg 1.5x, img/photos_compressed/responsive/carousel_1_600.jpg 2x, img/photos_compressed/responsive/carousel_1_750.jpg 2.5x, img/photos_compressed/responsive/carousel_1_900.jpg 3x" alt=""></div>' +
            '<div class="item"><img src="img/photos_compressed/carousel_2.jpg" srcset="img/photos_compressed/responsive/carousel_2_300.jpg, img/photos_compressed/responsive/carousel_2_450.jpg 1.5x, img/photos_compressed/responsive/carousel_2_600.jpg 2x, img/photos_compressed/responsive/carousel_2_750.jpg 2.5x, img/photos_compressed/responsive/carousel_2_900.jpg 3x" alt=""></div>' +
            '<div class="item"><img src="img/photos_compressed/carousel_3.jpg" srcset="img/photos_compressed/responsive/carousel_3_300.jpg, img/photos_compressed/responsive/carousel_3_450.jpg 1.5x, img/photos_compressed/responsive/carousel_3_600.jpg 2x, img/photos_compressed/responsive/carousel_3_750.jpg 2.5x, img/photos_compressed/responsive/carousel_3_900.jpg 3x" alt=""></div>' +
            '<div class="item"><img src="img/photos_compressed/carousel_4.jpg" srcset="img/photos_compressed/responsive/carousel_4_300.jpg, img/photos_compressed/responsive/carousel_4_450.jpg 1.5x, img/photos_compressed/responsive/carousel_4_600.jpg 2x, img/photos_compressed/responsive/carousel_4_750.jpg 2.5x, img/photos_compressed/responsive/carousel_4_900.jpg 3x" alt=""></div>' +
            '<div class="item"><img src="img/photos_compressed/carousel_5.jpg" srcset="img/photos_compressed/responsive/carousel_5_300.jpg, img/photos_compressed/responsive/carousel_5_450.jpg 1.5x, img/photos_compressed/responsive/carousel_5_600.jpg 2x, img/photos_compressed/responsive/carousel_5_750.jpg 2.5x, img/photos_compressed/responsive/carousel_5_900.jpg 3x" alt=""></div>' +
            '<div class="item"><img src="img/photos_compressed/carousel_6.jpg" srcset="img/photos_compressed/responsive/carousel_6_300.jpg, img/photos_compressed/responsive/carousel_6_450.jpg 1.5x, img/photos_compressed/responsive/carousel_6_600.jpg 2x, img/photos_compressed/responsive/carousel_6_750.jpg 2.5x, img/photos_compressed/responsive/carousel_6_900.jpg 3x" alt=""></div>' +
            '</div>';
        $('.separator-carousel').html(html);
        var b = a(".separator-carousel .owl-carousel");
        b.imagesLoaded(function () {
            b.owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                items: 4,
                autoHeight: false,
                autoWidth: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5e3,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 3
                    },
                    992: {
                        items: 4
                    }
                }
            });
        });
    }

    function p() {
        function k() {
            setTimeout(function () {
                e.addClass("opened"), i.addClass("loaded");
            }, 300);
        }
        var b = a(".gallery-grid");
        void 0 !== a.fn.imagesLoaded && void 0 !== a.fn.isotope && (b.imagesLoaded(function () {
            b.isotope({
                itemSelector: ".gallery-grid-item",
                layoutMode: "masonry",
                initLayout: false
            }).on("layoutComplete", function (a) {
                l();
            }).isotope();
        }), b.find(".gallery-grid-item").each(function (b, c) {
            a(c).find("ul.video").length > 0 && a("<img />").attr("src", "img/youtube-play.svg").addClass("gallery-video-icon").prependTo(c);
        }));
        var c = a(".gallery-cats a");
        c.on("click", function (c) {
            c.preventDefault();
            var d = a(this).data("cat");
            "*" !== d && (d = "." + d), b.isotope({
                filter: d
            });
        });
        var d = a("#gallery .gallery-grid-item"),
            e = a(".gallery-modal"),
            f = a(".gallery-modal .modal-nav-prev"),
            g = a(".gallery-modal .modal-nav-next"),
            h = a(".gallery-modal .modal-nav-close"),
            i = a(".gallery-overlay"),
            j = a(".gallery-open-modal");
        f.on("click", function (a) {
            a.preventDefault(), d.filter(".current").prev().trigger("click");
        }), g.on("click", function (a) {
            a.preventDefault(), d.filter(".current").next().trigger("click");
        }), h.on("click", function (a) {
            a.preventDefault(), i.trigger("click");
        }), j.on("click", function (b) {
            b.preventDefault(), a(this).parents(".gallery-grid-item").trigger("click");
        }), d.on("click", function (b) {
            if ("img" === b.target.tagName.toLowerCase() || a(b.target).hasClass("gallery-grid-item")) {
                var c = a(this),
                    d = c.find(".gallery-info"),
                    h = e.find(".left"),
                    j = e.find(".right"),
                    l = c.find("ul.image-list"),
                    m = c.find("ul.video");
                if (c.addClass("current").siblings().removeClass("current"), f.parent().toggleClass("enabled", c.prev().length > 0), g.parent().toggleClass("enabled", c.next().length > 0), h.empty().append(d.clone()), j.empty(), l.length > 0) {
                    var n = a("<div />").addClass("owl-carousel owl-theme");
                    l.find("img").each(function (b, c) {
                        var d = a(c).clone();
                        d.attr("src", d.data("src")), d.hasClass("img-vertical") && d.css("max-height", window.innerHeight - 240), a("<div />").addClass("item").append(d).appendTo(n);
                    }), j.append(n), n.imagesLoaded(function () {
                        n.owlCarousel({
                            loop: true,
                            margin: 0,
                            nav: false,
                            items: 1,
                            autoHeight: true,
                            dots: true
                        }), k();
                    });
                }
                if (m.length > 0) {
                    var o = m.find("iframe"),
                        p = o.data("src"),
                        q = a("<div />").addClass("wide-screen");
                    if (-1 !== p.indexOf("youtube")) {
                        var r = p.split("?"),
                            s = null,
                            t = null;
                        if (r.length > 0) {
                            s = r[0], t = s.split("/"), t = t.pop();
                            var u = a("<a />").attr({
                                href: "#"
                            }).append(a("<img/>").attr({
                                src: "http://i.ytimg.com/vi/" + t + "/maxresdefault.jpg"
                            }));
                            q.append(u), q.imagesLoaded(function () {
                                j.append(q), k();
                            }), u.on("click", function (a) {
                                a.preventDefault(), p += "&autoplay=1", q.empty().append(o.clone().attr({
                                    src: p
                                }));
                            });
                        }
                    } else q.append(o.clone().attr({
                        src: p
                    }).on("load", function () {
                        k();
                    })), j.append(q);
                }
                i.css("display", "flex"), setTimeout(function () {
                    i.addClass("opened");
                }, 100);
            }
        }), i.on("click", function (b) {
            a(b.target).hasClass("gallery-overlay") && (e.find(".right").empty(), e.removeClass("opened"), setTimeout(function () {
                i.removeClass("opened"), setTimeout(function () {
                    i.hide(), i.removeClass("loaded");
                }, 300);
            }, 300));
        });
    }

    function q() {
        var b = a(".countdown-area"),
            c = b.parent().find('h2');
        b.countdown(b.data("final-date"), {
            elapse: false,
            precision: 24 * 60 * 1000
        }).on("update.countdown", function (a) {
            // b.html(a.strftime('<ul><li><span class="digits">%-D</span><span class="unit"></span></li></ul>'));
            b.html(a.strftime('<span class="digits">%-D</span>'));
        }).on("finish.countdown", function (a) {
            c.html(c.data("after-countdown"));
            // b.html(b.data("after-countdown"));
            b.parent().children().filter('[data-after-countdown]').each(function (i, e) {
                var $e = $(e);
                $e.html($e.data("after-countdown"));
            });
            b.parent().children().filter('[data-hide-after-countdown]').hide();
        });
    }
    
    function s() {
        a(".btn-event-rsvp").on("click", function (c) {
            c.preventDefault();
            var d = a(this).data("event"),
                e = a("form.rsvp option[value=" + d + "]"),
                f = a(".section-rsvp ul.events>li[data-event=" + d + "]");
            e.prop("selected", true), f.addClass("selected"), b.add("html").animate({
                scrollTop: a(".section-rsvp").offset().top
            }, 400);
        }), a(".section-rsvp ul.events>li").on("click", function () {
            var b = a(this),
                c = b.data("event"),
                d = a("form.rsvp option[value=" + c + "]");
            b.hasClass("selected") ? d.prop("selected", false) : d.prop("selected", true), b.toggleClass("selected");
        });
    }
    var b = a("body"),
        c = a("nav"),
        e = a("section");
    window.onload = function () {
        g(), h(), j(), k(), l(), n(), o(), p(), q(), s(), a('body').removeClass('preload');
    }, a(window).on("resize orientationchange", function () {
        f();
    }), a.fn.extend({
        animateCss: function (b) {
            var c = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            a(this).addClass("animated " + b).one(c, function () {
                a(this).removeClass(b);
            });
        },
        animateCssChain: function (b, c) {
            (void 0 === c || null === c || "" === c) && (c = .1), a(this).children().each(function (d, e) {
                var f = a(e);
                return f.hasClass("animated") ? true : void f.css({
                    "-webkit-animation-delay": c * d + "s",
                    "animation-delay": c * d + "s"
                }).animateCss(b);
            });
        }
    });
}(jQuery);