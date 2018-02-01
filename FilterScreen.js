import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StackNavigator  } from 'react-navigation';
var bedroom;
//var multiSliderValue = [0,100000000]
// var  valuesToDisplay=[0,100000000]
// var  valuesToDisplayRent=[0,150000]
export default class FilterScreen extends Component{
 
    static navigationOptions = ({ navigation }) => {
        return{
            title:'Go Back'
        }
    }
constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        this.state = { 
          //  multiSliderValue: [0,100000000],
            pressStatus: [false,false,false,false],
            valuesToDisplay:[params.minValue,params.maxValue],
            valuesToDisplayRent:[params.minValue,params.maxValue]

        }
       }

    multiSliderValuesChange = (values) => {
        // this.setState({
        //   valuesToDisplay: values,
        // });
  //      console.log(values)
        const { params } = this.props.navigation.state;
       params.minValue=values[0]
       params.maxValue=values[1] 
       if(params.type===0)
       {
    //    valuesToDisplay[0]=values[0]
    //    valuesToDisplay[1]=values[1]
        this.setState({
       valuesToDisplay:values
       
        })
    }
    else{
    //     valuesToDisplayRent[0]=values[0]
    //    valuesToDisplayRent[1]=values[1]
        this.setState({
       valuesToDisplayRent:values
       })
    }
      }
    
onPress=(n) => {
    var {params}=this.props.navigation.state;
   // params.bedroom.push(n)
   var pressStatusUpdate = params.pressStatus
  if(params.bedroom[n-2]===0)
  {
    params.bedroom[n-2]=1
    pressStatusUpdate[n-2]=true
  }
  else{
    params.bedroom[n-2]=0
    pressStatusUpdate[n-2]=false  
  }
   
    // if(pressStatusUpdate[n-2]===false)
    // {pressStatusUpdate[n-2]=true}
    // else{
    //     pressStatusUpdate[n-2]=false   
    // }
    console.log(params.bedroom, pressStatusUpdate)
    this.setState({
        pressStatus : pressStatusUpdate
    })  
    params.pressStatus=pressStatusUpdate
}
gotoHome(){
    const { goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;
    // params.lValue=this.state.multiSliderValue[0]
    // params.rValue=this.state.multiSliderValue[1]
    goBack();
    //console.log(params.bedroom)
    params.acceptFilters(params.bedroom,params.minValue,params.maxValue,params.pressStatus);
    }


    render()
    {
        var {params}=this.props.navigation.state;
        console.log(params.type ,params.minValue, params.maxValue,params.pressStatus,params.bedroom)
     //   console.log(this.state.pressStatus)
        const {goBack} = this.props.navigation;
        return(
        <View style = {{backgroundColor:'#FAFAFA',justifyContent:'space-between',flex:1,flexDirection:'column'}}>
            <View style = {styles.mainView}>
                <View>
                    <Text style = {{ fontSize:15}}>Bedroom </Text>
                </View>
                <View style = {styles.buttonView}>
                   <TouchableOpacity 
                                      style = { params.pressStatus[0] ? styles.button : styles.textView }
                                      onPress={() => {this.onPress(2) }}>
                        <Text style = {{fontSize:15}}>2 BHK </Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                                      style = {  params.pressStatus[1] ? styles.button : styles.textView }
                                      onPress={() => {this.onPress(3) }}>
                        <Text style = {{fontSize:15}}>3 BHK</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                                      style = { params.pressStatus[2] ? styles.button : styles.textView }
                                      onPress={() => {this.onPress(4) }}>
                        <Text style = {{fontSize:15}}>4 BHK</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  
                                       style = { params.pressStatus[3] ? styles.button : styles.textView }
                                       onPress={() => {this.onPress(5) }}>
                        <Text style = {{fontSize:15}}>5 BHK</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style = {{ fontSize:15, marginTop:30}}>Budget </Text>
                </View>
                <View style = {{marginTop:30}}>
                            <MultiSlider
                                values={[params.minValue, params.maxValue]}
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
                                min={0}
                                max={(params.type===0) ? 100000000 : 150000}
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
                             
                            { (params.type===0) && 
                                <View style = {{flexDirection:'row',marginTop:15,justifyContent:'space-between'}}>
                                    { ((this.state.valuesToDisplay[0])/100000<1) &&
                                        <Text>₹{(this.state.valuesToDisplay[0])} </Text>  
                                    }
                                    {   ((this.state.valuesToDisplay[0])/100000>1) && ((this.state.valuesToDisplay[0])/10000000<1) &&
                                        <Text>{(this.state.valuesToDisplay[0])/100000}L </Text>  
                                    }
                                    {   ((this.state.valuesToDisplay[0])/10000000>1) &&
                                        <Text>{(this.state.valuesToDisplay[0])/10000000}Cr </Text>  
                                    }

                                    { ((this.state.valuesToDisplay[1])/100000<1) &&
                                        <Text>₹{(this.state.valuesToDisplay[1])} </Text>  
                                    }
                                    {/* {   ((this.state.valuesToDisplay[1])/100000>1) && ((this.state.valuesToDisplay[0])/10000000<1) &&
                                        <Text>{(this.state.valuesToDisplay[1])/100000}L </Text>  
                                    } */}
                                    {   ((this.state.valuesToDisplay[1])/10000000>1) &&
                                        <Text>{(this.state.valuesToDisplay[1])/10000000}Cr </Text>  
                                    }
                                </View>      
                            }
                            { (params.type===1) && 
                                <View style = {{flexDirection:'row',marginTop:15,justifyContent:'space-between'}}>

                                    { ((this.state.valuesToDisplayRent[0])/100000<1) &&
                                        <Text>₹{(this.state.valuesToDisplayRent[0])} </Text>  
                                    }
                                    {   ((this.state.valuesToDisplayRent[0])/100000>1) &&
                                        <Text>{(this.state.valuesToDisplayRent[0])/100000}L </Text>  
                                    }
                                    {/* <Text>₹{this.state.valuesToDisplayRent[0]}</Text> */}

                                    { ((this.state.valuesToDisplayRent[1])/100000<1) &&
                                         <Text>₹{(this.state.valuesToDisplayRent[1])} </Text>  
                                    }
                                    {   ((this.state.valuesToDisplayRent[1])/100000>1) &&
                                        <Text>{(this.state.valuesToDisplayRent[1])/100000}L </Text>  
                                    }
                                </View>     
                            }
                            
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
    },
    button:{
        borderWidth:0.8,
        borderColor: '#D8D8D8',
        borderRadius:5,
        width:70,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FE2E2E'
    }
})
