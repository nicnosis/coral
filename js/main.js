var initialHeight =  $('#about_coral').height()+$('#about_coral').offset().top;

$(window).scroll(function(){
  if($(window).innerHeight()>=992){
    var offsetPic = $('#pin1_wrapper').offset().top + $('#pin1_wrapper').height();
    var offsetDiv = $('#about_coral').offset().top;
    if (offsetPic > initialHeight){
      $('#about_coral').height(offsetPic-offsetDiv);
    }
  }

});
var scenesExist = false;
$(function () { // wait for document ready
  // build scene
  console.log($( window ).width());
  if ($( window ).width() >= 977){


  // console.log($("#trigger2").offset().top-$("#trigger3").offset().top);
  setupScenes();

  // new ScrollMagic.Scene({triggerElement: "#trigger7"})
  //       .on("enter", function (e) {
  //         $("#textbox3").html('<p class="slidertext">Coral are found in <span class="percentage">0.1%</span> of the ocean and yet support <span class="percentage">25%</span> of fish species.</p>');
  //       })  // add class toggle
  //       .addIndicators({name: "7"}) // add indicators (requires plugin)
  //       .addTo(controller);
  }

});
function setupScenes(){
  new ScrollMagic.Scene({triggerElement: "#trigger1", duration: $("#trigger2").offset().top-$("#trigger1").offset().top})
        .setClassToggle("#paragraph1", "reading")
        .on("enter", function (e) {
          $(".pointer").removeClass('visible');
          $(".zoom").removeClass('visible');
        }) // add class toggle// add class toggle
        // .addIndicators({name: "1"}) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger2", duration: $("#trigger3").offset().top-$("#trigger2").offset().top})
        .setClassToggle("#paragraph2", "reading")
        .on("enter", function (e) {
          $(".pointer").addClass('visible');
          $(".zoom").addClass('visible');
          $(".main").removeClass('invisible');
          $(".polyp").removeClass('visible');
          $(".polyp").removeClass('polyp_animation');
        }) // add class toggle
        // .addIndicators({name: "2"}) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger3", duration: $("#trigger4").offset().top-$("#trigger3").offset().top})
        .setClassToggle("#paragraph3", "reading")
        .on("enter", function (e) {
          $(".pointer").removeClass('visible');
          $(".zoom").removeClass('visible');
          $(".main").addClass('invisible');
          $(".polyp").addClass('visible');
          $(".polyp").addClass('polyp_animation');
          // $(".detail").addClass('invisible');
          $(".detail").removeClass('visible');
          $(".stinger").removeClass('visible');
        }) // add class toggle
         // add class toggle
        // .addIndicators({name: "3"}) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger4", duration: $("#trigger5").offset().top-$("#trigger4").offset().top})
        .setClassToggle("#paragraph4", "reading")
        .on("enter", function (e) {
          $(".detail").addClass('visible');
          $(".stinger").addClass('visible');
          $(".algae").removeClass('visible');
          // $(".detail").removeClass('invisible');
        }) // add class toggle// add class toggle
        // .addIndicators({name: "4"}) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger5"})
        .setClassToggle("#paragraph5", "reading") // add class toggle
        // .addIndicators({name: "5"})
        .on("enter", function (e) {
          $(".algae").addClass('visible');
          // $(".detail").removeClass('invisible');
        }) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger1", duration: $("#trigger5").offset().top-$("#trigger1").offset().top, triggerHook: 0.2})
        .setPin("#pin1_wrapper")
        // .setClassToggle("#pin1_wrapper", "fixed-position") // add class toggle
        // .addIndicators({name: "6"}) // add indicators (requires plugin)
        .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#trigger7", duration: 1600, triggerHook: 'onLeave'})
        //.setPin("#bgvid")
        .setClassToggle("#bgvid", "fixed-position") // add class toggle
        .on('end', function(e){
          $('#bgvid').css("top","auto")
          $('#bgvid').css("bottom",0)
        })
        .on('start', function(e){
          $('#bgvid').css("top","")
          $('#bgvid').css("bottom","")
        })
        // .addIndicators({name: "7"}) // add indicators (requires plugin)
        .addTo(controller);

  scenesExist = true;
}
var controller
$( window ).resize(function() {
  if ($( window ).width() >= 977 && !scenesExist){
    controller = new ScrollMagic.Controller();
    setupScenes();

  } else if ($( window ).width() < 977 && scenesExist){
    controller = controller.destroy(true);
    scenesExist = false;
  }
});

$(document).ready(function(){


    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    });



    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
});

$('.leaflet-map-pane').on('scroll', function(e){
  e.preventDefault();
})

$(window).load(function(){
  var height = ($('#carousel_pic1').outerHeight())/2;
  $('.arrow_wrapper').css('margin-top', height);
});

$(window).resize(function(){
  var height = ($('#carousel_pic1').outerHeight())/2;
  $('.arrow_wrapper').css('margin-top', height);

});

$(window).load(function(){
  if ($('#intro_image_wrapper img').outerHeight() <= 400){
    $('#intro_image_wrapper img').css('height','400px')
    $('#intro_image_wrapper img').css('width','auto')
  };
});
$(window).resize(function(){
  if ($('#intro_image_wrapper img').outerHeight() <= 400){
    $('#intro_image_wrapper img').css('height','400px')
    $('#intro_image_wrapper img').css('width','auto')
  };
  if ($('#intro_image_wrapper img').outerWidth() < $(window).width()){
    $('#intro_image_wrapper img').css('height','auto')
    $('#intro_image_wrapper img').css('width','100%')
  };
});
