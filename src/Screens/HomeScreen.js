import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { theme, styles_app } from '../theme/theme';
import TrendingMovies from '../component/TrendingMovies';
import MovieList from '../component/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../component/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../API/movie_Api_call';


const HomeScreen = () => {
    const ios = Platform.OS === 'ios' ? true : false;
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        console.log('inside get trending movies');
        const data = await fetchTrendingMovies();
        //console.log('trending movies data--', data.data.results);
        if (data && data.data.results) {
            setTrending(data.data.results);
            setLoading(false);
            //console.warn('tre', trending.length);
        }
    }
    const getUpcomingMovies = async () => {
        //console.log('inside get upcoming movies');
        const data = await fetchUpcomingMovies();
        if (data && data.data.results) {
            setUpcoming(data.data.results);
            setLoading(false);
           // console.warn('upcoming--', upcoming.length);
        }
    }
    const getTopRatedMovies = async () => {
        ///console.log('inside get top rated movies');
        const data = await fetchTopRatedMovies();
        if (data && data.data.results) {
            setTopRated(data.data.results);
            setLoading(false);
            //console.warn('--top rated', topRated.length);
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-neutral-900">
            { /* Search Bar and Logi */}
            <SafeAreaView className={ios ? 'mb-3' : 'mb-3'}>
                <StatusBar barStyle={'light-content'} />
                <View className="flex-row items-center justify-between mx-4">
                    <TouchableOpacity>
                        <Bars3CenterLeftIcon size={30} color="#fff" strokeWidth={2} />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold"><Text style={styles_app.text}>M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} color="#fff" strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? <Loading /> : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                        {/* {Trending movies} */}
                        {
                            trending.length > 0 && <TrendingMovies data={trending} />
                        }
                        {/* {Upcoming  movies row} */}
                        {
                            upcoming.length > 0 && <MovieList title="Upcoming Movies" data={upcoming} />
                        }

                        {/* {Top rated  movies row} */}
                        {
                            topRated.length > 0 && <MovieList title="Top rated Movies" data={topRated} />
                        }
                    </ScrollView>
                )
            }
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})