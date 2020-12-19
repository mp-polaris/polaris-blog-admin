<template>
  <div class="dashboard-box">
    <div class="welcome-tps">
      欢迎使用Polaris博客系统！
    </div>
    <div class="web-size-info-box margin-bottom-20">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="web-info-content">
            <div class="web-info-title">访问总量：</div>
            <div class="web-info-number">{{viewCount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="web-info-content">
            <div class="web-info-title">注册用户：</div>
            <div class="web-info-number">{{userCount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="web-info-content">
            <div class="web-info-title">文章总数：</div>
            <div class="web-info-number">{{articleCount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="web-info-content">
            <div class="web-info-title">评论总数：</div>
            <div class="web-info-number">{{commentCount}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dashboard-bottom-part">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="dashboard-car-title">快捷操作</span>
              </div>
              <div class="fast-way-list">
                <div class="fast-way-item">
                  <router-link class="el-icon-edit" to="/content/post-article"> 写文章</router-link>
                </div>
                <div class="fast-way-item">
                  <router-link class="el-icon-c-scale-to-original" to="/settings/web-size-info">
                    修改网站信息
                  </router-link>
                </div>
                <div class="fast-way-item">
                  <router-link class="el-icon-link" to="/settings/friend-link"> 编辑友情链接</router-link>
                </div>
                <div class="fast-way-item">
                  <router-link class="el-icon-picture-outline-round" to="/operation/loop"> 轮播图管理
                  </router-link>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="dashboard-car-title">最新评论</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toCommentMorePage">
                  更多 >>
                </el-button>
              </div>
              <div class="last-comment-list">
                <el-table
                        v-loading="loading"
                        :data="comments"
                        style="width: 100%">
                  <el-table-column
                          label="评论内容">
                    <template slot-scope="scope">
                      <a href="#">{{scope.row.commentContent}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column
                          label="用户"
                          width="200">
                    <template slot-scope="scope">
                      <a href="#" class="comment-user-avatar clearfix">
                        <el-avatar :src="scope.row.userAvatar"></el-avatar>
                        <span class="comment-user-name">{{scope.row.userName}}</span>
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import * as api from '../../api/api';

  export default {
    data() {
      return {
        comments: [],
        loading: false,
        viewCount: 0,
        commentCount: 0,
        articleCount: 0,
        userCount: 0
      }
    },
    methods: {
      toCommentMorePage() {
        this.$router.push({
          path: '/content/manage-comment'
        })
      },
      listCount() {
        api.getArticleCount().then(result => {
          if (result.code === api.success_code) {
            this.articleCount = result.data;
          }
        });

        api.getUserCount().then(result => {
          if (result.code === api.success_code) {
            this.userCount = result.data;
          }
        });

        api.getCommentCount().then(result => {
          if (result.code === api.success_code) {
            this.commentCount = result.data;
          }
        });

        api.getViewCount().then(result => {
          if (result.code === api.success_code) {
            this.viewCount = result.data.web_size_view_count;
          }
        });
      },
      listLastComment() {
        this.loading = true;
        api.listComments(1, 10).then(result => {
          if (result.code === api.success_code) {
            this.comments = result.data.list;
          }
          this.loading = false;
        });
      }
    },
    mounted() {
      this.listLastComment();
      this.listCount();
    }
  }
</script>
<style>

  .fast-way-item a {
    color: #1E90FF;
  }

  .fast-way-item {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .dashboard-car-title {
    font-size: 20px;
    font-weight: 600;
  }

  .welcome-tps {
    padding: 20px;
    font-size: 20px;
  }

  .dashboard-box {
    min-width: 1140px;
    padding: 20px;
  }

  .web-info-number {
    text-align: center;
    color: #1E90FF;
    font-size: 36px;
    font-weight: 600;
  }

  .web-info-title {
    padding: 20px;
    font-size: 20px;
  }

  .web-info-content {
    height: 150px;
    box-shadow: 0 1px 10px #d4d4d4;
  }

  .comment-user-name {
    margin-left: 10px;
    font-weight: 600;
    color: #222222;
  }

  .comment-user-avatar {
    display: block;
  }

  .comment-user-avatar img {
    vertical-align: middle;
  }


  .comment-user-avatar span {
    display: block;
    line-height: 40px;
    float: left;
  }
</style>
