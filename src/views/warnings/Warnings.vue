<template>
  <div>
    <Table stripe :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import { NewWebSocket } from '@/util/websocket'
export default {
  data() {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '任务名',
          key: 'task_name',
        },
        {
          title: '警告时的数据',
          key: 'cur_value',
        },
        {
          title: '阈值',
          key: 'threshold',
        },
        {
          title: '描述',
          key: 'description',
        },
        {
          title: '发生时间',
          key: 'ctime',
        },
        {
          title: '是否处理',
          key: 'handled',
        },
      ],
      data: [],
    }
  },
  mounted() {
    this.initWS()
  },
  methods: {
    initWS() {
      this.ws = NewWebSocket('/warnings')
      this.ws.onopen = () => {}
      this.ws.onclose = () => {
        this.$store.commit('updateConnect', false)
      }
      this.ws.onmessage = evt => {
        this.$store.commit('updateConnect', true)

        let json = JSON.parse(evt.data)
        this.data = json.warnings
        this.data.forEach(item => {
          item.ctime = new Date(item.ctime).toLocaleString()
          item.handled = item.handled === 0 ? '未处理' : '已处理'
        })
      }
    },
  },
  beforeDestroy() {
    this.ws.close()
  },
}
</script>

<style lang="scss" scoped></style>
