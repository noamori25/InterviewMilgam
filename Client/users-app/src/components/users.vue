<template>
<div>
    <v-text-field v-model="search" @input="searchUsers" placeholder="Search"></v-text-field>

  <v-simple-table fixed-header dense>
  <thead>
    <tr>
      <th @click="sortUsers('Id')">ID</th>
      <th @click="sortUsers('FirstName')">first name</th>
      <th @click="sortUsers('LastName')">last name</th>
      <th @click="sortUsers('Email')">email</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody >
    <tr v-for='(user) in searchUsers' :key='user.Id'>
      <td>{{user.Id}}</td>
      <td>{{user.FirstName}}</td>
      <td>{{user.LastName}}</td>
      <td>{{user.Email}}</td>
     <td>
       <v-tab color="#FCE4EC" :to= "{name: 'update', params: {id: user.Id, first: user.FirstName, last: user.LastName, email: user.Email}}">Edit
         </v-tab></td>
     <td><v-tab>
        <v-btn depressed color="#F48FB1" v-on:click="deleteUser(user.Id)" >Delete</v-btn>
       </v-tab></td>
    </tr>
  </tbody>
</v-simple-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'users',
  data () {
    return {
      users: [],
      usersFilter:[],
      currentSort: 'name',
      currentSortDir: 'asc',
      search: ''
    }
  },
  computed:{
      searchUsers () {
        var filtered = this.users
        const valueToSearch = this.search.toLowerCase().trim()
        if(valueToSearch) {
          filtered = this.users.filter(u => u.FirstName.toLowerCase().indexOf(valueToSearch) > -1 
          || u.LastName.toLowerCase().indexOf(valueToSearch) > -1
          || u.Email.toLowerCase().indexOf(valueToSearch) > -1)
        }
        return filtered
      },
  },
  methods: {
    deleteUser (id) {
      console.log(id)
      axios.delete(`http://localhost:3000/api/delete/${id}`)
        .then(Response => {
          console.log(Response)
          const index = this.users.findIndex(u => u.Id === id); 
          this.users.splice(index, 1)
        })
    },
    sortUsers: function (sortColumn) {
      this.sort(sortColumn)
      return this.users.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    sort: function (sortColumn) {
      if (sortColumn === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortColumn
    }
  },
  created () {
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        this.users = response.data[0]
        console.log(this.users)
      })
  }

}

</script>
