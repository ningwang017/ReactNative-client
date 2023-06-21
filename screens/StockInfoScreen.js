import React, {useState, useEffect, useContext} from "react";
import { Text, StyleSheet, View, Button, Alert} from "react-native";
import StockChart from "../components/StockChart";
import { AuthContext } from "../contexts/AuthContext";


const API_KEY = "0GGOBWT47FRG1G7I";

export default function StockInfoScreen({element}) {

    const [currentChange, setCurrentChange] = useState([]);
    const {saveToList, error} = useContext(AuthContext);

    // get current change for the a specific stock 
    async function getCurrentChange() {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${element.symbol}&apikey=${API_KEY}`;

        try {
            let res = await fetch(url);
            let data = await res.json();
            let item = await data['Global Quote']
    
            setCurrentChange([item['09. change'], item['10. change percent']])
        } catch(error) {
            Alert.alert("failed to fetch changes", "Please wait a minute", [{text: "OK"}])
        }
    }

    useEffect(()=>{
        (async ()=> {
            await getCurrentChange()
        })()
    }, [])

    // if the change is negative, the color is set to green, else to red 
    const pricePercentChange = currentChange[1];
    const priceChangeColor = pricePercentChange > '0%' ? '#34C759':'#FF3B30';

    return <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.symbol}>{element.symbol}</Text>
            <View style={styles.info}>
                <Text style={styles.companyName}>{element.name}</Text>
                <Text style={styles.industry}>{element.industry}</Text>
            </View>
            
        </View>
            <View style={styles.changeContainer}>
                <Text style={styles.change}>{currentChange[0]}</Text>
                <Text style={[styles.percentageChange, {color: priceChangeColor}]}>{currentChange[1]}</Text>
            </View>
        <StockChart symbol={element.symbol} />

        <View style={{marginTop: 35}}> 
            <Text style={{color: 'red', alignSelf: 'center'}}>{error ? error : ""}</Text>
            <Button title="Save to Watchlist" color={'#a6a4a4'} onPress={()=>{
                saveToList(element.symbol)
            }}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 20, 
    },
    titleContainer:{
        flexDirection:'row',
        padding:15,
        borderBottomWidth: 1,
        borderBottomColor: '#454242'
    },
    info:{
        marginLeft: 25,
    },
    industry:{
        color:'#99a3cf'
    },
    symbol: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    companyName: {
        color: '#b8b8b8',
        fontSize: 18,
    },
    changeContainer: {
        padding: 20,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    change:{
        color:'white',
        fontSize:25,
    },
    percentageChange:{
        fontSize: 20,
    },
})