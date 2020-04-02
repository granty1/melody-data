<template>
  <div>
    <Card>
      <dynamic-chart id="runtime_num_goroutine" path="/runtime/num/goroutine"></dynamic-chart>
      <div style="font-size: 12px"><code>goroutine num</code>:当前系统中存在的goroutine数</div>
    </Card>
    <Row style="margin-top: 10px">
      <i-col span="11">
        <Card>
          <dynamic-chart id="runtime_num_gc" path="/runtime/num/gc"></dynamic-chart>
          <div style="font-size: 12px"><code>GC num</code>:当前系统中GC执行数</div>
        </Card>
      </i-col>
      <i-col span="11" :offset="2">
        <Card>
          <dynamic-chart
            id="runtime_num_frees"
            path="/runtime/num/frees"
            :yLabelFormatter="freeFormatter"
            :tooltipFormatter="freeToolTipFormatter"
          ></dynamic-chart>
          <div style="font-size: 12px"><code>free memory</code>:GC释放的内存</div>
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
      <div style="font-size: 12px">
        <code>sys</code>:系统占用总内存 <code>heap</code>:堆内存 <code>stack</code>:栈内存
        <code>mcache</code>内存缓存池占用内存 <code>mspan</code>:页管理占用内存
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
