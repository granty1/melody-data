<template>
  <div>
    <Card style="margin-top: 10px;">
      <dynamic-chart id="debug_num_gc" path="/debug/num/gc"></dynamic-chart>
      <div class="description"><code>GCNum</code>:GC的总次数</div>
    </Card>
    <Card style="margin-top: 10px;">
      <dynamic-chart
        id="debug_free_total"
        path="/debug/free-total"
        :yLabelFormatter="freeFormatter"
        :tooltipFormatter="freeToolTipFormatter"
      ></dynamic-chart>
      <div class="description"><code>FreeTotal</code>:GC清理的内存总大小</div>
    </Card>
  </div>
</template>

<script>
import DynamicChart from '@/components/echarts/DynamicChart'
import { ConvertNumberToLabel } from '@/util/number'
export default {
  name: 'Debug',
  components: {
    DynamicChart,
  },
  methods: {
    freeFormatter(value) {
      return ConvertNumberToLabel(value)
    },
    freeToolTipFormatter(params) {
      var res = params[0].name
      for (var i = 0; i < params.length; i++) {
        res +=
          '<br>' +
          params[i].marker +
          params[i].seriesName +
          '：' +
          ConvertNumberToLabel(params[i].data)
      }
      return res
    },
  },
}
</script>

<style lang="less"></style>
