/*
 bondOpacitySliderMini Opacity Slider jQuery plugin
 Author: Bondarenko Aleksey
 Homepage: http://alexbond.ru/
 */
(function($){
    $.fn.bondOpacitySlider=function(options){
        var constants = {
            fade : {fast:"fast", normal:"normal", slow:"slow"},
            direct:{next:"next",prev:"prev"}
        }
        var defaults={
            autoPlayTime: 5000,
            autoPlaySuspend: true,
            activeFrame: 0,
            speedOpacity: constants.fade.slow,
            autoPlayDirect: constants.direct.next,
            frame: "bondFrame"
        }
        var options=$.extend(defaults,options);
        var memory = { length: null, autoPlayTimer: null, opacity: [] };
        var this$=this;
        if ( !this$.length ) { console.log(this.selector + " не существует"); return; }
        var frames$ = this$.find("."+options.frame);
        initialization();
        bindEvent();
        start();
        function initialization(){
            memory.length = frames$.length;
            getOpacity();
            frames$.css({opacity:0});
            options.activeFrame = ( (options.activeFrame <= memory.length) && (options.activeFrame >= 0) )?  options.activeFrame : 0;
            $(frames$.get(options.activeFrame)).css({opacity:memory.opacity[options.activeFrame]});
        }
        function getOpacity(){
            for(var i = 0; i < memory.length; i++){
                memory.opacity[i] = $(frames$.get(i)).css("opacity");
            }
        }
        function start(){
            memory.autoPlayTimer = setInterval( function(){
                $(frames$.get(options.activeFrame)).stop().animate({opacity:0}, options.speedOpacity);
                nextActiveFrame();
                $(frames$.get(options.activeFrame)).stop().animate({opacity:memory.opacity[options.activeFrame]}, options.speedOpacity);
            }, options.autoPlayTime);
        }
        function nextActiveFrame(){
            if (options.autoPlayDirect == constants.direct.prev){
                options.activeFrame = (options.activeFrame <= 0 )? memory.length-1 :  options.activeFrame-1;
            }
            else {
                options.activeFrame = (options.activeFrame >= memory.length-1 )? 0 :  options.activeFrame+1;
            }
        }
        function bindEvent(){
            if (options.autoPlaySuspend)
            {
                this$.mouseenter(function(){
                    clearInterval(memory.autoPlayTimer);
                });
                this$.mouseleave(function(){
                    start();
                });
            }
        }
    }
})(jQuery);
