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
      nums: [820, 932, 901, 934, 1290, 1330, 1320, 1500, 1500],
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: 'xxx-line'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
  mounted() {},
}
</script>

<style lang="less"></style>
