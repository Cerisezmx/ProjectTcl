define(['jquery','jquery-cookie','Parabola'],function($){
	function more(){
		sc_car();//加载购物车的数量
		$.ajax({
			url:'data/detail.json',
			success:function(data){
				// console.log(data);
				var more = data.moregoods;
				var html = ``;
				for(var i = 0 ; i < more.length;i++){
					html += `<li class='allli'>
				<img src="${more[i].src}" alt="">
				<p class='tit'>${more[i].title}</p>
				<p class='titCon'>${more[i].titCon}</p>
				<p class= 'titpri'>${more[i].price}</p>
				<a href="goods.html" class='titBuy'>立即购买</a>
				<a class = 'titCar' id = '${more[i].id}'>加入购物车</a>
			</li>`;
				$('.allgos').html(html);
				}
			},error:function(msg){
				alert(msg);
			}
		})
		//事件委托，给异步加载的控件添加事件
		$('.allgos').on('click','.titCar',function(){
			ballMove(this);
			var id = this.id;
			//加入购物车 约定 goods=[{id:1,num:2},{id:2,num:1}]
			//1、判断是否是第一次添加
			var first = $.cookie('goods')== null ? true : false;
			if(first){//第一次添加，直接将cookie存进去
				$.cookie("goods",`[{id:${id},num:1}]`,{
					expires:7,
					raw:true
				});
			}else{ //不是第一次添加，判断之前是否有同一种商品
				var cookieStr = $.cookie('goods');
				var arr = eval(cookieStr);
				//eval() 必须外层是数组，元素是对象 作用类似JSON.parse()
				var same = false;
				for(var i = 0 ; i< arr.length ; i++){
					if(arr[i].id == id){
						arr[i].num++;
						same = true;
						break;
					}
				}
				if(!same){ //如果没有相同的
					var obj = {id:id , num:1}
					arr.push(obj);
				}
				//无论是不是相同的，都要存回去
				$.cookie("goods",JSON.stringify(arr),{
					expires:7,
					raw:true
				});
				sc_car();
			}
		})
		//购物车内商品数量
		function sc_car(){
			var sc_str = $.cookie("goods");
			if(sc_str){
				var sc_arr = eval(sc_str);
				var sum = 0;
				for(var i = 0; i < sc_arr.length; i++){
					sum += sc_arr[i].num;
				}
				$("#shopCarNum").html(sum);
			}
		}
		// 抛物线运动函数
		function ballMove(startNode){
			$('.ball').css({
				left:$(startNode).offset().left,
				top:$(startNode).offset().top,
				display:'block'
			})
			// var offsetX = $('.ball').offset().left- $('#shopCarNum').offset().left;
			// var offsetY = $('.ball').offset().top - $('#shopCarNum').offset().top;
			var offsetX = $('#shopCarNum').offset().left - $('.ball').offset().left;
			var offsetY = $('#shopCarNum').offset().top - $('.ball').offset().top;
			//配置参数
			var bool = new Parabola({
				el:'.ball',
				targetEl:null,
				offset:[offsetX,offsetY],
				curvature:0.0005,
				duration:2000,
				callback:function(){
					$('.ball').css('display','none');
				}
			})
			bool.start();
		}
	}
	return{
		more:more
	}
})