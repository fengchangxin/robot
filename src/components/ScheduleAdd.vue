<template>
  <div>
    <x-header>添加任务</x-header>
    <group title="输入标题：">
      <x-input v-model="title" :max="100" :min="1"></x-input>
    </group>
    <group>
      <datetime v-model="completionDate" format="YYYY-MM-DD HH:mm" title="完成时间"></datetime>
    </group>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, Datetime} from 'vux'

  export default {
    name: 'ScheduleAdd',
    components: {
      XHeader,
      XInput,
      Group,
      Datetime
    },
    data () {
      return {
        title: '',
        content: '',
        completionDate: '2020-08-14 22:00',
        scheduleType: 0,
        bigScheduleId: 0
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
