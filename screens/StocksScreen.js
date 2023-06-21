import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import DeletableItem from '../components/DeletableItem';
import ItemDeleteAction from '../components/ItemDeleteAction';


export default function StocksScreen({route}) {
  const {savedSymbols, fetchSavedSymbols, deleteSymbol, watchListErr} = useContext(AuthContext);

  useEffect(()=>{
   fetchSavedSymbols();
  },[])

  return (
      <SafeAreaView style={styles.container}>
        {watchListErr ? (
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.errorText}>{watchListErr}</Text>
          </View>
        ):(
          <FlatList 
              data={savedSymbols}
              keyExtractor={key => key.symbols}
              renderItem={({item}) => 
              <DeletableItem 
                symbol={item.symbols} 
                renderRightActions={()=><ItemDeleteAction 
                onPress={()=>{
                  deleteSymbol(item.symbols)
                }}/>}
            />}/>
        )}
              
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    justifyContent:'center',
    alignSelf:'center',
    color:'white'
  },


});