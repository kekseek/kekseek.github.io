$(document).ready(() => {
    $(window).on('load', function () {
        var $preloader = $('#page-preloader'),
            $spinner   = $preloader.find('.spinner');
        $spinner.fadeOut();
        $preloader.delay(350).fadeOut('slow');
    });

    $('.heading h2, .heading h3, .footer').hide();    //скрытие текста  
    $('.undpan-row > div:first-child, .undpan-row > div:last-child')
                    .hide() 

//remove color from panels
    $('.panels').children().addClass('panel-non-active');
    
//rainbow chars
    const colors = ['#e74c3c', '#e67e22', '#f1c40f', 
        '#2ecc71', '#3498db', '#3848d3', '#9b59b6'],
        
    el = $('.heading h3'),
    elText = $('.heading h3').text(), // элемент, у которого меняем цвет
    elRowLength = $(el).text().length,

    $leftTiger = $('.undpan-row > div:first-child'),
    $rightTiger = $('.undpan-row > div:last-child'),
    $hangingGirl = $('.heading > div:first-child');

    let i = 0,
        j = 0,
        makeARainbow;

    headerAdvice = Array.from($(el).text()),

    rainbowChars = headerAdvice.map((char, ind) => { //замена цвета в буквах
        if (i === 6) i = 0;
        if (char !== ' ') {
            return `<span style="color: ${colors[i++]}; font-size: 1.02em">${char}</span>`
        } else {
            return `<span style="font-size: 1.02em"> </span>`;
        };
    });
    
    const rainbowCharsLength = rainbowChars.length;

    function replaceAt(string, index, replace) {
        return string.substring(0, index) + replace + string.substring(index + 1);
    }

//header events
    $('.heading').on('mouseenter', () => { 
        setTimeout(() => {
            $('.heading h2').fadeIn().addClass('heading-active');

            setTimeout(() => {
                $('.heading h1').css('padding-top', '20px');
                $('.heading h1, .heading h2').addClass('animated rubberBand');
                $hangingGirl.addClass('hanging-girl');
            }, 100);
        }, 400);
        setTimeout(() => {
            $hangingGirl.css('transform', 'translate(20%, -6%)');
        }, 500);
        
        $('.heading h3').hide().removeClass('heading-active').html(elText);
        clearInterval(makeARainbow);
    });

    $('.panels').on('mouseenter', () => { 
        if ($('.heading h2').hasClass('heading-active')) {
            
            $('.heading h2').fadeOut().removeClass('heading-active');
            
            setTimeout(() => {
                $('.heading h1').css('padding-top', '100px');
                $('.heading h3').fadeIn('slow').addClass('heading-active animated rubberBand');
                $hangingGirl.css('transform', 'translate(20%, -100%)');
            }, 500);
            
            makeARainbow = setInterval(() => {
                //чередование цветов радуги в тексте
                if (rainbowChars[j] !== undefined && j < rainbowCharsLength) {
                    $('.heading h3').html(elText);

                    if(rainbowChars[j + 3]) {
                        $('.heading h3').html(replaceAt($('.heading h3').html(), j + 3, rainbowChars[j + 3]));
                    }
                    if(rainbowChars[j + 2]) {
                        $('.heading h3').html(replaceAt($('.heading h3').html(), j + 2, rainbowChars[j + 2]));
                    }
                    if(rainbowChars[j + 1]) {
                        $('.heading h3').html(replaceAt($('.heading h3').html(), j + 1, rainbowChars[j + 1]));
                    }
                    $('.heading h3').html(replaceAt($('.heading h3').html(), j, rainbowChars[j]));
                }

                if (j < rainbowCharsLength) {
                    j++;
                } else {
                    j = 0;
                }
            }, 50);
        };
    });

//5pic panel events
//взаимодействие с кликабельными панелями
    setInterval(() => {
        $('.panel > p:nth-child(2)').toggleClass('animated pulse');
    }, 1500);

    $('.panel').on('mouseenter', (event) => {
        $('.heading h3').html(elText);
            
        setTimeout(() => {
            clearInterval(makeARainbow);
        }, 5000);
        setTimeout(() => {
            $(event.currentTarget).toggleClass('open');
            setTimeout(() => {
                $(event.currentTarget).toggleClass('open-active');
            }, 600);
            $(event.currentTarget).siblings().removeClass('open');
            setTimeout(() => {
                $(event.currentTarget).siblings().removeClass('open-active');
            }, 300);
        }, 400);
    });

//first row under panels
    $('.undpan-row').on('mouseenter', () => {
        //появление боковых изображений
        $('.undpan-row').css('pointer-events', 'none');
        setTimeout(() => {
            $('.undpan-row > div:first-child, .undpan-row > div:last-child').fadeToggle('slow');
            
            //рык
            playSoundRoar();
            function playSoundRoar() {
                const audio = document.querySelector(`audio[data-key="65"]`);
                if (!audio) return;
                audio.currentTime = 0;
                audio.play();
            }
        }, 300);

        setTimeout(() => { //"оживляю" зверей
            $('.footer').slideDown();
            $('.undpan-row > div:nth-child(2)').addClass('attack');
            $leftTiger.addClass('attack2').text('Raah!!!!!');
        }, 2000);
        
        $leftTiger.toggleClass('rounded-border-right');
        $rightTiger.toggleClass('rounded-border-left');

        setTimeout(() => {
            $rightTiger.addClass('attack3').text('WEEEE!!!');
            $leftTiger.removeClass('attack2').text('');
        }, 5000);
    });

//footer 
    $('.footer').on('mouseenter', () => {
        $('.footer > div:nth-child(1)').addClass('animated fadeInLeftBig');
        $('.footer > div:nth-child(2)').addClass('animated fadeInRightBig');
        $('.footer > div:nth-child(3)').addClass('animated lightSpeedIn');
    });
});