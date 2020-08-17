<template>
    <group>
      <cell title="我的" is-link></cell>
      <cell title="消息" is-link>
        <div>
          <badge :text="msgNum"></badge>
        </div>
      </cell>
    </group>
</template>

<script>
  import {Group, Badge, Cell} from 'vux'
  export default {
    name: 'HomeMenu',
    components: {
      Group,
      Badge,
      Cell
    },
    data () {
      return {
        value: '',
        msgNum: 0
      }
    },
    methods: {
      getMsgNum () {
        this.msgNum = 0
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>
