<template>
  <div>
    <Card style="margin-top: 10px;">
      <dynamic-chart id="router_direction" ref="direction" path="/router/direction"></dynamic-chart>
      <div class="description"><code>Router Direction</code>:进出的请求数量</div>
    </Card>

    <Card style="margin-top: 10px;">
      <dynamic-chart
        id="router_size"
        ref="size"
        path="/router/size"
        :yLabelFormatter="freeFormatter"
        :tooltipFormatter="freeToolTipFormatter"
      >
        <Cascader
          :data="endpoints"
          v-model="curSizeAPI"
          :render-format="format"
          @on-change="changeRouterSize"
        ></Cascader>
      </dynamic-chart>
      <div class="description">
        <code>max</code
        >:此接口响应大小的最大值，<code>mean</code>:此接口响应大小的平均值，<code>min</code>:此接口响应大小的最小值
      </div>
    </Card>

    <Card style="margin-top: 10px;">
      <dynamic-chart
        id="router_time"
        ref="time"
        path="/router/time"
        :yLabelFormatter="timeFormatter"
        :tooltipFormatter="timeToolTipFormatter"
      >
        <Cascader
          :data="endpoints"
          v-model="curTimeAPI"
          :render-format="format"
          @on-change="changeRouterTime"
        ></Cascader>
      </dynamic-chart>
      <div class="description">
        <code>max</code
        >:此接口响应时间的最大值，<code>mean</code>:此接口响应时间的平均值，<code>min</code>:此接口响应时间的最小值
      </div>
    </Card>
  </div>
</template>

<script>
import { getE2B } from '@/api'
import DynamicChart from '@/components/echarts/DynamicChart'
import { ConvertNumberToLabel, ConvertTime } from '@/util/number'

export default {
  name: 'Router',
  data() {
    return {
      endpoints: [],
      curSizeAPI: ['', ''],
      curTimeAPI: ['', ''],
    }
  },
  mounted() {
    getE2B().then(resp => {
      this.endpoints = resp.data
      console.log(this.endpoints)
      this.endpoints.forEach(item => {
        item.children = []
      })
    })
  },
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
    timeFormatter(value) {
      return ConvertTime(value)
    },
    timeToolTipFormatter(params) {
      var res = params[0].name
      for (var i = 0; i < params.length; i++) {
        res += '<br>' + params[i].marker + params[i].seriesName + '：' + ConvertTime(params[i].data)
      }
      return res
    },
    format(labels) {
      if (labels.length == 0) {
        return '请选择要查看的Endpoint'
      }
      return labels[0]
    },
    changeRouterSize(value) {
      this.$refs.size.changeAPI(value[0])
    },
    changeRouterTime(value) {
      this.$refs.time.changeAPI(value[0])
    },
  },
}
</script>

<style lang="scss" scoped></style>
