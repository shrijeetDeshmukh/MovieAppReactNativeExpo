import { StyleSheet, Text, View, useWindowDimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles_app, theme } from '../theme/theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../component/MovieList';
import Loading from '../component/Loading';
import { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import { profilePath } from '../constants/constants';
import { fetchMovieDetails, fetchPersonDetails, fetchPersonMovies } from '../API/movie_Api_call';

const PersonScreenn = () => {
  const iOS = Platform.OS === "ios";
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const marginVertical = iOS ? '' : 'my-3';
  const [isFavourite, setFavourite] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [loading, isLoading] = useState(true);
  const { params: item } = useRoute();
  const [personDetails, setPersonDetails] = useState({})
  useEffect(() => {
    getPersonDetails(item.id);
    getPersonalMovies(item.id);
    isLoading(false);
  }, [item])

  const getPersonDetails = async (person_id) => {
    const data = await fetchPersonDetails(person_id);
    //console.warn(data.data);
    data.data ? setPersonDetails(data.data) : null;
  }
  const getPersonalMovies = async (person_id) => {
    const data = await fetchPersonMovies(person_id);
    data.data ? setMovieList(data.data.cast) : null;
  }
  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{}}>
      {/* backbutton */}
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={navigation.goBack} style={styles_app.background} className="rounded-xl p-1 mx-4">
          <ChevronLeftIcon size={30} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFavourite(!isFavourite)} className="rounded-xl p-1 mx-4">
          <HeartIcon size={30} color={isFavourite ? 'red' : 'white'} strokeWidth={2.5} />
        </TouchableOpacity>
      </SafeAreaView>
      {
        loading ? (<Loading />) : (
          <View>
            {/* person details */}
            <View className="flex-row justify-center mt-5" style={{ shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 }}>
              <View className="items-center overflow-hidden rounded-full w-73 h-72 border-2 bg-neutral-100">
                <Image source={{ uri: profilePath(item.profile_path) }} style={{ width: width * 0.74, height: height * 0.43 }} />
              </View>
            </View>
            <View className="mt-6 ">
              <Text className="text-3xl text-white font-bold text-center">{item.original_name}</Text>
              <Text className="text-base font-bold text-center text-neutral-500 ">{personDetails.place_of_birth}</Text>
            </View>
            <View className="mt-3 p-4 mx-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-500 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">{item.gender === 2 ? (<Text>Male</Text>) : <Text>Female</Text>}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-500 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{personDetails.birthday}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-500 px-2 items-center">
                <Text className="text-white font-semibold">Known for </Text>
                <Text className="text-neutral-300 text-sm">{item.known_for_department}</Text>
              </View>
              <View className=" px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{item.popularity}</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                {personDetails.biography}
              </Text>
            </View>

            {/* movie list */}
            <MovieList title='Movies' hideSeeAll={true} data={movieList} />
          </View>
        )
      }

    </ScrollView>
  )
}

export default PersonScreenn

const styles = StyleSheet.create({})