<template>
  <div class="schedule">
    <flexbox :gutter="0" class="schedule-head-date">
      <flexbox-item :span="1/10">
        <x-icon type="ios-ionic-outline" size="30"></x-icon>
      </flexbox-item>
      <flexbox-item>
        <x-button @click="showDatePlugin">{{date}}</x-button>
      </flexbox-item>

      <flexbox-item :span="1/10">
        <x-icon type="ios-arrow-back" size="30" @click="showOperationMenu"></x-icon>
      </flexbox-item>
    </flexbox>

    <tab>
      <tab-item selected @on-item-click="scheduleTypeClick(0)">今日任务</tab-item>
      <tab-item @on-item-click="scheduleTypeClick(1)">长远任务</tab-item>
      <tab-item @on-item-click="scheduleTypeClick(2)">日常任务</tab-item>
    </tab>

    <template>
      <div v-for="item in scheduleList" class="schedule-content" @click="showDetailMenu(item.scheduleId)">
        <flexbox :gutter="0">
          <flexbox-item>
            <flexbox :gutter="0">
              <flexbox-item>
                <div class="title">{{item.title}}</div>
              </flexbox-item>
              <flexbox-item :span="1/4">
                <div class="completed-date">{{item.completeDate}}</div>
              </flexbox-item>
            </flexbox>
            <div class="detail">{{item.content}}</div>
          </flexbox-item>
          <flexbox-item :span="1/9">
            <div class="schedule-status" :style="{'color':item.isCompleted ? 'green' : 'red'}">
              <span v-text="item.isCompleted ? '完成' : '进行中'"></span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>

      <actionsheet v-model="operationShow" :menus="operationMenu" theme="android"
                   @on-click-menu="operationItemClick">
      </actionsheet>
      <actionsheet v-model="detailShow" :menus="detailMenu" theme="android"
                   @on-click-menu="detailItemClick">
      </actionsheet>
    </template>
  </div>
</template>

<script>
  import {
    XHeader,
    ButtonTab,
    ButtonTabItem,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Datetime,
    Actionsheet,
    Group,
    XButton
  } from 'vux'

  export default {
    name: 'Schedule',
    components: {
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem,
      Datetime,
      Actionsheet,
      Group,
      XButton
    },
    data () {
      return {
        showPositionValue: false,
        date: '2020-08-12',
        detailShow: false,
        operationShow: false,
        detailMenu: {
          detail: '详情',
          completed: '完成',
          deleted: '删除'
        },
        operationMenu: {
          add: '新增'
        },
        scheduleList: [
          {
            scheduleId: 1,
            title: '23423',
            content: 'ddddddd',
            completeDate: '2020-12-12',
            isCompleted: false,
            scheduleTypeName: '每日任务',
            bigScheduleTitle: 'dddddddddd'
          },
          {
            scheduleId: 2,
            title: '444444',
            content: '2222222',
            completeDate: '12:12:12',
            isCompleted: true,
            scheduleTypeName: '日常任务',
            bigScheduleTitle: 'ffffffffffff'
          }
        ],
        scheduleId: 0
      }
    },
    methods: {
      showToast () {
        console.log('sfasd')
      },
      showDetailMenu (id) {
        this.detailShow = true
        this.scheduleId = id
      },
      showOperationMenu () {
        this.operationShow = true
      },
      scheduleTypeClick (scheduleType) {
        console.log(scheduleType)
      },
      operationItemClick (key, item) {
        if (this.operationMenu.add === item) {
          this.$router.push('/addSchedule')
        }
      },
      detailItemClick (key, item) {
        console.log(item)
        switch (item) {
          case this.detailMenu.detail:
            this.$router.push({
              path: '/scheduleDetail',
              query: {
                scheduleId: this.scheduleId
              }
            })
            break
        }
      },
      showDatePlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH',
          value: '2017-05-20 18',
          onConfirm (val) {
            console.log('plugin confirm', val)
            this.date = val
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
    },
    mounted () {
      this.scheduleTypeClick(0)
    }
  }
</script>

<style scoped lang="less">
  .schedule-head-date {
    height: 100px;
    text-align: center;
  }

  .schedule-content {
    margin-top: 2px;
    background-color: white;
  }

  .completed-date {
    text-align: center;
    font-size: x-small;
  }

  .title {
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .detail {
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    color: gray;
  }

  .schedule {
    background-color: aliceblue;
  }

  .schedule-status {
    text-align: center;
    font-size: 10px;
  }
</style>
