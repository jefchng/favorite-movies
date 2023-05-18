'use client'

import MovieList from '@/app/components/movie-list'
import { useFavorites } from '@/app/components/favorite-button'
const Favorites = () => {
  const { movies, error, isLoading } = useFavorites()

  if (error) return <div>Error loading your favorites</div>
  if (isLoading) return <div>Loading your favorites...</div>

  return (
    <div className="bg-teal-200">
      {movies && (
        <MovieList
          enableRemove={true}
          movies={Object.values(movies)
            .sort((a, b) => b.timeAdded - a.timeAdded)
            .map((favoriteMovie) => favoriteMovie.movie)}
        />
      )}
    </div>
  )
}

export default Favorites
