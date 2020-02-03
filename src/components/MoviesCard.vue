<template>
  <v-container>
    <h1 v-if="$store.state.favoriteMovies">Favorite Movies</h1>
    <h1 v-else>Movie List</h1>
    <v-item-group
      >
        <v-container class="pa-0">
          <v-row>
            <v-col
              v-for="(movie, index) in $store.state.movieList"
              :key="index"
              cols="12"
              md="3"
            >
              <v-item>
                <v-card outlined>
                  <v-card-title>{{movie.title}}</v-card-title>
                  <v-img
                  :src="assemblePosterUrl(movie.poster_path)"
                  height="300"
                  contain
                  class="text-right pa-2">
                </v-img>
                <v-card-subtitle>
                  {{movie.tagline}}
                </v-card-subtitle>                
                  
                  <v-card-actions>
                    <v-btn
                      text
                      v-if="($store.state.userLoggedIn && !movieInFavoriteList(movie.id))"
                      @click="saveFavorite(movie.id)">
                      <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>
                    <v-btn
                      text
                      v-if="($store.state.userLoggedIn && movieInFavoriteList(movie.id))"
                      @click="removeFavorite(movie.id)">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
              
                    <v-spacer></v-spacer>
              
                    <v-btn
                      icon
                      @click="show = !show"
                    >
                      <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                      {{movie.overview}}
                    </v-card-text>
                  </div>
                </v-expand-transition>



                </v-card>
                
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

  </v-container>
</template>

<script>
export default {
  name: 'MoviesCard',

  created(){
    this.getMovies();
  },

  data: () => ({
    basePosterUrl: 'http://image.tmdb.org/t/p/w185',
    apiUrl: 'http://localhost/app/movies/',
    apiSaveFavoriteUrl: 'http://localhost/app/saveFavorite/',
    apiRemoveFavoriteUrl: 'http://localhost/app/removeFavorite/',
    show: false,
  }),

  methods: {
    getMovies(){
      const axios = require('axios');
      axios
      .get(this.apiUrl)
      .then(response => (this.$store.state.movieList = response.data))
    },
    assemblePosterUrl(posterPath){
      return this.basePosterUrl + posterPath;
    },
    saveFavorite(movieId){
      const axios = require('axios');
      axios
      .post(this.apiSaveFavoriteUrl + this.$store.state.userLoggedIn.id, 
        {id: movieId})
      .then(response => {
        (console.log(response));
        this.$store.state.userFavoriteList.push(movieId); 
        })
    },
    removeFavorite(movieId){
      const axios = require('axios');
      axios
      .post(this.apiRemoveFavoriteUrl + this.$store.state.userLoggedIn.id,
      {id: movieId})
      .then(response =>{(console.log(response))
      let favoriteMovieIndex = this.$store.state.userFavoriteList.indexOf(movieId);
      if(favoriteMovieIndex !== -1){
        this.$store.state.userFavoriteList.splice(favoriteMovieIndex, 1);
      }
      
      })
    },
    movieInFavoriteList(movieId){
      console.log(this.$store.state.userFavoriteList)
      return this.$store.state.userFavoriteList.indexOf(movieId) >= 0;
    }
  },

};
</script>
