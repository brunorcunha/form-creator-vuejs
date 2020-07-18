<template>
  <v-text-field
    v-model="valor"
    :disabled="disabled"
    :label="label"
    :placeholder="placeholder"
    :rules="rules"
    :clearable="clearable"
    :prepend-inner-icon="prependInnerIcon"
  />
</template>

<script>
import VMasker from 'vanilla-masker'

export default {
  name: 'InputMask',
  props: {
    value: [String],
    mask: [String, Array],
    rules: { type: Array, default: () => [] },
    formatar: { type: Boolean, default: false },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    prependInnerIcon: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  data: () => ({
    valor: '',
    valorRetorno: ''
  }),
  watch: {
    value (val) {
      this.tratarValue(val)
    },
    async valor (val) {
      this.tratarRetorno(val)

      await this.$nextTick()
      this.$emit('input', this.valorRetorno)
      this.tratarExibido(this.valorRetorno)
    }
  },
  created () {
    this.tratarValue(this.value)
  },
  methods: {
    tratarRetorno (val) {
      this.valorRetorno = val.replace(/\D/g, '')
    },
    tratarExibido (val) {
      this.valor = VMasker.toPattern(val, this.definirMascara(val))
    },
    tratarValue (val) {
      if (!val) val = ''
      this.tratarExibido(val)
    },
    definirMascara (val) {
      if (!Array.isArray(this.mask)) return this.mascara

      const formatVal = val.replace(/\D/g, '')
      const formatMask = this.mask[0].replace(/[^9]/g, '')
      if (formatVal.length > formatMask.length) return this.mask[1]
      return this.mask[0]
    }
  }
}
</script>
