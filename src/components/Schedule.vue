<template>
  <div>
    <div>
      <flexbox :gutter="0" class="schedule-head-date">
        <flexbox-item :span="1/10">
          <x-icon type="android-menu" size="30" @click="showHome" class="head-x-icon"></x-icon>
        </flexbox-item>
        <flexbox-item>
          <x-button plain @click.native="showDatePlugin" style="border: none">
            <span style="color: #fbf9fe">{{completionDate}}</span>
          </x-button>
        </flexbox-item>

        <flexbox-item :span="1/10">
          <x-icon type="android-more-vertical" size="30" @click="showOperationMenu" class="head-x-icon"></x-icon>
        </flexbox-item>
      </flexbox>

      <tab>
        <tab-item selected @on-item-click="tabItemClick(0)">今日任务</tab-item>
        <tab-item @on-item-click="tabItemClick(1)">长远任务</tab-item>
        <tab-item @on-item-click="tabItemClick(2)">日常任务</tab-item>
      </tab>
    </div>

    <popup v-model="homeShow" position="left">
      <div style="width:150px;">
        <HomeMenu/>
      </div>
    </popup>

    <actionsheet v-model="operationShow" :menus="operationMenu" theme="android"
                 @on-click-menu="operationItemClick">
    </actionsheet>

    <template>
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
        <div>
          <ContentList :list="scheduleList" @on-click-item="showDetailMenu"></ContentList>
        </div>
      </scroller>
      <actionsheet v-model="detailShow" :menus="detailMenu" theme="android"
                   @on-click-menu="detailItemClick">
      </actionsheet>
    </template>

    <toast v-model="toast.errorShow" :type="toast.type" :time="800" is-show-mask :text="toast.errorText"
           position="top"></toast>
  </div>
</template>

<script>
  import {
    XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem, Datetime, Actionsheet, Group, XButton,
    Popup, Toast, Confirm, ConfirmPlugin, dateFormat, Scroller
  } from 'vux'
  import Vue from 'vue'
  import HomeMenu from '@/components/HomeMenu'
  import ContentList from '@/components/ContentList'
  import {post} from '../utils/api'
  import {API_PATH, PAGE_SIZE} from '../constants/Constant'

  Vue.use(ConfirmPlugin)
  export default {
    name: 'Schedule',
    inject: ['reload'],
    components: {
      XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem, Datetime, Actionsheet, Group,
      XButton, Popup, HomeMenu, Toast, Confirm, ContentList, Scroller
    },
    data () {
      return {
        completionDate: dateFormat(new Date(), 'YYYY-MM-DD'),
        detailShow: false,
        operationShow: false,
        homeShow: false,
        onFetching: false,
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
        scheduleId: 0,
        pageIndex: 1,
        scheduleType: 0
      }
    },
    methods: {
      showDetailMenu (item) {
        this.detailShow = true
        this.scheduleId = item.scheduleId
      },
      showOperationMenu () {
        this.operationShow = true
      },
      showHome () {
        this.homeShow = true
      },
      tabItemClick (scheduleType) {
        this.scheduleList = []
        this.pageIndex = 1
        this.getScheduleList(this.pageIndex, scheduleType)
      },
      getScheduleList (pageIndex, scheduleType) {
        post(API_PATH.scheduleList, {
          pageIndex: pageIndex,
          pageSize: PAGE_SIZE,
          scheduleType: scheduleType,
          completionDate: this.completionDate
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            let list = resp.data.data.list
            if (list.length > 0) {
              let status = ''
              for (let i = 0; i < list.length; i++) {
                if (list[i].isCompleted) {
                  status = '<span style="color: #1AAD19">已完成</span>'
                } else {
                  status = '<span style="color: red">进行中</span>'
                }
                this.scheduleList.push({
                  title: list[i].title,
                  content: list[i].content,
                  date: list[i].completionDate,
                  status: status,
                  scheduleId: list[i].scheduleId
                })
              }
            } else {
              if (this.pageIndex > 1) {
                this.pageIndex -= 1
              }
              this.toast.errorShow = true
              this.toast.errorText = '没有数据了'
              this.toast.type = 'text'
            }
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        })
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.pageIndex += 1
            this.getScheduleList(this.pageIndex, this.scheduleType)
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
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
            _this.scheduleList = []
            _this.getScheduleList(1, _this.scheduleType)
          },
          onShow () {
          },
          onHide () {
          }
        })
      }
    },
    mounted () {
      this.getScheduleList(1, 0)
    }
  }
</script>

<style scoped lang="less">
  .schedule-head-date {
    text-align: center;
    background-color: #35495e;
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
