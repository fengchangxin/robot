<template>
  <div class="schedule">
    <flexbox :gutter="0" class="schedule-head-date">
      <flexbox-item :span="1/10">
        <x-icon type="android-menu" size="30" @click="showHome" class="head-x-icon"></x-icon>
      </flexbox-item>
      <flexbox-item>
        <x-button plain @click.native="showDatePlugin" style="border: none">{{date}}</x-button>
      </flexbox-item>

      <flexbox-item :span="1/10">
        <x-icon type="android-more-vertical" size="30" @click="showOperationMenu" class="head-x-icon"></x-icon>
      </flexbox-item>
    </flexbox>

    <tab>
      <tab-item selected @on-item-click="scheduleTypeClick(0)">今日任务</tab-item>
      <tab-item @on-item-click="scheduleTypeClick(1)">长远任务</tab-item>
      <tab-item @on-item-click="scheduleTypeClick(2)">日常任务</tab-item>
    </tab>

    <popup v-model="homeShow" position="left">
      <div style="width:150px;">
        <HomeMenu/>
      </div>
    </popup>


    <actionsheet v-model="operationShow" :menus="operationMenu" theme="android"
                 @on-click-menu="operationItemClick">
    </actionsheet>

    <template>
      <div v-for="item in scheduleList" class="schedule-content" @click="showDetailMenu(item.scheduleId)">
        <flexbox :gutter="0">
          <flexbox-item>
            <flexbox :gutter="0">
              <flexbox-item>
                <div class="title">{{item.title}}</div>
              </flexbox-item>
              <flexbox-item :span="1/4">
                <div class="completed-date">{{item.completionDate}}</div>
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

      <actionsheet v-model="detailShow" :menus="detailMenu" theme="android"
                   @on-click-menu="detailItemClick">
      </actionsheet>
    </template>

    <toast v-model="errorShow" type="warn" :time="800" is-show-mask :text="errorText" position="top"></toast>
  </div>
</template>

<script>
  import {
    XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem, Datetime, Actionsheet, Group, XButton,
    Popup, Toast
  } from 'vux'
  import HomeMenu from '@/components/HomeMenu'
  import {post} from '../utils/api'

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
      XButton,
      Popup,
      HomeMenu,
      Toast
    },
    data () {
      return {
        date: '2020-08-12',
        detailShow: false,
        operationShow: false,
        homeShow: false,
        errorShow: false,
        errorText: '',
        detailMenu: {
          detail: '详情',
          completed: '完成',
          deleted: '删除'
        },
        operationMenu: {
          add: '新增'
        },
        scheduleList: [],
        scheduleId: 0
      }
    },
    methods: {
      showDetailMenu (id) {
        this.detailShow = true
        this.scheduleId = id
      },
      showOperationMenu () {
        this.operationShow = true
      },
      showHome () {
        this.homeShow = true
      },
      scheduleTypeClick (scheduleType) {
        post('/robotWeb/schedule/list', {
          pageIndex: 1,
          pageSize: 1000,
          scheduleType: scheduleType
        }).then(resp => {
          if (resp.status == 200 && resp.data.code == 0) {
            console.log(resp.data.data)
            this.scheduleList = resp.data.data.list
          }
        }, resp => {
          this.errorShow = true
          this.errorText = resp.data.msg
        }).catch(resp => {
          this.errorShow = true
          this.errorText = '网络连接异常'
        })
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
          case this.completed:
            break
          case this.deleted:
        }
      },

      showDatePlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: '2017-05-20',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      }
    },
    mounted () {
      this.scheduleTypeClick(0)
    }
  }
</script>

<style scoped lang="less">
  .schedule-head-date {
    text-align: center;
  }

  .schedule-content {
    margin-top: 2px;
    background-color: white;
    box-shadow: 2px 2px 5px #bbb;
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

  .head-x-icon {
    margin: auto;
    display: block;
    fill: gray;
  }
</style>
