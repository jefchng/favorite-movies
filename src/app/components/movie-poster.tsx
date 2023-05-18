import Image from 'next/image'

const MoviePoster = ({
  poster_path,
  alt,
  width,
}: {
  poster_path: string
  alt: string
  width: number
}) => {
  const height = (width / 2) * 3

  const src = `https://image.tmdb.org/t/p/w500/${poster_path}`
  return <Image src={src} alt={alt} width={width} height={height} />
}

export default MoviePoster
