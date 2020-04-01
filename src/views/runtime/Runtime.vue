<template>
  <div>
    <Card>
      <goroutine-thread></goroutine-thread>
      <div style="font-size: 12px">
        <code>NumGoroutine</code>:当前系统中存在的goroutine数
        <code>NumThread</code>:当前系统中存在的线程数
      </div>
    </Card>
  </div>
</template>

<script>
import GoroutineThread from './goroutinethread/GoroutineThread'
export default {
  name: 'Runtime',
  components: {
    GoroutineThread,
  },
}
</script>
