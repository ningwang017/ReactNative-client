import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

// customized ItemList 

export default function ItemList({symbol, sector, price, ...otherProps}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity {...otherProps}>
                <View style={styles.stocks}>
                    <View>
                        <Text style={styles.symbol}>{symbol}</Text>
                        <Text style={styles.sector}>{sector}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{price}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 15,
        paddingTop: 30,
    },
    stocks:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    symbol: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    sector:{
        color:'white',
        marginTop: 10,
    },
    price: {
        color:'white',
        fontSize: 20,
        padding: 15,
    }
})
