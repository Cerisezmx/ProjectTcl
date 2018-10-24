define(['jquery','jquery-cookie'],function($){
	function shopcar(){
		/*判断购物车内有没有添加商品*/
		//去除cookie里面存的数据(后面都用到了)
		var cookieArr = eval($.cookie('goods'));
	
		// hits('.checkAll');
		hits('.checkCom');
		hits('.checkAll');
		countNum();
		nowgoodsNum();
	//加载添加购物车的商品详情
	$.ajax({
		url:'data/detail.json',
		success:function(data){
			var each = data.moregoods;
			var cookieArr = eval($.cookie("goods"));
			var cookieArr = eval($.cookie('goods'));
			var html = '';
			for(var i = 0 ; i < cookieArr.length; i++){
				var N = cookieArr[i].num;  //数量
				var P = each[cookieArr[i].id].price; //单价
				var PN = N * P;
				html += `<div class = 'cart-good' id = '${each[cookieArr[i].id].id}'>
					<dl>
					<dd class='good1 good'>
						<span class = 'checkCom' xxx = '1'></span>
					</dd>
					<dd class='good2'>
						<img src="${each[cookieArr[i].id].src}" alt="img1">
						<p>${each[cookieArr[i].id].title}</p>
					</dd>
					<dd class='good3'>${each[cookieArr[i].id].price}</dd>
					<dd class='good4'>
						<span class = 'reduce' id = '${each[cookieArr[i].id].id}'>-</span>
						<input type="text" value ="${cookieArr[i].num}" class='numCar'>
						<span class = 'add' id = '${each[cookieArr[i].id].id}'>+</span>
					</dd>
					<dd class='good5'>
						<p class='now'>${PN}元</p>
					</dd>
					<dd class='good6 iconfont'>
						<span id = 'favour'>&#xe61a;</span>
						<span class = 'remove' id = '${each[cookieArr[i].id].id}'>&#xe60b;</span>
					</dd>
				</dl>
			</div>`;
			$('.addgoods').html(html);
			} 
			countNum();
		},error:function(msg){
			alert(msg);
		}
	})
	
	//垃圾桶--删除
	$('.addgoods').on('click','.remove',function(){
		var id = this.id; // 当前商品的id
		for(var i = 0 ; i < cookieArr.length ;i++){
			if(cookieArr[i].id == id){
				// $.cookie("cookieArr.num","");
				cookieArr[i].cookieArr = 0;
				cookieArr.splice(i,1); //删除cookie记录，再存回去
				$.cookie('goods',JSON.stringify(cookieArr));
				//页面删除
				$(this).parent().parent().parent().stop().animate({'opacity':0}).remove();
				countNum();//调用购物车计数函数
				nowgoodsNum();//计算下面共多少商品
			}
		}
	})
	// 商品数量 + 效果 //.nubCar:显示数量的input
	$('.addgoods').on('mousedown','.add ,.numCar',function(){
		var addid = this.id;
		for(var i = 0 ; i < cookieArr.length; i++){
			if(cookieArr[i].id == addid){ //找到当前商品
				cookieArr[i].num++;
				$('.numCar').eq(i).val(cookieArr[i].num);
				//实时刷新计算价格
				var N = cookieArr[i].num;
				var P = $(this).parent().prev().text();
				var nowPrice = N *P;
				$(this).parent().next().find('.now').html(`${nowPrice}`+`元`);
				$.cookie('goods',JSON.stringify(cookieArr));
			}
			//调用一下购物车的函数，实时刷新购物车
			countNum();
			nowgoodsNum();
				hits('.checkCom');
		hits('.checkAll');
		} 
	})
	// 商品数量 - 效果
	$('.addgoods').on('click','.reduce,.numCar',function(){
		var count = this.id;
		var reduceid = this.id;
		for(var i = 0 ; i < cookieArr.length;i++){
			if(cookieArr[i].id == reduceid){
				if(cookieArr[i].num > 1){
					cookieArr[i].num--;
					$('.numCar').eq(i).val(cookieArr[i].num);
					$.cookie('goods',JSON.stringify(cookieArr));
					//实时刷新计算价格
					var N = cookieArr[i].num;
					var P = $(this).parent().prev().text();
					var nowPrice = N * P;
					$(this).parent().next().find('.now').html(`${nowPrice}`+`元`)
				}else{//如果数量减少为0，就删除节点
					cookieArr.splice(i,1); //删除cookie记录，再存回去
					$.cookie('goods',JSON.stringify(cookieArr));
					//页面删除
					$(this).parent().parent().parent().remove();
				}
			}
			//调用一下购物车的函数，实时刷新购物车和商品总计
			countNum();
			nowgoodsNum();
		}
	})
	//喜欢 favour
	var isClick = false;
	$('.addgoods').on('click','#favour',function(){
		if(!isClick){ //没被选中
			$(this).css('color','#ff0000');
			isClick = true;
		}else{
			$(this).css('color','#666');
			isClick = false;
		}
		
	})
	//单选计算价格
	// $('.addgoods').on('click','.checkCom',function(){
	// 	var gid = $(this).parent().parent().parent().attr('id');
	// 	$(this).html("√");
	// 	$(this).css({'backgroundColor':'red',
	// 				'border':'none',
	// 				'color':'#fff'
	// 				 });
	// })
	//点击函数(单选，多选)
	function hits(node){
		$('.checkBox').on('click', node,function(){
			var nAll = $(this).attr('xxx');
			if(node == '.checkAll'){
				//如果全选之前的状态是未被选中，这次点击是为了全选
				if(nAll == 1){
					$(this).html("√");
					$('.checkCom').html('√');
					$('.checkAll,.checkCom').css({
						'backgroundColor':'#ff0000',
						'border':'none',
						'color':'#fff'
					}).attr('xxx',0);//标记为选中状态
					nAll++;
				}else{
					$(this).html("");
					$('.checkAll,.checkCom').css({
						'backgroundColor':'#fff',
						'border':'1px solid #ccc',
					}).attr('xxx',1);//标记为未选中状态
					nAll--;
				}
			}else{//如果点击的是checkSome
				var cStr1 = '';
				for(var i = 0;i < $('.cart-good dl').size();i++){
					cStr1 += $('.cart-good dl').eq(i).find('.checkCom').attr('xxx');
				}
				//如果值为0，说明checkSome为全选中，此次点击是为了取消
				if(cStr1 == 0){
					$('.checkAll').css({
						background: '#fff', border: '1px solid #aaa'
					}).attr('xxx',1);
					//把checkAll 的状态变为1，未选中状态
				} //如果checkCom之前未被选中
				//这次点击是为了选中
				if(nAll == 1){
					$(this).html("√");
					$(this).css({
						'backgroundColor':'#ff0000',
						'border':'none',
						'color':'#fff'
					}).attr('xxx',0);//标记为选中状态
					nAll++;
				}else{ //xxx = 0 ; 之前是未选中状态，此次点击是为了选中
					$(this).css({
						// $(this).html("");
						'backgroundColor':'#fff',
						'border':'1px solid #ccc'
					}).attr('xxx',1);
					nAll--;
				}
				var cStr2 = '';
				for(var i = 0;i < $('.cart-good dl').size();i++){
					cStr2 += $('.cart-good dl').eq(i).find('.checkCom').attr('xxx');
				}
				//判断checkCom 是否为全部选中
				if(cStr2 == 0){
					$('.checkAll').css({
						'backgroundColor':'#ff0000',
						'border':'none',
						'color':'#fff'
					}).attr('xxx',0);
					$('.checkAll').html("√");
				}
			
 			}
 				num_total();//计算商品数量
		});
	}
	//选中商品的数量 商品总价
	function num_total(){
		var allNum = 0;
		var ckNum = 0;
		var allPrice = 0;
		for(var i = 0;i < $('.cart-good dl').size();i++){
			allNum += parseInt($('.cart-good dl').eq(i).find('input').val());
			// alert(allNum);
			if($('.cart-good dl').eq(i).find('.checkCom').attr('xxx')==0){//商品全部选中状态
				ckNum += parseInt($('.cart-good dl').eq(i).find('input').val())
				allPrice += parseInt($('.cart-good dl').eq(i).find('.now').html())
			}
		};
		$('.chooseCount').html(ckNum);//加载已选择几件商品；
		$('.goodsCount').html(allNum);
		$('.rmbt').html(`￥${allPrice}`); //加载选中商品的总价格
	}
	//实时刷新共几件商品
	function nowgoodsNum(){
		var cookieArr = eval($.cookie('goods'));
		if(cookieArr){
			var sum = 0;
			for(var i = 0; i < cookieArr.length;i++){
				sum += cookieArr[i].num;
				$('.goodsCount').html(sum);
			}
		}
	}
	//购物车计数函数	
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
	return{
		shopcar:shopcar
	}
})