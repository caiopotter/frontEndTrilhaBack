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
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
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
                  <font v-if="!isValidPass" style="color: red">Dados inválidos
                  </font>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mr-2" @click="loginUser()" dark color="dark-gray">Login</v-btn>
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
  name: 'LoginForm',

  created(){
    
  },

  data: () => ({
    password: '',
    login: '',
    email: '',
    apiFormUrl: 'http://localhost/app/usersSearchByEmail',
    apiFavoritesUrl: 'http://localhost/app/userFavorites/',
    response: '',
    isValidPass: true,
  }),

  methods: {
    loginUser(){
        const axios = require('axios');
        axios
        .get(this.apiFormUrl + '?param=' + this.email).then((Response) => {
        if((Response.status == 200) && Response.data.length > 0){
            this.validateUser(Response.data[0]);
        }
      });
    },
    redirectTo(path){
        let routerToURL = path;
        this.$router.push(routerToURL);
    },
    validateUser(user){
        if(this.password == user.password){
          this.$store.state.userLoggedIn = user;
          this.getUserFavoriteList();
          this.redirectTo('/')
        }else{
            this.isValidPass =  false;
            setTimeout(()=>{
                this.isValidPass =  true;
          },5000);
            
        }
    },
    getUserFavoriteList(){
      const axios = require('axios');
      axios
      .get(this.apiFavoritesUrl + this.$store.state.userLoggedIn.id)
      .then(response => {
        for(let movie in response.data){
          this.$store.state.userFavoriteList.push(movie);
        }
      });
      this.$store.state.favoriteMovies = true;
    }
  },

};
</script>