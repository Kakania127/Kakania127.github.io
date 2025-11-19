// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入页面组件
import HomePage from '../pages/HomePage.vue'
import QuestionPage from '../pages/QuestionPage.vue'
import ResultPage from '../pages/ResultPage.vue'

// 路由配置
const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: HomePage,
    meta: {
      title: 'MBTI 性格测试'
    }
  },
  { 
    path: '/questions', 
    name: 'questions', 
    component: QuestionPage,
    meta: {
      title: 'MBTI 测试 - 答题'
    }
  },
  { 
    path: '/result', 
    name: 'result', 
    component: ResultPage,
    meta: {
      title: 'MBTI 测试 - 结果'
    }
  },
  // 404 页面处理 - 重定向到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// 创建路由对象
const router = createRouter({
  // 使用 hash 模式，确保在 GitHub Pages 上正常工作
  history: createWebHashHistory(),
  routes,
  // 路由切换时的滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'MBTI 性格测试'
  }
  next()
})

// 导出路由实例
export default router