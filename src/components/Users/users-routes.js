export default [
    {
        path: '/users/:id',
        name: 'userDropList',
        component: () => import('@/components/Users/UserDropList')
    }
]