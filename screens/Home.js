import React, {useState,useEffect} from "react";
import Header from "./Header";
import { ActivityIndicator, StyleSheet,Text, View, FlatList,Image} from "react-native";
import { TextInput ,Button, Card, Title} from "react-native-paper"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default Home = (props)=>{
    const [MyCity, setMyCity] = useState("");
    const [info, setInfo] = useState({});
    useEffect(()=>{
        getWeather(MyCity);
    },[MyCity]);
    const getWeather = async (MyCity)=>{
        MyCity && fetch(`https://api.weatherapi.com/v1/current.json?key=a9a501b6f3bf44049a3115821220104&q=${MyCity}&aqi=yes`)
        .then(result=>result.json())
        .then(data=>{
            data && setInfo({
                name:data.location.name,
                temp:data.current.temp_c,
                humidity:data.current.humidity,
                desc:data.current.condition.text,
                icon:data.current.condition.icon,
                uv_index:data.current.uv,
                wind_speed:data.current.wind_kph,
                pressure:data.current.pressure_mb,
                last_updated:data.current.last_updated
            })
        }).catch(err=>{
            alert(err);
        })
    }

    const getData = async ()=>{
        const value = await AsyncStorage.getItem('newcity');
        if(!value){
            const {city} = props.route.params;
            setMyCity(city);
        }else setMyCity(value);
    }
    getData();
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems:"center",
          marginTop:40
        }
      });
        // const date1 =`${info.last_updated?.split(" ")[0]}T${info.last_updated?.split(" ")[1]}`
        // const date = new Date(date1);
        // console.log(info.last_updated)
        // let d = date.getDate()-1;
        // let m = date.getMonth()+1;
        // let y = date.getFullYear();
        // const date_str = (d<=9?'0'+d:d)+'-'+(m<=9?'0'+m:m)+'-'+y;
        // console.log(date_str);
    return(
        <View>
            <Header name="Weather Details"/>
            {info.name
            ?(<> 
            <View style={{alignItems:"center"}}>
                <Title style={{color:"#00aaff",marginTop:20, fontSize:30}}>{info.name}</Title>
                <Image
                    style={{
                        height:120,
                        width:120
                    }}
                    source={{uri:`https:${info.icon}`}}
                />
            </View>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`Temprature : ${info.temp}`}&deg;C
                </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`Humidity : ${info.humidity}%`}
                </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`Description : ${info.desc}`}
                </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`Wind Speed : ${info.wind_speed}`} Km/h
                </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`Pressure : ${info.pressure}`} mbar
                </Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title
                    style={{color:"#00aaff"}}
                >
                    {`UV index : ${info.uv_index}`}
                </Title>
            </Card>
            </>)        
            :(<View style={[styles.container]}>
            <   ActivityIndicator size="large" color="#00aaff" />
            </View>)}
        </View>
    );
}