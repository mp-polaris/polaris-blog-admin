<template>
    <el-menu default-active="0" class="el-menu-vertical-demo" unique-opened="true">
        <!-- 遍历菜单内容,分为有子菜单的和没有子菜单的 -->
        <template v-for="(item,index) in menuList">
            <router-link :to="item.path" :key="index">
                <el-menu-item :index="index"  v-if="!item.children&&!item.hidden">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu :index="item.name" v-if="item.children&&!item.hidden" :key="index" >
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <router-link :to="item.path + '/' + subItem.path"  v-for="(subItem,subIndex) in item.children" :key="subIndex">
                    <el-menu-item :index="index + '-' + subIndex" v-if="!subItem.hidden">
                        <i :class="subItem.icon"></i>
                        <span slot="title">{{subItem.name}}</span>
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
    import {routes} from '../router';
    export default {
        data(){
          return {
              menuList:[]
            }
        },
        mounted() {
            // console.log(routes);
            let menuList = routes[0];
            this.menuList = menuList.children
            console.log(this.menuList);
        }
    }
</script>

<style scoped>

</style>