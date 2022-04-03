import * as React from "react";
import { Appbar,Title } from 'react-native-paper';

export default Header = (props)=>{
    return (
        <Appbar.Header theme={
            {
                colors:{
                    primary:"#00aaff"
                }
            }
        } style={{flexDirection:"row", justifyContent:"center"}}>
            <Title style={{color:"#fff"}}> {props.name} </Title>
        </Appbar.Header>
    );
}