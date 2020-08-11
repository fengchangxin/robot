<template>
  <div class="schedule">

    <x-header title="slot:overwrite-title" :right-options="{showMore: true}"
              @on-click-more="showToast">
      <x-icon slot="overwrite-left" type="navicon" size="35" @click="showToast"
              style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      <div slot="overwrite-title" class="schedule-head-date">
        <button-tab>
          <button-tab-item selected>A</button-tab-item>
          <button-tab-item>B</button-tab-item>
        </button-tab>
      </div>
    </x-header>

    <tab>
      <tab-item selected @on-item-click="onItemClick">今日任务</tab-item>
      <tab-item @on-item-click="onItemClick">长远任务</tab-item>
      <tab-item @on-item-click="onItemClick">日常任务</tab-item>
    </tab>

    <template>
      <div v-for="item in scheduleList" @click.prevent="showToast" class="schedule-content">
        <flexbox>
          <flexbox-item :span="3/4">
            <flexbox>
              <flexbox-item :span="3/4"><div class="flex-demo">2fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd3</div></flexbox-item>
              <flexbox-item><div class="flex-demo">fasddffffffffffffffffffffffffffffffffffffffffffffffffffffff</div></flexbox-item>
            </flexbox>
            <h1 class="flex-demo">33asdddddddddddddddddddddddddddddddddddddddddddddd33</h1>
          </flexbox-item>
          <flexbox-item><div class="flex-demo">fdfffffffffffffffffffffffffffffffffffffffffffffffffasdf</div></flexbox-item>
        </flexbox>
      </div>
    </template>
  </div>
</template>

<script>
  import {XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Flexbox, FlexboxItem} from 'vux'

  export default {
    name: 'Schedule',
    components: {
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Tab,
      TabItem,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        showPositionValue: false,
        scheduleList: [
          {
            title: '23423',
            desc: 'ddddddd',
            completeDate: '2020-12-12'
          },
          {
            title: '444444',
            desc: '2222222',
            completeDate: '2020-12-12'
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
      }
    }
  }
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
  .schedule-head-date {
    margin-top: 5px;
  }
  .schedule-title {
    width: 80%;
  }
  .schedule-content {
    margin-top: 2px;
    background-color: #fbf9fe;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .schedule {
    background-color: aliceblue;
  }
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  background-clip: padding-box;
}
</style>
