$(function(){
	$('#week li').stop(true).mouseenter(function(){
		$(this).find('.submenu01').stop(true).css('display',"block")
	}).mouseleave(function(){
		$(this).find('.submenu01').css('display',"none")
	})
		// 轮播图
	    $('#banner').mouseenter(function (e) {
            e.preventDefault()
				$(this).find('#switch-btn').stop(true).css('display', 'block');
			}).mouseleave(function(){
				$(this).find('#switch-btn').stop(true).css('display', 'none');
		})
		var
			aBtnA = $('#btn-list a'),
			aBannerImg = $('#image-list img'),
			iIndex = 0,
			oBannerTime = null;

		// 点击按钮
		aBtnA.click(function (e) {
			e.preventDefault();
			iIndex = $(this).index();
			bannerMove(iIndex);
		});

		// 往左运动
		$('.left-btn').click(function() {
			iIndex--;
			if(iIndex < 0) {
				iIndex = aBannerImg.length - 1;
			}
			bannerMove(iIndex);
		});

		// 往右运动
		$('.right-btn').click(function() {
			iIndex++;
			if(iIndex >= aBannerImg.length) {
				iIndex = 0;
			}
			bannerMove(iIndex);
		});
	
		// 清除定时器
		$('#banner').hover(function () {
			clearInterval(oBannerTime);
		}, function () {
			autoMove();
		});
			function goto(id){
				$('body,html').animate({
					scrollTop:$(id).offset().top
				},800);
			}
	function autoMove() {
			oBannerTime = setInterval(function () {
				iIndex++;
				if(iIndex >= aBannerImg.length) {
					iIndex = 0;
				}
				bannerMove(iIndex);
			}, 2000);
		}
	function bannerMove(iIndex){
			aBtnA.removeClass('active').eq(iIndex).addClass('active');
			aBannerImg.stop(true).animate({opacity:0}, 500, function () {
				$(this).css('display', 'none');
			}).eq(iIndex).css('display', 'block').stop(true).animate({opacity:1}, 500);
		} 
	// 自动轮播
		autoMove();

	$(".erweima").hover(function(){
		$(this).find(".p_h_wximg").css("display","block")
	},function(){
		$(this).find(".p_h_wximg").css("display","none")
	})
	$(".p_h_wximg").hover(function(){
		$(".p_h_wximg").css("display","block")
	},function(){
		$(".p_h_wximg").css("display","none")
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
