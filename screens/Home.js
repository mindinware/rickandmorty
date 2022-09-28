import React from 'react';
import { Button,Text,Image,View,SafeAreaView, StyleSheet, TextInput,ScrollView} from 'react-native';

class Home extends React.Component { 

  constructor(props) {
    
    super(props);
    
    this.state = {
      page: 1,
      name: "",
      haveNextPage: false,
      character:[],
    }; 

    this.getCharacter = this.getCharacter.bind(this);

    this.getCharacter();
  }

  async getCharacter()
  {
    var _this = this;
    console.log('https://rickandmortyapi.com/api/character?page='+this.state.page+'&name='+this.state.name);
    await fetch('https://rickandmortyapi.com/api/character?page='+this.state.page+'&name='+this.state.name)
    .then((res) => res.json())
    .then((resJson) => { 
      
        _this.setState({character:resJson.results})
      
    });  
  }


  render(){ 
    return (
      <View style={{marginLeft:20,marginRight:20,marginTop:50,marginBottom:150}}>
        <TextInput style={{borderWidth:1,borderColor:"#eaeaea",padding:15,borderRadius:5,fontSize:20,marginBottom:20}} onChangeText={ async (text) => {await this.setState({name:text});this.getCharacter()}} value={this.state.name}/>
        <SafeAreaView>
          <ScrollView>
          {this.state.character.map((item,index) =>{
              return(
                <View key={index} style={{flexDirection:'row', marginBottom:20,borderWidth:2, borderColor:"#eaeaea"}}>
                  <Image style={{width:100,height:100}} source={{uri:item.image}} />
                  <Text style={{fontSize:20,margin:10}}>{item.name}</Text>
                </View>
              )
            })
          }
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Home;