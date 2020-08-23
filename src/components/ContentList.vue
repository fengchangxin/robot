<template>
  <div>
    <div v-for="item in list" class="list" @click.prevent="onItemClick(item)">
      <flexbox :gutter="0">
        <flexbox-item>
          <flexbox :gutter="0">
            <flexbox-item>
              <div class="title">{{item.title}}</div>
            </flexbox-item>
            <flexbox-item :span="1/4">
              <div class="date">{{item.date}}</div>
            </flexbox-item>
          </flexbox>
          <div class="content">{{item.content}}</div>
        </flexbox-item>
        <flexbox-item :span="1/9">
          <span v-html="item.status" class="status"></span>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem} from 'vux'

  export default {
    name: 'ContentList',
    components: {
      Flexbox, FlexboxItem
    },
    props: {
      list: Array
    },
    methods: {
      onItemClick (item) {
        this.$emit('on-click-item', item)
      }
    }
  }
</script>

<style scoped>
  .list {
    margin-top: 2px;
    background-color: white;
    box-shadow: 2px 2px 5px #bbb;
  }

  .date {
    text-align: center;
    font-size: x-small;
  }

  .title {
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .content {
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    color: gray;
  }

  .status {
    text-align: center;
    font-size: 10px;
  }

</style>
