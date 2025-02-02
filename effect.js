// effect.js

$(window).load(function(){
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function(){
    var vw;
    
    // Align Balloons to Proper Positions
    function alignBalloons() {
        vw = $(window).width() / 2;
        $('#b1').css({top: 240, left: vw - 350});
        $('#b2').css({top: 240, left: vw - 250});
        $('#b3').css({top: 240, left: vw - 150});
        $('#b4').css({top: 240, left: vw - 50});
        $('#b5').css({top: 240, left: vw + 50});
        $('#b6').css({top: 240, left: vw + 150});
        $('#b7').css({top: 240, left: vw + 250});
    }

    $(window).resize(function(){
        alignBalloons();
    });

    $('#turn_on').click(function(){
        // Add glow classes to bulb elements
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');
        
        // Add peach background class
        $('body').addClass('peach');
        
        $(this).fadeOut('slow').delay(5000).promise().done(function(){
            $('#play').fadeIn('slow');
        });
    });

    $('#play').click(function(){
        var audio = $('.song')[0];
        audio.play();
        $('body').addClass('peach-after');
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');
        $(this).fadeOut('slow').delay(6000).promise().done(function(){
            $('#bannar_coming').fadeIn('slow');
        });
    });

    $('#bannar_coming').click(function(){
        $('.bannar').addClass('bannar-come');
        $(this).fadeOut('slow').delay(6000).promise().done(function(){
            $('#balloons_flying').fadeIn('slow');
        });
    });

    function loopBalloon(id) {
        var randleft = 1000 * Math.random();
        var randtop = 500 * Math.random();
        $(id).animate({left: randleft, bottom: randtop}, 10000, function() {
            loopBalloon(id);
        });
    }

    $('#balloons_flying').click(function(){
        alignBalloons();
        $('.balloon-border').animate({top: -500}, 8000);
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').fadeIn();
        setTimeout(function() {
            loopBalloon('#b1');
            loopBalloon('#b2');
            loopBalloon('#b3');
            loopBalloon('#b4');
            loopBalloon('#b5');
            loopBalloon('#b6');
            loopBalloon('#b7');
        }, 2000);
        $(this).fadeOut('slow').delay(5000).promise().done(function(){
            $('#cake_fadein').fadeIn('slow');
        });
    });

    $('#cake_fadein').click(function(){
        $('.cake').fadeIn('slow');
        $(this).fadeOut('slow').delay(3000).promise().done(function(){
            $('#light_candle').fadeIn('slow');
        });
    });

    $('#light_candle').click(function(){
        $('.fuego').fadeIn('slow');
        $(this).fadeOut('slow').promise().done(function(){
            $('#wish_message').fadeIn('slow');
        });
    });

    $('#wish_message').click(function(){
        alignBalloons();
        $('.balloons h2').fadeIn(3000);
        $(this).fadeOut('slow').delay(3000).promise().done(function(){
            $('#story').fadeIn('slow');
        });
    });

    // Floating Hearts Effect
    function createHearts() {
        for (let i = 0; i < 10; i++) {
            let heart = $("<div class='floating-heart'>❤️</div>");
            let leftPosition = Math.random() * $(window).width();
            heart.css({ left: leftPosition, bottom: 0, position: "fixed" });
            $("body").append(heart);
            heart.animate({ bottom: "100vh", opacity: 0 }, 5000, function () {
                $(this).remove();
            });
        }
    }

    $('#story').click(function(){
        $(this).fadeOut('slow');

        // Start Floating Hearts Animation
        setInterval(createHearts, 1000);

        // Hide balloons & cake before starting message animation
        $('.balloons').fadeOut('slow');
        $('.cake').fadeOut('slow').promise().done(function(){
            $('.message').fadeIn('slow');
        });

        function msgLoop(i) {
            $("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function(){
                i = i + 1;
                $("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
                if (i === $(".message p").length) {
                    $("p:nth-child(" + (i - 1) + ")").fadeOut('slow').promise().done(function () {
                        $('.cake').fadeIn('fast').delay(1000).promise().done(function(){
                            $('#go_next').fadeIn('slow');
                            launchFireworks();
                        });
                    });
                } else {
                    msgLoop(i);
                }
            });
        }
        msgLoop(0);
    });

    // Fireworks Effect
    function launchFireworks() {
        var duration = 3 * 1000;
        var end = Date.now() + duration;
        
        (function frame() {
            confetti({
                particleCount: 5,
                spread: 160,
                origin: { x: Math.random(), y: Math.random() }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    $('#go_next').hide();
    $('#go_next').click(function() {
        window.location.href = 'https://www.example.com'; // Replace with your target URL
    });
});
