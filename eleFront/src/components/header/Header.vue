<template>
    <div class="header">
        <!-- 通过插槽设置默认布局 -->
        <!-- 具名插槽，不会被之后添加到组件中的文本覆盖 -->
        <slot name="header_main">
            <div class="header_main">
                <button class="main_btn" @click="$emit('back')">&lt;</button>
                <span>{{title}}</span>
            </div>
        </slot>
        
        <!-- 匿名插槽，方便添加特定的文本和文本框等 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {type: String}
    }
}
</script>

<style scoped lang="scss">
    .header {
        background-image: linear-gradient(90deg, #51acfc, #206bfe);
        .header_main{ 
            position: relative;
            color: #fff;
            text-align: center;
            font-size: .48rem; //18px
            line-height: 1.466667rem; //55px
            font-weight: 500;
            .main_btn {
                color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                width: 1.066667rem; //40px
                height: 1.466667rem; //55px
                font-size: .8rem; //30px
                font-family: '黑体';
                font-weight: 400;
            }
        }
    }
</style>