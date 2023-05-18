import { Movie } from '@/app/common'
import { MAX_PAGE_SIZE, DEFAULT_PAGE } from '@/app/constants'
import { notFound } from 'next/navigation'
import MovieList from '@/app/components/movie-list'
import Link from 'next/link'

const cleanPageNumber = (page: number = DEFAULT_PAGE) => {
  let pageToUse = DEFAULT_PAGE
  if (page >= 1) {
    pageToUse = Math.round(page)
  }
  return pageToUse
}

const getPopularMovies = async (page: number) => {
  const cleanedPageNumber = cleanPageNumber(page)
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${cleanedPageNumber}`,
    { next: { revalidate: 60 * 1 } },
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Popular = async ({ searchParams }: { searchParams: any }) => {
  const intPage = cleanPageNumber(+searchParams?.page)
  if (
    isNaN(intPage) ||
    !Number.isSafeInteger(intPage) ||
    intPage <= 0 ||
    intPage > MAX_PAGE_SIZE
  ) {
    notFound()
  }
  const popularMoviesRes = await getPopularMovies(intPage)

  const currPage: number = popularMoviesRes.page

  const isPrevLinkActive = currPage > 1

  const isNextLinkActive = currPage < MAX_PAGE_SIZE

  const popularMovies: Movie[] = popularMoviesRes.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    posterImageSrc: movie.poster_path,
    description: movie.overview,
    averageRating: movie.vote_average,
  }))

  return (
    <main>
      <MovieList enableRemove={false} movies={popularMovies} />
      <div className="flex justify-center space-x-4">
        {isPrevLinkActive && (
          <Link href={`?page=${currPage - 1}`}>
            <div className="text-white p-4 bg-teal-500 rounded-lg	">Prev</div>
          </Link>
        )}
        {isNextLinkActive && (
          <Link href={`?page=${currPage + 1}`}>
            <div className="text-white p-4 bg-teal-500 rounded-lg	">Next</div>
          </Link>
        )}
      </div>
    </main>
  )
}

export default Popular
