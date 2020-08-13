<template>
  <div class="schedule">

    <x-header title="slot:overwrite-title" :right-options="{showMore: true}"
              @on-click-more="showToast" style="background-color:darkgray;">
      <x-icon slot="overwrite-left" type="navicon" size="35" @click="showToast"
              style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <div slot="overwrite-title" class="schedule-head-date">
        <datetime v-model="date"></datetime>
      </div>
    </x-header>

    <tab>
      <tab-item selected @on-item-click="onItemClick">今日任务</tab-item>
      <tab-item @on-item-click="onItemClick">长远任务</tab-item>
      <tab-item @on-item-click="onItemClick">日常任务</tab-item>
    </tab>

    <template>
      <div v-for="item in scheduleList" @click.prevent="showDownMenu" class="schedule-content">
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

        <actionsheet v-model="detailShow" :menus="detailMenu" theme="android" @on-click-menu="onItemClick"></actionsheet>
      </div>
    </template>
  </div>
</template>

<script>
  import {XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem, Datetime, Actionsheet} from 'vux'

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
      Actionsheet
    },
    data () {
      return {
        showPositionValue: false,
        date: '2020-08-12',
        detailShow: false,
        detailMenu: {
          menu1: '详情',
          menu2: '完成',
          menu3: '删除'
        },
        scheduleList: [
          {
            title: '23423',
            content: 'ddddddd',
            completeDate: '2020-12-12',
            isCompleted: false,
            scheduleType: false
          },
          {
            title: '444444',
            content: '2222222',
            completeDate: '12:12:12',
            isCompleted: true,
            scheduleType: true
          }
        ]
      }
    },
    methods: {
      showToast () {
        console.log('sfasd')
      },
      onItemClick () {
        console.log('fffff')
      },
      showDownMenu () {
        this.detailShow = true
      },
      closeDownMenu () {
        this.detailShow = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .schedule-head-date {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .schedule-title {
    width: 80%;
  }

  .schedule-content {
    margin-top: 2px;
    background-color: #fbf9fe;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .x-icon-div {
    text-align: center;
  }

  .schedule-status {
    text-align: center;
    font-size: 10px;
  }

  .down-x-icon {
    display: block;
    fill: darkgray;
  }
</style>
