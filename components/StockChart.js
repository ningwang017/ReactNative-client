import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Alert} from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';



const API_KEY = "hYQ8HL79G6Xp5E3x7lVi9hopXJJAJ7OR";

// customized chart that takes a symbol and generate a chart for the stock data
export default function StockChart({symbol}) {
    const [currentStockData, setCurrentStockData] = useState([]);

    //get stock data specific for the selected symbol
    async function getStockData() {
        const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2022-06-01/2022-06-20?adjusted=true&sort=asc&limit=50&apiKey=${API_KEY}`;
    
        try {
          let res = await fetch(url);
          let data = await res.json();
          let entry = await data['results'];
      
          let tableData = [];
          for (let x in entry) {
            tableData.push({
              timeStamp: entry[x]['t'],
              value: entry[x]["c"],
            });
          }
          setCurrentStockData(tableData);

        } catch(error) {
          Alert.alert("failed to fetch data", "Please wait a minute", [{text: "OK"}])
        }
      }
    
      useEffect(() => {
        (async () => {
          await getStockData();
        })();
      }, []);

    return (
        <View style={styles.chartContainer}>
          <LineChart.Provider data={currentStockData}>
            <LineChart width={350} height={250}>
              <LineChart.Path color='green'/>
            </LineChart>
          </LineChart.Provider>
        </View>
    )
}

const styles = StyleSheet.create({  
    chartContainer:{
        padding:20,
        alignItems:'center',
    },
})