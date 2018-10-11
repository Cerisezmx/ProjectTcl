define(['jquery'],function($){
	function scroll(){
		var showIndex = 0; //用于记录下标
		var timer; //定时器
		$(function() {
			$("ul.uItems li").not(":eq(0)").css("display", "none");
			startTimer();
			//鼠标悬浮时
			$("ul.uIndex li").hover(function(){
				clearInterval(timer); // 清除定时器
				showIndex = $(this).index();
				showImg();
			}, function() {
				startTimer();
			});
			$(".btnPrev").click(function() {
				clearInterval(timer);
				if(showIndex == 0) showIndex = 4;
				showIndex--;
				showImg();
				startTimer();
			});
			$(".btnNext").click(function() {
				clearInterval(timer);
				if(showIndex == 3) showIndex = -1;
				showIndex++;
				showImg();
				startTimer();
			});
			//轮播图图片
			$.ajax({
				url:'data/scrollImg.json',
				success:function(data){
					for(var i= 0; i< data.length; i++){
						$(`<li><img src="${data[i].src}"/></li>`).appendTo('.uItems')
					}
					
				}
			})
			//左侧菜单栏子菜单显示/*<span>&#xe662;</span>*/
			var oBtnLis = $('.leftList').find('#tabUl').find('li');
			var oBtnDivs = $('.leftList').find('div');
			oBtnLis.mouseenter(function(){
				oBtnLis.attr('class','');
				oBtnDivs.css('display','none');
				$(this).attr('class','scLeftactive');
				$('.leftList').find('div').eq($(this).index()).css('display','block');
				oBtnDivs.eq($(this).index()).mouseenter(function(){
					oBtnLis.eq($(this).index() -1).attr('class','scLeftactive');
					$(this).css('display','block');
				});
				oBtnDivs.mouseleave(function(){
					oBtnLis.eq($(this).index() -1).attr('class','');
					$(this).css('display','none');
				});
			})
			oBtnLis.mouseleave(function(ev){
				oBtnLis.eq($(this).index()).removeClass('scLeftactive');
				oBtnDivs.eq($(this).index()).css('display','none');
			})
			$.ajax({
				url:'data/indextop.json',
				success:function(data){
					var scroll = data.scroll;

					for(var i = 0 ; i < scroll.length;i++){
						$(`<li>${scroll[i][0].listname}<span>&#xe662;</span></li>
							`).appendTo('.leftList')
						for(var j = 1 ; j < scroll[i].length;j++){
							$(`<div class='scLeftCon'>
								<ul class="slConUl"><li>
							<img src="${scroll[i][j].src}" alt="tva">
							<p>${scroll[i][j].title}</p>
							<a href="#">${scroll[i][j].buy}</a>
						</li></ul>
							</div>`).appendTo('.leftList');
						}
					}
				},
				error:function(msg){
					console.log(msg);
				}
			})
			/*//轮播左侧导航内容1--4kTV
			$.ajax({
				url:'data/scrLeftCon4KTV.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su1');
					}
				}
			})
			//轮播左侧导航内容2--曲面TV
			$.ajax({
				url:'data/scrLeftConCurvedtv.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su2');
					}
				}
			})
			//轮播左侧导航内容3--空调推荐
			$.ajax({
				url:'data/scrLeftConAir.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su3');
						}
					}
			})
			//轮播左侧导航内容4--冰洗爆款
			$.ajax({
				url:'data/scrLeftConRefriger.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su4');
						}
					}
			})
			//轮播左侧导航内容3--厨卫电器
			$.ajax({
				url:'data/scrLeftConKitchen.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su5');
						}
					}
			})
			//轮播左侧导航内容3--生活电器
			$.ajax({
				url:'data/scrLeftConLife.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su6');
						}
					}
			})
			//轮播左侧导航内容3--手机及配件
			$.ajax({
				url:'data/scrLeftConCellphone.json',
				success:function(data){
					for(var i = 0; i< data.length;i++){
						$(`<li>
							<img src="${data[i].src}" alt="tva">
							<p>${data[i].title}</p>
							<a href="#">${data[i].buy}</a>
						</li>`).appendTo('.Su7');
						}
					}
			})*/
		});
		function startTimer(){
			timer = setInterval(function() {
				showIndex++;
				if(showIndex >= 4) showIndex = 0;
				showImg();
			}, 4000);
		}
		function showImg() {
			$("ul.uItems li").stop(true, true);
			/*图片显示，图片消失*/
			$("ul.uItems li").fadeOut(400).eq(showIndex).fadeIn(400);
			//圆球显示
			$("ul.uIndex li").removeClass("bg").eq(showIndex).addClass("bg");
		}
	}
	return{
		scroll:scroll
	}
})