import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../theme/theme';

const Loading = () => {
    const { width, height } = useWindowDimensions();
    return (
        <View style={{width:width,height:height}} className="justify-center items-center absolute flex-row">
          <Progress.CircleSnail thickness={12} size={160} color={theme.background}  />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})