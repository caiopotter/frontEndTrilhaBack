<template>
  <v-app>
    <v-app-bar
      app
      color="dark-gray"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
          transition="scale-transition"
          width="40"
        />

      <v-btn text>Discover</v-btn>
      <v-btn text>Movies</v-btn>
      <v-btn text>TV Shows</v-btn>
      <v-btn text>People</v-btn>
      </div>

      <v-text-field class="mt-6"
      color="dark-gray"
      label="Search for a movie, tv show, person..."
      prepend-inner-icon="search"
      v-model="searchFilters"
      @input="applySearchFilter()"
    ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn text>Sign Up</v-btn>
      <v-btn text>Sign In</v-btn>
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
  }),

  created(){
    //this.getMovies();
  },

  methods:{
    applySearchFilter(){
      this.$store.state.searchFilter = this.searchFilters
      const axios = require('axios');
      axios
      .get(this.apiSearchUrl + '?param=' + this.$store.state.searchFilter)
      .then(response => (this.$store.state.movieList = response.data))
    },
    /*getMovies(){
      const axios = require('axios');
      axios
      .get(this.apiUrl)
      .then(response => (this.movieList = response.data))
    }*/
  }
};
</script>
