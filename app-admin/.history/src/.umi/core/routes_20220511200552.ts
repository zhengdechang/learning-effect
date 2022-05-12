// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/Administrator/Desktop/新建文件夹/learning-effect/app-admin/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "title": "登录",
    "component": require('@/pages/login').default,
    "exact": true
  },
  {
    "path": "/",
    "component": require('@/layouts/base-layout').default,
    "routes": [
      {
        "path": "/",
        "redirect": "/home",
        "exact": true
      },
      {
        "path": "/home",
        "title": "首页",
        "icon": "icon-homefill",
        "component": require('@/pages/home').default,
        "exact": true
      },
      {
        "path": "/paper",
        "title": "试卷列表",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper').default,
        "exact": true
      },
      {
        "path": "/paper/edit/:paperId",
        "title": "编辑试卷",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper/edit').default,
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/paper/view/:paperId",
        "title": "预览试卷",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper/view').default,
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/paper/mark/:paperId",
        "title": "评卷",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper/mark').default,
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/score/:paperId",
        "title": "成绩",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper/score').default,
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/paper/exam/:paperId",
        "title": "考试",
        "icon": "icon-xingtuxuetang-kaoshi-",
        "component": require('@/pages/paper/exam').default,
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/teacher",
        "title": "教师列表",
        "icon": "icon-ic_teacher",
        "component": require('@/pages/user/teacher').default,
        "exact": true
      },
      {
        "path": "/student",
        "title": "学生列表",
        "icon": "icon-ic_student",
        "component": require('@/pages/user/student').default,
        "exact": true
      },
      {
        "path": "/score",
        "title": "成绩列表",
        "icon": "icon-ic_student",
        "component": require('@/pages/score/index').default,
        "exact": true
      },
      {
        "path": "/sign",
        "title": "签到列表",
        "icon": "icon-banji",
        "exact": true,
        "component": require('@/pages/sign/index').default
      },
      {
        "path": "/classes",
        "title": "班级列表",
        "icon": "icon-banji",
        "component": require('@/pages/classes').default,
        "exact": true
      },
      {
        "path": "/mark",
        "title": "标签管理",
        "icon": "icon-banji",
        "exact": true,
        "component": require('@/pages/mark/index').default
      },
      {
        "path": "/know",
        "title": "知识点管理",
        "icon": "icon-banji",
        "exact": true,
        "component": require('@/pages/know/index').default
      },
      {
        "path": "/info",
        "title": "通知管理",
        "icon": "icon-banji",
        "exact": true,
        "component": require('@/pages/info/index').default
      },
      {
        "path": "/statistics",
        "title": "统计",
        "icon": "icon-zhexiantu",
        "component": require('@/pages/statistics').default,
        "exact": true
      },
      {
        "path": "/my",
        "title": "我的",
        "icon": "icon-wode-wode",
        "component": require('@/pages/my').default,
        "hideInMenu": true,
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
