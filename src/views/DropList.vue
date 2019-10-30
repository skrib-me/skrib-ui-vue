<template>
  <section>
    <DropForm @droped='droped' />
    <DropList :unshift='drop' />
  </section>
</template>

<script>
import DropList from '@/components/Drops/DropList'
import DropForm from '@/components/Drops/DropForm'

export default {
  components: {
    DropList,
    DropForm
  },
  data() {
    return {
      drop: null
    }
  },
  methods: {
    droped: function(drop) {
      this.drop = drop
    }
  }
}
</script>
