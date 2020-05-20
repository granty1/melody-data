<template>
  <div>
    <Table stripe :columns="columns" :data="data" @on-filter-change="filterChange">
      <template slot-scope="{ row }" slot="handled">
        <Button :type="row.handled === 0 ? 'error' : 'info'" size="small" ghost>
          {{ row.handled === 0 ? '未处理' : '已处理' }}
        </Button>
      </template>
      <template slot-scope="{ row }" slot="isHandled">
        <Checkbox v-model="row.isHandled" @on-change="handle(row)"></Checkbox>
      </template>
      <template slot="footer">
        <Page
          :total="total"
          show-total
          style="text-align: center"
          :page-size="pageSize"
          @on-change="changePage"
          :current="1"
        />
      </template>
    </Table>
  </div>
</template>

<script>
import { NewWebSocket } from '@/util/websocket'
import { changeWarningStatus } from '@/api'
import { ConvertNumberToLabel, ConvertNanoTime } from '@/util/number'
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
          filters: [
            {
              label: 'numgc',
              value: 'numgc',
            },
            {
              label: 'sys',
              value: 'sys',
            },
            {
              label: 'heapsys',
              value: 'heapsys',
            },
            {
              label: 'stacksys',
              value: 'stacksys',
            },
            {
              label: 'mcachesys',
              value: 'mcachesys',
            },
            {
              label: 'mspansys',
              value: 'mspansys',
            },
            {
              label: 'size',
              value: 'size',
            },
            {
              label: 'time',
              value: 'time',
            },
          ],
          filterMultiple: true,
          filterMethod(value, row) {
            if (value === row.task_name) {
              return row.task_name
            }
          },
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
          slot: 'handled',
          filters: [
            {
              label: '已处理',
              value: 1,
            },
            {
              label: '未处理',
              value: 0,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.handled === '已处理'
            } else if (value === 0) {
              return row.handled === '未处理'
            }
          },
        },
        {
          title: '',
          slot: 'isHandled',
          key: 'isHandled',
        },
      ],
      data: [],
      pageSize: 10,
      total: 0,
      ws: {},
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
          item.isHandled = item.handled === 0 ? false : true

          if (item.task_name === 'time') {
            item.cur_value = ConvertNanoTime(item.cur_value)
            item.threshold = ConvertNanoTime(item.threshold)
          } else {
            item.cur_value = ConvertNumberToLabel(item.cur_value)
            item.threshold = ConvertNumberToLabel(item.threshold)
          }
        })
        this.total = json.total
      }
    },
    changePage(pageIndex) {
      this.ws.send(pageIndex)
    },
    filterChange() {},
    handle(data) {
      data.handled = data.handled === 0 ? 1 : 0
      data.isHandled = data.handled === 0 ? false : true
      changeWarningStatus({
        id: data.id,
      })
    },
  },
  beforeDestroy() {
    this.ws.close()
  },
}
</script>

<style lang="scss" scoped></style>
