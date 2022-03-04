# Vue 3 + Vite

### 1-项目技术栈介绍
参考官网：https://h5.ele.me/
1. 框架+工具：vue3.x, vite2.x, vant, ui框架, axios, vuer-router 4.x, vuex4.x
2. 样式：sass
3. 移动端布局工具
    + 手淘插件使用：【引入后单位为rem】2rem = 1px
    ```
    // 在index.html中引入
    <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
    ```
4. 部分框架样式和插件的安装以及使用
    (1) -S是安装到生产环境，-D是安装到开发环境
    (2) 建议都使用cnpm, yarn安装，如果使用npm安装会出错
    *vuer-router安装为4.x以上版本*
    ```
    cnpm i vue-router@next -S
    ```
    *sass安装*
    ```
    cnpm i sass -D
    // 组件中使用方式
    <style lang="sass"></style>
    ```
    *Vant组件库的安装*
    ```
    # Vue2项目，安装vue2.x版本
    cnpm i vant -S
    # Vue3项目，安装Vant3.x版本
    cnpm i vant@next -S
    # 安装自动按需导入Vant组件的插件(详情看网页：https://blog.51cto.com/u_15089769/2602560)
    cnpm i vite-plugin-imp -D
    # 之后在组件中使用vant组件方法
    import { Button } from "vant"; //引入组件
    import 'vant/lib/index.css'; //引入组件样式(重要)
    export default {
        components: {
            [Button.name]: Button, //注册组件(只能这样写，否则无法解析)
        },
    }
    ```
    *vuex的安装和使用*
    ```
    # 安装 (注意：不要安装到dev环境下，可能会导致commit方法未定义)
    cnpm i vuex@next --save 
    # 使用
    // 首先搭建好配置文件store/index.js (可以去官网查询如何配置)
    // 其次进行全局注册, 也就是在main.js中进行注册
    // 引入 store
    import store from './store/index.js'
    app.use( store )
    ```
### 2-搭建和启动项目 
1. 通过vite工具构建vue3项目
```
npm init @vitejs/app [项目名称]
```
2. 安装项目依赖
```
cnpm i
```
3. 启动项目
```
npm run dev
```

---

### 3-项目结构
node_modules -- 依赖模块
public -- 全局静态资源以及样式框架资源
src -- 主要项目文件
    assets -- 静态图片资源
    components -- 复用部分页面组件
    http -- 封装axios对象配置文件
    plugin -- 格式化图片地址模块文件
    router -- 路由配置文件
    views -- 视图主页的组件
        body -- 各个页面的载体页面(之后在App组件中显示)
        main -- 4个主要页面
    App.vue -- 根组件(显示body)
    main.js -- 全局配置文件(注册，挂载， 引入模块/包)
index.html -- 真实页面渲染的地方(一般用来全局引入模块和样式)

### 4-知识点记录
1. vue中style的background-image图片璐姐内联样式简易写法
```
// 简易写法：
<div :style="{backgroundImage: `url(${option_url})`}">
// 等同于 拼接写法
<div :style="{backgroundImage: `url(`+option_url+`)`}">
```

2. 报错：v-model directives require no argument 
解决：在VScode中，打开 “文件>首选项>设置” ，在用户设置中搜索vetur.validation，将此选项改为false即可

3. 超出部分隐藏且提供滚动条 overflow: auto;

4. 伪类选择器取消滚动条
```
// 针对谷歌，苹果以及拥有webkit内核的游览器
&::-webkit-scrollbar {
    display: none;
}
// 针对firefox火狐游览器私有属性
&::-moz-scrollbar {
    display: none;
}
```

5. 价格小数点后过长，需要处理保留多少位的方法
```
// 保留两位小数
food.price.toFixed(2)
```

6. 使用jquery去实现餐单滚动动画
```
// 平滑过度
$(main_con).animate({
    // 滚动对应的高度
    scrollTop: data.menu_tops[i]
}, 300);
```

7. 子组件传递事件给父组件 
```
子组件中：@click="$emit('changNum', false)"
父组件中(如果有传递参数，通过全局属性$event去接收即可)：@changNum($event)
```

8. public.css公共样式请求404问题解决
原因：路由模式是history: createWebHistory(), //mode: 'hiestory, 
解决：因此在index.html中全局引入静态资源需要注意不要有./中的点，因为history是默认在/路径下请求的。

9.  购物车设计的思路
    1). 分析
        购物车 需要的数据
            加购 自动计算(现价和原价)、数量，
            购物车列表可以显示数据
                商品的信息（现价、原价、数量），才能知道某件商品的数量，已经店铺购买总数量
            
            商家是独立的、商品的信息不一样

    2). 记录所需的数据 （vuex）
        ```javascript
        加购状态(数据)管理格式:
        foodsState:{
            <!-- 商家加购商品的总数量 -->
            count_all: 10,
            <!-- 商品分类 -->
            clsass_count: 5,
            <!-- 商家id -->
            162958680:{
                <!-- 商家加购商品的数量 -->
                count_all:10,
                <!-- 商品分类 -->
                class_count:5,
                <!-- 商品信息 -->
                foods:{
                    <!-- 商品的id -->
                    f01:{
                        <!-- 单个商品的数量 -->
                        count:1,
                        <!-- 商品的信息 -->
                        item:{}
                    },
                    f02:{
                        <!-- 单个商品的数量 -->
                        count:2,
                        <!-- 商品的信息 -->
                        item:{}
                    }
                }
            }
        }
        ```
    

