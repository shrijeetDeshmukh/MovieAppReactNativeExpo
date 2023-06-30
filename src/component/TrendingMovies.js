import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';

const TrendingMovies = ({data}) => {
    const {width,height}= useWindowDimensions();
    const navigation = useNavigation();
    console.log('trendingData---',data);
    const movieDetail = (item) => {
      try {
        navigation.navigate('Details',item);
      } catch (error) {
        console.log('error---',error);
      }
   
    }
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mt-8">Trending</Text>
      <Carousel data={data} renderItem={({item}) => <MovieCard movie={item} navigateToMovieDetail={()=>movieDetail(item)} />}  firstItem={1} inactiveSlideOpacity={0.60} sliderWidth={width} itemWidth={width*0.62} sliderHeight={height} slideStyle={{display:'flex',alignItems:'center'}}></Carousel>
    </View>
  )
}

export default TrendingMovies

const styles = StyleSheet.create({})