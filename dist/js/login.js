define(['jquery'],function($){
	function login(){
		var test = true;
		$('#Enterumber').blur(function(){
			var numberReg = /^[1][3,4,5,7,8][0-9]{9}$/
			//过滤空格
			var oValue = $('#Enterumber').val().replace(/ /ig,"");
			$('#Enterumber').val(oValue);
			//对手机号/邮箱/用户名进行验证
			if(!oValue){
				$('.numberE').html('请输入手机号/邮箱/用户名').css('color','#ff0000');
				test = false;
			}else if(oValue){
				$('.numberE').html('输入正确').css('color','green');
			}
		})
		// 对登录密码进行验证
		$('#EntPassword').blur(function(){
			var oPassword = $('#EntPassword').val().replace(/ /ig,'');
			 $('#EntPassword').val(oPassword);
			 if(!oPassword){
			 	$('.password').html('请输入登录密码');
			 	test = false;
			 }else if(oPassword.length > 18 || oPassword.length < 6){
			 	$('.password').html('请输入6-18位密码');
			 	test = false;
			 }else{
			 	$('.password').html('输入正确').css('color','green');
			 }
		})
		$('#loginsubmit').click(function(){
			var str1 = $('#Enterumber').val();
			var str2 = $('#EntPassword').val();
			if(!str1){
				$('#total').html('请输入手机号/邮箱/用户名');
				test = false;
			}else if(!str2){
				$('#total').html('请输入登录密码');
				test = false;
			}else{
				$('#total').html('');
				$('loginsubmit').css('backgroundColor','#ff0000');
				$('.password').html('');
				$('.numberE').html('');
				if(test){
				$.ajax({
					method:"post",
					url:'php/login.php',
					data:{username: $('#Enterumber').val(),
					  	  password:$('#EntPassword').val()
					 	 },
					success:function(data){
						$('#total').html(data);
						var timer = setTimeout(showSuccess(),500);
						clearTimeout(timer)
					},error:function(msg){
						$('#total').html(msg);
					}
				})
			}else{
				$('#total').html('请检查账户和密码');
			}
			}
		})
		function showSuccess(){
			window.location.href='index.html'
		}
	}
	return{
		login:login
	} 
})