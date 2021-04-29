import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Accelerometer, Magnetometer} from 'expo-sensors';
import Speedometer from 'react-native-speedometer-chart';


function SpeedySensor(){
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,

  });

  const [subscription, setSubscription] = useState(null);
  Accelerometer.setUpdateInterval(100)

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const {x, y, z} = data;
  
  
  

    let g = 9.78033;
    let time = 0.1
   
    let xVelocity = Math.abs((x * g) / time); //m/s
    let yVelocity =  Math.abs((y * g) / time);
    let zVelocity =  Math.abs(((z * g) - g) / time); 
    let averageVelocity = Math.abs(((xVelocity * time) + (yVelocity * time))); // m/s
    let feetPerSecond = averageVelocity * 3.281;
   
    let spedoMeters = parseInt(averageVelocity.toFixed(1));
    let spedoFeet = parseInt(feetPerSecond.toFixed(1));
  return (
    <View>
      <Text style={styles.velocities}>
        {averageVelocity.toFixed(2)}{"\n"}
        V m/s{"\n\n"}
        </Text>
        <Speedometer value={spedoMeters} totalValue={10} showIndicator showLabels />
        <Text style={styles.velocities}>
        {feetPerSecond.toFixed(2)}{"\n"}
        V ft/s{"\n\n"} 
      </Text>
      <Speedometer value={spedoFeet} totalValue={20} showIndicator showLabels />
    </View>
  ); 

  };
 
  

function MagnetoMeter(){
  //No use for it, the math for the Accelerometer was difficult enough
}


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velocity of Phone</Text>
      <Text style={styles.subtitle}>Given that the phone is flat</Text>
      <SpeedySensor />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202763",
    alignItems: 'center',
    justifyContent: 'center',
  },

  velocities: {
    color: '#ffff',
    fontSize: 50,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#ffff',
    fontSize: 50,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    color: '#ffff'
  }
});
