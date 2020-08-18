<template>
  <div>
    <x-header>添加任务</x-header>
    <group title="输入标题：">
      <x-input v-model="formData.title" :max="100" :min="1"></x-input>
    </group>
    <group>
      <datetime title="完成时间" v-model="formData.completionDate" format="YYYY-MM-DD HH:mm"></datetime>
      <popup-radio title="任务类型" :options="scheduleTypeList" v-model="formData.scheduleType"></popup-radio>
    </group>
    <group>
      <popup-radio title="关联长远任务" :options="bigScheduleList" v-model="formData.bigScheduleId"></popup-radio>
    </group>
    <group title="输入任务详情：">
      <x-textarea v-model="formData.content" :max="500"></x-textarea>
    </group>
    <box gap="10px 10px">
      <x-button @click.native="submitSchedule">提交</x-button>
      <x-button type="warn" @click.native="reset">清空</x-button>
    </box>
    <toast v-model="toast.errorShow" :type="toast.type" :time="1000" is-show-mask :text="toast.errorText" position="top"></toast>
  </div>
</template>

<script>
  import {XHeader, XInput, Group, Datetime, PopupRadio, XTextarea, XButton, Box, dateFormat, Toast} from 'vux'
  import {getRequest, post} from '../utils/api'
  import {PAGE_SIZE, API_PATH} from '../constants/Constant'

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
      Box,
      Toast
    },
    data () {
      return {
        formData: {
          scheduleId: 0,
          title: '',
          content: '',
          completionDate: dateFormat(new Date(), 'YYYY-MM-DD HH:mm'),
          scheduleType: 0,
          bigScheduleId: 0
        },
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
        bigScheduleList: [{
          key: 0,
          value: ''
        }],
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        }
      }
    },
    methods: {
      submitSchedule () {
        console.log(this.formData.completionDate)
        if (this.formData.scheduleId != null && this.formData.scheduleId > 0) {
          post(API_PATH.scheduleUpdate, this.formData).then(resp => {
            if (resp.status === 200 && resp.data.code === 0) {
              this.toast.errorShow = true
              this.toast.errorText = '修改成功'
              this.toast.type = 'success'
            } else {
              this.toast.errorShow = true
              this.toast.errorText = resp.data.msg
              this.toast.type = 'warn'
            }
          })
        } else {
          post(API_PATH.scheduleSave, this.formData).then(resp => {
            if (resp.status === 200 && resp.data.code === 0) {
              this.toast.errorShow = true
              this.toast.errorText = '保存成功'
              this.toast.type = 'success'
            } else {
              this.toast.errorShow = true
              this.toast.errorText = resp.data.msg
              this.toast.type = 'warn'
            }
          })
        }
      },
      reset () {
        this.formData.title = ''
        this.formData.content = ''
        this.formData.completionDate = dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
        this.formData.scheduleType = 0
        this.formData.bigScheduleId = 0
      },
      getBigScheduleList () {
        post(API_PATH.scheduleList, {
          pageIndex: 1,
          pageSize: PAGE_SIZE,
          isCompleted: false,
          scheduleType: 1
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            let bigScheduleList = resp.data.data.list
            for (let i = 0; i < bigScheduleList.length; i++) {
              let bigScheduleItem = {}
              bigScheduleItem['key'] = bigScheduleList[i].scheduleId
              bigScheduleItem['value'] = bigScheduleList[i].title
              this.bigScheduleList[i] = bigScheduleItem
            }
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        }).catch(resp => {
          console.log(resp)
          this.toast.errorShow = true
          this.toast.errorText = '网络连接异常'
          this.toast.type = 'warn'
        })
      }
    },
    mounted () {
      if (this.$route.query.scheduleId != null) {
        getRequest(API_PATH.scheduleDetail + '?scheduleId=' + this.$route.query.scheduleId).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            this.formData = resp.data.data
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        })
      }
      this.getBigScheduleList()
    }
  }
</script>

<style scoped>


</style>
