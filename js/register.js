define(['jquery'],function($){
	function register(){
		//对手机号码进行验证
		var sut = true;
		$('#phoneNumber').blur(function(){
			//过滤空格
			var myReg = /^[1][3,4,5,7,8][0-9]{9}$/
			var oValue = $('#phoneNumber').val().replace(/ /ig,"");
			$('#phoneNumber').val(oValue);
			if(!myReg.test(oValue)){
				if($('#phoneNumber').val()){
					$('#phoneCall').html('请输入合法的手机号码').css('color','#ff0000');
					$('#phoneNumber').val('');
					sut = false;
				}else{
					$('#phoneCall').html('请输入11位手机号码').css('color','#ff0000');
					sut = false;
				}
			}else{
				$('#phoneCall').html('输入正确').css('color','green');
			}
		})
		//验证密码
		$('#psd').blur(function(){
			var psdReg = /^[0-9A-Za-z]{6,16}$/
			if($('#psd').val()){
				if(!psdReg.test($('#psd').val())){
					$('#psdCall').html('请输入6-16位密码').css('color','#ff0000');
					$('#psd').val('');
					sut = false;
				}else{
					$('#psdCall').html('密码输入正确').css('color','green');
				}
			}else{
				$('#psdCall').html('请输入密码').css('color','#ff0000');
				sut = false;
			}
			
		})
		//验证码
		$('#testNum').blur(function(){
			if(!$('#testNum').val()){
				$('#testImgcall').html('请输入验证码').css('color','#ff0000');
				sut = false;
			}else if($('#testNum').val().length  !== 6){
				$('#testImgcall').html('验证码输入错误').css('color','#ff0000');
				sut = false;
			}else{
				$('#testImgcall').html('');
			}
		})
		$('#code').click(function(event){
			$('#code').html(testCode(5));
		})
		// 登录验证
		$('.submit').click(function(){
			//获取手机号
			var str1 =  $('#phoneNumber').val();
			//获取密码
			var str2 = $('#psd').val();
			//验证码是否输入正确
			var str3 = $('#testNum').val();
			str3 = str3.toLowerCase();
			var str4 = $('#code').html();
			str4 = str4.toLowerCase();
			if(!str3){
				sut = false;
			}else if(!str2){
				// $('#total').html('请输入密码').css('color','#ff0000');
				sut = false;
			}else if(!str1){
				// $('#total').html('请输入手机号').css('color','#ff0000');
				sut = false;
			}else if(str3 !== str4){
				$('#total').html('验证码不正确').css('color','#ff0000');
				sut = false;
			}else if($('.checkbtn').get(0).checked){
				$('.submit').css('backgroundColor','#ff0000');
				$('#phoneCall').html('');
				$('#psdCall').html('');
				$('#total').html('')
					if(sut){
						$.ajax({
							method:"post",
							url:'php/register.php',
							data:{username: $('#phoneNumber').val(),
							  	  password:$('#psd').val()
							 	 },
							success:function(data){
								$('#total').html(data);
							},error:function(msg){
								$('#total').html(msg);
							}
						})
					}
			}
		})
		//随机生成n位数的验证码
		function testCode(n){
			var arr = [];
			for(var i = 0; i< n; i++){
				var num = parseInt(Math.random()*100);
				if(num >= 0 && num <= 9){
					arr.push(num);
				}else if(num >= 65 && num <= 90){
					var str = String.fromCharCode(num);
					arr.push(str);
				}else if(num >= 17 && num <= 42){
					var str = String.fromCharCode(num + 80);
					arr.push(str);
				}else{
					i--;
				}
			}
			return arr.join('');
		}

	}
	return{
		register:register
	} 
})