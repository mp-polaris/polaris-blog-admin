<template>
    <div>
        <el-container>
            <el-header id="admin-header-box">
                <top-header></top-header>
            </el-header>

            <el-container>
                <el-aside id="left-menu-box" width="200px" >
                    <left-menu></left-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        mounted() {
            //动态设置侧边菜单盒子的高度
            let leftMenuBox = document.querySelector('#left-menu-box');
            let adminHeaderBox = document.querySelector('#admin-header-box');
            let leftMenuBoxHeight = window.innerHeight - adminHeaderBox.offsetHeight;
            if(leftMenuBox) {
                leftMenuBox.style.height = leftMenuBoxHeight + 'px';
            }
        }
    }
</script>

<style>
    .el-header{
        background-color:dodgerblue;
        line-height: 46px;
        height: 46px !important;
    }

    .el-aside {
        border-right: #e6e6e6 solid 1px;
    }
    .el-aside .el-menu {
        border: none;
    }
    .el-main {

        padding: 0;
    }
</style>