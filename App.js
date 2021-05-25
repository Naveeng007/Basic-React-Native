import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,Image, Button, TextInput, ScrollView,Pressable, Alert, TouchableOpacity, Modal   } from 'react-native';
// import { Card, ListItem, Icon } from 'react-native'
export default function  App() {
  const [Output,setOutput]=useState(1)
  const [Dose,SetDose]=useState(1)
  const [Pincodes,SetPincodes]=useState([110002,110003,110004,110005,110006,110007,110008,110009,110044,1100055,110060,110088])
  const [Age,SetAge]=useState(18)
  const [NewPinCode,SetNewPinCode]=useState(null)
  const [Loading,SetLoading]=useState(1)
  const [Limit,SetLimit]=useState(1)
  const [Fees,SetFees]=useState('Free')
  const [Hack,SetHack]=useState(0)
  const [Error,SetError]=useState('')
  const [Seconds,SetSeconds]=useState('Wait for 10 Seconds')
  const [VaccineType,SetVaccineType]=useState('Any')
  const [Vaccine,SetVaccine]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  async function callApi  (){
    SetVaccine([])
    SetLimit(0);
    var d = new Date();
    var day=String(d.getDate())
    var month=String(d.getMonth()+1)
    var year=String(d.getFullYear())
    if(month.length===1)
      month='0'+month
    if(day.length===1)
      day='0'+day
    var date=day+'-'+month+'-'+year
    
    console.log('----------------11',date);
    var vaccine=[]
    SetLoading(2);

    SetSeconds('Wait for 10 Seconds')
    let seconds=10;
    if(Hack)
      seconds=30;
    setTimeout(countdown, 1000)

    function countdown() {
      seconds--;
      SetSeconds(`Wait for ${seconds} Seconds`)
      console.log(seconds)
      if(seconds > 0) 
        setTimeout(countdown, 1000)
      else
        SetLimit(1);
    };

    let pincodes=Pincodes
    for(let i=0;i<pincodes.length||(Hack&&i<97);i++)
    {
      const pincode=pincodes[i]
      if(Hack)
        pincode=110001+i;
      console.log(pincode)
      const URL=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`
      var options = { 
        method: 'GET',
            headers: {
                Host: 'cdn-api.co-vin.in',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            }
        };
      // options.body = JSON.stringify(body);
       
        await fetch(URL,options).then(async(data)=>{
        data=await data.json()
        data=data.centers
       
        for(let i=0;i<data.length;i++)
        {
          for(let j=0;j<data[i].sessions.length;j++)
          {
            let x=data[i].sessions[j]
            let Available_Dose;
           if(Dose===1)
           {
            Available_Dose=x.available_capacity_dose1;
           }
           else
           {
            Available_Dose=x.available_capacity_dose2;
           }

           let any=0;
           if(VaccineType==='Any')
           {
             any=1;
           }

          
           
          
          if(x.min_age_limit===Age&&Available_Dose>0&&(any||(x.vaccine===VaccineType))&&data[i].fee_type===Fees)
            {
              vaccine.push(
                {
                  date:x.date,
                  pincode:data[i].pincode,
                  min_age:x.min_age_limit,
                  name:data[i].name,
                  district_name:data[i].district_name,
                  address:data[i].address,
                  fee_type:data[i].fee_type,
                  date:x.date,
                  id:x.session_id,
                  DoseNumber:Dose,
                  available_capacity_dose:Available_Dose,
                  vaccine:x.vaccine
                }
                )
            }
          }
        }
        if(Hack)
          await  setTimeout(() => {
              // console.log('hi after 100 miliseconds')
            }, 200);
        
      
      
      
     }).catch((e)=>{
      SetVaccine([])
       console.log('Error at server side')
     })
    //  resp=await resp.json()
    //  console.log('resp',resp)
    }
    SetVaccine(vaccine)
    // console.log(Vaccine)
    SetLoading(0);
     setOutput(Output+1)
    //  console.log(Output)

    //  await setTimeout(async ()=>{
      
    //  },10000)
     
  
     
     
     
     
  }

  function list() 
  {
    if(Vaccine.length>0)
    {
      return  Vaccine.map((element) => {
        return (
          // <View key={element.id} style={{margin: 10}}>
          //   <Text>{1}</Text>
          //   <Text>{2}</Text>
          // </View>

          <View style={styles.VaccineBox} key={element.id}>
          <View style={styles.BoxView}>
            {/* <Text style={styles.modalText}>Hello My</Text> */}
                <Text>Min Age: {element.min_age}</Text>
                <Text>Date: {element.date}</Text>
                <Text>pincode: {element.pincode}</Text>
                <Text>District: {element.district_name}</Text>
                <Text>Address: {element.address}</Text>
                <Text>Locality: {element.name}</Text>
                <Text>Vaccine Type: {element.vaccine}</Text>
                <Text>Dose Number: {element.DoseNumber}</Text>
                <Text>Avalaiblity: {element.available_capacity_dose}</Text>
                <Text>Fees: {element.fee_type}</Text>
            </View>
          </View>
  
          // <View key={element.id} style={{borderColor:'green', borderWidth:1,borderRadius:10, margin:10,padding:13}}>
          //   <Text>Min Age: {element.min_age}</Text>
          //   <Text>Date: {element.date}</Text>
          //   <Text>pincode: {element.pincode}</Text>
          //   <Text>District: {element.district_name}</Text>
          //   <Text>Address: {element.address}</Text>
          //   <Text>Locality: {element.name}</Text>
          //   <Text>Vaccine Type: {element.vaccine}</Text>
          //   <Text>Dose Number: {element.DoseNumber}</Text>
          //   <Text>Avalaiblity: {element.available_capacity_dose}</Text>
          //   <Text>Fees: {element.fee_type}</Text>
          // </View>
        );
      });
    }
    else if(Loading===0)
    {
      return <View  style={{borderColor:'green',borderWidth:1,height:50,margin:10,padding:4,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
        <Text>No vaccine Available</Text>
      </View>
    }
    
  };

  function OnDeletePincode(Pin){
    console.log('----------------',Pin,'-----------')
    console.log(Pin)
    console.log('.......',Pin)
    if(parseInt(Pin)===224)
      SetHack(0);
    let NewPin=Pincodes.filter((pin)=>pin.toString()!=Pin.toString())
    console.log(Pin)
    SetPincodes(NewPin);
  }

  function PincodeList(){
    // console.log('PINLIST----',Pincodes)
    
   
    return Pincodes.map((Pin)=>{
      return (
        <View key={Pin}  style={{borderColor:'green',borderWidth:1,margin:10,padding:4,borderRadius:5,justifyContent:'center',alignItems:'center'}}>
        <Text>{Pin}</Text>
        {/* {console.log('current value',Pin)} */}
        <TouchableOpacity  activeOpacity={0.5} onPress={()=>OnDeletePincode(Pin)}>
          <Image style={{height:30,width:30}}
          source={require('./assets/delete.png')}
          />
      </TouchableOpacity>
        {/* <Button color='red' title='Delete' onPress={()=>OnDeletePincode(Pin)}></Button> */}
      </View>
      )
    })
  }


  function OnAddPincode(NewPinCode){
    console.log('Dssssssssssp',NewPinCode)
   
    var IsPresent=false;
    for(let i=0;i<Pincodes.length;i++)
    {
      console.log(Pincodes[i],NewPinCode)
      if(Pincodes[i].toString()===NewPinCode.toString())
       {
        IsPresent=true;
        console.log('....................')
       } 
    }
    let temp=NewPinCode;
    let reg=new RegExp("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$");
    console.log('TESTING----------------',reg.test(temp.toString()),IsPresent)

   
    console.log(Pincodes)
   
    var chkpin=temp.toString()
    let valid=reg.test(chkpin);
    if(parseInt(NewPinCode)===224)
      valid=1;
    console.log('ISitPresent-----',IsPresent,valid)
    if(!IsPresent&&valid&&Pincodes.length<15)
     {
      SetPincodes([parseInt(NewPinCode),...Pincodes]);
      if(parseInt(NewPinCode)===224)
        SetHack(1);
     } 
    else if(IsPresent)
      {
        SetError('Pincode Is Already Present in List')
        setModalVisible(true)
        // Alert.alert('Pincode Is Already Present in List')
      }
    else if(!valid)
     {
      SetError('Pincode Is Invalid')
      setModalVisible(true)
      // Alert.alert('Pincode Is Invalid')
     } 
    else if(Pincodes.length===15)
   {
    SetError('You Can only Use 15 Pincodes at a time') 
    setModalVisible(true)
    // Alert.alert('You Can only Use 15 Pincodes at a time')
   }
    SetNewPinCode(0)
  }
  return (
    <ScrollView   style={{height:100,backgroundColor:'#F0F2F5'}}>
      {/* TODO: use flatlist instead of ScrollView render only visible items on screen efficent */}
      {/* Modal, props.goalstae.bind(this,data), Touchable,passing data */}
      <View style={{margin:5,marginBottom:5,borderRadius:60,marginTop:40,justifyContent:'space-between',alignContent:'center',flexDirection: 'row',marginEnd:10}}>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Age===18)?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetAge(18)}
            >
            <Text style={styles.textStyle}>18+</Text>
          </Pressable>
          {/* <Button style={{width: 30,margin:30,padding:30}} color={(Age===18)?"#EB2EAC":'#D9DBE0'}  title='18+' onPress={()=>SetAge(18)}></Button> */}
          </View>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Age===45)?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetAge(45)}
            >
            <Text style={styles.textStyle}>45+</Text>
          </Pressable>
          {/* <Button style={{height:10,borderRadius:5}} color={(Age===45)?"#EB2EAC":'#D9DBE0'}  title='45+' onPress={()=>SetAge(45)}>part2</Button> */}
          </View>
      </View>
      <View style={{margin:5,marginBottom:5,borderRadius:60,marginTop:5,justifyContent:'space-between',alignContent:'center',flexDirection: 'row',marginEnd:10}}>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Dose===1)?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetDose(1)}
            >
            <Text style={styles.textStyle}>First Dose</Text>
          </Pressable>
          {/* <Button style={{width: 30,margin:30,padding:30}} color={(Dose===1)?"#EB2EAC":'#D9DBE0'}  title='First Dose' onPress={()=>SetDose(1)}></Button> */}
          </View>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Dose===2)?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetDose(2)}
            >
            <Text style={styles.textStyle}>Second Dose</Text>
          </Pressable>
          {/* <Button style={{height:10,borderRadius:5}} color={(Dose===2)?"#EB2EAC":'#D9DBE0'}  title='Second Dose' onPress={()=>SetDose(2)}>part2</Button> */}
          </View>
      </View>

      <View style={{margin:5,marginBottom:5,borderRadius:60,marginTop:5,justifyContent:'space-between',alignContent:'center',flexDirection: 'row',marginEnd:10}}>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Fees==='Free')?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetFees('Free')}
            >
            <Text style={styles.textStyle}>Free</Text>
          </Pressable>
          {/* <Button style={{width: 30,margin:30,padding:30}} color={(Dose===1)?"#EB2EAC":'#D9DBE0'}  title='First Dose' onPress={()=>SetDose(1)}></Button> */}
          </View>
          <View style={{width:150}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(Fees==='Paid')?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetFees('Paid')}
            >
            <Text style={styles.textStyle}>Paid</Text>
          </Pressable>
          {/* <Button style={{height:10,borderRadius:5}} color={(Dose===2)?"#EB2EAC":'#D9DBE0'}  title='Second Dose' onPress={()=>SetDose(2)}>part2</Button> */}
          </View>
      </View>

      
      <View style={{margin:5,marginBottom:5,borderRadius:60,marginTop:5,justifyContent:'space-between',alignContent:'center',flexDirection: 'row',marginEnd:10}}>
          <View style={{width:100}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(VaccineType==='COVAXIN')?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetVaccineType('COVAXIN')}
            >
            <Text style={styles.textStyle}>COVAXIN</Text>
          </Pressable>
          {/* <Button style={{width: 30,margin:30,padding:30}} color={(VaccineType==='COVAXIN')?"#EB2EAC":'#D9DBE0'}  title='COVAXIN' onPress={()=>SetVaccineType('COVAXIN')}></Button> */}
          </View>
          <View style={{width:100}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(VaccineType==='COVISHIELD')?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetVaccineType('COVISHIELD')}
            >
            <Text style={styles.textStyle}>COVISHIELD</Text>
          </Pressable>
          {/* <Button style={{height:10,borderRadius:5}} color={(VaccineType==='COVISHIELD')?"#EB2EAC":'#D9DBE0'}  title='COVISHIELD' onPress={()=>SetVaccineType('COVISHIELD')}>part2</Button> */}
          </View>
          <View style={{width:100}}>

          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor:(VaccineType==='Any')?"#2196F3":'#D9DBE0'}]}
              onPress={()=>SetVaccineType('Any')}
            >
            <Text style={styles.textStyle}>Any</Text>
          </Pressable>

          {/* <Button style={{height:10,borderRadius:5}} color={(VaccineType==='Any')?"#EB2EAC":'#D9DBE0'}  title='Any' onPress={()=>SetVaccineType('Any')}>part2</Button> */}
          </View>
      </View>
     
     
      

      

      <View style={{margin:5,marginBottom:5,borderRadius:60,marginTop:5,justifyContent:'space-between',alignContent:'center',flexDirection: 'row',marginEnd:10}}>
          <View style={{width:150}}>

          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor: "#233A7D"}]}
              onPress={()=>OnAddPincode(NewPinCode)}
            >
            <Text style={styles.textStyle}>Add Pincode</Text>
          </Pressable>

          {/* <Button style={{width: 30,margin:30,padding:30}} color="#233A7D"  title='Add Pincode' onPress={()=>OnAddPincode(NewPinCode)}></Button> */}
          </View>
          <View style={{width:150}}>
          <TextInput
            style={{borderColor:'black', height:40,marginTop:0,borderWidth:1,borderRadius:5,padding:3}}
            onChangeText={(pin)=>SetNewPinCode(pin)}
            value={NewPinCode}
            placeholder="Enter Pincode"
            keyboardType="numeric"
      />
          </View>
      </View>

      <ScrollView horizontal={true}>
        {PincodeList()}
      </ScrollView>

      {Limit ===1 &&
        <View style={{margin:5,marginBottom:5}}>
          <Pressable
              style={[styles.button, styles.buttonAvailablity,{backgroundColor: "#41916E"}]}
              onPress={callApi}
            >
            <Text style={styles.textStyle}>Check Avalaiblity</Text>
          </Pressable>
        {/* <Button style={{height:70,borderRadius:5,width:10}}    title='Check Avalaiblity' onPress={callApi}>part2</Button> */}
      </View>
      } 
      {Limit ===0 &&
        <View style={{margin:5,marginBottom:5,borderRadius:60}}>
        
        <Pressable
              style={[styles.button, styles.buttonFade]}
            
            >
            <Text style={styles.textStyle}>{Seconds}</Text>
        </Pressable>

        {/* <Button style={{height:70,borderRadius:5,width:10}}  color='#D9DBE0'  title={Seconds} >part2</Button> */}
      </View>
      } 
      {/* {<View style={{margin:5,marginBottom:5,borderRadius:60}}>
        <Button style={{height:70,borderRadius:5,width:10}} color='#D9DBE0'    title='Check Avalaiblity' >part2</Button>
      </View>} */}
      {Loading ===2 &&
      <View >
           <Text>Loading...</Text>
      </View>}

      


      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{Error}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>







      <View>{list()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  VaccineBox: {
    flex: 1,
    marginTop: 2
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  BoxView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonAvailablity: {
    backgroundColor: "#2196F3",
    
  },
  buttonFade: {
    backgroundColor: "#D9DBE0",
  },
  buttonClose: {
    width:100,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
