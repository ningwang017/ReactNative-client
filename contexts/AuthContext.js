import React, { useState, useContext, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();


// my ip on VM is 172.22.30.168 replace with localhost if needed
const API_URL = "http://localhost:3000";

// create a authentication context 
export const AuthProvider = ({children}) => {
    const [authInfo, setAuthInfo] = useState({});
    const [error , setError] = useState("");
    const [watchListErr, setWatchListErr] = useState("")
    const [savedSymbols, setSavedSymbols] = useState([]);

    // register hook 
    // fetch authentication information from backend then save to AsyncStorage
    const register = async (username, password) => {
        const url = `${API_URL}/users/register`;
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                accept: "application/json", 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password})
            });
            let data = await res.json();
            if (data.error == true) {
                setError(data.message)
            } else {
                setError("")
            }
        } catch (err) {
            console.log(err)
        }  
    }
    // login hook
    // same as register but for login 
    const login = async (username, password) => {
        const url = `${API_URL}/users/login`;
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json", 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username, password: password})
            });
            let data = await res.json();  
            setAuthInfo(data);
            await AsyncStorage.setItem("@authInfo", JSON.stringify(data));  
        } catch (err) {
            console.log(err)
        }       
    }

    // save symbols to the database for the loggined user
    const saveToList = async (symbol) => {
        const url = `${API_URL}/users/addSymbol`;
        const token = authInfo.token;
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json", 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({symbol: symbol})
            });
            let data = await res.json(); 
            if(data.error == true) {
                setError(data.message)
            } else {
                setError("")
            }
        } catch (err) {
            console.log(err)
        }
    }

    //fetch symbols saved in database for the loggined user
    const fetchSavedSymbols = async () => {
        const url = `${API_URL}/users/getSymbols`;
        const token = authInfo.token;
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json", 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

            });
            let data = await res.json(); 
            if (data.error == true) {
                setWatchListErr(data.message)
            } else {
                setWatchListErr("");
                let symbols = data.symbols
                setSavedSymbols(symbols)
                await AsyncStorage.setItem("@SavedSymbols", symbols)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // delete symbols from database 
    const deleteSymbol = async (symb) => {
        const url = `${API_URL}/users/deleteSymbol`;
        const token = authInfo.token;
        try {
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json", 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({symbol: symb})
            });
            let data = await res.json();
            if (data.error == true) {
                setError(data.message);
            } else {
                setError("")
            }
        } catch (err) { 
            console.log(err)
        }
    }


    // async function to retrieve the data saved in async storage 
  let _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@authInfo");
      if (value !== null) {
        setAuthInfo(JSON.parse(value))
      }
    } catch {
      Alert.alert("failed to retrieve token")
    }
  }

  useEffect(() => {
    _retrieveToken();
    return () => {
        setAuthInfo({});
    }
  }, [])


   return (
    <AuthContext.Provider value={{
        watchListErr,
        error,
        authInfo,
        savedSymbols,
        register,
        login,
        saveToList,
        fetchSavedSymbols,
        deleteSymbol,
        }}>
        {children}
    </AuthContext.Provider>
   ) 
}