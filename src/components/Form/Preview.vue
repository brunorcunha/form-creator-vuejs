<template>
  <div v-if="value">
    <v-row v-if="value.banner">
      <v-col>
        <div class="banner" :style="{ 'background-image': `url(${value.images.banner})` }"></div>
      </v-col>
    </v-row>

    <v-row v-if="value.header">
      <v-col>
        <v-card
            outlined
        >
          <div class="header" :style="{ background: value.colors.theme }"></div>
          <v-card-text class="pb-0 pt-6">
            <h1 class="text-h4">{{ value.title }}</h1>
            <p class="text-subtitle-1">{{ value.desc }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-form v-model="valid" ref="form">
      <template v-for="question in value.questions">
        <v-row no-gutters :key="`q${question.id}`" class="mb-2">
          <v-col>
            <v-card outlined>
              <v-card-text>

                <template v-if="question.type === 3">
                  <v-btn
                    color="primary"
                    @click="openLink(question.link)"
                  >
                    Abrir Link <v-icon right small>launch</v-icon>
                  </v-btn>
                </template>

                <template v-if="question.type === 4">
                  <v-btn
                    color="primary"
                    @click="openResponses"
                  >
                    Mostrar Respostas
                  </v-btn>
                </template>

                <template v-else-if="question.type === 1">
                  <v-row no-gutters>
                    <v-col class="text-h6">{{ question.question }}</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <v-text-field
                        :placeholder="question.responsePlaceholder"
                        :rules="[rule.required]"
                        v-model="responses[question.id]"
                      />
                    </v-col>
                  </v-row>
                </template>

                <template v-else-if="question.type === 2">
                  <v-row no-gutters>
                    <v-col class="text-h6">{{ question.question }}</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <InputMask
                        prepend-inner-icon="smartphone"
                        :placeholder="question.responsePlaceholder"
                        :mask="maskTelefone"
                        :rules="[rule.required, rule.phone]"
                        v-model="responses[question.id]"
                      />
                    </v-col>
                  </v-row>
                </template>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-form>
  </div>
</template>

<script>
import InputMask from '../InputMask'
export default {
  name: 'Preview',
  components: {InputMask},
  props: {
    value: { type: Object, default: null }
  },
  data: () => ({
    responses: {},
    valid: false,
    maskTelefone: ['(99) 9999-9999', '(99) 9 9999-9999'],
    rule: {
      required: v => !!v || 'Campo Obrigatório',
      phone: v => {
        if (v && v.length > 0) {
          const pattern = /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/
          return (pattern.test(v)) || 'Número de telefone inválido'
        }
        return true
      }
    }
  }),
  methods: {
    openLink (link) {
      window.open(link)
    },
    openResponses () {
      if (!this.$refs.form.validate()) {
        this.$SnackBar.open('Existem campos obrigatórios!', 'error')
        return
      }
      this.$ResponsesDialog.open(this.value.questions, this.responses)
    }
  }
}
</script>
