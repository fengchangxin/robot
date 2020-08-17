import Vue from 'vue'
import Router from 'vue-router'
import Schedule from '@/components/Schedule'
import ScheduleAdd from '@/components/ScheduleAdd'
import ScheduleDetail from '@/components/ScheduleDetail'
import { DatetimePlugin } from 'vux'

Vue.use(Router)
Vue.use(DatetimePlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/addSchedule',
      name: 'ScheduleAdd',
      component: ScheduleAdd
    },
    {
      path: '/scheduleDetail',
      name: 'ScheduleDetail',
      component: ScheduleDetail
    }
  ]
})
