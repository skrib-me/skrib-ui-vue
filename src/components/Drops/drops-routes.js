export default [
    {
        path: '/drops',
        name: 'drop-list',
        component: () => import('@/views/DropList')
    },
    {
        path: '/drops/:id',
        name: 'drop-item',
        component: () => import('@/views/DropItem')
    }
]