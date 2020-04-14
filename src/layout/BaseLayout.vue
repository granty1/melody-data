<template>
  <div class="layout">
    <Layout>
      <Header :style="{ position: 'fixed', width: '100%', background: '#fff' }">
        <Menu
          mode="horizontal"
          theme="light"
          :active-name="$router.history.current.name"
          @on-select="handleSelect"
        >
          <div class="layout-logo">
            <img class="navbar-logo" src="../assets/img/melodylogo.png" alt />
          </div>
          <div class="layout-nav">
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
          </div>
        </Menu>
        <span></span>
      </Header>
      <Content :style="{ margin: '65px  10px 0' }">
        <Card dis-hover>
          <Row>
            <i-col span="12" :offset="12">
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
      </Content>
      <Content :style="{ margin: '10px 10px 0', background: '#fff', minHeight: '600px' }">
        <router-view />
      </Content>
      <Footer class="layout-footer-center">MIT Licensed | Copyright © 2020 ❤️ Melody-Team</Footer>
    </Layout>
  </div>
</template>
<script>
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
    }
  },
  mounted() {
    let cache = this.$store.getters.timecontrol
    if (cache != null) {
      this.timeControl = cache
    }
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
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  float: right;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}

.navbar-logo {
  height: 2.2rem;
  min-width: 2.2rem;
  margin-right: 0.8rem;
  vertical-align: top;
  cursor: pointer;
}
</style>
