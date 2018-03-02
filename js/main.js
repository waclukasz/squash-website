var counterStorage = (localStorage.getItem('counter')) ? localStorage.getItem('counter') : '771';

// Expand Main Manu
$('.nav-toggler').on('click', expandMenu);

// Animate Toggler Menu
$('.nav-toggler').on('click', togglerAnimation);

// Smooth scroll on menu elements
$('.nav-item > a').on('click', function (e) {
    e.preventDefault();

    var $target = $($(this).attr('href'));

    $('html, body').delay(300).animate({
        scrollTop: $target.offset().top
    }, 800);

    togglerAnimation();
    expandMenu();
});

// Smooth scroll on header button 
$('.header-button').on('click', function () {
    let $target = $('#contact').offset().top;

    $('html, body').animate({
        scrollTop: $target
    }, 600);
});

// Counting number of detail section
$('#number-button').on('click', function () {

    if (!$(this).hasClass('runed')) {
        let $loader = $('.loader');
        let $number = $('.number');
        let $balls = $('#balls');

        $balls.text(counterStorage);

        $(this).addClass('runed');

        $loader.animate({
            opacity: "0"
        }, 250);

        $number.delay(250).animate({
            opacity: "1"
        }, 250);

        $number.each(function () {
            let $thisNumber = $(this);

            $({
                startValue: 0
            }).animate({
                startValue: $thisNumber.text()
            }, {
                duration: 1800,
                easing: "swing",
                step: function () {
                    $thisNumber.text(Math.ceil(this.startValue))
                }
            });
        });
        setInterval(function () {
            let counter = parseInt($balls.text());
            counter++

            $balls.text(counter);
            counterStorage = counter;
            localStorage.setItem('counter', JSON.stringify(counterStorage));
        }, 2000);
    };
});

// Show History
$('.history-item').on('click', function () {
    const contentData = ['Pierwszy amatorski turniej squasha , początkujący trwającą już 15 edycji serię HEAD S4S Silesia Cup', 'Walne Zgromadzenie Członków Założycieli, przyjmuje uchwałę o powołaniu do życia Stowarzyszenia S4S Squash For Silesia.', 'Stowarzyszenie S4S Squash For Silesia zostaje oficjalnie wpisane do Krajowego Rejestru Sądowego.', 'S4S jest współorganizatorem Summer Squash Team Cup 2017 (seria 4 turniejów drużynowych).', 'Firmy My Center SA, Unilever (Algida), HEAD Polska oraz Silesia Club zostają oficjalnym sponsorami S4S podczas rozgrywek Polskiej Ligi Squasha w sezonie 2017/2018', 'S4S po raz pierwszy w historii swojej działalności startuje w rozgrywkach Polskiej Ligi Squasha (w rozgrywkach startują 4 zespoły, 3 męskie i jeden juniorski)'];
    let $historyItems = $('.history-item');
    let $thisItem = $(this);
    let $contentTarget = $('.data-content');
    let $dataHeader = $('.data-head');



    if (!$contentTarget.is(':animated')) {
        $historyItems.each(function () {
            $(this).removeClass('active');
        });
        $thisItem.addClass('active');
        $contentTarget.animate({
            opacity: "0"
        }, {
            duration: 200,
            done: function () {
                $contentTarget.text(contentData[$thisItem.index()]);
                $contentTarget.animate({
                    opacity: "1"
                }, 200);
            }
        });
    }

    if (!$dataHeader.is(':animated')) {
        $dataHeader.animate({
            opacity: 0
        }, 200, function () {
            $dataHeader.animate({
                opacity: "1"
            }, 200);
            $dataHeader.text($thisItem.text());
        });
    }


})

function expandMenu() {
    let $menu = $('#navbar');
    let $menuContent = $('#navbar > *');

    if (!$menu.is(':animated')) {
        if (!$menu.hasClass('expand')) {
            $menu.animate({
                height: "100vh"
            }, 250, "swing", function () {
                $menuContent.animate({
                    opacity: "1"
                }, function () {
                    $menu.addClass('expand');
                });
            });

        } else {
            $menuContent.animate({
                opacity: "0"
            }, 100, "swing", function () {
                $menu.animate({
                    height: "0vh"
                }, 250, "swing", function () {
                    $menu.removeClass('expand')
                });
            });
        }
    }


}

function togglerAnimation(e) {
    let $cross = $('.cross');
    let $crossTop = $('.cross:nth-child(1)'),
        $crossBottom = $('.cross:nth-child(2)'),
        $menu = $('#navbar');



    if (!$cross.hasClass('turned')) {
        if (!$cross.is(':animated') || !$crossTop.is(':animated') || !$crossBottom.is(':animated') || !$menu.is(':animated')) {
            $cross.animate({
                top: "50%"
            }, 130, function () {
                $({
                    deg: 0
                }).animate({
                    deg: -45
                }, {
                    duration: 100,
                    step: function (now) {
                        $crossTop.css({
                            transform: "rotate(" + now + "deg)"
                        });
                    }
                });

                $({
                    deg: 0
                }).animate({
                    deg: 45
                }, {
                    duration: 100,
                    step: function (now) {
                        $crossBottom.css({
                            transform: "rotate(" + now + "deg)"
                        });
                        $cross.addClass('turned');
                    }
                });
                // For disable click reason
                $cross.animate({
                    opacity: 1
                }, 100);
            });
        }
    } else {
        // For disable click reason
        $cross.animate({
            opacity: 1
        }, 100);

        if (!$cross.is(':animated') || !$crossTop.is(':animated') || !$crossBottom.is(':animated') || !$menu.is(':animated')) {
            $({
                deg: -45
            }).animate({
                deg: 0
            }, {
                duration: 100,
                step: function (now) {
                    $crossTop.css({
                        transform: "rotate(" + now + "deg)"
                    });
                }
            });

            $({
                deg: 45
            }).animate({
                deg: 0
            }, {
                duration: 100,
                step: function (now) {
                    $crossBottom.css({
                        transform: "rotate(" + now + "deg)"
                    });
                }
            });

            $crossTop.animate({
                top: "0"
            });
            $crossBottom.animate({
                top: "100%"
            }, function () {
                $cross.removeClass('turned');

            });
        }

    };


}
