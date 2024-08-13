import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { CameraView, Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Buttons from "../../Components/SharedComponents/Buttons";
import * as ImageManipulator from 'expo-image-manipulator';

const LoginFingerFace = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isFaceRecognition, setIsFaceRecognition] = useState(false);
  const [savedFingerprint, setSavedFingerprint] = useState(null);
  const [savedFaceData, setSavedFaceData] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [firstFaceCaptured, setFirstFaceCaptured] = useState(false);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    const loadSavedData = async () => {
      try {
        const fingerprintData = await AsyncStorage.getItem('fingerprintData');
        const faceData = await AsyncStorage.getItem('faceData');
        if (fingerprintData) {
          setSavedFingerprint(fingerprintData);
        }
        if (faceData) {
          setSavedFaceData(faceData);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    checkBiometricSupport();
    getCameraPermission();
    loadSavedData();
  }, []);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No biometric credentials found. Please set up biometrics in your device settings.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }

    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (authResult.success) {
      if (savedFingerprint === null) {
        await saveFingerprint();
        navigation.navigate('Contractor/Home');
      } else {
        const isMatch = await matchFingerprint();
        if (isMatch) {
          navigation.navigate('Contractor/Home');
        } else {
          Alert.alert('Authentication Failed', 'Fingerprint does not match.');
        }
      }
    } else {
      if (authResult.error === 'user_cancel') {
        console.log('User cancelled authentication');
        return;
      }
      Alert.alert(
        'Authentication Failed',
        'Please try again.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  };

  const saveFingerprint = async () => {
    try {
      await AsyncStorage.setItem('fingerprintData', 'YOUR_FINGERPRINT_DATA_HERE');
      setSavedFingerprint('YOUR_FINGERPRINT_DATA_HERE');
    } catch (error) {
      console.error('Error saving fingerprint data:', error);
    }
  };

  const matchFingerprint = async () => {
    return true; // Dummy logic for fingerprint matching
  };

  const handleFaceRecognition = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera Permission', 'Camera permission is not granted');
      return;
    }
    setIsFaceRecognition(true);
  };

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const compressedPhoto = await compressImage(photo.base64);
      if (!firstFaceCaptured) {
        await saveFirstFaceData(compressedPhoto);
        setIsFaceRecognition(false);
        setFirstFaceCaptured(true);
        navigation.navigate('Contractor/Home');
      } else {
        const isRecognized = await recognizeFace(compressedPhoto);
        if (isRecognized) {
          navigation.navigate('Contractor/Home');
        } else {
          Alert.alert('Authentication Failed', 'Face does not match. Please try again.');
        }
      }
    }
  };

  const compressImage = async (base64Image) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        base64Image,
        [{ resize: { width: 200 } }],
        { compress: 0.7, base64: true }
      );
      return manipulatedImage.base64;
    } catch (error) {
      console.error('Error compressing image:', error);
      return base64Image;
    }
  };

  const saveFirstFaceData = async (base64Image) => {
    try {
      await AsyncStorage.setItem('faceData', base64Image);
      setSavedFaceData(base64Image);
    } catch (error) {
      console.error('Error saving face data:', error);
    }
  };

  const recognizeFace = async (base64Image) => {
    return base64Image === savedFaceData;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isBiometricSupported
          ? 'Your device supports Biometrics'
          : 'Biometrics not supported'}
      </Text>
      {isBiometricSupported && (
        <Buttons text="Login with Finger Print" onPress={handleBiometricAuth} />
      )}
  {/*
      {hasCameraPermission && (

        <Buttons text="Login with Face Recognition" onPress={handleFaceRecognition} />
      )}

      {isFaceRecognition && hasCameraPermission && (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={toggleCameraFacing}>
              <Text style={styles.text1}>Flip Camera</Text>
            </TouchableOpacity>
          
          <TouchableOpacity style={styles.button2} onPress={captureAndRecognizeFace}>
            <Text style={styles.text2}>Capture and Recognize Face</Text>
          </TouchableOpacity>
          </View>
        </CameraView>
      )}
        */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text1: {
    fontSize: 12,
    color:"white",
    marginTop:20,
  },
  text2: {
    fontSize: 12,
    marginTop:50,
    color:"white",
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
  },
  buttonContainer: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent:"center",
    alignItems:"center",
    marginTop: 80,
  },
  button1: {
    marginTop:50,
   
  },
  button2: {
    marginTop:20,
  },
});

export default LoginFingerFace;


