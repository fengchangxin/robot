<template>
  <div>
    <x-header>添加任务</x-header>
    <group title="输入标题：">
      <x-input v-model="title" :max="100" :min="1"></x-input>
    </group>
    <group>
      <datetime title="完成时间" v-model="completionDate" format="YYYY-MM-DD HH:mm"></datetime>
      <popup-radio title="任务类型" :options="scheduleTypeList" v-model="scheduleType"></popup-radio>
    </group>
    <group>
      <popup-radio title="关联长远任务" :options="bigScheduleList" v-model="bigScheduleId"></popup-radio>
    </group>
    <group title="输入任务详情：">
      <x-textarea v-model="content" :max="500"></x-textarea>
    </group>
    <box gap="10px 10px">
      <x-button @click.native="submitSchedule">提交</x-button>
      <x-button type="warn" @click.native="reset">清空</x-button>
    </box>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, Datetime, PopupRadio, XTextarea, XButton, Box} from 'vux'

  export default {
    name: 'ScheduleAdd',
    components: {
      XHeader,
      XInput,
      Group,
      Datetime,
      PopupRadio,
      XTextarea,
      XButton,
      Box
    },
    data () {
      return {
        title: '',
        content: '',
        completionDate: '2020-08-14 22:00',
        scheduleType: 0,
        bigScheduleId: 0,
        scheduleTypeList: [
          {
            key: 0,
            value: '今日任务'
          },
          {
            key: 1,
            value: '长远任务'
          },
          {
            key: 2,
            value: '日常任务'
          }
        ],
        bigScheduleList: [
          {
            key: 1,
            value: '长度过长需要处理'
          }
        ]
      }
    },
    methods: {
      submitSchedule () {
        console.log(this.scheduleType)
      },
      reset () {
        this.title = ''
        this.content = ''
        this.completionDate = '2020-08-14 22:00'
        this.scheduleType = 0
        this.bigScheduleId = 0
      }
    }
  }
</script>

<style scoped>


</style>
