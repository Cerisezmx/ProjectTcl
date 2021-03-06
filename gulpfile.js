const gulp = require("gulp");
/*引入插件*/
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const scss = require("gulp-sass-china");
const connect = require("gulp-connect");
const minifyCSS = require("gulp-minify-css");
/*拷贝html文件*/
gulp.task("copy-html",function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
// 拷贝php文件
gulp.task('copy-php',function(){
	return gulp.src('php/*.php')
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload())
})
/*拷贝iconfont*/
gulp.task('copy-icon',function(){
	return gulp.src('iconfont/**/*')
	.pipe(gulp.dest('dist/iconfont'))
	.pipe(connect.reload());
})
/*拷贝图片*/
gulp.task("images",function(){
	return gulp.src("img/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})
/*scss文件--index*/
gulp.task("scss",function(){
	return gulp.src("stylesheet/registerLogin.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("registerLogin.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件--base*/
gulp.task("scss-base",function(){
	return gulp.src("stylesheet/base.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("base.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件--headerFooter*/
gulp.task("scss-heaFooter",function(){
	return gulp.src("stylesheet/headerFooter.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("headerFooter.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件 -- register注册页面样式*/
gulp.task("scss-register",function(){
	return gulp.src("stylesheet/register.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("register.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件 -- login登录页面样式*/
gulp.task("scss-login",function(){
	return gulp.src("stylesheet/login.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("login.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件--商品详情页面样式*/
gulp.task('scss-goods',function(){
	return gulp.src('stylesheet/goods.scss')
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("goods.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件 -- 购物车页面样式*/
gulp.task('scss-cart',function(){
	return gulp.src('stylesheet/shopcar.scss')
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("shopcar.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*scss文件 -- 多商品详情页*/
gulp.task('scss-more',function(){
	return gulp.src('stylesheet/more.scss')
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("more.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
/*拷贝js文件*/
gulp.task("scripts",function(){
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})
/*拷贝数据*/
gulp.task('data',function(){
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})
/*建立工程项目*/
gulp.task("build",["copy-html",'copy-php','copy-icon',"images","scss","scss-base","scss-heaFooter",'scss-cart','scss-register','scss-goods','scss-more','login',"scripts",'data'],function(){
	console.log("编译成功");
})
/*编写监听*/
gulp.task("watch",function(){
	gulp.watch(["*.html"],["copy-html"]);
	gulp.watch(["php/*.php"],["copy-php"]);
	gulp.watch(["img/**/*"],["images"]);
	gulp.watch(["stylesheet/registerLogin.scss"],["scss"]);
	gulp.watch(["stylesheet/base.scss"],["scss-base"]);
	gulp.watch(["stylesheet/register.scss"],["scss-register"]);
	gulp.watch(["stylesheet/login.scss"],["scss-login"]);
	gulp.watch(["stylesheet/goods.scss"],["scss-goods"]);
	gulp.watch(["stylesheet/shopcar.scss"],["scss-cart"]);
	gulp.watch(["stylesheet/headerFooter.scss"],["scss-heaFooter"]);
	gulp.watch(["stylesheet/more.scss"],["scss-more"]);
	gulp.watch(["js/*.js"],["scripts"]);
	gulp.watch(["data/*.json"],['data']);
	gulp.watch(["iconfont/**/*"],['copy-icon']);
})
/*gulp-connect 启动服务器*/
gulp.task('server',function(){
	connect.server({
		root:'dist',
		port:8082,
		livereload:true
	})
})
/*启动默认服务*/
gulp.task("default",["watch","server"]);