<template>
  <section>
    <DropMessage />
    <PostList />
  </section>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import DropMessage from '@/components/DropMessage'

export default {
  name: 'post-list',
  components: {
    PostList,
    DropMessage
  }
}
</script>