{/*import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Buttons from "../../Components/SharedComponents/Buttons";
import * as ImageManipulator from 'expo-image-manipulator'; // Import ImageManipulator for image compression

const LoginFingerFace4 = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isFaceRecognition, setIsFaceRecognition] = useState(false);
  const [savedFingerprint, setSavedFingerprint] = useState(null);
  const [savedFaceData, setSavedFaceData] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    const loadSavedData = async () => {
      try {
        const fingerprintData = await AsyncStorage.getItem('fingerprintData');
        const faceData = await AsyncStorage.getItem('faceData');
        if (fingerprintData) {
          setSavedFingerprint(fingerprintData);
        }
        if (faceData) {
          setSavedFaceData(faceData);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    checkBiometricSupport();
    getCameraPermission();
    loadSavedData();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No biometric credentials found. Please set up biometrics in your device settings.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }

    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (authResult.success) {
      if (savedFingerprint === null) {
        await saveFingerprint(); // Save fingerprint if not already saved
        navigation.navigate('Contractor/Home'); // Redirect to Home after saving
      } else {
        const isMatch = await matchFingerprint();
        if (isMatch) {
          navigation.navigate('Contractor/Home'); // Redirect to Home if fingerprint matches
        } else {
          Alert.alert('Authentication Failed', 'Fingerprint does not match.');
        }
      }
    } else {
      if (authResult.error === 'user_cancel') {
        console.log('User cancelled authentication');
        return;
      }
      Alert.alert(
        'Authentication Failed',
        'Please try again.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  };

  const saveFingerprint = async () => {
    try {
      // Example: Save fingerprint data in AsyncStorage
      await AsyncStorage.setItem('fingerprintData', 'YOUR_FINGERPRINT_DATA_HERE');
      setSavedFingerprint('YOUR_FINGERPRINT_DATA_HERE');
    } catch (error) {
      console.error('Error saving fingerprint data:', error);
    }
  };

  const matchFingerprint = async () => {
    // Compare captured fingerprint with saved fingerprint
    // Replace the condition with actual comparison logic
    return true; // Assuming match for this example
  };

  const handleFaceRecognition = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera Permission', 'Camera permission is not granted');
      return;
    }
    setIsFaceRecognition(true);
  };

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const compressedPhoto = await compressImage(photo.base64); // Compress the image before saving
      if (savedFaceData === null) {
        await saveFaceData(compressedPhoto);
        setIsFaceRecognition(false); // Disable face recognition after saving
        navigation.navigate('Contractor/Home'); // Redirect to Home after saving
      } else {
        const isRecognized = await recognizeFace(compressedPhoto);
        if (isRecognized) {
          navigation.navigate('Contractor/Home'); // Redirect to Home if face matches
        } else {
          Alert.alert('Authentication Failed', 'Face does not match. Please try again.');
        }
      }
    }
  };
  
  const compressImage = async (base64Image) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        base64Image,
        [{ resize: { width: 200 } }],
        { compress: 0.7, base64: true }
      );
      return manipulatedImage.base64;
    } catch (error) {
      console.error('Error compressing image:', error);
      return base64Image; // Return original if compression fails
    }
  };

  const saveFaceData = async (base64Image) => {
    try {
      await AsyncStorage.setItem('faceData', base64Image);
      setSavedFaceData(base64Image);
    } catch (error) {
      console.error('Error saving face data:', error);
    }
  };

  const recognizeFace = async (base64Image) => {
    // Compare the new face data with the saved face data
    return base64Image === savedFaceData;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isBiometricSupported
          ? 'Your device supports Biometrics'
          : 'Biometrics not supported'}
      </Text>
      {isBiometricSupported && (
        <Buttons text="Login with Finger Print" onPress={handleBiometricAuth} />
      )}
      {hasCameraPermission && (
        <Buttons text="Login with Face Recognition" onPress={handleFaceRecognition} />
      )}
      {isFaceRecognition && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          onCameraReady={captureAndRecognizeFace}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginFingerFace4;



{/*

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Buttons from "../SharedComponents/Buttons";
import * as ImageManipulator from 'expo-image-manipulator'; // Import ImageManipulator for image compression

const LoginFingerFace = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isFaceRecognition, setIsFaceRecognition] = useState(false);
  const [savedFingerprint, setSavedFingerprint] = useState(null);
  const [savedFaceData, setSavedFaceData] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    const loadSavedData = async () => {
      try {
        const fingerprintData = await AsyncStorage.getItem('fingerprintData');
        const faceData = await AsyncStorage.getItem('faceData');
        if (fingerprintData) {
          setSavedFingerprint(fingerprintData);
        }
        if (faceData) {
          setSavedFaceData(faceData);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    checkBiometricSupport();
    getCameraPermission();
    loadSavedData();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No biometric credentials found. Please set up biometrics in your device settings.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }

    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (authResult.success) {
      if (savedFingerprint === null) {
        saveFingerprint(); // Save fingerprint if not already saved
      } else {
        const isMatch = await matchFingerprint();
        if (isMatch) {
          navigation.navigate('Contractor/Home'); // Redirect to Home if fingerprint matches
        } else {
          Alert.alert('Authentication Failed', 'Fingerprint does not match.');
        }
      }
    } else {
      if (authResult.error === 'user_cancel') {
        console.log('User cancelled authentication');
        return;
      }
      Alert.alert(
        'Authentication Failed',
        'Please try again.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  };

  const saveFingerprint = async () => {
    try {
      // Example: Save fingerprint data in AsyncStorage
      await AsyncStorage.setItem('fingerprintData', 'YOUR_FINGERPRINT_DATA_HERE');
      setSavedFingerprint('YOUR_FINGERPRINT_DATA_HERE');
    } catch (error) {
      console.error('Error saving fingerprint data:', error);
    }
  };

  const matchFingerprint = async () => {
    // Compare captured fingerprint with saved fingerprint
    // Replace the condition with actual comparison logic
    return true; // Assuming match for this example
  };

  const handleFaceRecognition = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera Permission', 'Camera permission is not granted');
      return;
    }
    setIsFaceRecognition(true);
  };

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const compressedPhoto = await compressImage(photo.base64); // Compress the image before saving
      if (savedFaceData === null) {
        await saveFaceData(compressedPhoto);
        setIsFaceRecognition(false); // Disable face recognition after saving
        navigation.navigate('Contractor/Home'); // Redirect to Home after saving
      } else {
        const isRecognized = await recognizeFace(compressedPhoto);
        if (isRecognized) {
          navigation.navigate('Contractor/Home'); // Redirect to Home if face matches
        } else {
          Alert.alert('Authentication Failed', 'Face does not match. Please try again.');
        }
      }
    }
  };
  

  const compressImage = async (base64Image) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        base64Image,
        [{ resize: { width: 200 } }],
        { compress: 0.7, base64: true }
      );
      return manipulatedImage.base64;
    } catch (error) {
      console.error('Error compressing image:', error);
      return base64Image; // Return original if compression fails
    }
  };

  const saveFaceData = async (base64Image) => {
    try {
      await AsyncStorage.setItem('faceData', base64Image);
      setSavedFaceData(base64Image);
    } catch (error) {
      console.error('Error saving face data:', error);
    }
  };

  const recognizeFace = async (base64Image) => {
    // Compare the new face data with the saved face data
    return base64Image === savedFaceData;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isBiometricSupported
          ? 'Your device supports Biometrics'
          : 'Biometrics not supported'}
      </Text>
      {isBiometricSupported && (
        <Buttons text="Login with Finger Print" onPress={handleBiometricAuth} />
      )}
      {hasCameraPermission && (
        <Buttons text="Login with Face Recognition" onPress={handleFaceRecognition} />
      )}
      {isFaceRecognition && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          onCameraReady={captureAndRecognizeFace}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginFingerFace;


*/}

