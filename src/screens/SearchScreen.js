import { Box, StatusBar, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../data/api';
import List from './List';
import SearchBar from './SearchBar';

export default function SearchScreen(props) {
    const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setCLicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
        const url = `${BASE_URL}product?limit=${12}&skip=${skip}`
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
        <StatusBar />
      {!clicked && <Text style={styles.title}>Search Product</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setCLicked}
      />
      { searchPhrase !==""?"":(

          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setCLicked={setCLicked}
          />

      )}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    root: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      width: "100%",
      marginTop: 20,
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: "10%",
    },
  });
