export default [
    {
        path: '/posts',
        name: 'post-list',
        component: () => import('@/views/PostList')
    },
    {
        path: '/posts/:id',
        name: 'post-item',
        component: () => import('@/views/PostItem')
    }
]