{/*
  const redirectToHome = () => {
    switch (userRole) {
      case "ROLE_WORKER":
        navigation.navigate("Worker/Home");
        break;
      case "ROLE_ADMIN":
        navigation.navigate("Home");
        break;
      case "ROLE_OCCUPANT":
        navigation.navigate("Occupant/Home");
        break;
      case "ROLE_CONTRACTOR":
        navigation.navigate("Contractor/Home");
        break;
      case "ROLE_OWNER":
        navigation.navigate("Owner");
        break;
      default:
        navigation.navigate("Landing");
        break;
    }
  };

*/}

{/*
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import Buttons from "../../Components/SharedComponents/Buttons";

const LoginFingerFace = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isFaceRecognition, setIsFaceRecognition] = useState(false);
  const [savedFingerprint, setSavedFingerprint] = useState(null); // State to hold saved fingerprint
  const cameraRef = useRef(null);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    const loadSavedFingerprint = async () => {
      try {
        const fingerprintData = await AsyncStorage.getItem('fingerprintData');
        if (fingerprintData) {
          setSavedFingerprint(fingerprintData);
        }
      } catch (error) {
        console.error('Error loading fingerprint data:', error);
      }
    };

    checkBiometricSupport();
    getCameraPermission();
    loadSavedFingerprint();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No biometric credentials found. Please set up biometrics in your device settings.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }

    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (authResult.success) {
      if (savedFingerprint === null) {
        saveFingerprint(); // Save fingerprint if not already saved
      } else {
        const isMatch = await matchFingerprint();
        if (isMatch) {
          navigation.navigate('Home'); // Redirect to Home if fingerprint matches
        } else {
          Alert.alert('Authentication Failed', 'Fingerprint does not match.');
        }
      }
    } else {
      if (authResult.error === 'user_cancel') {
        console.log('User cancelled authentication');
        return;
      }
      Alert.alert(
        'Authentication Failed',
        'Please try again.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  };

  const saveFingerprint = async () => {
    try {
      // Example: Save fingerprint data in AsyncStorage
      await AsyncStorage.setItem('fingerprintData', 'YOUR_FINGERPRINT_DATA_HERE');
      setSavedFingerprint('YOUR_FINGERPRINT_DATA_HERE');
    } catch (error) {
      console.error('Error saving fingerprint data:', error);
    }
  };

  const matchFingerprint = async () => {
    // Compare captured fingerprint with saved fingerprint
    // Replace the condition with actual comparison logic
    return true; // Assuming match for this example
  };

  const handleFaceRecognition = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera Permission', 'Camera permission is not granted');
      return;
    }
    setIsFaceRecognition(true);
  };

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      // Placeholder function to recognize the face
      const isRecognized = await recognizeFace(photo.base64);
      if (isRecognized) {
        Alert.alert('Face Recognized', 'You have successfully authenticated!');
      } else {
        Alert.alert(
          'Face Not Recognized',
          'Please try again.',
          [{ text: 'OK', onPress: () => console.log('OK pressed') }]
        );
      }
      setIsFaceRecognition(false);
    }
  };

  // Placeholder function for face recognition logic
  const recognizeFace = async (base64Image) => {
    // Implement your face recognition logic here
    // For example, you can send the base64 image to a face recognition API
    // and return true if recognized, false otherwise
    return true; // Assuming the face is recognized for this example
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isBiometricSupported
          ? 'Your device supports Biometrics'
          : 'Biometrics not supported'}
      </Text>
      {isBiometricSupported && (
        <Buttons text="Login with Finger Print" onPress={handleBiometricAuth} />
      )}
      {hasCameraPermission && (
        <Buttons text="Login with Face Recognition" onPress={handleFaceRecognition} />
      )}
      {isFaceRecognition && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          onCameraReady={captureAndRecognizeFace}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:50,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginFingerFace;



import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Camera } from 'expo-camera';
import Buttons from "../../Components/SharedComponents/Buttons";
const LoginFingerFace = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isFaceRecognition, setIsFaceRecognition] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
      };
  
      checkBiometricSupport();
      getCameraPermission();
    }, []);


  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric Authentication',
        'No biometric credentials found. Please set up biometrics in your device settings.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }

    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Please authenticate',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    if (authResult.success) {
      Alert.alert('Authenticated', 'You have successfully authenticated!');
    } else {
      if (authResult.error === 'user_cancel') {
        console.log('User cancelled authentication');
        return;
      }
      Alert.alert(
        'Authentication Failed',
        'Please try again.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  };

  const handleFaceRecognition = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera Permission', 'Camera permission is not granted');
      return;
    }
    setIsFaceRecognition(true);
  };

  const captureAndRecognizeFace = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      // Placeholder function to recognize the face
      const isRecognized = await recognizeFace(photo.base64);
      if (isRecognized) {
        Alert.alert('Face Recognized', 'You have successfully authenticated!');
      } else {
        Alert.alert(
          'Face Not Recognized',
          'Please try again.',
          [{ text: 'OK', onPress: () => console.log('OK pressed') }]
        );
      }
      setIsFaceRecognition(false);
    }
  };

  // Placeholder function for face recognition logic
  const recognizeFace = async (base64Image) => {
    // Implement your face recognition logic here
    // For example, you can send the base64 image to a face recognition API
    // and return true if recognized, false otherwise
    return true; // Assuming the face is recognized for this example
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isBiometricSupported
          ? 'Your device supports Biometrics'
          : 'Biometrics not supported'}
      </Text>
      {isBiometricSupported && (
        <Buttons text="Login with Finger Print" onPress={handleBiometricAuth} 
        />
      )}
      {hasCameraPermission && (
        <Buttons text="Login with Face Recognition" onPress={handleFaceRecognition} />
      )}
      {isFaceRecognition && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
          onCameraReady={captureAndRecognizeFace}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  camera: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginFingerFace;

*/}