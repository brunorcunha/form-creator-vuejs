<template>
  <v-dialog
    persistent
    scrollable
    v-model="dialog"
    width="600"
    height="300"
  >
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar dense dark elevation="1" color="primary">
          <v-toolbar-title>
            <v-icon left>palette</v-icon>
            Galeria de imagens
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            dark
            text
            icon
            @click="close"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="n in 15"
            :key="n"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat tile class="d-flex image">
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 1}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 1}`"
                aspect-ratio="1"
                class="primary"
                @click="choose(`https://picsum.photos/1200/720?image=${n * 5 + 1}`)"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null
  }),
  computed: {
    primary () {
      return this.$vuetify.theme.themes.light.primary
    }
  },
  methods: {
    open () {
      this.dialog = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    choose (url) {
      this.resolve(url)
      this.dialog = false
    },
    close () {
      this.reject()
      this.dialog = false
    }
  }
}
</script>

