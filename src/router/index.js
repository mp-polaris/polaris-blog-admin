import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//dashboard
const index = () => import("@/page/dashboard/index");
//content
const postArticle = () => import("@/page/content/post-article");
const managerArticle = () => import("@/page/content/manager-article");
const managerComment = () => import("@/page/content/manager-comment");
const managerImage = () => import("@/page/content/manager-image");
//user
const list = () => import("@/page/user/list");
const info = () => import("@/page/user/info");
const email = () => import("@/page/user/email");
const resetPassword = () => import("@/page/user/reset-password");
//operation
const loop = () => import("@/page/operation/loop");
const managerCategory = () => import("@/page/operation/manager-category");
//setting
const websizeInfo = () => import("@/page/setting/websize-info");
const friendLink = () => import("@/page/setting/friend-link");
//login
const login = () => import("@/page/login/login");

//layout
const baseView = () => import("@/layout/base-view");
const rightContentView = () => import("@/layout/right-content-view");

export const routes = [
    {
        path:'/',
        component:baseView,
        redirect: '/index',
        requireLogin: true,
        children: [
            {
                path: '/index',
                name: '首页',
                icon: 'el-icon-s-home',
                hidden: false,
                component: index,
            },
            {
                path: '/content',
                name: '内容',
                icon: 'el-icon-tickets',
                hidden: false,
                component: rightContentView,
                children: [
                    {path: 'post-article', icon: 'el-icon-edit-outline', name: '文章发表', hidden: false, component: postArticle},
                    {path: 'manager-article', icon: 'el-icon-document', name: '文章管理', hidden: false, component: managerArticle},
                    {path: 'manager-comment', icon: 'el-icon-chat-line-round', name: '评论管理', hidden: false, component: managerComment},
                    {path: 'manager-image', icon: 'el-icon-picture-outline', name: '图片管理', hidden: false, component: managerImage}
                ]
            },
            {
                path: '/user',
                name: '用户',
                icon: 'el-icon-user',
                hidden: false,
                component: rightContentView,
                children: [
                    {path: 'list', icon: 'el-icon-user', name: '用户列表', hidden: false, component: list},
                    {path: 'info', icon: 'el-icon-coordinate', name: '管理员信息', hidden: false, component: info},
                    {path: 'email', icon: 'el-icon-s-promotion', name: '邮箱设置', hidden: false, component: email},
                    {path: 'reset-password', icon: 'el-icon-more-outline', name: '密码重置', hidden: false, component: resetPassword}
                ]
            },
            {
                path: '/operation',
                name: '运营',
                icon: 'el-icon-c-scale-to-original',
                hidden: false,
                component: rightContentView,
                children: [
                    {path: 'loop', icon: 'el-icon-picture-outline-round', name: '轮播图设置', hidden: false, component: loop},
                    {path: 'manager-category', icon: 'el-icon-s-data', name: '分类管理', hidden: false, component: managerCategory}
                ]
            },
            {
                path: '/setting',
                name: '设置',
                icon: 'el-icon-setting',
                hidden: false,
                component: rightContentView,
                children: [
                    {path: 'websize-info',icon: 'el-icon-s-platform', name: '网站信息', hidden: false, component: websizeInfo},
                    {path: 'friend-link',icon: 'el-icon-paperclip', name: '友情链接', hidden: false, component: friendLink}
                ]
            }
        ],
    },
    {
        path: '/login',
        component: login,
        requireLogin: false
    }
]

const router = new VueRouter({
    routes
});

export default router;
