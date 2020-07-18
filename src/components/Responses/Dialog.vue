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
            <v-icon left>rate_review</v-icon>
            Respostas
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
      <v-card-text class="pt-3">
        <template v-for="question in questions">
          <v-row no-gutters class="mb-2" :key="`r${question.id}`" v-if="question.type === 1 || question.type === 2">
            <v-col>
              <v-row no-gutters><v-col class="text-h6">{{ question.question }}</v-col></v-row>
              <v-row no-gutters class="mb-2"><v-col>Resposta: {{ responses[question.id] }}</v-col></v-row>
              <v-divider />
            </v-col>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  data: () => ({
    dialog: false,
    questions: [],
    responses: {}
  }),
  computed: {
    primary () {
      return this.$vuetify.theme.themes.light.primary
    }
  },
  methods: {
    open (questions, responses) {
      this.dialog = true
      this.questions = questions
      this.responses = responses
    },
    close () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
