<template>
    <div style="postion: relative">
        <vHead title="我的"></vHead>
        <h3>这是我的页面</h3>
        <div class="footer">
            <p style="margin-bottom: 10px;">AA小哲个人项目学习</p>
            <p>渝ICP备2021003419号-1 2021-04-09</p>
        </div>
    </div>
</template>

<script>
import vHead from "@comps/header/Header.vue";
export default {
    components: {
        vHead,
    },
};
</script>

<style scoped lang="scss">
.footer {
    text-align: center;
    position: absolute;
    bottom: 69px;
    left: 89px;
}
</style>
