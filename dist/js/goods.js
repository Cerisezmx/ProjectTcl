define(['jquery','jquery-citys','jquery-cookie'],function($){
	function goods(){
		countNum();
		$(document).scroll(function(){
			if($(document).scrollTop() >= $(window).height()){
				$('.fixed').css('display','block');
				$('.fixed').css('position','fixed');
				$('.fixed').css('top','0');
				$('.navigate').css('display','block');
				$('.navigate').css('position','fixed');
				$('.navigate').css('top','60px');
				$('.navigate').css('right','0');
			}else{
				$('.fixed').css('display','none');
				$('.navigate').css('display','none');
			}
		})
		//二维码动画部分
		$('.goodsmainRight').on('mouseenter','.show,.QD_code',function(){
			$('.QD_code').stop(true).animate({'height':210},10).css('display','block');
		})
		$('.goodsmainRight').on('mouseleave','.show,.QD_code',function(){
			$('.QD_code').stop(true).animate({'height':0},100).css('display','none');
		})
		$('.showtop').mouseenter(function(){
			$('.Qcode').stop(true).animate({'height':210},10).css('display','block');
		})
		$('.showtop').mouseleave(function(){
			$('.Qcode').stop(true).animate({'height':0},100).css('display','none');
		})
		//放大镜动画
		//点击小图标，显示大图标
			$('.goodsmainLeft').on('click','.smallDl,.bigDl',function(){
				$('.bigDl').css('display','none').eq($(this).index()).css('display','block');
				$('.smallDl').css('borderColor','#ccc');
				$(this).css('borderColor','#ff0000')
			});
			//移动大图标，对应显示maximg
			$('.goodsmainLeft').on('mouseenter','.bigDl',function(e){
				$('.slider').css('display','block');
				$('.maximg').css('display','block');
				//移动大图标，对应显示maximg
				$('.maximg img').css('display','none').eq($(this).index()).css('display','block');
				$('.bigDetal').on('mousemove',function(e){
					var sleft = e.pageX-$('.bigDetal').offset().left - ($('.slider').width ()) / 2;
					var stop = e.pageY - $('.bigDetal').offset().top - ($('.slider').height()) / 2;
					if(sleft < 0){
						sleft = 0;
					}else if(sleft > $('.bigDetal').width() - $('.slider').width()){
						sleft = $('.bigDetal').width() - $('.slider').width();
					};
					if(stop<0){
						stop = 0;
					}else if(stop > $('.bigDetal').height() - $('.slider').height()){
						stop = $('.bigDetal').height() - $('.slider').height();
					}
					$('.slider').css('left',sleft + 'px');
					$('.slider').css('top',stop + 'px');
					var bX = $('.bigDetal').width() / ($('.bigDetal').width() - $('.slider').width());
					var bY = $('.bigDetal').height() / ($('.bigDetal').height() - $('.slider').height());
					$('.maximg img').css('left', (-sleft * bX) + 'px');
					$('.maximg img').css('top', (-stop * bY) + 'px');
				});
			});
			$('.bigDetal').on('mouseleave',function(event){
				$('.slider').css('display', 'none');
				$('.maximg').css('display', 'none');
			})
			$.ajax({
				url:'data/detail.json',
				success:function(data){
					var conImg = data.conImg;
					var bigImg = conImg.bigImg;
					var smallImg = conImg.smallImg;
					var html = '';
					for(var i = 0 ; i< bigImg.length;i++){
						$(`<img class='bigDl' src="${bigImg[i].src}" alt="">`).insertBefore('.slider');
						html+=(`<img class='bigDl' src="${bigImg[i].src}" alt="">`);
						$('.maximg').html(html);
					};
					for(var j = 0 ; j < smallImg.length; j++){
						$(`<img class='smallDl' src="${smallImg[j].src}" alt="">`)
						.appendTo($('.smallDetal'));
					};
					//加载商品详情信息
					var detail = data.infor[0];
					$(`<p class='title'>${detail.title}</p>
				<div class = 'describe'>
					<span>${detail.desc}</span>
					<a href="#" class='collect '>收藏</a>
				</div>
				<i class='integral'>${detail.ite}</i>
				<div class='buygoods'>
						<i>促销价: </i>
						<span class='price'>${detail.price}</span>
						<span class='RMB'>${detail.RMB}</span>
						<img src="${detail.codesmallSrc}" alt="二维码" class="show">
						<span>手机购买</span>
						
				</div>
				<div class='QD_code'>
					<img src="images/goods/top1.jpg" alt="" class='QD_icon'>
					<img src="${detail.codebigSrc}" alt="" class = 'QD_code1'>
					<p>关注公众号</p>
					<p>一键下单购买</p>
				</div>
				<div class='A88'>
					<p>${detail.set}</p>
					<a href="" class = 'buyA'>55英寸</a>
					<a href="" class = 'buyB'>65英寸</a>
				</div>`).prependTo('.buycar');
					//给商品的con部分添加图片
					var conImg = detail.img;
					// console.log(conImg);
					// alert(detail.id);
					for(var i = 0 ; i < conImg.length ; i++){
						$(`<img src="${conImg[i].src}" alt="img1">`).appendTo('.imgmain');
					}
					//给购物车添加事件
					$('.goodsmainRight').on('click','.addCar',function(e){
						$(this).css({
							backgroundColor:'#ff0000',
							color:'#fff'
						});
						var idc = detail.id; //获得当前商品的id
						//添加cookie
						var first = $.cookie('goods') == null ? true : false;
						if(first){
							$.cookie('goods',`[{id:${idc},num:1}]`,{expires:7,raw:true});
						}else{
							//判断之前是否添加过商品
							var cookieStr = $.cookie('goods');
							var arr = eval(cookieStr);
							var same = false;
							for(var i = 0 ; i < arr.length; i++){
								if(arr[i].id == idc){
									//之前存储过
									arr[i].num++;
									same = true;
									break;
								}
							}
								//如果没有
								if(!same){
									var obj = {id:idc,num:1};
									arr.push(obj);
								}
								//存回去
								$.cookie('goods',JSON.stringify(arr),{
									expires:7,
									raw:true
								})
						}
						countNum();
					});
					$('.goodsmainRight').on('mouseleave','.addCar',function(e){
						$(this).css({
							backgroundColor:'#fff',
							color:'#ff0000'
						});
					})
				},
				error:function(mag){
					alert(msg);
				}
			})
		//数量加减
		var count = $('.num').text();
		$('.add').on('click',function(){
			count++;
			$('.num').text(count);
		})
		$('.reduce').on('click',function(){
			count--;
			if(count <= 0){
				count = 0;
			}
			$('.num').text(count);
		})
		//根据高度变化样式
		var numLi = $('.navigateUl li').length;
		$(document).scroll(function(){
			if($(document).scrollTop()>0 && $(document).scrollTop()<=6000){
				$('.navigateUl').find('li').css('borderLeft','')
				$('.navigateUl').find('li').eq(0).css('borderLeft','3px solid red');
			}else if($(document).scrollTop() > 6000 && $(document).scrollTop()<= 8000){
				$('.navigateUl').find('li').css('borderLeft','')
				$('.navigateUl').find('li').eq(1).css('borderLeft','3px solid red');
			}else if($(document).scrollTop() > 8000 && $(document).scrollTop()<= 10000){
				$('.navigateUl').find('li').css('borderLeft','')
				$('.navigateUl').find('li').eq(2).css('borderLeft','3px solid red');
			}else if($(document).scrollTop() > 12000 && $(document).scrollTop()<= 14000){
				$('.navigateUl').find('li').css('borderLeft','')
				$('.navigateUl').find('li').eq(3).css('borderLeft','3px solid red');
			}else if($(document).scrollTop() > 14000 && $(document).scrollTop()<= 16000){
				$('.navigateUl').find('li').css('borderLeft','')
				$('.navigateUl').find('li').eq(4).css('borderLeft','3px solid red');
			}
		})
		// 收货地址点击立即购买
	$('#demo2').citys({
		required:false,
		nodata:'disabled',
		onChange:function(data){
			var text = data['direct']?'(直辖市)':'';
			$('#place').text('：'+data['province']+text+' '+data['city']+' '+data['area']);
		}
	});
	//封装函数，计算购物车内的商品数量
	function countNum(){
		var sc_str = $.cookie('goods');//取购物车内的商品
		if(sc_str){//如果有商品
			var sc_arr = eval(sc_str);
			var sum = 0;
			for(var i = 0;i<sc_arr.length;i++){
				sum += sc_arr[i].num;
				$('#shopCarNum').html(sum);
			}
		}
	}
	}

	return {
		goods:goods
	}
})
