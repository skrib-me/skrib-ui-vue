export default [
    {
        path: '/drops',
        name: 'dropList',
        component: () => import('@/views/DropList')
    },
    {
        path: '/drops/:id',
        name: 'dropItem',
        component: () => import('@/views/DropItem')
    }
]