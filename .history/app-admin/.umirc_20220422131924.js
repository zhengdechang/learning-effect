import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  title: '智能分析系统',
  links: [
    { rel: 'icon', href: '/api/public/logo.ico' },
  ],
  routes: [
    {
      path: '/login',
      title: '登录',
      component: '@/pages/login',
    },
    {
      path: '/',
      component: '@/layouts/base-layout',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          title: '首页',
          icon: 'icon-homefill',
          component: '@/pages/home',
        },
        {
          path: '/paper',
          title: '试卷列表',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper',
        },
        {
          path: '/paper/edit/:paperId',
          title: '编辑试卷',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper/edit',
          hideInMenu: true,
        },
        {
          path: '/paper/view/:paperId',
          title: '预览试卷',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper/view',
          hideInMenu: true,
        },
        {
          path: '/paper/mark/:paperId',
          title: '评卷',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper/mark',
          hideInMenu: true,
        },
        {
          path: '/score/:paperId',
          title: '成绩',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper/score',
          hideInMenu: true,
        },
        {
          path: '/paper/exam/:paperId',
          title: '考试',
          icon: 'icon-xingtuxuetang-kaoshi-',
          component: '@/pages/paper/exam',
          hideInMenu: true,
        },
        {
          path: '/teacher',
          title: '教师列表',
          icon: 'icon-ic_teacher',
          component: '@/pages/user/teacher',
        },
        {
          path: '/student',
          title: '学生列表',
          icon: 'icon-ic_student',
          component: '@/pages/user/student',
        },
        {
          path: '/score',
          title: '成绩列表',
          icon: 'icon-ic_student',
          component: '@/pages/score/student',
        },
        {
          path: '/classes',
          title: '班级列表',
          icon: 'icon-banji',
          component: '@/pages/classes',
        },
        {
          path: '/statistics',
          title: '统计',
          icon: 'icon-zhexiantu',
          component: '@/pages/statistics',
        },
        {
          path: '/my',
          title: '我的',
          icon: 'icon-wode-wode',
          component: '@/pages/my',
          hideInMenu: true,
        },
      ]
    },
  ],
  // less 变量
  theme: {},
  fastRefresh: {},
});
