<template>
  <div>
    <Row>
      <i-col span="22" :offset="1">
        <Card style="height: 300px">
          <Chart id="test" :option="NumGCOption"></Chart>
        </Card>
        <Card style="height: 300px; margin-top:20px">
          <Chart id="test-2"></Chart>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Chart from '@/components/echarts/Chart'
import { NewWebSocket } from '@/util/websocket'
import { HandleError } from '@/util/handle'
export default {
  name: 'Debug',
  components: {
    Chart,
  },
  data() {
    return {
      NumGC: {
        xAxis: [],
        yAxis: [],
        title: '',
      },
      GCNumWs: {},
    }
  },
  computed: {
    NumGCOption() {
      return {
        title: {
          text: this.NumGC.title,
        },
        xAxis: {
          name: 'time',
          type: 'category',
          data: this.NumGC.xAxis,
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
        series: [
          {
            data: this.NumGC.yAxis,
            name: 'GCNums',
            type: 'line',
            smooth: true,
          },
        ],
      }
    },
  },
  methods: {
    initGCNumWS() {
      this.GCNumWs = NewWebSocket('/debug/num/gc')
      this.GCNumWs.onmessage = evt => {
        let json = JSON.parse(evt.data)
        console.log('<- server')
        if (json.error != null) {
          HandleError(json.error)
        } else {
          this.NumGC = {
            xAxis: json.xAxis,
            yAxis: json.yAxis,
            title: json.title,
          }
        }
      }
    },
  },
  mounted() {
    this.initGCNumWS()
  },
  beforeRouteLeave(to, from, next) {
    this.GCNumWs.close()
    next()
  },
}
</script>

<style lang="less"></style>
