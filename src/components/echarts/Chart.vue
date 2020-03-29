<template>
  <p :id="id" :style="style"></p>
</template>

<script>
export default {
  name: 'Chart',
  data() {
    return {
      chart: '',
    }
  },
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    option: {
      type: Object,
      default() {
        return {
          title: {
            text: 'vue-Echarts',
          },
          legend: {
            data: ['销量'],
          },
          yAxis: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', 'tuoxie'],
          },
          series: [
            {
              name: '销量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 70],
            },
          ],
        }
      },
    },
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
      }
    },
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
      window.addEventListener('resize', this.chart.resize)
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
    },
  },
}
</script>
