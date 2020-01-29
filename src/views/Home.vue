<template>
  <div class="home">
    <MoviesCard/>
  </div>
</template>

<script>
import MoviesCard from '@/components/MoviesCard.vue'

export default {
  name: 'home',
  components: {
    MoviesCard
  }, 
}
</script>
