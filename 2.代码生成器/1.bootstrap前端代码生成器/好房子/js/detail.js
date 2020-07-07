$(function(){
	$(".AllSortBtn ").hover(function(){
		$(".side-nav").css("display","block")
	},function(){
		$(".side-nav").css("display","none")
	})
	//	顶部左侧导航
	$('#week li').stop(true).mouseenter(function(){
		$(this).find('.submenu01').stop(true).css('display',"block")
	}).mouseleave(function(){
		$(this).find('.submenu01').css('display',"none")
	})
	//	返回顶部
	function goto(id){
		$('body,html').animate({
			scrollTop:$(id).offset().top
		},800);
	}
	$(window).scroll(function(){
		if($(this).scrollTop()>400){
	   		    $(".side-toolbar").stop(true).css('display','block');
	   		}else{
	   			$(".side-toolbar").stop(true).css('display','none');
	   		}
	});
	$(".toolbar-item-top").click(function(){
			goto("#topnav")
	})
	//左侧图下方小图轮播
	var PictagSwiper = new Swiper('.pic-little-tag .swiper-container', {
          	slidesPerView: 4,
            loop: true,
            speed:800
        })
	$(".pic-little-tag .arrow-left").click(function (e) {
		e.preventDefault();
        PictagSwiper.swipePrev();
    })
    $(".pic-little-tag .arrow-right").click(function (e) {
        e.preventDefault();
       PictagSwiper.swipeNext();
    })
    $(".pic-little-tag").mouseleave(function () {
        $(".pic-little-tag .arrow-left").hide();
        $(".pic-little-tag .arrow-right").hide();
    })
    $(".pic-little-tag").mousemove(function () {
        $(".pic-little-tag .arrow-left").show();
        $(".pic-little-tag .arrow-right").show();
    })
//	楼盘相册/楼盘户型图切换
	$(".xc-tit").hover(function(){
		var liindex = $('.xc-tit').index(this);
		$(this).addClass("add-on").siblings().removeClass("add-on");
		$(".tab_div").eq(liindex).show().siblings(".tab_div").hide();
		var liWidth = $(".xc-tit").width();
		$(".loup-xiangce-tit p").stop(false,true).animate({"left": liindex * liWidth + 'px'},200);
	})
	
//周边配套切换
	$(".arround").click(function () {
        var name = $(this).attr("name");
        var index = $(this).index();
        if ($(this).attr("issel") == "1") {
            return;
        }
        //清掉以前的颜色
        var old_beiyong = $(".arround[issel='1']").find("img").attr("by");
        $(".arround[issel='1']").find(".arr-n").css("color","#333");
        $(".arround[issel='1']").attr("issel","0");
        $(this).find(".arr-n").css("color","#ff3029");
        $(this).attr("issel","1");
        funmap(name);
	})
//	通知弹出框
	$('.bounced_show').click(function(){
		$('.tongzhi-layer').css('display','block')
	})
	$(".loup-tuan-tag").click(function(){
		$('.tongzhi-layer').css('display','block')
	})
	$(".loup-tel-tag").click(function(){
		$('.tongzhi-layer').css('display','block')
	})
	$('.close-send').click(function(){
		$(this).parent().parent().parent().css('display','none')
	})
	
	
	
	
})
