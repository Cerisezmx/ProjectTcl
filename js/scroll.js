define(['jquery'],function($){
	function scroll(){
		var showIndex = 0; //用于记录下标
		var timer; //定时器
		$(function() {
			//wechat动画部分
			$('#wechat').on('mouseenter','#wxMall,#weichatCon',function(){
				$("#weichatCon").stop(true).animate({height:180,},1000).css({display:'block'});
				return false;
			})
			$('#wechat').on('mouseleave','#wxMall,#weichatCon',function(){
				$('#weichatCon').stop(true).animate({height:0},100).css({display: 'none'});
				return false;
			})
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
						$(`<li><img src="${scrollM[i].src}"/></li>`).appendTo($('.uItems'));
					}
					//轮播图左侧导航栏
					var leftdata = data.scroll;
					for(var i = 0 ; i < leftdata.length;i++){
						$(`<li>${leftdata[i].listname}<span>></span></li>
						    `).appendTo($('#tabOl'));
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
					$('.leftList').on('mouseenter','#tabOl>li',function(){
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
						.appendTo($('.navOl'));
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
					$('.topnav').on('mouseenter','.navOl>li',function(){
						topDivs.css('display','none').eq($(this).index()).css('display','block');
						topLis.find('a').removeClass('active').eq($(this).index()).addClass('active');
					})
					$('.topnav').on('mouseleave',function(){
						topDivs.css('display','none');
						topLis.find('a').removeClass('active');
					})
					//midAdv中间的广告图片加载
					var adv = data.midAdv;
					for(var i = 0 ; i < adv.length;i++){
						$(`<a href=""><img src="${adv[i].src}"
						 ></a>`).appendTo($('.midACon'));
					}
					//主要商品部分(导航栏title)：
					var advConTitle = data.mainTitle;
					//循环加div 和title
					for(var i = 0 ; i < advConTitle.length;i++){
						$(`<div class='MainCon'><dl class='MainConTitle'>
							<dt class='MainConTitleBig'><a href="">${advConTitle[i].titleBig}</a></dt>
							<a href="#" id = 'viewMore'>更多 ></a>
							</dl><div class= 'MainAd'></div></div>`).appendTo($('#main'));
						var advConTitleS = advConTitle[i].titleSmall;
						for(var k = 0 ; k < advConTitleS.length; k++){
							$(`<dt class='MainConTitleSmall'><a href="">${advConTitleS[k]}</a></dt>`).appendTo($('.MainConTitle')[i]);
						}
					}
					//加载每个商品
					var mainCon = data.mainContent;
					//外层循环，添加ul
					for(var i = 0 ; i < mainCon.length; i++){
						$(`<a class='MainAdLeft'>
						<img src="${mainCon[i].leftImg}" alt="dsdd">
						</a><ul class='MainAdUl'></ul>`).appendTo($('.MainAd')[i]);
						//内层循环，加li
						var mainConLi = mainCon[i].rightUl;
						for(var j  = 0 ; j < mainConLi.length ; j++){
							$(`<li class='limove'>
								<a href="#">
									<img src="${mainConLi[j].src}" alt="">
									<p>${mainConLi[j].title}</p>
									<i>${mainConLi[j].dice}</i>
									<strong>${mainConLi[j].price}</strong>
								</a>
							</li>`).appendTo($('.MainAdUl')[i]);
						}
					}
					//商品详情区域li的动画
					$('#main').on('mouseenter','.limove',function(){
						$(this).stop().animate({top:-7},200).css('boxShadow','0 0 18px #ccc');
					});
					$('#main').on('mouseleave','.limove',function(){
						$(this).stop(true).animate({top:0},100).css('boxShadow','');
					})
					//News添加数据
					var Newsdata = data.News;
					for(var i = 0 ; i < Newsdata.length ; i++){
						$(`<li class='newsLi'>
							<a href="#">
							<img src="${Newsdata[i].src}" alt="news1">
							</a>
						<span>新闻</span>
						<p>${Newsdata[i].title}</p>
						<i>${Newsdata[i].content}</i>
						<a href="#" class='NewsA'>查看详情  >></a>
					</li>`).appendTo('.newsUl');
					}
				},
				error:function(msg){
					console.log(msg);
				}
			})
		});
		//轮播图的动画
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