import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions, TextInput, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../component/Loading';
import { fetchSearchMovie } from '../API/movie_Api_call';
import { profilePath } from '../constants/constants';
Loading
const SearchScreen = () => {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();
    const [searchMovie, setSearchMovie] = useState('');
    const [movieList, setMovieList] =useState([]);
    const [loading, setLoading] = useState(false);
    const searchMovies = async () => {
        setLoading(true);
        console.log('Typing movie name',searchMovie);
        const data=await fetchSearchMovie(searchMovie);
        data.data?setMovieList(data.data.results):setMovieList([]);
        setLoading(false);
    }
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border-2 border-neutral-500 rounded-full">
                <TextInput className="pb-1 pl-6 flex-1 font-semibold text-white" placeholder='Search Movie' placeholderTextColor='lightgray' onChangeText={(text) => setSearchMovie(text)} onChange={searchMovies} />
                <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-neutral-500 p-3 m-1 rounded-full">
                    <XMarkIcon color='white' size={25} />
                </TouchableOpacity>
            </View>
            {
                loading ? (<Loading />) : (
                    <View>
                        {
                            movieList?.length > 0 ? (
                                <View>
                                    <Text className="text-white text-xl ml-5 ">Search Results {movieList?.length}</Text>
                                    <View className="mt-5" >
                                        <FlatList numColumns={2} data={movieList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} className="space-y-3 mb-20" renderItem={({item}) => {
                                            return (
                                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', item)}>
                                                    <View className="flex-1 justify-between items-center">
                                                        <Image className="rounded-xl" source={{uri:profilePath(item.backdrop_path)}} style={{ width: width * 0.44, height: height * 0.3 }} />
                                                        <Text className="text-neutral-300 text-base ml-2 my-2 font-semibold">{
                                                            item.original_title?.length > 16 ? item.original_title?.substring(0, 16) + '...' : item.original_title
                                                        }</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }} />
                                    </View>
                                </View>
                            ) : (<View className='items-center'>
                                <Image source={require('../../assets/images/movieTime.png')} style={{ width: width * 0.8, height: height * 0.3 }} />
                                <Text className="text-white text-xl ml-5 font-bold ">No Results</Text>
                            </View>)
                        }
                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})