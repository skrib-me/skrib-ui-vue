<template>
  <section>
    <PostForm @posted="posted" />
    <PostList :unshift='postedMessage' />
  </section>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import PostForm from '@/components/Posts/PostForm'

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      postedMessage: null
    }
  },
  methods: {
    posted: function(message) {
      this.postedMessage = message
    }
  }
}
</script>
