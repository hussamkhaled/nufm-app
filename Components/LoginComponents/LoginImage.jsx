import { StyleSheet, Image, View, ImageBackground } from "react-native";
import Login from "../../assets/Login.png";
import NUFM from "../../assets/NUFM.png";

export default function LoginImage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={Login} resizeMode="cover" style={styles.image}>
        <Image source={NUFM} style={styles.img} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1.2 / 1,
  },
  img: {
    width: "60%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
