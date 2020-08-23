<template>
  <div>
    <x-header>警示语<a slot="right" @click="addWarning">新增</a></x-header>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
      <div>
        <panel type="4" :list="warningList" @on-click-item="onItemClick" class="warning-list"></panel>
      </div>
    </scroller>
    <toast v-model="toast.errorShow" :type="toast.type" :time="800" is-show-mask :text="toast.errorText"
           position="top"></toast>

    <confirm v-model="warningInputShow" show-input title="输入警示语" :input-attrs="{type: 'text'}"
             ref="confirm" @on-confirm="onWarningConfirm">
    </confirm>

    <actionsheet v-model="deleted.show" :menus="deleted.menu" theme="android"
                 @on-click-menu="deletedWarning">
    </actionsheet>
  </div>
</template>

<script>
  import {XHeader, Panel, Scroller, Toast, Confirm, Actionsheet} from 'vux'
  import {API_PATH, PAGE_SIZE} from '../constants/Constant'
  import {post} from '../utils/api'

  export default {
    name: 'Warning',
    inject: ['reload'],
    components: {
      XHeader, Panel, Scroller, Toast, Confirm, Actionsheet
    },
    data () {
      return {
        onFetching: false,
        pageIndex: 1,
        toast: {
          errorShow: false,
          errorText: '',
          type: 'warn'
        },
        warningList: [],
        warningInputShow: false,
        warning: {},
        deleted: {
          show: false,
          menu: {
            deleted: '删除'
          }
        }
      }
    },
    methods: {
      //新增显示弹窗
      addWarning () {
        this.warningInputShow = true
      },
      //列表点击
      onItemClick (item) {
        console.log(item)
        this.warning = item
        this.deleted.show = true
      },
      //删除
      deletedWarning () {
        const _this = this
        this.$vux.confirm.show({
          title: '删除警示语',
          content: _this.warning.warning,
          onShow () {
          },
          onHide () {
          },
          onCancel () {
          },
          onConfirm () {
            post(API_PATH.warningDelete, {
              warningId: _this.warning.warningId
            }).then(resp => {
              if (resp.status === 200 && resp.data.code ===0) {
                _this.toast.errorShow = true
                _this.toast.errorText = '删除成功'
                _this.toast.type = 'success'
                _this.reload()
              } else {
                _this.toast.errorShow = true
                _this.toast.errorText = resp.data.msg
                _this.toast.type = 'warn'
              }
            })
          }
        })
      },
      //确认新增
      onWarningConfirm (warning) {
        console.log(warning)
        post(API_PATH.warningSave, {
          warning: warning
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            this.toast.errorShow = true
            this.toast.errorText = '保存成功'
            this.toast.type = 'success'
            this.reload()
          } else {
            this.toast.errorShow = true
            this.toast.errorText = resp.data.msg
            this.toast.type = 'warn'
          }
        })
      },
      //获取列表
      getWarningList (pageIndex) {
        post(API_PATH.warningList, {
          pageIndex: pageIndex,
          pageSize: PAGE_SIZE
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            let list = resp.data.data.list
            if (list.length > 0) {
              this.pageIndex = pageIndex
              for (let i = 0; i < list.length; i++) {
                this.warningList.push({
                  warningId: list[i].warningId,
                  warning: list[i].warning,
                  desc: list[i].warning
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
      //下滑加载
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.pageIndex += 1
            this.getWarningList(this.pageIndex)
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      }
    },
    mounted () {
      this.getWarningList(1)
    }
  }
</script>

<style scoped>
  .warning-list {
    word-wrap: break-word;
    word-break: normal;
  }

</style>
