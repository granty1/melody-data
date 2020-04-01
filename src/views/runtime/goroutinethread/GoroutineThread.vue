<template>
  <div>
    <Chart id="goroutine_thread" :option="option"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echarts/Chart'
import { NewWebSocket } from '@/util/websocket'
import { HandleError } from '@/util/handle'
export default {
  name: 'GoroutineThread',
  data() {
    return {
      ws: {},
      op: {
        title: '',
        times: [],
        series: [],
      },
    }
  },
  components: {
    Chart,
  },
  computed: {
    option() {
      return {
        title: {
          text: this.op.title,
        },
        xAxis: {
          name: 'time',
          type: 'category',
          data: this.op.times,
        },
        tooltip: {
          show: true,
          axisPointer: {
            type: 'cross',
          },
          trigger: 'axis',
        },
        yAxis: {
          type: 'value',
          name: 'nums',
        },
        legend: {
          show: true,
        },
        series: this.op.series,
      }
    },
  },
  methods: {
    initWS() {
      this.ws = NewWebSocket('/runtime/num/goroutine_thread')
      this.ws.onmessage = evt => {
        let json = JSON.parse(evt.data)
        console.log('<- server')
        if (json.error != null) {
          HandleError(json.error)
        } else {
          console.log(json)
          this.op = {
            title: json.title,
            times: json.times,
            series: json.series,
          }
        }
      }
    },
  },
  mounted() {
    this.initWS()
  },
  beforeDestroy() {
    this.ws.close()
  },
}
</script>
