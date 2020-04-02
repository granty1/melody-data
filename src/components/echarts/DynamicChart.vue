<template>
  <div>
    <Chart :id="id" :option="option"></Chart>
  </div>
</template>

<script>
import Chart from '@/components/echarts/Chart'
import { NewWebSocket } from '@/util/websocket'
import { HandleError } from '@/util/handle'
export default {
  name: 'DynamicChart',
  props: {
    id: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
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
      this.ws = NewWebSocket(this.path)
      this.ws.onmessage = evt => {
        let json = JSON.parse(evt.data)
        console.log(this.path + '< - server')
        if (json.error != null) {
          HandleError(json.error)
        } else {
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
