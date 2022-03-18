$( window ).load(function() {
  $('#textbox1').addClass('visible');
});

(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      // container.append("<div class='twentytwenty-overlay'></div>");
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");

      // var overlay = container.find(".twentytwenty-overlay");
      // overlay.append("<div class='twentytwenty-before-label'></div>");
      // overlay.append("<div class='twentytwenty-after-label'></div>");

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h;
        var heightA = beforeImg.height();
        var heightB = window.innerHeight;
        if(heightA > heightB){
          h = heightB;
        }else{
          h = heightA;
        }
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
        // console.log(parseInt(offset.h));
        var height;
        if (parseInt(offset.h)>400){
          height = offset.h;
          // console.log('true');
        } else {
          height = '500px';
          // console.log('false');
        }
      	if (sliderOrientation === 'vertical') {
      	  beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+height+",0)");
    	}
        container.css("height", height);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      }

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var imgWidth = 0;

      slider.on("movestart", function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width();
        imgHeight = window.innerHeight;
      });

      slider.on("moveend", function(e) {
        container.removeClass("active");
      });

      slider.on("move", function(e) {
        if(e.pageX/window.innerWidth >= .75){
          $('#textbox1').addClass('visible');
        } else{
          $('#textbox1').removeClass('visible');
        }
        if(e.pageX/window.innerWidth <= .25){
          $('#textbox2').addClass('visible');
        } else{
          $('#textbox2').removeClass('visible');
        }
        if (container.hasClass("active")) {
          sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
          if (sliderPct < 0) {
            sliderPct = 0;
          }
          if (sliderPct > 1) {
            sliderPct = 1;
          }
          adjustSlider(sliderPct);
        }
        // ADD SHOW/HIDE FUNCTION HERE
        // console.log(e.pageX);
        // console.log(window.innerWidth);

      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);
