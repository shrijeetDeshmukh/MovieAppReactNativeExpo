import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { BACK_DROP_IMAGE_PATH } from '../constants/constants';

const MovieCard = ({movie,navigateToMovieDetail}) => {
    console.log('poster--',movie.backdrop_path);
    const {width,height}=useWindowDimensions();
    return (
        <TouchableWithoutFeedback onPress={navigateToMovieDetail}>
            <Image className="rounded-3xl" style={{width:width*0.6,height:height*0.4}} source={{uri:BACK_DROP_IMAGE_PATH+movie.backdrop_path}} />
        </TouchableWithoutFeedback>
    )
}
export default MovieCard

const styles = StyleSheet.create({})