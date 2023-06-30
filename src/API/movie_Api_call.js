import axios from "axios";
import { API_KEY, API_URL, TRENDING, UPCOMING, TOP_RATED, movieDetailsEndpoint, movieCreditsEndpoint, movieSimilarEndpoint, personDetailsEndpoint, personMovieEndpoint, movieSearchEndpoint } from "../constants/constants";
//API endpoints

const trendingMovieEndpoints = API_URL + TRENDING + `?api_key=${API_KEY}`;
const upcomingMovieEndpoints = API_URL + UPCOMING + `?api_key=${API_KEY}`;
const topRatedMovieEndpoints = API_URL + TOP_RATED + `?api_key=${API_KEY}`;

const apiCall = async (endPoint, params) => {
    console.log('endpoint---', endPoint);
    const options = {
        method: 'GET',
        url: endPoint,
        params: params ? params : {}
    }
    try {
        const response = await axios(options);
        return response;

    } catch (error) {
        console.log('error--', error);
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovieEndpoints);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovieEndpoints);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovieEndpoints);
}


export const fetchMovieDetails = (movieId) => {
    return apiCall(movieDetailsEndpoint(movieId));
}

export const fetchMovieCredits = (movieId) => {
    return apiCall(movieCreditsEndpoint(movieId));
}

export const fetchSimilarMovies = (movieId) => {
    return apiCall(movieSimilarEndpoint(movieId));
}

export const fetchPersonDetails = (personId) => {
    return apiCall(personDetailsEndpoint(personId));
}

export const fetchPersonMovies = (personId) => {
    return apiCall(personMovieEndpoint(personId));
}

export const fetchSearchMovie = (queryParam) => {
    if(queryParam.length>3){
        const params = { query: queryParam, include_adult: 'false', language: 'en-US', page: '1' }
        return apiCall(movieSearchEndpoint,params)
    }else{
        return null;
    } 
}
