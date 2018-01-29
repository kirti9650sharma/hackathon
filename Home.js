import React, { Component } from 'react';
import { View , StyleSheet , TouchableOpacity, Text ,Image} from 'react-native';
import { StackNavigator  } from 'react-navigation';
import ListItems from './ListItems';
import FilterScreen from './FilterScreen';
import ToggleButton from './ToggleButton';
class Home extends Component {
    static navigationOptions = ({ navigation }) => {
		return{
            //********    HEADER  ***********
            header:
                <View style = {styles.header}>
                    <View  style={styles.img}>
                        <Image 
                        source={require('./makaan.png')}
                        style = {styles.imgStyle}
                        />
                    </View>
                    <View style = {styles.headerText}> 
                        <Text style = {styles.headerTextStyle}>Gurgaon </Text>
                    </View>
                </View>
        }
    };

    constructor(props) {
        super(props);
        this.state = { type:0,           // 0 represents buy and 1 represents rent
                     bedrooms:0,        
                     lValue:0,
                     rValue:0 
                    } 
             
    }
   //************* Function for changing type(Buy/Rent) of properties ****************//
    changeType = (changedValue) => this.setState({ type: changedValue})

    /***************Function to go to filter screen  ********************/
    gotoFilter = () => {
		const { navigate } = this.props.navigation;
        navigate('Filter',{acceptFilters: this.acceptFilters,bedroom:0,minValue:10000,maxValue:20000000})
    }  
    
    /**************Accepting Filters from Filter screen *******************/
    acceptFilters = (setBedroom,minValue,maxValue) => {
        this.setState({bedrooms:setBedroom,
                        lValue:minValue,
                        rValue:maxValue })
  
    }
  
    render(){
        console.log(this.state) 
        const { navigate } = this.props.navigation;
        return (
            <View style = {{backgroundColor:'white'}}>
               <View style = {styles.tab}>
                   <ToggleButton changeType ={this.changeType}/>
                    {/* Below is code for filter button */}
                        <TouchableOpacity 
                                style  = {styles.filterButton}
                                onPress={() => { this.gotoFilter()}}>
                            <View>
                                <Text style = {styles.filterTextStyle}> FILTER </Text>
                                <Text style = {{color:'grey'}}> Not Applied </Text>
                            </View>
                        </TouchableOpacity>
                </View>
                <View>
                    <ListItems 
                        category = {this.state.type}
                        bedroom = {this.state.bedrooms}
                        lValue = {this.state.lValue}
                        rValue = {this.state.rValue}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        marginTop:12,
        flexDirection: 'row',
        backgroundColor:'white'
    },
    img:{
        width:60,
        height:40,
       borderWidth:0.3,
       borderColor: '#D8D8D8',
       justifyContent:'center',
       alignItems:'center'
    },
    imgStyle:{
        height:35,
        width:35
    },
    headerText:{
        justifyContent: 'center',
        alignItems: 'center', 
        borderWidth:0.3, 
        borderColor:'#D8D8D8', 
        height:40,
        width:320
    },
    headerTextStyle:{
        fontSize:14,
        color: '#1C1C1C'
    },
    tab:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#F2F2F2'
    },
    filterButton:{
        width:190,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.3,
        borderColor: '#D8D8D8'
    },
    filterTextStyle:{
        color:'#424242',
        fontSize:13
    }
})
const Screen = StackNavigator({
    Home: { screen: Home },
    Filter: { screen: FilterScreen}
    });
  export default Screen;
  