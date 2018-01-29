import React, { Component } from 'react';
import { View, Image , StyleSheet, ActivityIndicator, FlatList, Text } from 'react-native';

var category;
var listingCategory;
var bedrooms;
var flag=0;
var pageNum=0;
export default class ListItems extends Component {

  constructor(props) {
      super(props);
    this.state = {
        item: [],
        isLoading: true,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
       item: [],
       isLoading: true,
    })
    pageNum = 0
    category = nextProps.category 
    listingCategory = (category === 0) ?'"Primary","Resale"' : '"Rental"'
    bedrooms = (nextProps.bedroom===0) ? '"2","3","4","5"' : nextProps.bedroom.toString()
    range = (nextProps.lValue===0&&nextProps.rValue===0) ? '' : ',{"range":{"price":{"from":"'+nextProps.lValue+'","to":"'+nextProps.rValue+'"}}}'
     this.fetchData(listingCategory,bedrooms,range)
  }
  
  _keyExtractor = (item, index) => item.listing.id;
  fetchData = (listingCategory,bedrooms,range) => { 
    console.log(listingCategory,bedrooms,range)
    url='https://www.makaan.com/petra/app/v4/listing?selector={"fields":["mainImageURL"],"filters":{"and":[{"equal":{"cityId":11}},{"equal":{"listingCategory":['
      +listingCategory+
      ']}},{"equal":{"bedrooms":['
      +bedrooms+
      ']}}'
      +range+
      ']},"paging":{"start":'
      +pageNum+
      ',"rows":20}}&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan'
      
    fetch(url, {
       method: 'GET'
    })
    .then((response) => {
      if(response.status === 200){
         var responseJson = response.json()
        .then((responsedata) => responsedata.data)
        .then((data) => data[0].facetedResponse)
        .then((facetedResponse) => facetedResponse.items)
        .then((items) => {
            console.log(items)
            this.setState({
              item: this.state.item.concat(items),
              isLoading: false
            })
            pageNum=pageNum+20
        })
        .catch((error) => {
          console.error(error);
        });
      }
     
    })
    
  }
fetchMore = () => {
    this.fetchData(listingCategory,bedrooms,range)
  }

componentDidMount = () => {
    category = this.props.category 
    listingCategory = (category === 0) ?'"Primary","Resale"' : '"Rental"'
    bedrooms = (this.props.bedroom===0) ? '"2","3","4","5"' : this.props.bedroom.toString()
    range = (this.props.lValue===0&&this.props.rValue===0) ? '' : ',{"range":{"price":{"from":"'+this.props.lValue+'","to":"'+this.props.rValue+'"}}}'
    this.fetchData(listingCategory,bedrooms,range)
    }
convertToMonthYear(dateM)
{
  let date= new Date(dateM);
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var m = month[date.getMonth()];
  date= new Date(dateM);
  let year= (date.getFullYear()).toString();
  return m+' '+year;

}       

render() {
    console.log(this.state)
   if (this.state.isLoading) {
        return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large'/>
        </View>
        );
    }
    console.log(new Date(this.state.item[0].listing.property.project.possessionDate).getFullYear() )
        return (
            
            <View style = {styles.style}>
           
                <FlatList
                data={this.state.item}
                renderItem={({item}) =>
                <View style = {styles.card}>
                    <Image style = {{width:350,height:180}}
                    source = {{ uri: item.listing.mainImageURL }}
                    />
                    <View style = {{marginBottom:20,marginTop:8}}>
                        { ((item.listing.currentListingPrice.price)/100000 > 1) && 
                            <Text style = {{fontWeight:'600',fontSize:15}}>₹ {Math.trunc((item.listing.currentListingPrice.price)/1000)/100}L </Text>
                        }
                        { ((item.listing.currentListingPrice.price)/100000 < 1) && 
                            <Text style = {{fontWeight:'600',fontSize:15}}>₹ {(item.listing.currentListingPrice.price)} </Text>
                        }
                        <Text style = {{fontWeight:'600',fontSize:13, marginTop:7}}>{item.listing.property.bedrooms} BHK Apartment   {item.listing.property.size} {item.listing.property.measure}</Text>
                        <Text style = {styles.textStyle}>{item.listing.property.unitType === 'Apartment' ? item.listing.property.project.name : item.listing.property.unitType }  |  {item.listing.property.project.locality.label} {item.listing.property.project.locality.suburb.label} </Text>
                        <Text style = {styles.textStyle}>Possession by {item.listing.property.project.possessionDate ? this.convertToMonthYear(item.listing.property.project.possessionDate) : this.convertToMonthYear(item.listing.possessionDate) } | {item.listing.floor}th of {item.listing.totalFloors} floor
                        </Text>
                    </View>
                </View>
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                this.fetchMore()
                }}
                keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}   

const styles = StyleSheet.create({
      style: {
       marginLeft:18,
       marginRight:18,
       marginTop:5,
       backgroundColor:'white'
        },
      card:{
        borderWidth:0.5,
        marginTop:13,
        borderColor:'#E6E6E6',
        shadowRadius:1,
        shadowOffset:{width:2,height:2}, 
        shadowOpacity:1,
        shadowColor:'#E6E6E6'
     },
     textStyle: {
      fontSize: 13,
      marginTop:7,
      color:'#585858'
      } 
    })