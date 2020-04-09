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
    yLabelFormatter: {
      type: Function,
      default: function(value) {
        return value
      },
    },
    tooltipFormatter: {
      type: Function,
      default: function(params) {
        var res = params[0].name
        for (var i = 0; i < params.length; i++) {
          res += '<br>' + params[i].marker + params[i].seriesName + '：' + params[i].data
        }
        return res
      },
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
          formatter: this.tooltipFormatter,
        },
        yAxis: {
          type: 'value',
          name: 'nums',
          axisLabel: {
            formatter: this.yLabelFormatter,
          },
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
      this.ws.onopen = () => {}
      this.ws.onmessage = evt => {
        let json = JSON.parse(evt.data)
        console.log(this.path + ' <- server')
        if (json != null) {
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
      }
    },
    changeAPI(v) {
      this.ws.send(v)
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
