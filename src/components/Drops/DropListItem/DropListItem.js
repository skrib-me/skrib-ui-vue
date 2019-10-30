import moment from 'moment'

export default  {
  name: 'DropListItem',
  props: [
    'drop'
  ],
  data() {
    return {
    }
  },
  methods: {
    goToDropItem: function(id) {
      this.$router.push('/drops/' + id)
    }
  },
  watch: {
  },
  components: {
  },
  filters: {
    formatDate: function (date) {
      if (date) {
        let diffHours = moment().diff(date, 'hours')
        if (diffHours < 24) {
          if (diffHours > 1) {
            return diffHours + "h"
          }
          let diffMinutes = moment().diff(date, 'minutes')
          return diffMinutes + "m"
        } else if (diffHours > 24 * 365) {
            return moment(String(date)).format('D MMM').toLowerCase()
          } else {
            return moment(String(date)).format('D MMM YYYY').toLowerCase()
        }
      }
    },

    formatDistance: function(distance) {
      return distance + "m"
    }
  }
}