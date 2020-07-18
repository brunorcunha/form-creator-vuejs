<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template #activator="{ on, attrs }">
      <div
        class="colorPicker"
        v-bind="attrs"
        v-on="on"
      >
        <div :style="`background-color: ${color.hex}`"></div>
        <span>{{ color.hex }}</span>
      </div>
    </template>

    <Sketch v-model="color" />
  </v-menu>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  name: 'ColorPicker',
  components: {
    Sketch
  },
  props: {
    value: { type: String, default: '#fff' }
  },
  data: () => ({
    color: { hex: '#fff' }
  }),
  watch: {
    color (val) {
      this.$emit('input', val.hex)
    }
  },
  mounted () {
    this.color.hex = this.value || '#fff'
  }
}
</script>

<style scoped>

</style>
