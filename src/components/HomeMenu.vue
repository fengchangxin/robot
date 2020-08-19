<template>
  <div>
    <group>
      <cell title="我的" is-link></cell>
      <cell title="消息" is-link>
        <div>
          <badge :text="msgNum"></badge>
        </div>
      </cell>
      <cell title="警示" is-link></cell>
    </group>
    <toast v-model="toast.errorShow" :type="toast.type" :time="800" is-show-mask :text="toast.errorText"
           position="top"></toast>
  </div>
</template>

<script>
  import {Group, Badge, Cell, Toast} from 'vux'
  import {getRequest} from '../utils/api'
  import {API_PATH} from '../constants/Constant'

  export default {
    name: 'HomeMenu',
    components: {
      Group,
      Badge,
      Cell,
      Toast
    },
    data () {
      return {
        msgNum: 0,
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        }
      }
    },
    methods: {
      getMsgNum () {
        getRequest(API_PATH.warningCount).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            this.msgNum = resp.data.data
          }
        })
      }
    },
    mounted () {
      this.getMsgNum()
    }
  }
</script>

<style scoped>

</style>
