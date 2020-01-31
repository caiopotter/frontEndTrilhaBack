<template>
  <v-app>
    <v-app-bar
      app
      color="dark-gray"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          @click="goTohome()"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
          transition="scale-transition"
          width="40"
        />

      <v-btn @click="goTohome()" text>Home</v-btn>
      <v-btn @click="showFavorites()" v-if="$store.state.userLoggedIn" text>Favorites</v-btn>
      </div>

      <v-text-field class="mt-6"
      color="dark-gray"
      label="Search for a movie, tv show, person..."
      prepend-inner-icon="search"
      v-model="searchFilters"
      @input="applySearchFilter()"
    ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn v-if="!$store.state.userLoggedIn" @click="goToView('/signup')" text>Sign Up</v-btn>
      <v-btn v-else text>{{$store.state.userLoggedIn.name}}</v-btn>
      <v-btn v-if="!$store.state.userLoggedIn" @click="goToView('/login')" text>Sign In</v-btn>
      <v-btn v-else @click="logout()" text>Logout</v-btn>
    </v-app-bar>
    
   <v-content>
      <v-container>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    movies: {},
    info: {},
    searchFilters: '',
    apiUrl: 'http://localhost/app/movies/',
    apiSearchUrl: 'http://localhost/app/moviesSearchTitle',
    apiFavoritesUrl: 'http://localhost/app/userFavorites/',
    apiSearchFavoritesUrl: 'http://localhost/app/searchInFavorites'
  }),

  methods:{
    applySearchFilter(){
      const axios = require('axios');
      if(this.$store.state.favoriteMovies){
        if(this.searchFilters){
          axios
          .get(this.apiSearchFavoritesUrl + '/' + this.$store.state.userLoggedIn.id + '?param=' + this.searchFilters)
          .then(response => (this.$store.state.movieList = response.data))
        }else{
          this.showFavorites();
        }
        
      }else{
        this.$store.state.searchFilter = this.searchFilters
        axios
        .get(this.apiSearchUrl + '?param=' + this.$store.state.searchFilter)
        .then(response => (this.$store.state.movieList = response.data))
      }
    },
    goToView(path){
      this.$router.push(path);
    },
    logout(){
      this.$store.state.userLoggedIn = undefined
      this.goTohome();
    },
    goTohome(){
      this.getMovies();
      this.$store.state.favoriteMovies = false;
      this.goToView("/");
    },
    showFavorites(){
      const axios = require('axios');
      axios
      .get(this.apiFavoritesUrl + this.$store.state.userLoggedIn.id)
      .then(response => (this.$store.state.movieList = response.data))
      this.$store.state.favoriteMovies = true;
    },
    getMovies(){
      const axios = require('axios');
      axios
      .get(this.apiUrl)
      .then(response => (this.$store.state.movieList = response.data))
    },
  }
};
</script>
