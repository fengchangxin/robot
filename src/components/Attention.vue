<template>
    <div>
      <x-header>消息提醒</x-header>
      <tab>
        <tab-item selected >新消息</tab-item>
        <tab-item >所有消息</tab-item>
      </tab>
      <panel :list="attentionList" type="2"></panel>
      <popup v-model="attention.detailShow" position="bottom" max-height="50%">
        <group title="提醒标题">
          <span>{{attention.detail.title}}</span>
        </group>
        <group title="提醒详情">
          <span>{{attention.detail.desc}}</span>
        </group>
      </popup>
    </div>
</template>

<script>
  import {XHeader, Panel, Tab, TabItem} from 'vux'
  export default {
    name: 'Attention',
    components: {
      XHeader, Panel, Tab, TabItem
    },
    data () {
      return {
        attentionList: [{
          title: 'xdfasdfasdfaweqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
          desc: '<span style="color: aquamarine">ffffffffffqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef</span>'
        }],
        attention: {
          detailShow: false,
          detail: ''
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
