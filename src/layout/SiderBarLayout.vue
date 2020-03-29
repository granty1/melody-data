<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>Option 1</span>
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="ios-search"></Icon>
            <span>Option 2</span>
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>Option 3</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{ margin: '20px', background: '#fff', minHeight: '260px' }">
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'SiderBarLayour',
}
</script>
