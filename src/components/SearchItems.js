import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Icon, Image, Input } from "native-base";

const SearchItem = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
    
  return (
    <View style={styles.container}>

        <Image alt='logo' width={10} height={10} source={require("../../assets/logo.png")} />

      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >


        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        /> 

      </View>

      {clicked && (
        <View>
        </View>
      )}
    </View>
  );
};
export default SearchItem;

const styles = StyleSheet.create({
  container: {
    margin: -35,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingVertical:10
  },

  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    height:25
  },
});