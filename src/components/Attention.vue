<template>
  <div>
    <x-header>消息提醒</x-header>
    <tab>
      <tab-item selected @on-item-click="tabItemClick(false)">新消息</tab-item>
      <tab-item @on-item-click="tabItemClick(null)">所有消息</tab-item>
    </tab>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
      <div>
        <ContentList :list="attentionList" @on-click-item="onItemClick"></ContentList>
      </div>
    </scroller>
    <toast v-model="toast.errorShow" :type="toast.type" :time="800" is-show-mask :text="toast.errorText"
           position="top"></toast>
    <popup height="50%" max-height="50%" v-model="popup.show" @on-hide="onItemClose">
      <GroupDetail :list="popup.attentionDetail"></GroupDetail>
    </popup>
  </div>
</template>

<script>
  import {XHeader, Panel, Tab, TabItem, Popup, Group, Scroller, Toast} from 'vux'
  import ContentList from '@/components/ContentList'
  import GroupDetail from '@/components/GroupDetail'
  import {post} from '../utils/api'
  import {API_PATH, PAGE_SIZE} from '../constants/Constant'

  export default {
    name: 'Attention',
    components: {
      XHeader, Panel, Tab, TabItem, Popup, Group, Scroller, ContentList, Toast, GroupDetail
    },
    data () {
      return {
        attentionList: [],
        onFetching: false,
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        },
        pageIndex: 1,
        isRead: false,
        popup: {
          attentionDetail: [],
          show: false
        }
      }
    },
    methods: {
      onItemClick (item) {
        this.popup.attentionDetail.push({
          title: '提醒标题',
          content: item.title
        })
        this.popup.attentionDetail.push({
          title: '提醒类型',
          content: item.date
        })
        this.popup.attentionDetail.push({
          title: '提醒内容',
          content: item.content
        })
        this.popup.show = true
        post(API_PATH.attentionRead, {
          attentionId: item.attentionId
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            item.status = '已读'
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        })
      },
      onItemClose () {
        this.popup.attentionDetail = []
      },
      tabItemClick (isRead) {
        this.attentionList = []
        this.pageIndex = 1
        this.getAttentionList(this.pageIndex, isRead)
      },
      getAttentionList (pageIndex, isRead) {
        post(API_PATH.attentionList, {
          pageIndex: pageIndex,
          pageSize: PAGE_SIZE,
          isRead: isRead
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            let list = resp.data.data.list
            if (list.length > 0) {
              this.pageIndex = pageIndex
              let read = '已读'
              for (let i = 0; i < list.length; i++) {
                if (!list[i].isRead) {
                  read = '未读'
                }
                this.attentionList.push({
                  title: list[i].attentionTitle,
                  content: list[i].attentionContent,
                  date: list[i].attentionTypeName,
                  status: read,
                  attentionId: list[i].attentionId
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
            this.toast.type = 'text'
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
            this.getAttentionList(this.pageIndex, this.isRead)
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      }
    },
    mounted () {
      this.getAttentionList(1, false)
    }
  }
</script>

<style scoped>

</style>
