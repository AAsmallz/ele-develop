<template>
    <div class="home">
        <vHead title="首页">
            <!-- 头部导航 -->
            <!-- 使用具名插槽进行修改样式 -->
            <template v-slot:header_main>
                <div class="home_header" @click="show.side = true">
                    <!-- 城市/地址 -->
                    <i class="iconfont icon-iconlocation"></i>
                    <span>
                        {{ currentSide ? currentSide : "城市/地址名字" }}
                    </span>
                    <i class="iconfont icon-xiala"></i>

                    <!-- 搜索商家 -->
                    <div class="header_search" v-fixed>
                        <p class="search_main">
                            <i class="iconfont icon-icon_sousuo"></i>
                            <span>搜索商家</span>
                        </p>
                    </div>
                </div>
            </template>
        </vHead>
        <!-- 首页内容 -->
        <div v-show="!show.side">
            <!-- 轮播图的开始 -->
            <div class="foodType">
                <van-swipe class="my-swipe" :autoplay="0" :loop="false">
                    <van-swipe-item v-for="(items, i) in spliceFood" :key="i">
                        <div class="foodType">
                            <!-- 分类入口 -->
                            <ul class="flex foodType_main">
                                <li
                                    class="foodType_item"
                                    v-for="(item, i) in items"
                                    :key="i"
                                >
                                    <img
                                        :src="$formatImgSrc(item.image_hash)"
                                        alt=""
                                    />
                                    <span class="f_title">
                                        {{ item.name }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 轮播图的结束 -->

            <!-- 筛选部分组件 -->
            <vFilter v-fixed:60></vFilter>

            <!-- 首页列表 -->
            <vElist></vElist>
        </div>
        <!-- v-show="show.side" 是否显示收货地址 -->
        <!-- @sback="show.side=false" 隐藏收货地址 -->
        <!-- @shangSide="saveSide()" Side组件中传递过来的当前选择的城市数据 -->
        <Side
            class="header_side"
            v-show="show.side"
            @sback="show.side = false"
            @shangSide="saveSide"
        ></Side>
    </div>
</template>

<script>
import vHead from "@comps/header/Header.vue";
import Side from "@comps/side/Side.vue";
import homeModel from "./js/homeModel.js";
import vFilter from "@comps/filter/Filter.vue";
import vElist from "@comps/elist/Elist.vue";
import { Swipe, SwipeItem } from "vant";
export default {
    components: {
        vHead,
        Side,
        vFilter,
        vElist,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
    setup() {
        const { show, saveSide, currentSide, foodType, spliceFood } =
            homeModel();
        return {
            show,
            saveSide,
            currentSide,
            foodType,
            spliceFood,
        };
    },
};
</script>

<style scoped lang="scss">
.home {
    //height: 53.333333rem; //2000px
    /* 头部部分开始 */
    .home_header {
        padding: 0.533333rem 0.533333rem 0.133333rem 0.533333rem; //20px 20px 5px 20px
        font-size: 0.48rem; //18px
        color: #fff;

        // 城市/地址
        .icon-iconlocation {
            font-size: 120%; //相对父级百分比的字体大小
        }
        span {
            margin: 0 0.133333rem; //0 5px
            font-size: 0.48rem; //18px
            font-weight: 600;
        }

        // 搜索商家
        .header_search {
            background-image: linear-gradient(90deg, #51acfc, #206bfe);
            padding: 0.266667rem 0.266667rem; //10px 10px
            z-index: 10; //吸顶时防止首页内容在搜索商家之上
            .search_main {
                font-size: 0.373333rem; //14px
                background-color: #fff;
                color: #999;
                text-align: center;
                line-height: 1.066667rem; //40px
                width: 95%; //吸顶时防止宽度过宽
                font-family: simsum;
                .icon-icon_sousuo {
                    margin-right: 0.266667rem;
                }
            }
        }
    }

    .header_side {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    /* 轮播图开始 */
    // .my-swipe .van-swipe-item {
    //     color: #fff;
    //     font-size: 20px;
    //     line-height: 150px;
    //     text-align: center;
    //     background-color: #39a9ed;
    // }
    .foodType {
        height: 5.866666rem; //220
        .foodType_main {
            flex-wrap: wrap;
            margin-left: 0.266667rem; //10px
        }
        .foodType_item {
            width: 20%;
            margin-top: 0.533333rem; //20
            color: #666;
            text-align: center;
            span {
                color: #666;
            }
            img {
                display: block;
                width: 1.333333rem; //50
                height: 1.333333rem;
                margin: 0.053333rem auto; //2
            }
        }
    }
    /* 轮播图结束 */
}
</style>
