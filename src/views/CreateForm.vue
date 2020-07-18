<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters>
        <v-col>
          <div class="banner"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Question />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Question from '../components/Question'
export default {
  name: 'Home',
  components: {Question}
}
</script>
