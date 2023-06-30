export const API_KEY = 'b26ae8c1ad7f0851f61f23d2a7c3573e';
export const API_URL = "https://api.themoviedb.org/3/";
export const TRENDING = "trending/movie/day";
export const UPCOMING = "movie/upcoming";
export const TOP_RATED = "movie/top_rated";
export const BACK_DROP_IMAGE_PATH = "https://image.tmdb.org/t/p/original";
const defaultImage = "https://www.movienewz.com/img/films/poster-holder.jpg";

export const movieDetailsEndpoint = id => `${API_URL}movie/${id}?api_key=${API_KEY}`;
export const movieCreditsEndpoint = id => `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`;
export const movieSimilarEndpoint = id => `${API_URL}/movie/${id}/similar?api_key=${API_KEY}`;
export const personDetailsEndpoint = id => `${API_URL}/person/${id}?api_key=${API_KEY}`;
export const personMovieEndpoint = id => `${API_URL}/person/${id}/movie_credits?api_key=${API_KEY}`;
export const movieSearchEndpoint = `${API_URL}search/movie?api_key=${API_KEY}`;

export const profilePath = (path) => {
    return path != null ? BACK_DROP_IMAGE_PATH + path : defaultImage;
}









