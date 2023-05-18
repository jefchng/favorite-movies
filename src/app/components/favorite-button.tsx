'use client'

import {
  Movie,
  getFavoriteMovies,
  FavoriteMovies,
  removeFromFavorite,
  saveToFavorite,
} from '@/app/common'
import useSWR from 'swr'
import { Button, useToast } from '@chakra-ui/react'

export const useFavorites = () => {
  const { data, isLoading, error, mutate } = useSWR('favorite_movies', () =>
    getFavoriteMovies(),
  )

  const movies = data || {}
  const removeMovie = (movie: Movie) => {
    const newData: FavoriteMovies = { ...data }
    delete newData[movie.id]
    mutate(
      async () => {
        await removeFromFavorite(movie)
        return newData
      },
      {
        optimisticData: newData,
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      },
    )
  }
  const saveMovie = (movie: Movie) => {
    const newData: FavoriteMovies = { ...data }
    newData[movie.id] = { movie, timeAdded: Date.now() }
    mutate(
      async () => {
        await saveToFavorite(movie)
        return newData
      },
      {
        optimisticData: newData,
        rollbackOnError: true,
        populateCache: false,
        revalidate: true,
      },
    )
  }

  return { movies, removeMovie, saveMovie, error, isLoading }
}

const getTimeElapsed = (milliseconds: number): string => {
  const timeElapsed = Date.now() - milliseconds

  let timeUnit

  if ((timeUnit = Math.floor(timeElapsed / 1000 / 60 / 60 / 24 / 365)) > 5) {
    return `over 5 years ago`
  }
  if ((timeUnit = Math.floor(timeElapsed / 1000 / 60 / 60 / 24 / 365)) > 0) {
    return `${timeUnit} year(s) ago`
  }
  if ((timeUnit = Math.floor(timeElapsed / 1000 / 60 / 60 / 24)) > 0) {
    return `${timeUnit} day(s) ago`
  }
  if ((timeUnit = Math.floor(timeElapsed / 1000 / 60 / 60)) > 0) {
    return `${timeUnit} hour(s) ago`
  }
  if ((timeUnit = Math.floor(timeElapsed / 1000 / 60)) > 5) {
    return `${timeUnit} minute(s) ago`
  }

  return 'recently'
}

const FavoriteButton = ({
  movie,
  onRemove,
  onSave,
  enableRemove = true,
}: {
  movie: Movie
  enableAdd?: boolean
  enableRemove?: boolean
  onRemove?: (movie: Movie) => void
  onSave?: (movie: Movie) => void
}) => {
  const { movies, saveMovie, removeMovie, error, isLoading } = useFavorites()
  const toast = useToast()

  const onSaveClick = async () => {
    toast.closeAll()
    try {
      await saveMovie(movie)
      onSave?.(movie)
      toast({
        title: 'Movie Saved!',
        description: `Added ${movie.title} to your list of favorites.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } catch (e) {
      toast({
        title: 'Favorites was not updated!',
        description: `Failed to add ${movie.title} to your list of favorites. Please try again!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const onRemoveClick = async () => {
    toast.closeAll()
    try {
      await removeMovie(movie)
      onRemove?.(movie)
      toast({
        title: 'Movie Removed!',
        description: `Removed ${movie.title} to your list of favorites.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } catch (e) {
      toast({
        title: 'Favorites was not updated!',
        description: `Failed to remove ${movie.title} to your list of favorites. Please try again!`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <div className="m-4">
      {movies && movies[movie.id] ? (
        <Button
          w="100%"
          colorScheme="red"
          variant="outline"
          onClick={onRemoveClick}
          isLoading={isLoading}
          isDisabled={!enableRemove}
        >
          {enableRemove
            ? 'Remove From Favorites'
            : `Added ${getTimeElapsed(movies[movie.id].timeAdded)}`}
        </Button>
      ) : (
        <Button
          w="100%"
          colorScheme="blue"
          variant="outline"
          onClick={onSaveClick}
          isLoading={isLoading}
        >
          Add To Favorites
        </Button>
      )}
    </div>
  )
}

export default FavoriteButton
