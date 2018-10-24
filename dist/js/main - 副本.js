console.log("加载成功");
/*管理我们index.html引入的所有模块*/
/*配置路径*/
require.config({
	paths:{
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		'jquery-city':'jquery.citys',
		"scroll":'scroll',
		"login":"login",
		'register':'register'
	},
		//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"],
		'jquery-goods':['jquery'],
		/*
			定义不遵从AMD规范的js文件
		*/
		"parabola": {
			exports: "_"
		}
	}
})
/*require(['index'],function(index){
	index.aa();
})*/
require(['login','scroll','register'],function(login,scroll,register){
	login.login();
	scroll.scroll();
	register.register();
	
})