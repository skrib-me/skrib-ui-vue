export default [
    {
        path: '/:username',
        name: 'userDropList',
        component: () => import('@/components/Users/UserDropList')
    }
]