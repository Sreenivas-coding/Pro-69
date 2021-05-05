import React from "react";
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import * as permissions from 'expo-permissions';
import { BarCodeScanner} from expo-barcode-scanner
export default class Scanscreen extends React.Component {
    constructor (){
        super();

        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'

        }
    }
    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState: 'clicked',
          scanned: false
        });
      }

      handleBarCodeScanned = async({type, data})=>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }
        render() {  
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
              <Image 
              source={require("..assets/Barcode scanner.jpeg")}
              style={{width:20,height:20}}/>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            title= "Bar Code Scanner"
            <Text style={styles.buttonText}>Scan Barcode Code</Text>
          </TouchableOpacity>
        </View>
        );
        }
      }
}