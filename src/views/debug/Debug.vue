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
      ws: {},
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
    initWS() {
      this.ws = new WebSocket('ws://localhost:8002/debug/num/gc')
      this.ws.onopen = () => {
        console.log('connect to websocket')
      }
      this.ws.onmessage = evt => {
        let json = JSON.parse(evt.data)
        this.NumGC = {
          xAxis: json.xAxis,
          yAxis: json.yAxis,
          title: json.title,
        }
      }
      this.ws.onclose = () => {
        console.log('close websocket')
      }
    },
  },
  mounted() {
    this.initWS()
  },
  beforeRouteLeave(to, from, next) {
    this.ws.close()
    next()
  },
}
</script>

<style lang="less"></style>
