import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);
/*登录页面*/
const login = () => import("@/page/login/login");
/*内容部分*/
const articleManage = () => import("@/page/content/manage-article");
const postArticle = () => import("@/page/content/post-article");
const imageManage = () => import("@/page/content/manage-image");
const commentManage = () => import("@/page/content/manage-comment");
/*首页*/
const index = () => import("@/page/dashboard/index");
/*运营*/
const categoryManage = () => import("@/page/operation/manage-category");
const loopManage = () => import("@/page/operation/loop");
/*设置*/
const info = () => import("@/page/settings/info");
const email = () => import("@/page/settings/email");
const friendLink = () => import("@/page/settings/friend-link");
const webSizeInfo = () => import("@/page/settings/websize-info");
/*用户*/

const list = () => import("@/page/user/list");
/*佈局*/
const baseView = () => import("@/layout/base-view");
const rightView = () => import("@/layout/right-content");

export const routes = [
    {
        path: '',
        component: baseView,
        redirect: '/index',
        children: [
            {
                path: "/index",
                name: '首页',
                icon: 'el-icon-s-home',
                hidden: false,
                component: index
            },
            {
                path: '/content',
                hidden: false,
                name: '内容',
                icon: 'el-icon-tickets',
                component: rightView,
                children: [
                    {
                        path: 'post-article',
                        hidden: false,
                        name: '发表文章',
                        icon: 'el-icon-edit-outline',
                        component: postArticle,
                    },
                    {
                        path: 'manage-article',
                        hidden: false,
                        icon: 'el-icon-document',
                        name: '文章管理',
                        component: articleManage
                    },
                    {
                        path: 'manage-comment',
                        name: '评论管理',
                        icon: 'el-icon-chat-line-round',
                        hidden: false,
                        component: commentManage
                    },
                    {
                        path: 'manage-image',
                        name: '图片管理',
                        icon: 'el-icon-picture-outline',
                        hidden: false,
                        component: imageManage
                    }
                ]
            },
            {
                path: '/user',
                name: '用户',
                hidden: false,
                icon: 'el-icon-user',
                component: rightView,
                children: [
                    {
                        path: 'list',
                        hidden: false,
                        name: '用户列表',
                        icon: 'el-icon-user',
                        component: list,
                    }
                ]
            },
            {
                path: '/operation',
                hidden: false,
                name: '运营',
                icon: 'el-icon-c-scale-to-original',
                component: rightView,
                children: [
                    {
                        path: 'category',
                        hidden: false,
                        name: '分类管理',
                        icon: 'el-icon-help',
                        component: categoryManage,
                    },
                    {
                        path: 'loop',
                        name: '轮播图管理',
                        icon: 'el-icon-picture-outline-round',
                        hidden: false,
                        component: loopManage
                    }
                ]
            },
            {
                path: '/settings',
                name: '设置',
                icon: 'el-icon-setting',
                hidden: false,
                component: rightView,
                children: [
                    {
                        name: '邮箱设置',
                        path: 'email',
                        hidden: false,
                        icon: 'el-icon-postcard',
                        component: email
                    },
                    {
                        name: '用户信息',
                        path: 'info',
                        hidden: false,
                        icon: 'el-icon-warning-outline',
                        component: info
                    },
                    {
                        path: 'web-size-info',
                        hidden: false,
                        name: '网站信息',
                        icon: 'el-icon-warning-outline',
                        component: webSizeInfo,
                    },
                    {
                        path: 'friend-link',
                        icon: 'el-icon-link',
                        name: '友情链接',
                        hidden: false,
                        component: friendLink
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component: login
    }
];


const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
    mode: 'history'
});

export default router;
