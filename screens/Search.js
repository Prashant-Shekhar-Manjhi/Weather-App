import React, {useState} from "react";
import Header from "./Header";
import {Text, View, FlatList} from "react-native";
import { TextInput , Button, Card} from "react-native-paper";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Search = ({navigation})=>{
    const [cityName, setCityName] = useState("");
    const [cities, setCities] = useState([]);
    const [searchText, setSearchText] = useState("");
    const url = "https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+searchText+"&locationType=city&format=json"
    // const fetchCities = (text)=>{
    //     setCityName(text);
    //     fetch(url)
    //     .then(item=>item.json())
    //     .then(data=>{
    //         // console.log(data.location.address
    //         data && setCities(data.location.address.slice(0,9));
    //     }).catch(error=>console.log(error));
    // }
    const fetchCities = async (text)=>{
        setCityName(text);
        try{
            const response = await axios.get(url);
            setCities(response.data.location.address.slice(0,9));
        }catch(err){
            console.log(err);
        }
    }
    const changeHandler = (text)=>{
        setSearchText(text);
        fetchCities(text);
    }

    const btnClick = async ()=>{
        await AsyncStorage.setItem("newcity",cityName);
        navigation.navigate("home-screen",{city:cityName});
    }
    const listItemClick = async (cityname)=>{
        setCityName(cityname);
        await AsyncStorage.setItem("newcity",cityname);
        navigation.navigate("home-screen",{city:cityname});
    }
        
    return (
        <View style={{flex:1}}>
            <Header name="Search Screen"/>
            <TextInput
                label="City name"
                theme={{
                    colors:{
                        primary:"#00aaff"
                    }
                }}
                value={cityName}
                onChangeText={changeHandler}
            />
             <Button icon="content-save" mode="contained" onPress={()=>btnClick()}
                theme={{colors:{primary:"#00aaff"}}} 
                style={{margin:10}}
             >
                <Text style={{color:"#fff"}}>
                    Save Changes
                </Text>
            </Button>
            <FlatList
                data={cities}
                renderItem={({item})=>{
                    return (
                        <Card style={{margin:2, padding:12}}onPress={()=>listItemClick(item)} >
                            <Text>{item}</Text>
                        </Card>
                    );
                }}
                keyExtractor={item=>item}
            />
        </View>
    );
}