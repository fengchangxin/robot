<template>
  <div class="schedule">
    <flexbox :gutter="0" class="schedule-head-date">
      <flexbox-item :span="1/10">
        <x-icon type="android-menu" size="30" @click="showHome" class="head-x-icon"></x-icon>
      </flexbox-item>
      <flexbox-item>
        <x-button plain @click.native="showDatePlugin" style="border: none">{{completionDate}}</x-button>
      </flexbox-item>

      <flexbox-item :span="1/10">
        <x-icon type="android-more-vertical" size="30" @click="showOperationMenu" class="head-x-icon"></x-icon>
      </flexbox-item>
    </flexbox>

    <tab>
      <tab-item selected @on-item-click="getScheduleList(0)">今日任务</tab-item>
      <tab-item @on-item-click="getScheduleList(1)">长远任务</tab-item>
      <tab-item @on-item-click="getScheduleList(2)">日常任务</tab-item>
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

    <toast v-model="toast.errorShow" :type="toast.type" :time="800" is-show-mask :text="toast.errorText" position="top"></toast>
  </div>
</template>

<script>
  import {
    XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem, Datetime, Actionsheet, Group, XButton,
    Popup, Toast, Confirm, ConfirmPlugin, dateFormat
  } from 'vux'
  import Vue from 'vue'
  import HomeMenu from '@/components/HomeMenu'
  import {post} from '../utils/api'
  import {API_PATH, PAGE_SIZE} from '../constants/Constant'

  Vue.use(ConfirmPlugin)
  export default {
    name: 'Schedule',
    inject: ['reload'],
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
      Toast,
      Confirm
    },
    data () {
      return {
        completionDate: dateFormat(new Date(), 'YYYY-MM-DD'),
        detailShow: false,
        operationShow: false,
        homeShow: false,
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        },
        detailMenu: {
          detail: '详情',
          completed: '完成',
          update: '修改',
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
      getScheduleList (scheduleType) {
        post(API_PATH.scheduleList, {
          pageIndex: 1,
          pageSize: PAGE_SIZE,
          scheduleType: scheduleType,
          completionDate: this.completionDate
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            this.scheduleList = resp.data.data.list
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        }).catch(resp => {
          this.toast.errorShow = true
          this.toast.errorText = '网络连接异常'
          this.toast.type = 'warn'
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
          case this.detailMenu.completed:
            this.showConfirmPlugin('完成操作提示', '', 0)
            break
          case this.detailMenu.update:
            this.$router.push({
              path: '/addSchedule',
              query: {
                scheduleId: this.scheduleId
              }
            })
            break
          case this.detailMenu.deleted:
            this.showConfirmPlugin('删除操作提示', '', 1)
            break
        }
      },
      showConfirmPlugin (title, content, type) {
        const _this = this
        this.$vux.confirm.show({
          title: title,
          content: content,
          onShow () {
          },
          onHide () {
          },
          onCancel () {
          },
          onConfirm () {
            switch (type) {
              // 完成任务
              case 0:
                post(API_PATH.scheduleComplete + '?scheduleId=' + _this.scheduleId).then(resp => {
                  if (resp.status === 200 && resp.data.code === 0) {
                    _this.toast.errorShow = true
                    _this.toast.errorText = '操作成功'
                    _this.toast.type = 'success'
                    _this.reload()
                  } else {
                    _this.toast.errorShow = true
                    _this.toast.errorText = resp.data.msg
                    _this.toast.type = 'warn'
                  }
                })
                break
              // 删除任务
              case 1:
                post(API_PATH.scheduleDelete + '?scheduleId=' + _this.scheduleId).then(resp => {
                  if (resp.status === 200 && resp.data.code === 0) {
                    _this.toast.errorShow = true
                    _this.toast.errorText = '操作成功'
                    _this.toast.type = 'success'
                    _this.reload()
                  } else {
                    _this.toast.errorShow = true
                    _this.toast.errorText = resp.data.msg
                    _this.toast.type = 'warn'
                  }
                })
                break
            }
          }
        })
      },
      showDatePlugin () {
        const _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: dateFormat(new Date(), 'YYYY-MM-DD'),
          onConfirm (val) {
            _this.completionDate = val
          },
          onShow () {
          },
          onHide () {
          }
        })
      }
    },
    mounted () {
      this.getScheduleList(0)
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
