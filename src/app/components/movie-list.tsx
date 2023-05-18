import MovieCard from '@/app/components/movie-card'
import { Movie } from '@/app/common'

const MovieList = ({
  movies,
  enableRemove = true,
}: {
  movies: Movie[]
  enableRemove: boolean
}) => {
  return (
    <ol className="flex flex-wrap justify-center">
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className="p-2">
            <MovieCard movie={movie} enableRemove={enableRemove} />
          </div>
        </li>
      ))}
    </ol>
  )
}

export default MovieList
