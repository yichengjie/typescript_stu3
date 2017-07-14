在price4的基础上,将项目的typescript与jsx分离处理,
因为使用ts-loader后项目不能热更新，页面会被强制刷新,
如果直接食用ts-loader将ts编译到es5的话，
ts-loader无法实现类似babel-import类似按需加载的功能，所以只能折中分布处理

- npm run tslint 可以检查源码中的代码规范性，这个要越多运行越好
- npm run tsc 或 npm run tscdev  将typescript源码编译成jsx
- npm run build 或 npm run dev   webpack打包编译jsx代码到es5的js