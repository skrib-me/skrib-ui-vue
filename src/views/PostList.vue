<template>
  <section>
    <PostForm />
    <PostList />
  </section>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import PostForm from '@/components/Posts/PostForm'

export default {
  components: {
    PostList,
    PostForm
  }
}
</script>
