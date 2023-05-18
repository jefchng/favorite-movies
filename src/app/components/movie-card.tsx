import { Movie } from '@/app/common'
import MovieDetails from '@/app/components/movie-details'
import MoviePoster from '@/app/components/movie-poster'

import FavoriteButton from '@/app/components/favorite-button'

const MovieCard = ({
  movie,
  enableRemove = true,
}: {
  movie: Movie
  enableRemove: boolean
}) => {
  return (
    <div className="lg:w-64 md:w-80 sm:w-72 p-2 bg-slate-200 grow">
      <details className="flex space-x-4">
        <summary className="list-none">
          <div className="m-4">
            <div className="font-bold whitespace-normal h-20">
              {movie.title}
            </div>
            <div>
              <MoviePoster
                poster_path={movie.posterImageSrc}
                alt={`Poster for ${movie.title}`}
                width={500}
              />
            </div>
            <div className="justify-between flex my-2">
              <div className="font-bold text-sm">Release Date:</div>
              <div className="text-sm">{movie.releaseDate}</div>
            </div>
          </div>
        </summary>
        <MovieDetails movie={movie} />
      </details>
      <div className="my-4">
        <FavoriteButton movie={movie} enableRemove={enableRemove} />
      </div>
    </div>
  )
}

export default MovieCard
