<template>
<v-container>
   <v-form id="user-form">
  <v-row align="center">
    <v-col  name="first" id="first" cols="12" sm="6" md="3">
          <v-text-field v-model="first"
            label="first name"
            outlined
          ></v-text-field>
        </v-col>
         <v-col  name="last" id="last" cols="12" sm="6" md="3">
          <v-text-field v-model="last"
            label="last name"
            outlined
          ></v-text-field>
        </v-col>
         <v-col  name="email" id="email" cols="12" sm="6" md="3">
          <v-text-field v-model="email"
            label="email"
            outlined
          ></v-text-field>
        </v-col>
        </v-row>
                <v-row align="center">
        <v-col>
        <v-btn depressed color="#F48FB1" @click="CreateUser()" >Create</v-btn>
        </v-col>
                </v-row>
  </v-form>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateUser',
  data () {
    return {
      first: '',
      last: '',
      email: ''
    }
  },

  methods: {
    CreateUser () {
      console.log('inside')
      axios.post('http://localhost:3000/api/create', {first: this.first, last: this.last, email: this.email})
        .then(({data}) => {
          console.log(data)
          this.first = ''
          this.last = ''
          this.email = ''
        })
    }
  }
}

</script>


