import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'domain_edit/:_id', title: '域名编辑', name: 'domain_edit', component: () => import('@/views/domain/edit.vue') },
        { path: 'list_edit/:_id', title: '类目编辑', name: 'list_edit', component: () => import('@/views/list/edit.vue') },
        { path: 'wzconfig_edit/:_id', title: '配置编辑', name: 'wzconfig_edit', component: () => import('@/views/wzconfig/edit.vue') },
        { path: 'content_edit/:_id', title: '内容编辑', name: 'content_edit', component: () => import('@/views/content/edit.vue') },
        { path: 'jump_edit/:_id', title: '跳转编辑', name: 'jump_edit', component: () => import('@/views/jump/edit.vue') },
        { path: 'spidergroup_edit/:_id', title: '蜘蛛编辑', name: 'spidergroup_edit', component: () => import('@/views/spidergroup/edit.vue') },
        { path: 'waiurl_edit/:_id', title: '外链编辑', name: 'waiurl_edit', component: () => import('@/views/waiurl/edit.vue') },
        { path: 'admin_edit', title: '个人中心', name: 'admin_edit', component: () => import('@/views/admin/edit.vue') },
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};
export const adminRouter = {
    path: '/',
    name: 'adminRouter',
    redirect: '/admin',
    component: Main,
    children: [
        { path: 'admin', title: { i18n: 'home' }, name: 'admin_index', component: () => import('@/views/admin/index.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/domain',
        icon: 'at',
        name: 'domain',
        title: '域名管理',
        component: Main,
        children: [
            { path: 'index', icon: 'ios-more', title: '域名管理', name: 'domain_index', component: () => import('@/views/domain/index.vue') },
            { path: 'add', icon: 'android-add',title: '添加域名', name: 'domain_add', component: () => import('@/views/domain/add.vue') }
        ]
    },
    {
        path: '/list',
        icon: 'navicon-round',
        name: 'list',
        title: '类目管理',
        component: Main,
        children: [
            { path: 'index', icon: 'ios-more', title: '类目管理', name: 'list_index', component: () => import('@/views/list/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加类目', name: 'list_add', component: () => import('@/views/list/add.vue') }
        ]
    },
    {
        path: '/wzconfig',
        icon: 'clipboard',
        name: 'wzconfig',
        title: '站点设置',
        component: Main,
        children: [
            { path: 'index', icon: 'ios-more', title: '配置管理', name: 'wzconfig_index', component: () => import('@/views/wzconfig/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加配置', name: 'wzconfig_add', component: () => import('@/views/wzconfig/add.vue') }
        ]
    },
    {
        path: '/content',
        icon: 'ios-book',
        name: 'content',
        title: '内容管理',
        component: Main,
        // component: () => import('@/views/wzconfig/index.vue')<Icon type="ios-book"></Icon>
        children: [
            { path: 'index', icon: 'ios-more', title: '内容管理', name: 'content_index', component: () => import('@/views/content/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加内容', name: 'content_add', component: () => import('@/views/content/add.vue') }
        ]
    },
    {
        path: '/waiurl',
        icon: 'ios-infinite',
        name: 'waiurl',
        title: '外链管理',
        component: Main,
        
        children: [
            { path: 'index', icon: 'ios-more', title: '外链管理', name: ' waiurl_index', component: () => import('@/views/waiurl/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加外链', name: 'waiurl_add', component: () => import('@/views/waiurl/add.vue') }
            // { path: 'add', icon: 'android-add', title: '添加配置', name: 'wzconfig_add', component: () => import('@/views/wzconfig/add.vue') }
        ]
    },
    {
        path: '/jump',
        icon: 'minus-circled',
        name: 'jump',
        title: '跳转管理',
        component: Main,
        // component: () => import('@/views/wzconfig/index.vue')<Icon type="ios-book"></Icon>
        children: [
            { path: 'index', icon: 'ios-more', title: '跳转管理', name: 'jump_index', component: () => import('@/views/jump/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加跳转', name: 'jump_add', component: () => import('@/views/jump/add.vue') },
            { path: 'jumplog', icon: 'ios-paper-outline', title: '跳转日志', name: 'jumplog_index', component: () => import('@/views/jump/jumplog_index.vue') }
        ]
    },
    {
        path: '/spider',
        icon: 'ionic',
        name: 'spider',
        title: '日志管理',
        component: Main,
        // component: () => import('@/views/wzconfig/index.vue')
        children: [
            { path: 'index', icon: 'ionic', title: '爬行日志', name: 'spider_index', component: () => import('@/views/spider/index.vue') },
            { path: 'sys_index', icon: 'ionic', title: '服务日志', name: 'sys_index', component: () => import('@/views/spider/sys_index.vue') }
            // { path: 'add', icon: 'android-add', title: '添加配置', name: 'wzconfig_add', component: () => import('@/views/wzconfig/add.vue') }
        ]
    },
    {
        path: '/spidergroup',
        icon: 'easel',
        name: 'spidergroup',
        title: '蜘蛛管理',
        component: Main,
        // component: () => import('@/views/wzconfig/index.vue')
        children: [
            { path: 'index', icon: 'ios-more', title: '蜘蛛管理', name: 'spidergroup_index', component: () => import('@/views/spidergroup/index.vue') },
            { path: 'add', icon: 'android-add', title: '添加蜘蛛', name: 'spidergroup_add', component: () => import('@/views/spidergroup/add.vue') }
            // { path: 'add', icon: 'android-add', title: '添加配置', name: 'wzconfig_add', component: () => import('@/views/wzconfig/add.vue') }
        ]
    }
    
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    adminRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
