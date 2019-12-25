# 项目名称：诊断学习机
```
项目编号：DD0119002
```
## 项目src下文件夹介绍：
+ api            接口、接口数据处理
+ common         静态资源目录
    + font_demo  IcoMoon源文件备份
    + fonts      字体文件
    + images     图像
    + js         javascript函数文件
    + scss       scss 文件
    + svg_handle 引入的svg图标备份
+ base_comp      基础组件
+ business_comp  业务组件
+ components     普通组件
+ plugins        UI框架按需加载设置放在这里
+ mixin          mixin
+ router         路由配置
+ store          vuex设置（组件通讯）
+ views          路由配置的页面文件

## play页面文件
+ src/views/Play.vue                播放主文件
+ src/mixin/playMixin.js            动态业务组件引用逻辑
+ src/base_comp/play/PlayBar.vue    播放控制条组件
+ src/business_comp                 存放动态组件列表
```
项目运行
http://localhost:8080/adaline/play?base_id=1854&model=A6L&cc=13&sign=3f579605979f4d0b1ca074af880d4ad0
```

## 主题文件配置：用到npm包 element-theme 和  element-theme-chalk
1. 初始化变量文件。默认输出到 element-variables.scss
    ```
    call node_modules/.bin/et -i
    ```
2. 编译主题，以下是目前修改的内容，注：请和src/common/scss/variable.scss里的变量保持一致（加*的）
    ```
    主题色：
    $--color-primary: #3894DE;
    功能色：
    $--color-success: #07c160;
    $--color-warning: #ff976a;
    $--color-danger: #f56c6c;
    $--color-info: #909399;
    字体颜色
    $--color-text-primary: #202020;      // 着重显示
    $--color-text-regular: #313131;      // 常规色
    $--color-text-secondary: #606266;    // 次要色
    $--color-text-placeholder: #c0c4cc;
    边框
    $border-color-base: #dcdfe6;          // 基本
    $border-color-light: #e4e7ed;         // 浅色
    $border-color-lighter: #ebeef5;       // 较浅
    $border-color-extra-light: #f2f6fc;   // 超浅
    背景色
    $--background-color-base: #F5F7FA;   // 例如InputNumber加减号的背景
    ```
3. 编译主题 生成 theme 文件夹，里边有各组件的样式文件
    ```
    call node_modules/.bin/et
    ```
4. 为实现按需加载，在babel.config.js下的styleLibraryName变量设置~theme，指向theme文件夹

## 适配方案：amfe-flexible

