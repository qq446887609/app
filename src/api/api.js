import axios from 'axios'

// http request 拦截器


// http response 拦截器

//代理解决跨域问题
let proxy = "https://bird.ioliu.cn/v1?url=";

// -- 以下为自己后台api -- //

/**
 *  分类地址
 */
export function getCategorys(){
    let url = '/julyapi/category';
    return axios.get(url);
}

/**
 *   getBanner
 * www.tasays.cn/api/banner
 */
export function getBanner(){
    let url = '/julyapi/banner';
    return axios.get(url);
}

/**
 * 获得文章列表
 * www.tasays.cn/api/articles
 * tag 文章标签
 * key 文章title关键字
 */
export function getArticles(tag="",key="",page=1){
    let url = "/julyapi/articles";
    url+="?tag="+tag+"&key="+key+"&page="+page;
    return axios.get(url);
}

/**
 * 获得文章详情
 */
export function getArticle(id){
    let url = "/julyapi/articles/"+id;
    return axios.get(url);
}

/**
 * 获得用户书架列表
 */
export function getBookshelf(){
    let url = "/julyapi/bookshelf";
    return axios.get(url);
}

/**
 * 刷新用户token
 */
export function getNewToken(){
    let url = "/julyapi/authorizations/current";
    return axios.put(url);
}

// -- 以下为笔趣阁api -- //

/**
 * 获得书籍章节列表
 * shuapi.jiaston.com/book/115088/
 */
export function getBookCateLogList(id){
    let url = 'shuapi/book/'+id+'/';
    return axios.get(url);
}

/**
 * 获得数据详情
 * https://shuapi.jiaston.com/book/115088/5946751.html 
 * @param book_id 图书id
 * @param chapter_id 章节id
 */
export function getBookChapterInfo(book_id,chapter_id){
    let url = 'shuapi/book/'+book_id+'/'+chapter_id+'.html';
    return axios.get(url);
}

// -- 以下为查查网api -- //

/**
 * 查查网api列表
 * @param page 当前分页
 */
export function getHuaiNanList(page){
    let url = proxy+'http://ccq.0554cc.cn/wap/community/list?fid=50';
    return axios.post(url,{page:page});
}

/**
 * 查查网api 详情
 * @param id 文章id
 */
export function getHuaiNanDet(id){
    let url = proxy+'http://ccq.0554cc.cn/wap/thread/view-thread/tid/'+id;
    return axios.post(url);
}


// -- 以下为追书神器api -- //

/**
 * 获得推荐书单
 * @param sort 排序方式 默认收藏数量排序
 * @param duration 默认最近7天
 * @param start 开始页 默认0
 */
export function getZhuishuRecommendList(sort='',duration='',start=0){
    let url = 'https://api.zhuishushenqi.com/book-list?sort='+sort+'&duration='+duration+'&start='+start;
    return axios.get(url);
}

/**
 * 获得书单详情
 * @param id 书单id 
 */
export function getBookRecommentDetail(id){
    let url = 'http://api.zhuishushenqi.com/book-list/'+id;
    return axios.get(url);
}

/**
 * 解析追书神器图片静态服务器地址
 * @param url url
 */
export function getZhuishuStaticPic(url){
    return "https://statics.zhuishushenqi.com"+url;
}

/**
 * 获得图书详情
 * @param id 图书id  
 * //todo 其他参数 如搜索条件
 */
export function getZhuiShuBookDetail(id){
    let url = proxy+"http://api.zhuishushenqi.com/book/"+id;
    return axios.get(url);
}

/**
 * 获得图书评价
 * @param id 图书id
 * @param limit 展示评论条数
 */
export function getZhuiShuBookComment(id,limit){
    let url = proxy+"http://api.zhuishushenqi.com/post/review/best-by-book?book="+id+"&limit="+limit;
    return axios.get(url);
}
