import React, { useRef } from "react";
import { Button,Text,Image,View,SafeAreaView, StyleSheet, TextInput,ScrollView,TouchableOpacity,Modal,Animated} from 'react-native';
import { NavigationScreenProps } from "react-navigation";

class Home extends React.Component{ 

  constructor(props) {
    super(props);
     
    this.state = {
      page: 1,
      name: "",
      haveNextPage: false,
      character:[],
      selected:{image:"",name:"",gender:"",episode:[]},
      visible:false,
    }; 

    this.getCharacter = this.getCharacter.bind(this);
    this.openDetails  = this.openDetails.bind(this);

    this.getCharacter();  
  }

  async getCharacter()
  {

    var _this = this;

    await fetch('https://rickandmortyapi.com/api/character?page='+this.state.page+'&name='+this.state.name)
    .then((res) => res.json())
    .then((resJson) => { 
      
        _this.setState({character:resJson.results})
      
    });  
  }

  openDetails(character)
  {
    this.setState({selected:character,visible:true})  
  }

  render()
  {
  
    var _this = this;
    return (
      <View style={{marginLeft:20,marginRight:20,marginTop:50,marginBottom:150}}>
        <TextInput style={{borderWidth:1,borderColor:"#eaeaea",padding:15,borderRadius:5,fontSize:20,marginBottom:20}} onChangeText={ async (text) => {await this.setState({name:text});this.getCharacter()}} value={this.state.name} placeholder={"Buscar"}/>
        <SafeAreaView>
          <ScrollView>
          {this.state.character.map((item,index) =>{
              return(
                <TouchableOpacity onPress={()=> {console.log("si");this.openDetails(item)}} key={index} style={{flexDirection:'row', marginBottom:20,borderWidth:2, borderColor:"#eaeaea"}}>
                  <Image style={{width:100,height:100}} source={{uri:item.image}} />
                  <Text style={{fontSize:20,margin:10}}>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          </ScrollView>
        </SafeAreaView>
        <Modal transparent={false} visible={this.state.visible} animationType="fade">
          <View style={{marginLeft:20,marginRight:20,marginTop:50,marginBottom:150}}>
            <TouchableOpacity style={{backgroundColor:"#3333ff",borderWidth:1,borderColor:"#3333ff",width:35,height:40,borderRadius:10}} onPress={() =>this.setState({visible:!this.state.visible})}><Text style={{textAlign:"center",marginTop:7,color:"#fff",fontWeight:"bold",fontSize:20}}>{"<-"}</Text></TouchableOpacity>
            <View style={{borderBottomWidth:2,borderBottomColor:"#eaeaea",marginTop:8}}></View>
            <SafeAreaView>
              <ScrollView style={{textAlign:"center"}} horizontal={false}>
                <Text style={{fontSize:30,margin:10,textAlign:"center"}}>{_this.state.selected.name}</Text>
                <Image style={{width:"100%",height:200,marginTop:10}} source={{uri:_this.state.selected.image}} />
                <Text style={{fontSize:20,margin:10,textAlign:"center"}}>Genero: {_this.state.selected.gender}</Text>
                <Text style={{fontSize:20,margin:10,textAlign:"center"}}>Capitulos en los que aparece:</Text>
                <View style={{textAlign:"center"}}>
                {_this.state.selected.episode.map((item,index) =>{
                    return(
                        <Text style={{fontSize:20,margin:10,textAlign:"center"}}>{item.replace("https://rickandmortyapi.com/api/","").replace("episode/", "Episodio ")}</Text>
                    )
                  })
                }
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;


