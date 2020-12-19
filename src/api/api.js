import http from './http';

export const success_code = 2000;
export const failed_code = 4000;

//解析token
export const checkToken = () => {
    return http.requestGet('/user/check-token');
};

//登录
export const doLogin = (verifyCode, blogUser) => {
    return http.requestPost('/user/login/1234567890987/' + verifyCode + '/?from=_p', blogUser);
};


//获取分类列表
export const listCategories = () => {
    return http.requestGet('/admin/category/list');
};

//删除分类
export const deleteCategoryById = (categoryId) => {
    return http.requestDelete('/admin/category/' + categoryId);
};


//添加分类
export const postCategory = (category) => {
    return http.requestPost('/admin/category/', category);
};


//更新分类
export const updateCategory = (categoryId, category) => {
    return http.requestPut('/admin/category/' + categoryId, category);
};


//获取轮播图列表
export const listLoop = () => {
    return http.requestGet('/admin/looper/list');
};


//添加轮播图
export const postLoop = (loop) => {
    return http.requestPost('/admin/looper', loop);
};


//删除轮播图
export const deleteLoop = (loopId) => {
    return http.requestDelete('/admin/looper/' + loopId);
};


//修改轮播图
export const updateLoop = (loopId, loop) => {
    return http.requestPut('/admin/looper/' + loopId, loop);
};

//获取用户列表
export const listUsers = (page, size) => {
    return http.requestGet('/user/list?page=' + page + '&size=' + size);
};

//搜索
export const doUserSearch = (userName, email) => {
    return http.requestGet('/user/list?page=1&size=10&userName=' + userName + '&email=' + email);
};

//删除用户
export const deleteUserById = (userId) => {
    return http.requestDelete('/user/' + userId);
};

//重置密码
export const resetPassword = (userId, newPassword) => {
    return http.requestPut('/user/reset_password/' + userId + '?password=' + newPassword);
};


//获取邮箱验证码
export const getVerifyCode = (emailAddress, type) => {
    return http.requestGet('/user/verify_code?email=' + emailAddress + '&type=' + type);
};

//更新当前用户的邮箱地址
export const updateEmailAddress = (emailAddress, verifyCode) => {
    return http.requestPut('/user/email?email=' + emailAddress + '&verify_code=' + verifyCode);
};


//检查用户名是否已经存在
export const checkUserName = (userName) => {
    return http.requestGet('/user/user_name?userName=' + userName);
};


//更新用户信息
export const updateUserInfo = (userInfo, userId) => {
    return http.requestPut('/user/user_info/' + userId, userInfo);
};

//获取SEO信息
export const getSeoInfo = () => {
    return http.requestGet('/admin/web_size_info/seo');
};

//获取网站的标题
export const getWebSizeTitle = () => {
    return http.requestGet('/admin/web_size_info/title');
};

//更新网站的标题
export const updateWebSizeTitle = (title) => {
    return http.requestPut('/admin/web_size_info/title?title=' + title);
};

//更新网站的SEO信息
export const updateSeoInfo = (description, keyword) => {
    return http.requestPut('/admin/web_size_info/seo?description=' + description + '&keywords=' + keyword);
};


//获取友情链接
export const listFriendLinks = () => {
    return http.requestGet('/admin/friend_link/list');
};

//添加友情链接
export const postFriendLink = (friendLink) => {
    return http.requestPost('/admin/friend_link', friendLink);
};

//更新友情链接
export const updateFriendLink = (friendLink, linkId) => {
    return http.requestPut('/admin/friend_link/' + linkId, friendLink);
};

//删除友情链接
export const deleteFriendLink = (linkId) => {
    return http.requestDelete('/admin/friend_link/' + linkId);
};

//获取图片列表
export const listImages = (page, size, category) => {
    return http.requestGet('/admin/image/list/' + page + '/' + size + '?category=' + category);
};


//发表文章
export const postArticle = (article) => {
    return http.requestPost('/admin/article', article);
};

//保存草稿
export const saveArticleDraft = (article) => {
    return http.requestPost('/admin/article', article);
}
//文章置顶
export const topArticle = (articleId) => {
    return http.requestPut('/admin/article/top/' + articleId);
};

//保存草稿
export const listArticles = (page, size, state, keyword, categoryId) => {
    let targetUrl = '/admin/article/list/' + page + '/' + size + '?state=' + state
        + '&categoryId=' + categoryId + '&keyword=' + keyword;
    return http.requestGet(targetUrl);

};

//真的删除文章
export const deleteArticleAbs = (articleId) => {
    return http.requestDelete('/admin/article/' + articleId);
};

//假的删除文章
export const deleteArticlePretend = (articleId) => {
    return http.requestDelete('/admin/article/state/' + articleId);
};


export const getArticleDetail = (articleId) => {
    return http.requestGet('/admin/article/' + articleId);
};

export const updateArticle = (articleId, article) => {
    return http.requestPut('/admin/article/' + articleId, article);
};

export const listComments = (page, size) => {
    return http.requestGet('/admin/comment/list/' + page + '/' + size);
};

export const deleteCommentById = (commentId) => {
    return http.requestDelete('/admin/comment/' + commentId);
};


export const topComment = (commentId) => {
    return http.requestPut('/admin/comment/top/' + commentId);
};

export const deleteImageById = (imageId) => {
    return http.requestDelete('/admin/image/' + imageId);
};


export const getArticleCount = () => {
    return http.requestGet('/admin/article/count');
};

export const getUserCount = () => {
    return http.requestGet('/user/register_count');
};


export const getCommentCount = () => {
    return http.requestGet('/admin/comment/count');
};


export const getViewCount = () => {
    return http.requestGet('/admin/web_size_info/view_count');
};


export const doLogout = () => {
    return http.requestGet('/user/logout');
};






