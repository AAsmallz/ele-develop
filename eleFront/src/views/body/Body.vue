<template>
    <div class="Body">
        <router-view />
        <TooBar></TooBar>
    </div>
</template>

<script>
    import TooBar from '../../components/toolBar/ToolBar.vue'
    export default {
        components: {
            TooBar
        }
    }
</script>

<style scoped>

</style>
