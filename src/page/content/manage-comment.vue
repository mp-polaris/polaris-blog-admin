<template>
  <div class="comment-box">
    <!--列表内容-->
    <div class="comment-list-box margin-bottom-20">
      <el-table
              v-loading="loading"
              :data="comments"
              style="width: 100%">
        <el-table-column
                fixed
                prop="id"
                label="ID"
                width="150"
                :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
                fixed
                prop="articleId"
                label="文章id"
                width="150"
                :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
                label="评论内容"
                :show-overflow-tooltip="true"
                width="100">
          <template slot-scope="scope">
            <a href="#">{{scope.row.commentContent}}</a>
          </template>
        </el-table-column>
        <el-table-column
                label="父级评论"
                :show-overflow-tooltip="true"
                width="100">
          <template slot-scope="scope">
            <a href="#">{{scope.row.parentContent}}</a>
          </template>
        </el-table-column>
        <el-table-column
                label="用户"
                width="160">
          <template slot-scope="scope">
            <a href="#" class="comment-user-avatar clearfix">
              <el-avatar :src="scope.row.userAvatar"></el-avatar>
              <span class="comment-user-name">{{scope.row.userName}}</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column
                label="状态"
                width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.state==='3'">
              <el-tag type="danger" size="medium">置顶</el-tag>
            </div>
            <div v-if="scope.row.state==='1'">
              <el-tag type="primary" size="medium">正常</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                label="创建日期"
                width="160">
          <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.createTime)">

                        </span>
          </template>
        </el-table-column>
        <el-table-column
                class="category-update-time"
                label="更新日期"
                width="160">
          <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.updateTime)">

                        </span>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="180">
          <template slot-scope="scope">
            <el-button type="danger" v-if="scope.row.status!=='0'" size="mini"
                       @click="deleteItem(scope.row)">删除
            </el-button>
            <el-button type="success" v-if="scope.row.state==='3'" size="mini" @click="top(scope.row)">取消置顶
            </el-button>
            <el-button type="success" v-else size="mini" @click="top(scope.row)">置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="comment-page-navigation">
      <el-pagination
              class="comment-list-page-navigation-bar"
              background
              @current-change="onPageChange"
              :current-page="pageNavigation.currentPage"
              :page-size="pageNavigation.pageSize"
              layout="prev, pager, next"
              :total="pageNavigation.totalCount">
      </el-pagination>
    </div>
    <!--dialog-->
    <div class="comment-dialog-box">
      <el-dialog
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              title="删除提示"
              :visible.sync="deleteDialogShow"
              width="500px">
        <span>你确定要删除：{{deleteMessage}} 这条评论吗？</span>
        <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">删除</el-button>
                </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import * as dateUtils from '../../utils/date';
  import * as api from '../../api/api';

  export default {
    data() {
      return {
        deleteMessage: '',
        deleteDialogShow: false,
        loading: false,
        comments: [],
        pageNavigation: {
          currentPage: 1,
          totalCount: 0,
          pageSize: 5,
        },
        targetDeleteId: ''
      }
    },
    methods: {
      doDeleteItem() {
        api.deleteCommentById(this.targetDeleteId).then(result => {
          if (result.code === api.success_code) {
            //处理结果
            this.listComments();
            this.$message.success(result.message);
            this.deleteDialogShow = false;
          } else {
            this.$message.error(result.message);
          }
        });
      },
      top(item) {
        api.topComment(item.id).then(result => {
          if (result.code === api.success_code) {
            this.listComments();
            this.$message.success(result.message);
          } else {
            this.$message.error(result.message);
          }
        })
      },
      deleteItem(item) {
        this.deleteMessage = item.id;
        this.targetDeleteId = item.id;
        //处理显示数据
        //显示删除提示框
        this.deleteDialogShow = true;
      },
      onPageChange(page) {
        this.pageNavigation.currentPage = page;
        this.listComments();
      },
      listComments() {
        this.loading = true;
        api.listComments(this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
          if (result.code === api.success_code) {
              console.log(result)
            this.comments = result.data.list;
            this.pageNavigation.currentPage = result.data.pageNum;
            this.pageNavigation.totalCount = result.data.total;
          }
          this.loading = false;
        });
      },
      formatDate(dateStr) {
        let date = new Date(dateStr);
        return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    mounted() {
      this.listComments();
    }
  }
</script>
<style>
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

  .comment-box {
    padding: 20px;
  }
</style>
