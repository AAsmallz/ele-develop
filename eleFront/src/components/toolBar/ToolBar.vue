<template>
    <!-- 下方工具条部分 -->
    <div class="tool-bar-wrap pink">
        <ul class="tool-bar flex">
            <li
                class="tool-bar-item grow_shrink"
                v-for="(item, i) in bar_items"
                :key="i"
            >
                <router-link :to="item.link">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    // composition API - vue3
    // setup是composition的入口函数
    setup() {
        // 定义数组对象，存放toolbar所需要的图标和文字
        const data = reactive({
            bar_items: [
                {
                    name: "首页",
                    icon: "icon-shouye2",
                    link: "home", //对应页面
                },
                {
                    name: "发现",
                    icon: "icon-faxian",
                    link: "discover", //对应页面
                },
                {
                    name: "订单",
                    icon: "icon-dingdan",
                    link: "order", //对应页面
                },
                {
                    name: "我的",
                    icon: "icon-wode",
                    link: "mine", //对应页面
                },
            ],
        });
        // 要在template中使用setup中的属性，需要return出去
        return {
            ...toRefs(data),
        };
    },
};
</script>

<style scoped lang="scss">
.tool-bar-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-shadow: 0 0 0.106667rem #000;
    .tool-bar {
        background-color: #53affc;
        display: flex; //页面刷新，全局有时候不起效果，重新添加的弹性布局
        .tool-bar-item {
            text-align: center;
            padding: 0.133333rem 0; //5px 0
            font-size: 0.373333rem; //14px
            color: #ccc;
            .iconfont {
                display: block;
                font-size: 0.64rem; //24px
                margin-bottom: 0.16rem; //6px
            }
            a { // 去除a标签默认样式
                display: block;
                text-decoration: none;
            }
            .router-link-active { // 路由激活
                color: #fff;
                font-weight: 500;
            }
        }
    }
}
</style>
