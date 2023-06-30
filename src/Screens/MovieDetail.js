import { StyleSheet, Text, View, ScrollView, SafeAreaView, Touchable, useWindowDimensions, Image,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles_app, theme } from '../theme/theme'
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../component/Cast'
import MovieList from '../component/MovieList';
import Loading from '../component/Loading'
import { profilePath } from '../constants/constants'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies } from '../API/movie_Api_call'

const MovieDetail = () => {
  const { params: item } = useRoute();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [isFavourite, setFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  console.log('item--', item.id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (movieId) => {
    const data = await fetchMovieDetails(movieId);
    data.data ? setMovieDetails(data.data) : null;
    //console.warn('movieDetails--', movieDetails.data);
    setLoading(false);
  }
  const getMovieCredits = async (movieId) => {
    const data = await fetchMovieCredits(movieId);
    setCast(data.data.cast);
  }
  const getSimilarMovies = async (movieId) => {
    const data=await fetchSimilarMovies(movieId);
    console.log(data.data.results);
    setSimilarMovies(data.data?.results);
  }
  return (
    <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="w-full">
        <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center ${Platform ==='iOS'?'mx-4':'mx-1 my-5'}`}>
          <TouchableOpacity onPress={navigation.goBack} style={styles_app.background} className="rounded-xl p-1 mx-4">
            <ChevronLeftIcon size={30} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavourite(!isFavourite)} className="rounded-xl p-1 mx-4">
            <HeartIcon size={30} color={isFavourite ? theme.background : 'white'} strokeWidth={2.5} />
          </TouchableOpacity>
        </SafeAreaView>
        {
          loading ? <Loading /> : (
            <View>
              <Image  source={{ uri: profilePath(item.backdrop_path) }} style={{ width: width, height: height * 0.55 }} />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{
                  position: 'absolute', bottom: 0, width: width, height: height * 0.40
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          )
        }

        {
          loading ? (<Loading />) : (<View>

            {/* {Movie details} */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
              {/* title */}
              <Text className="text-white text-2xl text-center font-bold tracking-wider">{item.title}</Text>
              {/* status release date run time */}
              <Text className="text-neutral-400 text-center font-semibold text-base">Released . {item.release_date} . {movieDetails?.runtime} Minutes </Text>
              {/* geners */}
              <View className='flex-row  justify-center mx-4 space-x-4'>
                {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                  Action .
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Thrill .
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Comedy .
                </Text> */}
                {
                  movieDetails?.genres?.length > 0 ? (
                  <ScrollView horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={{flex:1,justifyContent:'center'}}>
                    {
                      movieDetails?.genres?.map((item,index) => {
                        return index===movieDetails.genres.length-1? (
                          <Text key={item?.id} className="text-neutral-400 mx-1 font-semibold text-base text-center">
                            {item?.name}
                          </Text>
                        ):( <Text key={item?.id} className="text-neutral-400 mx-1 font-semibold text-base text-center">
                        {item?.name} <Text className="font-bold text-4xl"> .</Text>
                      </Text>)
                      })
                    }
                  </ScrollView>) : null
                }

              </View>
              <Text className="text-neutral-400 mx-4 tracking-wide">{item.overview}</Text>
            </View>
            {/* cast */}
            <Cast cast={cast}></Cast>

            {/* similar  movies */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
          </View>)

        }

      </View>
    </ScrollView>
  )
}

export default MovieDetail

const styles = StyleSheet.create({})