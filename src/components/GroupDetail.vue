<template>
  <div>
    <div v-for="item in list">
    <group  :title="item.title">
      <div class="group-content">
        {{item.content}}
      </div>
    </group>
    </div>
  </div>
</template>

<script>
  import {Group} from 'vux'

  export default {
    name: 'GroupDetail',
    components: {
      Group
    },
    props: {
      list: Array
    }
  }
</script>

<style scoped>
  .group-content {
    padding-left: 15px;
    padding-right: 15px;
    word-wrap:break-word;
    word-break:normal;
  }

</style>
