<template>
  <div>
    <Row style="margin-top: 10px">
      <i-col span="11">
        <Card>
          <dynamic-chart id="requests_complete" path="/requests/complete"></dynamic-chart>
          <div style="font-size: 12px"><code>Requets Complete</code>:所有成功的请求</div>
        </Card>
      </i-col>
      <i-col span="11" :offset="2">
        <Card>
          <dynamic-chart id="requests_error" path="/requests/error"></dynamic-chart>
          <div style="font-size: 12px"><code>Requets Error</code>:所有失败的请求</div>
        </Card>
      </i-col>
    </Row>

    <Card style="margin-top: 10px">
      <dynamic-chart
        id="requests_pie"
        path="/requests/endpoints/pie"
        :tooltip="pieTooltip"
        :needX="false"
        :needY="false"
      ></dynamic-chart>
    </Card>

    <Row style="margin-top: 10px">
      <i-col span="11">
        <Card>
          <dynamic-chart id="requests_endpoints" ref="endpoint" path="/requests/endpoints">
            <Cascader
              :data="requestStatus"
              v-model="endpointStatus"
              :render-format="formatStatus"
              @on-change="changeEndpointStatus"
            ></Cascader>
          </dynamic-chart>
          <div style="font-size: 12px"><code>Requets Endpoints</code>:所有Endpoint的请求</div>
        </Card>
      </i-col>
      <i-col span="11" :offset="2">
        <Card>
          <dynamic-chart id="requests_backends" ref="backend" path="/requests/backends">
            <Cascader
              :data="requestStatus"
              v-model="backendStatus"
              :render-format="formatStatus"
              @on-change="changeBackendStatus"
            ></Cascader>
          </dynamic-chart>
          <div style="font-size: 12px"><code>Requets Backends</code>:所有Backend的请求</div>
        </Card>
      </i-col>
    </Row>

    <Card style="margin-top: 10px">
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
      pieTooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      e2b: [],
      curAPI: ['', ''],
      endpointStatus: ['', ''],
      backendStatus: ['', ''],
      requestStatus: [
        {
          label: 'ALL',
          value: 'ALL',
        },
        {
          label: 'Complete',
          value: 'Complete',
        },
        {
          label: 'Error',
          value: 'Error',
        },
      ],
    }
  },
  components: {
    DynamicChart,
  },
  mounted() {
    getE2B().then(resp => {
      this.e2b = resp.data
    })
  },
  methods: {
    format(labels) {
      if (labels.length == 0) {
        return '请选择接口'
      }
      if (labels.length == 1) {
        return labels[0]
      }
      return labels[0] + ' => ' + labels[1] + ' => ' + labels[2]
    },
    formatStatus(labels) {
      if (labels.length == 0) {
        return '请选择请求的状态'
      }
      return labels[0]
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
    changeEndpointStatus(value) {
      this.$refs.endpoint.changeAPI(value[0])
    },
    changeBackendStatus(value) {
      this.$refs.backend.changeAPI(value[0])
    },
  },
}
</script>
