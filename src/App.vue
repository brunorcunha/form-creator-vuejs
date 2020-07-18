<template>
  <v-app>
    <RouterView />
    <SnackBar ref="snackBar" />
    <ImageDialog ref="imageDialog" />
    <ResponsesDialog ref="responsesDialog" />
  </v-app>
</template>

<script>
import Vue from 'vue'
import SnackBar from './components/SnackBar'
import ImageDialog from './components/Image/Dialog'
import ResponsesDialog from './components/Responses/Dialog'

export default {
  name: 'App',
  components: { ResponsesDialog, ImageDialog, SnackBar },
  mounted () {
    Vue.prototype.$SnackBar = this.$refs.snackBar
    Vue.prototype.$ImageDialog = this.$refs.imageDialog
    Vue.prototype.$ResponsesDialog = this.$refs.responsesDialog
  }
}
</script>

<style>
  @import 'App.css';
</style>
