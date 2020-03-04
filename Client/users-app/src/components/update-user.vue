<template>
<v-container>
   <v-form id="update-form">
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
        <v-btn depressed color="#F48FB1" @click="updateUser()">Update</v-btn>
        </v-col>
                </v-row>
  </v-form>
</v-container>
</template>
<script>
import axios from 'axios'

export default {
  name: 'update',
  date () {
    return {
      id: 0,
      first: '',
      last: '',
      email: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    this.first = this.$route.params.first
    this.last = this.$route.params.last
    this.email = this.$route.params.email
  },
  methods: {
    updateUser () {
      console.log('inside')
      axios.put('http://localhost:3000/api/update', {first: this.first, last: this.last, email: this.email, id: this.id})
        .then(({data}) => {
          console.log(data)
          this.first = ''
          this.last = ''
          this.email = ''
          console.log(this.id)
        })
    }

  }

}
</script>
