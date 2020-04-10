<template>
  <div>
    <Card>
      <dynamic-chart id="requests_complete" path="/requests/complete"></dynamic-chart>
      <div style="font-size: 12px"><code>Requets Complete</code>:所有成功的请求</div>
    </Card>
    <Card>
      <dynamic-chart id="requests_error" path="/requests/error"></dynamic-chart>
      <div style="font-size: 12px"><code>Requets Error</code>:所有失败的请求</div>
    </Card>
    <Card>
      <dynamic-chart id="requests_endpoints" path="/requests/endpoints"></dynamic-chart>
      <div style="font-size: 12px"><code>Requets Endpoints</code>:所有Endpoint的请求</div>
    </Card>
    <Card>
      <dynamic-chart id="requests_backends" path="/requests/backends"></dynamic-chart>
      <div style="font-size: 12px"><code>Requets Backends</code>:所有Backend的请求</div>
    </Card>
    <Card>
      <dynamic-chart id="requests_api" ref="api" path="/requests/api">
        <Cascader
          :data="e2b"
          v-model="curAPI"
          :render-format="format"
          @on-change="changeAPI"
        ></Cascader>
      </dynamic-chart>
      <div style="font-size: 12px"><code>Requets API</code>:某一个API的所有请求</div>
    </Card>
  </div>
</template>

<script>
import { getE2B } from '@/api'
import DynamicChart from '@/components/echarts/DynamicChart'
export default {
  name: 'Request',
  data() {
    return {
      requestsComplete: {
        complete: true,
      },
      e2b: [],
      curAPI: ['', ''],
    }
  },
  components: {
    DynamicChart,
  },
  mounted() {
    getE2B().then(resp => {
      console.log(resp)
      this.e2b = resp.data
    })
  },
  methods: {
    format(labels) {
      if (labels.length == 0) {
        return '请选择接口'
      }
      return labels[0] + ' => ' + labels[1] + ' => ' + labels[2]
    },
    changeAPI(value) {
      if (value[1] === 'ALL') {
        // 获取 endpoint
        this.$refs.api.changeAPI(value[0] + ' ' + value[2])
      } else {
        // 获取 backend
        this.$refs.api.changeAPI(value[1] + ' ' + value[2])
      }
    },
  },
}
</script>
