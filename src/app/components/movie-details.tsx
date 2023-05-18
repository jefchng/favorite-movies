import { Movie } from '@/app/common'

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <div className="flex space-x-2">
        <div className="font-bold text-sm">Average Rating: </div>
        <div className="text-sm">{movie.averageRating}</div>
      </div>
      <div className="space-x-2 text-sm">
        <div>{movie.description}</div>
      </div>
    </div>
  )
}

export default MovieDetails
