export default [
    {
        path: '/p/:id',
        name: 'post',
        component: () => import('@/views/PostItem')
    }
]