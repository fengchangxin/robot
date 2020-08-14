<template>
  <div>
    <x-header>任务详情</x-header>
    <div class="detail-wrap">
      <span>任务标题：<span class="detail-span">{{schedule.title}}</span></span>
      <p>完成时间：<span class="detail-span">{{schedule.completeDate}}</span></p>
      <p>任务类型：<span class="detail-span">{{schedule.scheduleTypeName}}</span></p>
      <p>关联任务：<span class="detail-span">{{schedule.bigScheduleTitle}}</span></p>
      <p>任务详情：<span class="detail-span">{{schedule.content}}</span></p>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: 'ScheduleDetail',
    components: {
      XHeader
    },
    data () {
      return {
        schedule: {
          scheduleId: 0,
          title: 'fsdf',
          content: 'asdf23444444444444444444444444333333333333333333333333333333',
          completeDate: '2020-08-14 22:00',
          scheduleTypeName: '232323',
          bigScheduleTitle: 'fsdfsdfsd'
        }
      }
    },
    mounted () {
      console.log(this.$route.query.scheduleId)
      this.schedule.scheduleId = this.$route.query.scheduleId
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
