<template>
    <div id="app">
        <div class="content-title-box">右边内容</div>
        <div class="content-main-box">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

</script>

<style>
    .content-title-box{
        padding: 10px;
        border-bottom: 1px solid #e6e6e6;
    }
    .content-main-box{
        padding: 10px;
    }
</style>