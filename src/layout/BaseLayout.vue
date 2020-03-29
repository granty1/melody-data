<template>
  <div class="layout">
    <Layout>
      <Header :style="{ position: 'fixed', width: '100%', background: '#fff' }">
        <Menu mode="horizontal" theme="light" :active-name="$router.name" @on-select="handleSelect">
          <div class="layout-logo">
            <img class="navbar-logo" src="../assets/img/melodylogo.png" alt />
          </div>
          <div class="layout-nav">
            <MenuItem name="base">
              <Icon type="ios-navigate"></Icon>
              Debug
            </MenuItem>
            <MenuItem name="request">
              <Icon type="ios-keypad"></Icon>
              Requests
            </MenuItem>
            <MenuItem name="router">
              <Icon type="ios-analytics"></Icon>
              Router
            </MenuItem>
            <MenuItem name="runtime">
              <Icon type="ios-paper"></Icon>
              Runtime
            </MenuItem>
            <MenuItem name="gc">
              <Icon type="ios-paper"></Icon>
              GC
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{ margin: '70px 10px 0', background: '#fff', minHeight: '600px' }">
        <router-view />
      </Content>
      <Footer class="layout-footer-center">MIT Licensed | Copyright © 2020 ❤️ Melody-Team</Footer>
    </Layout>
    {{ $router.name }}
  </div>
</template>
<script>
export default {
  name: 'Base',
  data() {
    return {
      isFullScreen: false,
    }
  },
  methods: {
    handleSelect(name) {
      this.$router.push(name)
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
