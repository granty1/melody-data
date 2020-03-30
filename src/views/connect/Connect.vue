<template>
  <div>
    <Row type="flex" justify="center" align="middle" class="code-row-bg main_process">
      <i-col span="10">
        <Steps :current="curProcess">
          <Step title="Melody Data Server" content="选择目标Melody Data后端服务"></Step>
          <Step title="Confirm Database" content="确认目标数据库"></Step>
          <Step title="Check Measurements" content="确认measurements"></Step>
        </Steps>
        <template v-if="curProcess == 0">
          <Form style="margin-top: 50px" :model="connect">
            <FormItem label="">
              <i-input autofocus v-model="connect.address" placeholder=":8080">
                <span slot="prepend">http://</span>
              </i-input>
            </FormItem>
            <FormItem label="">
              <i-input autofocus v-model="connect.username" placeholder="username"> </i-input>
            </FormItem>
            <FormItem label="">
              <i-input autofocus v-model="connect.password" placeholder="password"> </i-input>
            </FormItem>
            <Button @click="ping" type="primary">Next<Icon type="ios-arrow-forward"></Icon></Button>
          </Form>
        </template>
        <template v-if="curProcess == 1">
          <Card style="margin-top: 50px">
            <p slot="title"><Icon type="md-cube" /> {{ db }}</p>
            <Table :columns="retentionPolicies.columns" :data="retentionPolicies.values"></Table>
          </Card>
          <Button style="margin-top: 50px" @click="getMeasurements" type="primary"
            >Next<Icon type="ios-arrow-forward"></Icon
          ></Button>
        </template>
        <template v-if="curProcess == 2">
          <List header="name: measurements">
            <template v-for="(item, index) in measurements">
              <ListItem :key="index">{{ item[0] }}</ListItem>
            </template>
          </List>
          <Button style="margin-top: 50px" @click="finishConnect" type="primary"
            >Finished<Icon type="ios-arrow-forward"></Icon
          ></Button>
        </template>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { ping, query } from '@/api'
import { HandleError } from '@/util/handle'
import { TitleCase } from '@/util/string'
export default {
  name: 'Connect',
  data() {
    return {
      db: '',
      retentionPolicies: {},
      measurements: [],
      curProcess: 0,
      connect: {
        address: '127.0.0.1:8001',
        username: '',
        password: '',
      },
      test: {
        command: '',
      },
    }
  },
  methods: {
    ping() {
      ping(this.connect).then(resp => {
        if (resp.code == 200) {
          this.curProcess++
          this.db = resp.data
          this.$store.commit('initConnection', {
            database: this.db,
            address: 'http://' + this.connect.address,
          })
          this.getRetentionPolicies()
        } else {
          HandleError(resp.message)
        }
      })
    },
    getRetentionPolicies() {
      query({
        command: 'show retention policies on ' + this.$store.getters.database,
      }).then(resp => {
        if (resp.code == 200) {
          let arrayData = resp.data
          let columns = []
          let values = []
          arrayData.columns.forEach(el => {
            columns.push({ title: TitleCase(el), key: el })
          })
          for (let i = 0; i < arrayData.values.length; i++) {
            let obj = {}
            for (let j = 0; j < arrayData.values[i].length; j++) {
              obj[columns[j].key] = arrayData.values[i][j]
            }
            values.push(obj)
          }
          this.retentionPolicies = { columns, values }
        } else {
          HandleError(resp.message)
        }
      })
    },
    getMeasurements() {
      query({
        command: 'show measurements',
      }).then(resp => {
        if (resp.code == 200) {
          this.curProcess++
          this.measurements = resp.data.values
        } else {
          HandleError(resp.message)
        }
      })
    },
    finishConnect() {
      this.curProcess++
      this.$router.push('/base')
    },
  },
}
</script>

<style lang="css">
.main_process {
  margin-top: 12rem;
}
</style>
