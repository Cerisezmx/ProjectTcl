define(['jquery'],function($){
	function nav(){
		$(function(){
			$('.navUl').find('li').hover(
				function(){
					$('.navUl').find('li').find('a').attr('class',"");
					$(".topnav").find('div').css("display",'none');
					$(".topnav").find('div').eq($(this).index()).css('display','block');
					$(this).find('a').attr('class','active');
				},function(){
					$(".topnav").find('div').css('display','none');
					$('.navUl').find('li').find('a').attr('class',"");
					$(".topnav").find('div').mouseenter(function(){
						$(this).css('display','block');
					})
					$(".topnav").find('div').mouseleave(function(){
						$(this).css('display','none');
						$('.navUl').find('li').find('a').attr('class',"");
					})
				})
			//电视
			$.ajax({
				url:'data/nav1.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox1');
					}
				}
			})
			// 空调
			$.ajax({
				url:'data/airConditioner.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox2');
					}
				}
			})
			// 冰箱
			$.ajax({
				url:'data/refrigerator.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox3');
					}
				}
			})
			//洗衣机
			$.ajax({
				url:'data/washer.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox4');
					}
				}
			})
			//健康电器
			$.ajax({
				url:'data/healthAppliance.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox5');
					}
				}
			})
			//手机
				$.ajax({
				url:'data/cellphone.json',
				success:function(data){
					for(var i = 0;i < data.length;i++){
						$(`<ul id='navdUl'><li>
					<img src="${data[i].img}" alt="">
					<p>"${data[i].title}"</p>
					<i>"${data[i].price}"</i>
				</li></ul>`).appendTo('#navBox6');
					}
				}
			})
		})

	}
	return{
		nav:nav
	} 
})