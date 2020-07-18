<template>
  <div class="wrapper" :style="{ 'background-color': form.colors.background, 'background-image': `url(${form.images.background})` }">
    <v-container fluid class="pb-16">
      <v-main class="main">

        <v-row no-gutters>
          <v-col class="text-center">
            <v-btn-toggle
              v-model="ajustedTab"
              dense
              dark
            >
              <v-btn color="primary" class="px-8" @click="tab = 0">
                <v-icon left>create</v-icon> Editar
              </v-btn>

              <v-btn color="primary" class="px-8" @click="showPreview">
                <v-icon left>visibility</v-icon> Preview
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <FormEdit
          v-if="tab === 0"
          v-model="form"
          :valid.sync="valid"
        />
        <FormPreview
          v-if="tab === 1"
          v-model="form"
        />

      </v-main>
    </v-container>

    <Drawer
      v-model="form"
      :visible="tab === 0"
    />

  </div>
</template>

<script>
import Drawer from '../components/Form/Drawer'
import FormEdit from '../components/Form/Edit'
import FormPreview from '../components/Form/Preview'
import EventBus from '../EventBus'

export default {
  name: 'CreateForm',
  components: {
    FormPreview,
    FormEdit,
    Drawer
  },
  data: () => ({
    tab: 0,
    ajustedTab: 0,
    valid: false,
    form: {
      title: '',
      desc: '',
      banner: false,
      header: true,
      images: {
        banner: null,
        background: null
      },
      colors: {
        background: '#FAFDFF',
        theme: null
      },
      questions: [{ id: Date.now() }]
    }
  }),
  methods: {
    async showPreview () {
      if (!this.valid) {
        this.$SnackBar.open('Existem campos que são obrigatórios!', 'error')
        EventBus.$emit('validateForm')

        await this.$nextTick()
        this.ajustedTab = 0
        return
      }
      this.tab = 1
    }
  }
}
</script>
