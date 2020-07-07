$(function(){
	$(".AllSortBtn ").hover(function(){
		$(".side-nav").css("display","block")
	},function(){
		$(".side-nav").css("display","none")
	})
	
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
	
})
