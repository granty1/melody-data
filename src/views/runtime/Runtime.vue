<template>
  <div>
    <Card>
      <dynamic-chart
        id="runtime_num_goroutine"
        path="/runtime/num/goroutine_thread"
      ></dynamic-chart>
      <div style="font-size: 12px"><code>goroutine num</code>:当前系统中存在的goroutine数</div>
    </Card>
    <Card style="margin-top: 10px"> </Card>
  </div>
</template>

<script>
import DynamicChart from '@/components/echarts/DynamicChart'
export default {
  name: 'Runtime',
  components: {
    DynamicChart,
  },
}
</script>
