import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index.vue'
import city  from '@/pages/city/city.vue'
import article_list from "@/pages/article_list/list.vue"
import article_detail  from '@/pages/article_detail/detail.vue'
import book_recommend from '@/pages/book/recommend.vue'
import book_list from '@/pages/book/list.vue'
import bookshelf from '@/pages/book/bookshelf.vue'
import book_search from '@/pages/book/search.vue'
import book_detail from '@/pages/book/detail.vue'
import ebook from '@/pages/book/ebook.vue'
import huainan_list from '@/pages/huainan/huainan_list.vue'
import huainan_det from '@/pages/huainan/huainan_det.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/city',
      name: 'city',
      component: city
    },
    {
      path: '/art_list/:tag?/:key?',//第一个参数为tag标签 第二个参数为key
      name: 'art_list',
      component:article_list
    },
    {
      path: '/art_det/:id',
      name: 'art_detail',
      component: article_detail
    },
    {
      path: '/book_recommend',
      name: 'book_recommend',
      component: book_recommend
    },
    {
      path: '/book_list/:id',
      name: 'book_list',
      component:book_list
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component:bookshelf
    },
    {
      path: '/ebook',
      name: 'ebook',
      component:ebook
    },
    {
      path: '/book_search',
      name: 'book_search',
      component:book_search
    },
    {
      path: '/book_detail/:id',
      name: 'book_detail',
      component:book_detail
    },
    {
      path: '/huainan_list',
      name: 'huainan_list',
      component:huainan_list
    },
    {
      path: '/huainan_det/:id',
      name: 'huainan_det',
      component:huainan_det,
    }
  ]
})
