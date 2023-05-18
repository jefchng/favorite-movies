import { FAVORITE_MOVIES_KEY } from '@/app/constants'

export type Movie = {
  id: string
  title: string
  releaseDate: string
  posterImageSrc: string
  description: string
  averageRating: number
}

export type FavoriteMovies = {
  [key: string]: { movie: Movie; timeAdded: number }
}

export const getFavoriteMovies = async (): Promise<FavoriteMovies> => {
  let response = {}
  if (typeof window !== 'undefined') {
    const favoriteMovies = localStorage.getItem(FAVORITE_MOVIES_KEY)
    if (favoriteMovies) {
      response = JSON.parse(favoriteMovies)
    }
  }

  return Promise.resolve(response)
}

export const saveToFavorite = async (movie: Movie) => {
  const favoriteMovies = await getFavoriteMovies()
  if (!(movie.id in favoriteMovies)) {
    favoriteMovies[movie.id] = { movie, timeAdded: Date.now() }
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        FAVORITE_MOVIES_KEY,
        JSON.stringify({ ...favoriteMovies }),
      )
    } else {
      throw Error('Failed to save')
    }
  }
}

export const removeFromFavorite = async (movie: Movie) => {
  const favoriteMovies = await getFavoriteMovies()
  if (movie.id in favoriteMovies) {
    delete favoriteMovies[movie.id]
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        FAVORITE_MOVIES_KEY,
        JSON.stringify({ ...favoriteMovies }),
      )
    } else {
      throw Error('Failed to remove')
    }
  }
}
