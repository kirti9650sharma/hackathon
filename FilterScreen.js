import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StackNavigator  } from 'react-navigation';
var bedroom;

export default class FilterScreen extends Component{
 
    static navigationOptions = ({ navigation }) => {
        return{
            title:'Go Back'
        }
    }
constructor(props) {
        super(props)
        this.state = { 
            multiSliderValue: [4000000, 15000000]
        }
       }

    multiSliderValuesChange = (values) => {
        this.setState({
          multiSliderValue: values,
        });
        
      }

gotoHome(){
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    params.lValue=this.state.multiSliderValue[0]
    params.rValue=this.state.multiSliderValue[1]
    goBack();
    console.log(params.bedroom)
    params.acceptFilters(params.bedroom,params.lValue,params.rValue);
    }

    render()
    {
        var {params}=this.props.navigation.state;
        const {goBack} = this.props.navigation;
        return(
        <View style = {{backgroundColor:'#FAFAFA',justifyContent:'space-between',flex:1,flexDirection:'column'}}>
            <View style = {styles.mainView}>
                <View>
                    <Text style = {{ fontSize:15}}>Bedroom </Text>
                </View>
                <View style = {styles.buttonView}>
                   <TouchableOpacity 
                                      style = {styles.textView}
                                      onPress={() => (params.bedroom=2)}>
                        <Text style = {{fontSize:15}}>2BHK </Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                                      style = {styles.textView}
                                      onPress={() => (params.bedroom=3)}>
                        <Text style = {{fontSize:15}}>3BHK</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                                      style = {styles.textView}
                                      onPress={() => (params.bedroom=4)}>
                        <Text style = {{fontSize:15}}>4BHK</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  
                                       style = {styles.textView}
                                       onPress={() => (params.bedroom=5)}>
                        <Text style = {{fontSize:15}}>5BHK</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style = {{ fontSize:15, marginTop:30}}>Budget </Text>
                </View>
                <View style = {{marginTop:30}}>
                            <MultiSlider
                                values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                                sliderLength={280}
                                onValuesChange={this.multiSliderValuesChange}
                                allowOverlap
                                selectedStyle={{
                                backgroundColor: 'red',
                                }}
                                unselectedStyle={{
                                backgroundColor: 'gray',
                                }}
                                containerStyle={{
                                height:2,
                                }}
                                min={10000}
                                max={20000000}
                                step={100}
                              trackStyle={{
                                height:2,
                                backgroundColor: 'red'
                              }}
                            touchDimensions={{
                                height: 5,
                                width: 5,
                                borderRadius: 10
                            }}
                             />

                            <Text style = {{marginTop:15}}>{(this.state.multiSliderValue[0])/100000}L       {(this.state.multiSliderValue[1])/100000}L</Text>
                         
                </View>
            </View>
            <View>
                <TouchableOpacity style = {{justifyContent:'center',alignItems:'center', backgroundColor:'#DF013A', height:50}}
                                    onPress={() => {this.gotoHome()}}>
                                         <Text style = {{
                                                fontWeight:'bold', 
                                                color:'white'
                                                }}> 
                                                APPLY FILTER
                                         </Text>
                </TouchableOpacity>
            </View>
        </View>
            

        )
  
    
    }
    
}


const styles = StyleSheet.create({
    mainView:{
        //marginTop:40,
        marginLeft:30,
        marginRight:30
        
    },
    buttonView:{
        flexDirection: 'row',
        marginTop:15,
        justifyContent:'space-between'
    },
    textView:{
        
        borderWidth:0.8,
        borderColor: '#D8D8D8',
        borderRadius:5,
        width:70,
        height:30,
        justifyContent:'center',
        alignItems:'center'
    }
})
