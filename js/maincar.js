console.log("加载成功");
/*管理我们index.html引入的所有模块*/
/*配置路径*/
require.config({
	paths:{
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		'jquery-citys':'jquery.citys',
		"scroll":'scroll',
		'shopcar':'shopcar',
		'goods':'goods'
	},
		//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"],
		
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
require(['shopcar','scroll'],function(shopcar,scroll){
	shopcar.shopcar();
	scroll.scroll();
	
})