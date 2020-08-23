<template>
  <div>
    <group>
      <cell title="我的" is-link></cell>
      <cell title="消息" is-link @click.native="goto('/attention')">
        <div>
          <badge :text="attentionNum"></badge>
        </div>
      </cell>
      <cell title="警示" is-link @click.native="goto('/warning')"></cell>
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
        attentionNum: 0,
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        }
      }
    },
    methods: {
      getMsgNum () {
        getRequest(API_PATH.attentionCount).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            this.attentionNum = resp.data.data
          }
        })
      },
      goto (url) {
        this.$router.push(url)
      }
    },
    mounted () {
      this.getMsgNum()
    }
  }
</script>

<style scoped>

</style>
