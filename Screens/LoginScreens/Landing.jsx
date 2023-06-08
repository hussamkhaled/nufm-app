import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import LandingImg from "../../assets/Landing.png";
import NUFM from "../../assets/NUFM.png";

const { width, height } = Dimensions.get("window");

export default function Landing({ navigation }) {
  const redirect = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    setTimeout(() => redirect(), 3500);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={LandingImg}
        resizeMode="cover"
        style={styles.image}
      >
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
    width: width > 650 ? "30%" : "90%",
    height: width > 650 ? "18%" : "20%",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: width > 650 ? hp("100%") : "100%",
    width: width > 650 ? wp("100%") : "100%",
  },
});
