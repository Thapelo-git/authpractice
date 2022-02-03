import React,{useState,useEffect} from 'react'
import { StyleSheet,View,Text, FlatList,TouchableOpacity ,SafeAreaView,Modal,
    LayoutAnimation, 
    ScrollView} from 'react-native';

import Reviewform from './reviewform';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SwipeableFlatList,
  SwipeableQuickActions,
  SwipeableQuickActionButton,
} from 'react-native-swipe-list';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button} from 'react-native-paper';
import {fdb} from './firebase'
import {auth} from './firebase'

export default function Data({navigation}){
   const [shopminders,setShopminders]=useState([])
   const user=auth.currentUser
   const [roomName,setRoomName]=useState('')
    // useEffect(()=>{
    //     const ref= fdb.collection('shopminders');
    //     ref.onSnapshot((query)=>{
    //         const objs =[];
    //         query.forEach((doc)=>{
    //             objs.push({
    //                 id:doc.id,
    //                 ...doc.data(),

    //             });
    //         });
    //         setShopminders(objs)
    //     })
    // },[])
//   useEffect(()=>{
//       console.log({user})
//   },[])
    const handleButtonPress=()=>{
        if(roomName.length>0){
            fdb.collection('THREADS')
            
            .add({
                name:roomName,
                latestMessage:{
                    text:`You have joined the room ${roomName}.`,
                    createdAt:new Date().getTime()
                }
            })
            .then(docRef=>{
                docRef.collection('MESSAGES')
                
                .add({
                    
                    text:`you have joined the room ${roomName}.`,
                    createdAt:new Date().getTime(),
                    system:true
                })
                navigation.navigate('About')
            }
           
            )
        }
    }


    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
         <TextInput
         label='Room name'
         value={roomName}
         onChangeText={text=>setRoomName(text)}
         />
        <Button mode="contained"
        onPress={()=>handleButtonPress()}
       
        >
            Create
        </Button>

        <Button onPress={()=>navigation.navigate('exmplechat')}>
            chats
        </Button>
        <Button onPress={()=>navigation.navigate('About')}>
            other
        </Button>
    
    
    
        </SafeAreaView>
    )
}

const styles =StyleSheet.create({
    container:{
        padding:24
    },
    modalContent: {
        width:'100%'
    },listItem:{
        padding:20,
        backgroundColor:'gray',
        // flexDirection:'row',
        elevation:12,
        borderRadius:7,
        alignItems:'flex-start',
        justifyContent:'flex-start'
        // marginVertical:10,
      },
      textInput:{
          width:'90%',
          height:70,
          borderColor:'blue',
          borderWidth:1,
          fontSize:25
      },
      modalView:{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
      },
      touchableSave:{
          backgroundColor:'orange',
          paddingHorizontal:100,
          alignItems:'center',
          marginTop:20
      }
      
})
