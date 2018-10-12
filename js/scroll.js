define(['jquery'],function($){
	function scroll(){
		var showIndex = 0; //用于记录下标
		var timer; //定时器
		$(function() {
			//轮播图动画
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
			$.ajax({
				url:'data/indextop.json',
				success:function(data){
					//轮播图图片
					var scrollM = data.scrollImg;
					for(var i = 0; i< scrollM.length; i++){
						$(`<li><img src="${scrollM[i].src}"/></li>`).appendTo('.uItems');
					}
					
					//轮播图左侧导航栏
					var leftdata = data.scroll;
					for(var i = 0 ; i < leftdata.length;i++){
						$(`<li>${leftdata[i].listname}<span>></span></li>
						    `).appendTo('#tabOl');
					}
					for(var k = 0 ; k < leftdata.length ; k++){
						$(`<ul class="slConUl"}></ul>`).appendTo('.leftList');
						var left = leftdata[k].leftUl;
						for(var j = 0 ; j < left.length;j++){
							$(`<li>
							<img src="${left[j].src}" alt="img">
							<p>${left[j].title}</p>
							<a href="#">${left[j].buy}</a>
							</li>
							`).appendTo($('.slConUl').eq(k));
						}
					}
					//轮播图左边动画部分
					var oLis = $('#tabOl').find('li');
					var oUls = $('.leftList').find('ul');
					$('.leftList').on('mouseenter','li',function(){
						oUls.css('display','none').eq($(this).index()).css('display','block');
						oLis.removeClass('scLeftactive').eq($(this).index()).addClass('scLeftactive');
					})
					$('.leftList').on('mouseleave',function(){
						oUls.css('display','none');
						oLis.removeClass('scLeftactive')
					})
					//顶部导航栏
					var topdata = data.header;
					//导航头
					for(var i = 0 ; i < topdata.length;i++){
						$(`<li><a href="#">${topdata[i].topnav}</a></li>`)
						.appendTo('.navOl');
					}
					//导航内容
					for(var k = 0 ; k < topdata.length ; k++){
						$(`<div id="navBox1"><ul class='navdUl'></ul></div>`).appendTo('.topnav');
						var topConM = topdata[k].topCon;
						for(var j = 0 ; j < topConM.length ;j++){
							$(`<li>
							<img src="${topConM[j].img}" alt="">
							<p>"${topConM[j].title}"</p>
							<i>"${topConM[j].price}"</i>
							</li>`).appendTo($('.navdUl').eq(k));
						}
					}
					//头部导航内容显示的动画
					var topLis = $('.navOl').find('li');
					var topDivs = $('.topnav').find('div');
					$('.topnav').on('mouseenter','li',function(){
						topDivs.css('display','none').eq($(this).index()).css('display','block');
						topLis.find('a').removeClass('active').eq($(this).index()).addClass('active');
					})
					$('.topnav').on('mouseleave',function(){
						topDivs.css('display','none');
						topLis.removeClass('active')
					})
				},
				error:function(msg){
					console.log(msg);
				}
			})
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