<template>
  <v-container>
    <v-item-group
      >
        <v-container class="pa-0">
          <v-row>
            <v-col
              v-for="(movie, index) in $store.state.movieList"
              :key="movie"
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
                      color="purple"
                      text>
                      Add to favorites {{index}}
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
  props: ["movieList"],

  created(){
    this.getMovies();
  },

  data: () => ({
    basePosterUrl: 'http://image.tmdb.org/t/p/w185',
    apiUrl: 'http://localhost/app/movies/',
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
    }
  },

};
</script>
