import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BACK_DROP_IMAGE_PATH, profilePath } from '../constants/constants'

const Cast = ({ cast }) => {
    const navigation = useNavigation();
    const navigateToProfile = (item) => {
        //console.warn('item',item);
        navigation.navigate("Profile",item);
    }
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    cast && cast.map((item, index) => {
                        return (
                            <TouchableOpacity  onPress={() => navigateToProfile(item)} key={index} className="mr-4">
                                <View className="overflow-hidden rounded-full w-20 h-20 items-center border-neutral-500">
                                    <Image className="rounded-xl w-20 h-24" source={{ uri:profilePath(item?.profile_path) }} />
                                </View>
                                <Text className="text-white text-xs mt-1">{
                                    item?.original_name.length > 10 ? item?.original_name.slice(0, 10) + "..." : item?.original_name
                                }</Text>
                                <Text className="text-neutral-400 text-xs mt-1">{
                                    item?.name.length > 10 ? item?.name.slice(0, 10) + "..." : item?.name
                                }</Text>
                            </TouchableOpacity>
                        )
                    })

                }

            </ScrollView>
        </View>
    )
}

export default Cast

const styles = StyleSheet.create({})