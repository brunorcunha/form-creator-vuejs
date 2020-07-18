<template>
  <v-card
    outlined
    class="question"
  >
    <div class="selectedQuestion" :style="{ background: primary }" v-if="selected"></div>
    <div class="cursorMove"><v-icon>dehaze</v-icon></div>

    <v-card-text class="pb-0">
      <v-row no-gutters>
        <v-col>
          <v-select
            outlined
            dense
            label="Tipo"
            :menu-props="{ offsetY: true }"
            :items="responseItems"
            :rules="[rule.required]"
            v-model="type"
          />
        </v-col>
      </v-row>

      <template v-if="type === 3">
        <v-row no-gutters>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Link Externo"
              :rules="[rule.required]"
              v-model="link"
            />
          </v-col>
        </v-row>
      </template>
      <template v-else-if="type === 1 || type === 2">
        <v-row no-gutters>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Pergunta"
              :rules="[rule.required]"
              v-model="question"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-text-field
              outlined
              dense
              label="Placeholder da Resposta"
              :rules="[rule.required]"
              v-model="responsePlaceholder"
            />
          </v-col>
        </v-row>
      </template>
    </v-card-text>

    <div v-show="selected">
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="duplicateQuestion"><v-icon class="pr-2">content_copy</v-icon> Duplicar</v-btn>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                color="red"
                @click="deleteQuestion"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>Remover</span>
        </v-tooltip>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Question',
  props: {
    selected: { type: Boolean, default: false },
    value: { type: Object, default: null }
  },
  data: () => ({
    type: null,
    link: null,
    question: null,
    responsePlaceholder: null,
    responseItems: [
      { text: 'Pergunta (Texto Simples)', value: 1 },
      { text: 'Pergunta (Telefone)', value: 2 },
      { text: 'Botão (Link Externo)', value: 3 },
      { text: 'Botão (Mostrar Respostas)', value: 4 }
    ],
    rule: {
      required: v => !!v || 'Campo Obrigatório'
    }
  }),
  computed: {
    primary () {
      return this.$vuetify.theme.themes.light.primary
    }
  },
  watch: {
    question () {
      this.updateQuestion()
    },
    responsePlaceholder () {
      this.updateQuestion()
    },
    link () {
      this.updateQuestion()
    },
    type () {
      this.updateQuestion()
    }
  },
  mounted () {
    this.type = this.value.type || null
    this.link = this.value.link || null
    this.question = this.value.question || null
    this.responsePlaceholder = this.value.responsePlaceholder || null
    if (!this.type) this.type = 1
  },
  methods: {
    deleteQuestion () {
      this.$emit('delete')
    },
    duplicateQuestion () {
      this.$emit('duplicate', {
        type: this.type,
        link: this.link,
        question: this.question,
        responsePlaceholder: this.responsePlaceholder
      })
    },
    updateQuestion () {
      this.$emit('input', {
        ...this.value,
        type: this.type,
        link: this.link,
        question: this.question,
        responsePlaceholder: this.responsePlaceholder
      })
    }
  }
}
</script>

