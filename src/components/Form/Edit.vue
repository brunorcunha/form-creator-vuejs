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
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  label="Título do Formulário"
                  v-model="header.title"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  label="Descrição"
                  v-model="header.desc"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-form v-model="valid" ref="form">
      <v-input
        v-model="questions"
        :rules="[
          v => v.filter(e => e.type === 3 || e.type === 4).length <= 3 || 'São permitidos somente 3 botões por formulário.',
          v => v.filter(e => e.type === 2).length <= 1 || 'É permitido somente um campo de telefone.'
        ]"
      />
      <draggable
        v-model="questions"
        handle=".cursorMove"
      >
        <template v-for="(question, index) in questions">
          <v-row
            :key="`question${question.id}`"
            @click="selectedQuestion = question.id"
          >
            <v-col>
              <Question
                v-model="questions[index]"
                :selected="selectedQuestion === question.id"
                @delete="deleteQuestion(index)"
                @duplicate="duplicateQuestion"
              />
            </v-col>
          </v-row>
        </template>
      </draggable>
    </v-form>

    <v-row>
      <v-col>
        <v-btn block color="primary" @click="addQuestion">
          Adicionar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Question from './Question'
import EventBus from '../../EventBus'

export default {
  name: 'Edit',
  components: {
    draggable,
    Question
  },
  props: {
    value: { type: Object, default: null }
  },
  data: () => ({
    valid: false,
    selectedQuestion: null,
    header: {
      title: '',
      desc: ''
    },
    questions: []
  }),
  watch: {
    questions: {
      handler: function (questions) {
        this.$emit('input', { ...this.value, questions })
      },
      deep: true
    },
    header: {
      handler: function (val) {
        this.$emit('input', { ...this.value, ...val })
      },
      deep: true
    },
    valid (val) {
      this.$emit('update:valid', val)
    }
  },
  mounted () {
    this.initialize()
    EventBus.$on('validateForm', this.validate)
  },
  beforeDestroy () {
    EventBus.$off('validateForm', this.validate)
  },
  methods: {
    initialize () {
      this.header = {
        title: this.value.title,
        desc: this.value.desc
      }
      this.questions = this.value.questions
      this.selectedQuestion = this.questions[0].id
    },
    addQuestion () {
      const id = Date.now()
      this.questions.push({ id })
      this.selectedQuestion = id
    },
    deleteQuestion (index) {
      this.questions.splice(index, 1)
    },
    duplicateQuestion (question) {
      const id = Date.now()
      this.questions.push({ ...question, id })
      this.selectedQuestion = id
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
