
console.log("加载成功");
/*管理我们index.html引入的所有模块*/
/*配置路径*/
require.config({
	paths:{
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"nav":"nav",
		"scroll":'scroll',
		"goods":'goods',
		"jquery-citys":"jquery.citys"
	},
		//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"],
		"jquery-citys":["jquery"],
		/*
			定义不遵从AMD规范的js文件
		*/
		"parabola": {
			exports: "_"
		}
	}
})
require(['scroll','goods'],function(scroll,goods){
	scroll.scroll();
	goods.goods();
})