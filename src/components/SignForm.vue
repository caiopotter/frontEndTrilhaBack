<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-layout
          justify-center
        >
          <v-flex
            xs12
          >
            <v-card width="400">
              <v-toolbar
                color="dark-gray"
                dark
                flat
              >
                <v-toolbar-title>Sign Up form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    color="dark-gray"
                    label="Name"
                    name="name"
                    v-model="name"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    color="dark-gray"
                    label="Email"
                    name="email"
                    v-model="email"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    color="dark-gray"
                    id="password"
                    label="Password"
                    v-model="password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="signUpUser()" dark color="dark-gray">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'SignForm',

  created(){
    
  },

  data: () => ({
    password: '',
    login: '',
    email: '',
    apiFormUrl: 'http://localhost/app/users',
    response: ''
  }),

  methods: {
    signUpUser(){
        const axios = require('axios');
        axios
        .post(this.apiFormUrl, {
        name: this.name,
        email: this.email,
        password: this.password
      }).then((Response) => {
        if(Response.status == 201){
            this.redirectToLogin();
        }
      });
    },
    redirectToLogin(){
            let routerToURL = "/about/";
            this.$router.push(routerToURL);
        }
  },

};
</script>