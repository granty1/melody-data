<template>
  <div>
    <Card style="margin-top: 10px;">
      <dynamic-chart id="runtime_num_goroutine" path="/runtime/num/goroutine"></dynamic-chart>
      <div class="description">
        <code>goroutine num</code>:时间单位内系统中存在的平均goroutine数
      </div>
    </Card>
    <Row style="margin-top: 10px" type="flex" justify="space-between">
      <i-col span="11">
        <Card>
          <dynamic-chart id="runtime_num_gc" path="/runtime/num/gc"></dynamic-chart>
          <div class="description"><code>GC num</code>:时间单位内系统中GC总执行数</div>
        </Card>
      </i-col>
      <i-col span="11">
        <Card>
          <dynamic-chart
            id="runtime_num_frees"
            path="/runtime/num/frees"
            :yLabelFormatter="freeFormatter"
            :tooltipFormatter="freeToolTipFormatter"
          ></dynamic-chart>
          <div class="description"><code>free memory</code>:时间单位内GC释放的总内存</div>
        </Card>
      </i-col>
    </Row>
    <Card style="margin-top: 10px">
      <dynamic-chart
        id="runtime_num_memory"
        :yLabelFormatter="freeFormatter"
        :tooltipFormatter="freeToolTipFormatter"
        path="/runtime/num/memory"
      ></dynamic-chart>
      <div class="description">
        <code>sys</code>:系统占用总平均内存 <code>heap</code>:堆平均内存
        <code>stack</code>:栈平均内存 <code>mcache</code>内存缓存池平均占用内存
        <code>mspan</code>:页管理平均占用内存
      </div>
    </Card>
  </div>
</template>

<script>
import DynamicChart from '@/components/echarts/DynamicChart'
import { ConvertNumberToLabel } from '@/util/number'
export default {
  name: 'Runtime',
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
