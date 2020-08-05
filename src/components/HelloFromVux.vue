<template>
  <div>
    <div class="vux-demo">

    </div>
    <icon type="warn"></icon>
  </div>
</template>

<script>
import { Icon } from 'vux'

export default {
  components: {
    Icon
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
