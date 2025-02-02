// effect.js

$(window).load(function(){
    $('.loading').fadeOut('fast');
    $('.container').fadeIn('fast');
});

$(document).ready(function(){
    var vw;
    $(window).resize(function(){
        vw = $(window).width() / 2;
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b11').animate({top: 240, left: vw - 350}, 500);
        $('#b22').animate({top: 240, left: vw - 250}, 500);
        $('#b33').animate({top: 240, left: vw - 150}, 500);
        $('#b44').animate({top: 240, left: vw - 50}, 500);
        $('#b55').animate({top: 240, left: vw + 50}, 500);
        $('#b66').animate({top: 240, left: vw + 150}, 500);
        $('#b77').animate({top: 240, left: vw + 250}, 500);
    });

    $('#turn_on').click(function(){
        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');
        $('body').addClass('peach');
        $(this).fadeOut('slow').delay(5000).promise().done(function(){
            $('#play').fadeIn('slow');
        });
    });

    $('#play').click(function(){
        var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');
        $('body').css('background-color', '#FFF');
        $('body').addClass('peach-after');
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
        $('.balloon-border').animate({top: -500}, 8000);
        $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
        $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
        loopBalloon('#b1');
        loopBalloon('#b2');
        loopBalloon('#b3');
        loopBalloon('#b4');
        loopBalloon('#b5');
        loopBalloon('#b6');
        loopBalloon('#b7');
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
        $('.balloons h2').fadeIn(3000);
        $(this).fadeOut('slow').delay(3000).promise().done(function(){
            $('#story').fadeIn('slow');
        });
    });

    // Create Floating Hearts
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
                        // Show cake AFTER all messages are done
                        $('.cake').fadeIn('fast').delay(1000).promise().done(function(){
                            $('#go_next').fadeIn('slow'); // Show "Next Surprise" button only at the end
                        });
                    });
                } else {
                    msgLoop(i);
                }
            });
        }
        msgLoop(0);
    });

    // Launch Fireworks at the end
    function launchFireworks() {
        var duration = 3 * 1000; // 3 seconds
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

    // Show final surprise and launch fireworks
    $('#go_next').fadeIn('slow', function() {
        launchFireworks(); // Fireworks when button appears
        $("p:last-child").addClass("sparkle-text"); // Make last message sparkle
    });

    // Redirect when "go_next" is clicked
    $('#go_next').click(function() {
        window.location.href = 'https://www.example.com'; // Replace with your target URL
    });
});
