<template>
    <div class="admin-login-box">
        <!--顶部内容-->
        <div class="admin-login-header-box">
            <div class="admin-login-header-center center">
                <div class="admin-login-logo">
                    博客系统｜登录
                </div>
            </div>
        </div>

        <!--中间内容-->
        <div class="admin-login-center-box">
            <div class="center login-center-box">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form label-position="right" label-width="100px">
                            <el-form-item label="账号" required>
                                <el-input v-model="blogUser.userName" placeholder="用户名/邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" required>
                                <el-input type="password" v-model="blogUser.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="人类验证码" required>
                                <el-input v-model="loginInfo.verifyCode" placeholder="请输入右侧验证码"
                                          @keyup.enter.native="doLogin"></el-input>
                                <img :src="captchaPath" @click="updateVerifyCode" class="captcha-code">
                            </el-form-item>
                            <el-form-item class="login-button">
                                <el-button type="primary" @click="doLogin" size="small"> 登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    // import {doLogin, success_code} from '../../api/api';
    // import {hex_md5} from "../../utils/md5";
    export default {
        data() {
            return {
                originalPassword: '',
                blogUser: {
                    userName: '',
                    password: '',
                },
                loginInfo: {
                    verifyCode: '',
                    captcha_key: ''
                },
                captchaPath: ''
            }
        },
        methods: {
            toastE(msg) {
                this.$message({
                    message: msg,
                    center: true,
                    type: 'error'
                });
            },
            doLogin() {
                //检查数据
                if (this.blogUser.userName === '') {
                    this.toastE('账号不可以为空.');
                    return;
                }
                if (this.blogUser.password === '') {
                    this.toastE('密码不可以为空.');
                    return;
                }

                if (this.loginInfo.verifyCode === '') {
                    this.toastE('人类验证码不可以为空.');
                    return;
                }
                //向服务器提交数据
                this.$http({
                    method: 'post',
                    url: '/user/login/' + this.loginInfo.captcha_key + '/' + this.loginInfo.verifyCode,
                    data: this.blogUser
                }).then(result => {
                    //判断状态
                    if (result.data.code === 2000) {
                        this.$message({
                            message: result.data.message,
                            center: true,
                            type: 'success'
                        });
                        //如果是成功
                        this.$router.push({path: '/index'})
                    } else {
                        //更新一下人类验证码
                        this.updateVerifyCode();
                        this.toastE(result.data.message);
                    }
                });
            },
            updateVerifyCode() {
                this.captchaPath = '/user/captcha?captcha_key=' + this.loginInfo.captcha_key + "&random=" + Date.parse(new Date());
                console.log(this.captchaPath);
            }
        },
        created() {
            this.loginInfo.captcha_key = Date.parse(new Date());
            this.updateVerifyCode();
        }
    }
</script>

<style scoped>
    /* 顶部 */
    .admin-login-header-box {
        width: 100%;
        height: 46px;
        margin-bottom: 20px;
        background: dodgerblue;
    }

    .admin-login-header-center {
        line-height: 46px;
    }

    .admin-login-logo {
        color: #fff;
        font-size: 18px;
        font-weight: bolder;
    }

    /* 内容 */
    .login-center-box {
        border-radius: 4px;
        width: 1100px;
        padding: 20px;
        background: #fff;
        box-shadow: 0 1px 10px #afafaf;
    }

    .login-center-box .el-input {
        width: 200px;
    }

    .login-center-box .el-input__inner {
        border: solid 1px #E6E6E6;
        height: 42px;
        border-radius: 0;
    }

    .login-center-box .el-form-item__label {
        background: #FBFBFB;
        border-left: solid 1px #E6E6E6;
        border-top: solid 1px #E6E6E6;
        border-bottom: solid 1px #E6E6E6;
        text-align: center;
    }

    .captcha-code {
        cursor: pointer;
        vertical-align: middle;
        margin-left: 10px;
        border: solid 1px #E6E6E6;
        width: 120px;
        padding-left: 10px;
        padding-right: 10px;
        height: 40px;
    }

    .login-button {
        margin-bottom: 0;
    }

    .center {
        margin: 0 auto;
        width: 1140px;
    }
</style>