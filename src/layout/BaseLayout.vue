<template>
  <div>
    <Layout>
      <Header style="background: #fff">
        <Row>
          <i-col span="4">
            <img class="navbar-logo" src="../assets/img/melodylogo.png" alt />
            <span class="layout-title">
              Melody Data
            </span>
          </i-col>
          <i-col span="20">
            <Menu
              mode="horizontal"
              theme="light"
              :active-name="$router.history.current.name"
              @on-select="handleSelect"
              style="display: inline-block;float: right;"
            >
              <MenuItem name="runtime">
                <Icon type="ios-paper"></Icon>
                Runtime
              </MenuItem>
              <MenuItem name="request">
                <Icon type="ios-keypad"></Icon>
                Requests
              </MenuItem>
              <MenuItem name="router">
                <Icon type="ios-analytics"></Icon>
                Router
              </MenuItem>
              <MenuItem name="debug">
                <Icon type="ios-navigate"></Icon>
                Debug
              </MenuItem>
              <MenuItem name="warnings">
                <Icon type="ios-navigate"></Icon>
                Warnings
              </MenuItem>
            </Menu>
          </i-col>
        </Row>
      </Header>

      <Content :style="{ margin: '10px 50px 0', minHeight: '600px' }">
        <Card dis-hover style="margin-top: 5px;">
          <Row>
            <i-col span="8" :offset="16">
              <Poptip trigger="hover" title="source">
                <span slot="content">{{ source }}</span>
                <Badge :status="connect ? 'processing' : 'error'" /><Icon type="md-cube" />
              </Poptip>
              <Select
                v-model="timeControl.refresh_time"
                prefix="md-refresh"
                style="width:80px; margin-left: 20px"
              >
                <Option v-for="item in refreshList" :value="item" :key="item">{{ item }}</Option>
              </Select>

              <Select v-model="timeControl.time_interval" style="width:150px; margin-left: 10px">
                <span slot="prefix"> <Icon type="md-time" /> Past </span>
                <Option v-for="item in pastList" :value="item" :key="item">{{ item }}</Option>
              </Select>

              <Select v-model="timeControl.group_time" style="width:150px; margin-left: 10px">
                <span slot="prefix"><Icon type="ios-swap" /> group </span>
                <Option v-for="item in intervalList" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </i-col>
          </Row>
        </Card>
        <router-view />
      </Content>

      <Footer class="layout-footer-center">MIT Licensed | Copyright © 2020 ❤️ Melody-Team</Footer>
    </Layout>
  </div>
</template>

<script>
import { NewWebSocket } from '@/util/websocket'
import { Notice } from 'view-design'
export default {
  name: 'Base',
  data() {
    return {
      timeControl: {
        min_time: 'now()',
        max_time: 'now()',
        time_interval: '15m',
        group_time: '10s',
        refresh_time: '10s',
      },
      isFullScreen: false,
      refreshList: ['5s', '10s', '15s', '30s', '60s'],
      pastList: ['5m', '15m', '1h', '6h', '12h', '24h', '7d', '15d', '30d'],
      intervalList: ['500ms', '2s', '5s', '10s', '15s', '1m', '2m', '4m', '30m', '1h', '6h'],
      ws: {},
    }
  },
  mounted() {
    let cache = this.$store.getters.timecontrol
    if (cache != null) {
      this.timeControl = cache
    }
    this.initWS()
  },
  computed: {
    connect() {
      return this.$store.getters.connect
    },
    source() {
      return this.$store.getters.websocket + (this.connect ? ' connected' : ' disconnected')
    },
  },
  methods: {
    handleSelect(name) {
      this.$router.push(name)
    },
    initWS() {
      this.ws = NewWebSocket('/warnings/watch')
      this.ws.onmessage = evt => {
        let json = JSON.parse(evt.data)
        Notice.warning({
          title: '服务器出现异常',
          duration: 10,
          desc:
            json.warning.description +
            '<br>发生时间：' +
            new Date(json.warning.ctime).toLocaleString(),
        })
      }
    },
  },
  watch: {
    timeControl: {
      handler(newVal) {
        if (newVal) {
          this.$store.commit('updateTimeControl', newVal)
        }
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.layout-title {
  font-size: 1.2rem;
  line-height: 2rem;
  font-family: Comic Sans MS, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
}

.layout-footer-center {
  text-align: center;
}

.navbar-logo {
  height: 2.8rem;
  min-width: 2.8rem;
  margin-right: 0.5rem;
  vertical-align: middle;
  cursor: pointer;
}
</style>
