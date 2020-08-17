<template>
    <group>
      <x-button>我的</x-button>
    </group>
</template>

<script>
  import {Group, XButton} from 'vux'
  export default {
    name: 'HomeMenu',
    components: {
      Group,
      XButton
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
