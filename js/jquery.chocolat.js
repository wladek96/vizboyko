!function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c,d){function f(b,c){var d=this;return this.settings=c,this.elems={},this.element=b,this._cssClasses=["chocolat-open","chocolat-in-container","chocolat-cover","chocolat-zoomable","chocolat-zoomed"],!this.settings.setTitle&&b.data("chocolat-title")&&(this.settings.setTitle=b.data("chocolat-title")),this.element.find(this.settings.imageSelector).each(function(){d.settings.images.push({title:a(this).attr("title"),src:a(this).attr(d.settings.imageSource),height:!1,width:!1})}),this.element.find(this.settings.imageSelector).each(function(b){a(this).off("click.chocolat").on("click.chocolat",function(a){d.init(b),a.preventDefault()})}),this}var e=0;a.extend(f.prototype,{init:function(a){return this.settings.initialized||(this.setDomContainer(),this.markup(),this.events(),this.settings.lastImage=this.settings.images.length-1,this.settings.initialized=!0),this.settings.afterInitialize.call(this),this.load(a)},preload:function(b){var c=a.Deferred();if(void 0!==this.settings.images[b]){var d=new Image;return d.onload=function(){c.resolve(d)},d.src=this.settings.images[b].src,c}},load:function(b){var c=this;if(this.settings.fullScreen&&this.openFullScreen(),this.settings.currentImage!==b){this.elems.overlay.fadeIn(this.settings.duration),this.elems.wrapper.fadeIn(this.settings.duration),this.elems.domContainer.addClass("chocolat-open"),this.settings.timer=setTimeout(function(){void 0!==c.elems&&a.proxy(c.elems.loader.fadeIn(),c)},this.settings.duration);var d=this.preload(b).then(function(a){return c.place(b,a)}).then(function(a){return c.appear(b)}).then(function(a){c.zoomable(),c.settings.afterImageLoad.call(c)}),e=b+1;return void 0!==this.settings.images[e]&&this.preload(e),d}},place:function(a,b){var d,c=this;return this.settings.currentImage=a,this.description(),this.pagination(),this.arrows(),this.storeImgSize(b,a),d=this.fit(a,c.elems.wrapper),this.center(d.width,d.height,d.left,d.top,0)},center:function(a,b,c,d,e){return this.elems.content.css("overflow","visible").animate({width:a,height:b,left:c,top:d},e).promise()},appear:function(a){var b=this;clearTimeout(this.settings.timer),this.elems.loader.stop().fadeOut(300,function(){b.elems.img.attr("src",b.settings.images[a].src)})},fit:function(b,c){var d,e,f=this.settings.images[b].height,g=this.settings.images[b].width,h=a(c).height(),i=a(c).width(),j=this.getOutMarginH(),k=this.getOutMarginW(),l=i-k,m=h-j,n=m/l,o=h/i,p=f/g;return"cover"==this.settings.imageSize?p<o?(d=h,e=d/p):(e=i,d=e*p):"native"==this.settings.imageSize?(d=f,e=g):(p>n?(d=m,e=d/p):(e=l,d=e*p),"default"===this.settings.imageSize&&(e>=g||d>=f)&&(e=g,d=f)),{height:d,width:e,top:(h-d)/2,left:(i-e)/2}},change:function(a){this.zoomOut(0),this.zoomable();var b=this.settings.currentImage+parseInt(a);if(b>this.settings.lastImage){if(this.settings.loop)return this.load(0)}else{if(!(b<0))return this.load(b);if(this.settings.loop)return this.load(this.settings.lastImage)}},arrows:function(){this.settings.loop?a([this.elems.left[0],this.elems.right[0]]).addClass("active"):this.settings.linkImages?(this.settings.currentImage==this.settings.lastImage?this.elems.right.removeClass("active"):this.elems.right.addClass("active"),0===this.settings.currentImage?this.elems.left.removeClass("active"):this.elems.left.addClass("active")):a([this.elems.left[0],this.elems.right[0]]).removeClass("active")},description:function(){var a=this;this.elems.description.html(a.settings.images[a.settings.currentImage].title)},pagination:function(){var a=this,b=this.settings.lastImage+1,c=this.settings.currentImage+1;this.elems.pagination.html(c+" "+a.settings.separator2+b)},storeImgSize:function(a,b){void 0!==a&&(this.settings.images[b].height&&this.settings.images[b].width||(this.settings.images[b].height=a.height,this.settings.images[b].width=a.width))},close:function(){if(this.settings.fullscreenOpen)return void this.exitFullScreen();var b=[this.elems.overlay[0],this.elems.loader[0],this.elems.wrapper[0]],c=this,d=a.when(a(b).fadeOut(200)).done(function(){c.elems.domContainer.removeClass("chocolat-open")});return this.settings.currentImage=!1,d},destroy:function(){this.element.removeData(),this.element.find(this.settings.imageSelector).off("click.chocolat"),this.settings.initialized&&(this.settings.fullscreenOpen&&this.exitFullScreen(),this.settings.currentImage=!1,this.settings.initialized=!1,this.elems.domContainer.removeClass(this._cssClasses.join(" ")),this.elems.wrapper.remove())},getOutMarginW:function(){return this.elems.left.outerWidth(!0)+this.elems.right.outerWidth(!0)},getOutMarginH:function(){return this.elems.top.outerHeight(!0)+this.elems.bottom.outerHeight(!0)},markup:function(){this.elems.domContainer.addClass("chocolat-open "+this.settings.className),"cover"==this.settings.imageSize&&this.elems.domContainer.addClass("chocolat-cover"),this.settings.container!==b&&this.elems.domContainer.addClass("chocolat-in-container"),this.elems.wrapper=a("<div/>",{class:"chocolat-wrapper",id:"chocolat-content-"+this.settings.setIndex}).appendTo(this.elems.domContainer),this.elems.overlay=a("<div/>",{class:"chocolat-overlay"}).appendTo(this.elems.wrapper),this.elems.loader=a("<div/>",{class:"chocolat-loader"}).appendTo(this.elems.wrapper),this.elems.content=a("<div/>",{class:"chocolat-content"}).appendTo(this.elems.wrapper),this.elems.img=a("<img/>",{class:"chocolat-img",src:""}).appendTo(this.elems.content),this.elems.top=a("<div/>",{class:"chocolat-top"}).appendTo(this.elems.wrapper),this.elems.left=a("<div/>",{class:"chocolat-left"}).appendTo(this.elems.wrapper),this.elems.right=a("<div/>",{class:"chocolat-right"}).appendTo(this.elems.wrapper),this.elems.bottom=a("<div/>",{class:"chocolat-bottom"}).appendTo(this.elems.wrapper),this.elems.close=a("<span/>",{class:"chocolat-close"}).appendTo(this.elems.top),this.elems.fullscreen=a("<span/>",{class:"chocolat-fullscreen"}).appendTo(this.elems.bottom),this.elems.description=a("<span/>",{class:"chocolat-description"}).appendTo(this.elems.bottom),this.elems.pagination=a("<span/>",{class:"chocolat-pagination"}).appendTo(this.elems.bottom),this.elems.setTitle=a("<span/>",{class:"chocolat-set-title",html:this.settings.setTitle}).appendTo(this.elems.bottom),this.settings.afterMarkup.call(this)},openFullScreen:function(){var a=this.elems.wrapper[0];a.requestFullscreen?(this.settings.fullscreenOpen=!0,a.requestFullscreen()):a.mozRequestFullScreen?(this.settings.fullscreenOpen=!0,a.mozRequestFullScreen()):a.webkitRequestFullscreen?(this.settings.fullscreenOpen=!0,a.webkitRequestFullscreen()):a.msRequestFullscreen?(a.msRequestFullscreen(),this.settings.fullscreenOpen=!0):this.settings.fullscreenOpen=!1},exitFullScreen:function(){c.exitFullscreen?(c.exitFullscreen(),this.settings.fullscreenOpen=!1):c.mozCancelFullScreen?(c.mozCancelFullScreen(),this.settings.fullscreenOpen=!1):c.webkitExitFullscreen?(c.webkitExitFullscreen(),this.settings.fullscreenOpen=!1):this.settings.fullscreenOpen=!0},events:function(){var d=this;a(c).off("keydown.chocolat").on("keydown.chocolat",function(a){d.settings.initialized&&(37==a.keyCode?d.change(-1):39==a.keyCode?d.change(1):27==a.keyCode&&d.close())}),this.elems.wrapper.find(".chocolat-right").off("click.chocolat").on("click.chocolat",function(){d.change(1)}),this.elems.wrapper.find(".chocolat-left").off("click.chocolat").on("click.chocolat",function(){return d.change(-1)}),a([this.elems.overlay[0],this.elems.close[0]]).off("click.chocolat").on("click.chocolat",function(){return d.close()}),this.elems.fullscreen.off("click.chocolat").on("click.chocolat",function(){if(d.settings.fullscreenOpen)return void d.exitFullScreen();d.openFullScreen()}),d.settings.backgroundClose&&this.elems.overlay.off("click.chocolat").on("click.chocolat",function(){return d.close()}),this.elems.wrapper.off("click.chocolat").on("click.chocolat",function(a){return d.zoomOut(a)}),this.elems.wrapper.find(".chocolat-img").off("click.chocolat").on("click.chocolat",function(a){if(null===d.settings.initialZoomState&&d.elems.domContainer.hasClass("chocolat-zoomable"))return a.stopPropagation(),d.zoomIn(a)}),this.elems.wrapper.mousemove(function(b){if(null!==d.settings.initialZoomState&&!d.elems.img.is(":animated")){var c=a(this).offset(),e=a(this).height(),f=a(this).width(),g=d.settings.images[d.settings.currentImage],h=g.width,i=g.height,j=[b.pageX-f/2-c.left,b.pageY-e/2-c.top],k=0;if(h>f){var l=d.settings.zoomedPaddingX(h,f);k=j[0]/(f/2),k*=(h-f)/2+l}var m=0;if(i>e){var n=d.settings.zoomedPaddingY(i,e);m=j[1]/(e/2),m*=(i-e)/2+n}var o={"margin-left":-k+"px","margin-top":-m+"px"};void 0!==b.duration?a(d.elems.img).stop(!1,!0).animate(o,b.duration):a(d.elems.img).stop(!1,!0).css(o)}}),a(b).on("resize",function(){d.settings.initialized&&d.debounce(50,function(){var a=d.fit(d.settings.currentImage,d.elems.wrapper);d.center(a.width,a.height,a.left,a.top,0),d.zoomable()})})},zoomable:function(){var a=this.settings.images[this.settings.currentImage],b=this.elems.wrapper.width(),c=this.elems.wrapper.height(),d=!(!this.settings.enableZoom||!(a.width>b||a.height>c)),e=this.elems.img.width()>a.width||this.elems.img.height()>a.height;d&&!e?this.elems.domContainer.addClass("chocolat-zoomable"):this.elems.domContainer.removeClass("chocolat-zoomable")},zoomIn:function(b){this.settings.initialZoomState=this.settings.imageSize,this.settings.imageSize="native";var c=a.Event("mousemove");c.pageX=b.pageX,c.pageY=b.pageY,c.duration=this.settings.duration,this.elems.wrapper.trigger(c),this.elems.domContainer.addClass("chocolat-zoomed");var d=this.fit(this.settings.currentImage,this.elems.wrapper);return this.center(d.width,d.height,d.left,d.top,this.settings.duration)},zoomOut:function(a,b){if(null!==this.settings.initialZoomState){b=b||this.settings.duration,this.settings.imageSize=this.settings.initialZoomState,this.settings.initialZoomState=null,this.elems.img.animate({margin:0},b),this.elems.domContainer.removeClass("chocolat-zoomed");var c=this.fit(this.settings.currentImage,this.elems.wrapper);return this.center(c.width,c.height,c.left,c.top,b)}},setDomContainer:function(){this.settings.container===b?this.elems.domContainer=a("body"):this.elems.domContainer=a(this.settings.container)},debounce:function(a,b){clearTimeout(this.settings.timerDebounce),this.settings.timerDebounce=setTimeout(function(){b()},a)},api:function(){var a=this;return{open:function(b){return b=parseInt(b)||0,a.init(b)},close:function(){return a.close()},next:function(){return a.change(1)},prev:function(){return a.change(-1)},goto:function(b){return a.open(b)},current:function(){return a.settings.currentImage},place:function(){return a.place(a.settings.currentImage,a.settings.duration)},destroy:function(){return a.destroy()},set:function(b,c){return a.settings[b]=c,c},get:function(b){return a.settings[b]},getElem:function(b){return a.elems[b]}}}});var g={container:b,imageSelector:".chocolat-image",className:"",imageSize:"default",initialZoomState:null,fullScreen:!1,loop:!1,linkImages:!0,duration:300,setTitle:"",separator2:"/",setIndex:0,firstImage:0,lastImage:!1,currentImage:!1,initialized:!1,timer:!1,timerDebounce:!1,images:[],enableZoom:!0,imageSource:"href",afterInitialize:function(){},afterMarkup:function(){},afterImageLoad:function(){},zoomedPaddingX:function(a,b){return 0},zoomedPaddingY:function(a,b){return 0}};a.fn.Chocolat=function(b){return this.each(function(){e++;var c=a.extend(!0,{},g,b,{setIndex:e});a.data(this,"chocolat")||a.data(this,"chocolat",new f(a(this),c))})}});