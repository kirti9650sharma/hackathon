import React, { Component } from 'react';
import { FlipToggle , View , StyleSheet } from 'react-native';
import SwitchSelector from 'react-native-switch-selector'
import ListItems from './ListItems';

export default class ToggleButton extends Component{

    
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
            <View style ={styles.buttonView}>
                <SwitchSelector 
                options={options}
                buttonColor='red'
               backgroundColor='#E6E6E6'
               onPress = {(value) => {this.props.changeType(value) }}
                />
            </View>
        )
       }
}

const styles = StyleSheet.create({
    buttonView:{
         width:190,
         height:50,
         padding:20,
         justifyContent:'center',
         alignItems:'center',
         borderWidth:0.8,
         borderColor: '#D8D8D8',
    }
})
const options = [
    { label: 'BUY', value: 0, fontSize:7 },
    { label: 'RENT', value: 1 , fontSize:7 }
];