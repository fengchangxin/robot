<template>
  <div>

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

    <panel :list="scheduleList" @on-click-item="showToast"></panel>
  </div>
</template>

<script>
  import {XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, Panel} from 'vux'

  export default {
    name: 'Schedule',
    components: {
      XHeader,
      ButtonTab,
      ButtonTabItem,
      Tab,
      TabItem,
      Panel
    },
    data () {
      return {
        showPositionValue: false,
        scheduleList: [
          {
            title: '123',
            desc: 'fdfd',
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

<style scoped>
  .schedule-head-date {
    margin-top: 5px;
  }
</style>
