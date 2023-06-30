import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { styles_app } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { BACK_DROP_IMAGE_PATH, profilePath } from '../constants/constants'

const MovieList = ({ title, data, hideSeeAll = false }) => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const movieDetailNavigate = (item) => {
        console.log('item--det-',item);
        navigation.push('Details', item);
    }
    return (
        <View className="mb-8 space-y-4">
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                <TouchableOpacity>
                    {!hideSeeAll ? <Text style={styles_app.text} className='text-white text-lg'>See all</Text> : null}
                </TouchableOpacity>
            </View>
            {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback key={index}>
                                <View>
                                    <Image className=' rounded-3xl' style={{ width: width * 0.33, height: height * 0.22 }} source={require('../../assets/images/moviePoster2.png')} />
                                    <Text className='text-neutral-200 text-lg ml-2 flex-wrap'>{
                                        movieName.length > 12 ? movieName.substring(0, 14) + '...' : movieName
                                    }</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView> */}
            <FlatList showsHorizontalScrollIndicator={false} data={data} horizontal renderItem={({item}) => {
                return (
                    <TouchableWithoutFeedback onPress={() => movieDetailNavigate(item)}>
                        <View className="mx-2">
                            <Image  className=' rounded-3xl' style={{ width: width * 0.33, height: height * 0.22 }} source={{uri:profilePath(item.backdrop_path)}} />
                            <Text className='text-neutral-200 text-lg ml- flex-wrap'>{
                                item?.title.length > 12 ? item?.title.substring(0, 14) + '...' : item?.title
                            }</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }} />
        </View>
    )
}

export default MovieList

const styles = StyleSheet.create({})