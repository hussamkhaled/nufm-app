import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import LandingImg from "../../assets/Landing.png";
import NUFM from "../../assets/NUFM.png";

export default function Landing({ navigation }) {
  const redirect = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    setTimeout(() => redirect(), 3500);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={LandingImg} resizeMode="cover" style={styles.image}>
        <Image source={NUFM} style={styles.img} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "90%",
    height: "20%",
  },
  image: {
    flex: 1,
    alignItems:"center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
