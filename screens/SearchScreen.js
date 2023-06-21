import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Modal, Keyboard, FlatList, Alert} from 'react-native';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';
import StockInfoScreen from './StockInfoScreen';

const API_KEY = "5a979b5bfc6fa60fc23ebc9d24c50ee4"

export default function SearchScreen({ navigation }) {
  const [innerSearch, setInnerSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [passedElement, setPassedElement] = useState({});

  const [rowData, setRowData] = useState([])


  // get stock data and return to a list of stock object
  async function getStock() {
    try {
      let res = await fetch(
        `https://financialmodelingprep.com/api/v3/stock-screener?betaMoreThan=1&exchange=NASDAQ&limit=100&apikey=${API_KEY}`
      );
      let data = await res.json();
      return data.map((stocks) => {
        return {
          symbol: stocks.symbol,
          name: stocks.companyName,
          sector: stocks.sector,
          price: stocks.price,
          industry: stocks.industry,
        };
      });
    } catch (error) {
      Alert.alert("failed to fetch stocks", "Please wait a minute", [{text: "OK"}])
    } 
  }

  useEffect(() => {
    (async () => {
      setRowData(await getStock());
    })();
  }, []);

  //search stock items by symbol, lowercase 
  function searchSymbol(stocks) {
    return stocks.filter((stock) =>
  stock.symbol.toLowerCase().indexOf(innerSearch) > -1 )
  }


  //set modal visible to be true to pop up the floating panel, then pass elements to the state 
  function popUpStockInfo({symbol, name, industry}) {
    setModalVisible(true)
    setPassedElement({
      symbol: symbol,
      name: name,
      industry: industry
    })
  }
  

  return (
    <View style={{flex:1}}>
      <View style={styles.searchContainer}>
        <SearchBar 
            placeholder="Search"
            placeholderTextColor={'#8b8b8c'}
            autoCapitalize={"none"}
            onChangeText={(text)=>{setInnerSearch(text)}}/>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList 
          data={searchSymbol(rowData)}
          keyExtractor={key => key.symbol}
          renderItem={({item}) => 
          <ItemList 
            symbol={item.symbol} 
            sector={item.sector}
            price={item.price}
            onPress={() => popUpStockInfo({symbol: item.symbol, name: item.name, industry: item.industry})} 
            />}/>  
      </TouchableWithoutFeedback> 
      <Modal
        animationType="slide"
        presentationStyle='formSheet'
        transparent={false}
        visible={modalVisible}
       >
          <View style={styles.modalView}>
            <StockInfoScreen element={passedElement} />
            <Ionicons name="md-close-circle-outline" size={30} style={styles.closeIcon} onPress={() => setModalVisible(!modalVisible)}/>
          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row'
  },
  closeIcon:{
    position:'absolute',
    right: 20,
    top:20,
    color: 'white',
  },
  container: {
    flex:1,
  },
  searchContainer: {  
    flexDirection:'row',
    width: "100%",
    marginLeft:5,
    marginTop: 10,
  },
  filterIcon: {
    alignSelf: 'center',
    marginLeft: 8,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  stockInfo: {
    textAlign:'center',
    color:'white'
  }
});