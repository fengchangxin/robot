<template>
  <div>
    <x-header>任务详情</x-header>
    <div class="detail-wrap">
      <span>任务标题：<span class="detail-span">{{schedule.title}}</span></span>
      <p>完成时间：<span class="detail-span">{{schedule.completionDate}}</span></p>
      <p>任务类型：<span class="detail-span">{{schedule.scheduleTypeName}}</span></p>
      <p>关联任务：<span class="detail-span">{{schedule.bigScheduleTitle}}</span></p>
      <p>任务详情：<span class="detail-span">{{schedule.content}}</span></p>
    </div>
    <toast v-model="toast.errorShow" :type="toast.type" :time="1000" is-show-mask :text="toast.errorText" position="top"></toast>
  </div>
</template>

<script>
  import {XHeader, Toast} from 'vux'
  import {getRequest} from '../utils/api'
  import {API_PATH} from '../constants/Constant'

  export default {
    name: 'ScheduleDetail',
    components: {
      XHeader,
      Toast
    },
    data () {
      return {
        schedule: {},
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        }
      }
    },
    mounted () {
      getRequest(API_PATH.scheduleDetail + '?scheduleId=' + this.$route.query.scheduleId).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          this.schedule = resp.data.data
        } else {
          this.toast.errorShow = true
          this.toast.errorText = resp.data.msg
          this.toast.type = 'warn'
        }
      })
    }
  }
</script>

<style scoped>
  .detail-wrap {
    word-wrap: break-word;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .detail-span {
    color: gray;
  }

</style>
