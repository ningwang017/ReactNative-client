import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function DeletableItem({symbol, renderRightActions}) {
    return (
        <Swipeable renderRightActions={renderRightActions} >
            <View style={styles.container}>
                <Text style={styles.symbol}>{symbol}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 15,
        paddingTop: 30,
    },
    symbol: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
})