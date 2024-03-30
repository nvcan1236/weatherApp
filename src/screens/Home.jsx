import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import PizzaListItem from "./components/PizzaListItem.jsx";
import { pizzaShops } from "./components/dumb-data.js";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AppRegistry } from "react-native-web";
import { APIKey } from "../weatherConfig.js";

function Home() {
  const city = "vietnam";
  const id = 1580578;
  const key = APIKey;
  const nav = useNavigation();
  const [homeWeather, setHomeWeather] = useState({});

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&id=${id}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => setHomeWeather(data));
  }, []);

  return (
    <View style={{ width: "100%" }}>
      {homeWeather.name && (
        <View style={styles.center}>
          <Image
            style={styles.image}
            source={{
              uri: "https://emerhub.com/wp-content/uploads/districts-of-HCMC-explained.jpg",
            }}
          />
          <View style={styles.info}>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.location}>
                {homeWeather.name}, {homeWeather.sys.country}
              </Text>
              <Text style={[styles.location, { marginTop: 8 }]}>
                {new Date().toLocaleDateString("vi")}
              </Text>
            </View>
            <View style={styles.general}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "500",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {homeWeather.weather[0].description[0].toUpperCase() +
                  homeWeather.weather[0].description.slice(1)}
              </Text>
              <Text style={styles.h2}>{homeWeather.main.temp} o C</Text>

              <Text style={{ marginTop: 100, textAlign: "center" }}>
                Thông tin chi tiết
              </Text>
              <View style={styles.moreTemp}>
                <View style={[styles.detailItem, { width: "40%" }]}>
                  <Text>Thấp nhất</Text>
                  <Text style={{ fontWeight: "600", fontSize: 18 }}>
                    {homeWeather.main.temp_min} o C
                  </Text>
                </View>
                <View style={[styles.detailItem, { width: "40%" }]}>
                  <Text>Cao nhất</Text>
                  <Text style={{ fontWeight: "600", fontSize: 18 }}>
                    {homeWeather.main.temp_max} o C
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailItem}>
                <Text>Áp suất</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {homeWeather.main.pressure} mbar
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Độ ẩm</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {homeWeather.main.humidity}%
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Tốc độ gió</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {homeWeather.wind.speed}m/s
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
  },
  info: {
    backgroundColor: "transparent",
    width: "88%",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 12,
    marginTop: -100,
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOpacity: 0.5,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  general: {
    fontSize: 18,
    marginTop: 72,
  },
  moreTemp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  detail: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#b4d8e8",
    borderRadius: 6,
  },
});

export default Home;
