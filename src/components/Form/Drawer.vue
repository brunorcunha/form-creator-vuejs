<template>
  <v-navigation-drawer
    fixed
    right
    width="400"
    :value="visible"
  >
    <v-toolbar dense elevation="1">
      <v-toolbar-title>
        <v-icon left color="primary">palette</v-icon>
        Opções e Temas
      </v-toolbar-title>
    </v-toolbar>

    <v-row class="px-6 pb-4">
      <v-col>
        <v-switch v-model="options.banner" inset hide-details label="Mostrar Banner" />
        <v-switch v-model="options.header" inset hide-details label="Mostrar Cabeçalho" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="px-6" v-if="options.colors.theme">
      <v-col>
        <h4 class="pb-2">Cor do Tema</h4>
        <ColorPicker v-model="options.colors.theme" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="px-6" v-if="options.colors.background">
      <v-col>
        <h4 class="pb-2">Cor do Fundo</h4>
        <ColorPicker v-model="options.colors.background" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="px-6">
      <v-col>
        <h4 class="pb-2">Imagem de Fundo</h4>
        <v-btn
          depressed
          color="primary"
          class="my-2 white--text"
          @click="chooseBackgroundImage()"
        >
          Escolher Imagem
          <v-icon right dark>insert_photo</v-icon>
        </v-btn>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="red"
              @click="options.images.background = null"
              v-if="!!options.images.background"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Remover Imagem de Fundo</span>
        </v-tooltip>

      </v-col>
    </v-row>

    <v-divider />

    <v-row class="px-6">
      <v-col>
        <h4 class="pb-2">Imagem do Banner</h4>
        <v-btn
          depressed
          color="primary"
          class="my-2 white--text"
          @click="chooseBannerImage()"
        >
          Escolher Imagem
          <v-icon right dark>insert_photo</v-icon>
        </v-btn>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                color="red"
                @click="options.images.banner = null"
                v-if="!!options.images.banner"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Remover Imagem do Banner</span>
        </v-tooltip>
      </v-col>
    </v-row>

  </v-navigation-drawer>
</template>

<script>
import ColorPicker from '../ColorPicker'

export default {
  name: 'Drawer',
  components: {
    ColorPicker
  },
  props: {
    value: { type: Object, default: null },
    visible: { type: Boolean, default: true }
  },
  data: () => ({
    options: {
      banner: true,
      header: true,
      colors: {
        background: null,
        theme: null
      },
      images: {
        banner: null,
        background: null
      }
    }
  }),
  watch: {
    options: {
      handler: function (val) {
        if (val.colors.theme) this.$vuetify.theme.themes.light.primary = val.colors.theme
        this.$emit('input', { ...this.value, ...val })
      },
     deep: true
    },
    form () {
      this.initialize()
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (!this.value) return
      this.options = {
        banner: this.value.banner,
        header: this.value.header,
        colors: {
          background: this.value.colors.background,
          theme: this.$vuetify.theme.themes.light.primary
        },
        images: {
          banner: this.value.images.banner,
          background: this.value.images.background
        }
      }
    },
    async chooseBannerImage () {
      try {
        const url = await this.$ImageDialog.open()
        this.options.images.banner = url
      } catch (e) { console.log(e) }
    },
    async chooseBackgroundImage () {
      try {
        const url = await this.$ImageDialog.open()
        this.options.images.background = url
      } catch (e) { console.log(e) }
    }
  }
}
</script>
