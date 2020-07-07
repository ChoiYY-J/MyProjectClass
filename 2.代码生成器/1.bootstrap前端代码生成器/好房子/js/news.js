$(function(){
	$(".AllSortBtn ").hover(function(){
		$(".side-nav").css("display","block")
	},function(){
		$(".side-nav").css("display","none")
	})
	//顶部左侧导航
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
	$(".toolbar-item-top").click(function(){
		goto("#topnav")
	})
})