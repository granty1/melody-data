<template>
  <div>
    <Row>
      <i-col span="22" :offset="1">
        <Card style="height: 300px">
          <dynamic-chart id="debug_num_gc" path="/debug/num/gc"></dynamic-chart>
        </Card>
        <Card style="height: 300px; margin-top:20px"> </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import DynamicChart from '@/components/echarts/DynamicChart'
export default {
  name: 'Debug',
  components: {
    DynamicChart,
  },
}
</script>

<style lang="less"></style>
