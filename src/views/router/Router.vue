<template>
  <div>
    <Card>
      <dynamic-chart id="requests_api" ref="api" path="/router/direction"></dynamic-chart>
      <div style="font-size: 12px"><code>Router Direction</code>:进出的请求数量</div>
    </Card>
  </div>
</template>

<script>
import DynamicChart from '@/components/echarts/DynamicChart'

export default {
  name: 'Router',
  data() {
    return {
      e2b: [],
      curAPI: ['', ''],
    }
  },
  components: {
    DynamicChart,
  },
}
</script>

<style lang="scss" scoped></style>
