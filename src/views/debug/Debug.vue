<template>
  <div>
    <Row>
      <i-col span="22" :offset="1">
        <Card style="height: 300px">
          <Chart id="test" :option="option"></Chart>
        </Card>
        <Card style="height: 300px; margin-top:20px">
          <Chart id="test-2"></Chart>
        </Card>
      </i-col>
    </Row>
    {{ nums }}
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
      nums: [],
      ws: {},
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: 'xxx-line',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        },
        series: [
          {
            data: this.nums,
            type: 'line',
            smooth: true,
          },
        ],
      }
    },
  },
  methods: {
    initWS() {
      this.ws = new WebSocket('ws://localhost:8002/test')
      this.ws.onopen = () => {
        console.log('connect to websocket.')
      }
      this.ws.onmessage = evt => {
        console.log(evt.data)
        this.nums = JSON.parse(evt.data)
      }
      this.ws.onclose = () => {
        console.log('close websocket.')
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
