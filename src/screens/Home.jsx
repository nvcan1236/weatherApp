import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { APIKey } from "../weatherConfig.js";
import Ionicons from "react-native-vector-icons/Ionicons";

function Home() {
  const city = "vietnam";
  const id = 1580578;
  const key = APIKey;
  const nav = useNavigation();
  const [homeWeather, setHomeWeather] = useState({});
  const [forecastList, setForecastList] = useState({});

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&id=${id}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => setHomeWeather(data));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=vi&id=${id}&appid=${key}&cnt=8`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecastList(data.list);
      });
  }, []);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        paddingVertical: 20,
      }}
    >
      {homeWeather.name && (
        <View style={styles.wrapper}>
          <View style={{ ...styles.container, position: "relative" }}>
            <Image
              style={styles.locationImage}
              source={{
                uri: "https://emerhub.com/wp-content/uploads/districts-of-HCMC-explained.jpg",
              }}
            />
            <View style={styles.topInfo}>
              <Text style={styles.location}>
                {homeWeather.name}, {homeWeather.sys.country}
              </Text>
              <Text style={styles.date}>
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.general}>
              <View>
                <Text style={styles.temp}>{homeWeather.main.temp} ºC</Text>
                <Text style={styles.desc}>
                  {homeWeather.weather[0].description[0].toUpperCase() +
                    homeWeather.weather[0].description.slice(1)}
                </Text>
              </View>
              <Image
                style={styles.weatherImage}
                source={{
                  uri: `https://openweathermap.org/img/wn/${homeWeather.weather[0].icon}@2x.png`,
                }}
              />
            </View>
          </View>

          <View style={[styles.container]}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={[styles.detail, styles.detailItem]}>
                <Text style={{ fontWeight: "500" }}>Thông tin chi tiết:</Text>
                <Text>
                  Nhiệt độ cao nhất là {homeWeather.main.temp_max}ºC, thấp nhất
                  là {homeWeather.main.temp_min}ºC. Bình minh lúc{" "}
                  {new Date(homeWeather.sys.sunrise * 1000).toLocaleTimeString(
                    "vi-VI",
                    { hour: "2-digit", minute: "2-digit", hour12: false }
                  )}
                  . Hoàng hôn lúc{" "}
                  {new Date(homeWeather.sys.sunset * 1000).toLocaleTimeString(
                    "vi-Vi",
                    { hour: "2-digit", minute: "2-digit", hour12: false }
                  )}
                  .
                </Text>
              </View>

              <View style={styles.moreInfo}>
                <View
                  style={[styles.detailItem, { flex: 1, alignItems: "center" }]}
                >
                  <Ionicons name="rainy-outline" size={20} />
                  <Text>Mưa</Text>
                  <Text>{homeWeather.rain?.["1h"] || 0} mm</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.detailItem,
                      { flex: 1, alignItems: "center" },
                    ]}
                  >
                    <Ionicons name="water-outline" size={20} />
                    <Text>Độ ẩm</Text>
                    <Text>{homeWeather.main.humidity}%</Text>
                  </View>

                  <View
                    style={[
                      styles.detailItem,
                      { flex: 1, alignItems: "center" },
                    ]}
                  >
                    <Ionicons name="rainy-outline" size={20} />
                    <Text>Gió</Text>
                    <Text>{homeWeather.wind.speed}m/s</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={{ fontWeight: "500", marginTop: 12 }}>
              Dự báo thời biết 24h
            </Text>
            <View style={styles.forecast}>
              {forecastList.length >= 0 &&
                forecastList.map((f) => (
                  <View
                    key={f.dt}
                    style={[
                      styles.detailItem,
                      {
                        width: "22%",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                      },
                    ]}
                  >
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
                      }}
                      style={styles.forecastImage}
                    />
                    <Text>
                      {new Date(f.dt * 1000).toLocaleTimeString("vi-Vi", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Text>
                    <Text>{f.weather[0].main}</Text>
                    <Text>{f.main.temp}ºC</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  locationImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
  topInfo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    display: "flex",
    justifyContent: "flex-end",
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  date: {
    color: "#eee",
    fontSize: 14,
  },
  general: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherImage: {
    width: 120,
    height: 120,
  },
  temp: {
    fontWeight: "700",
    fontSize: 32,
    marginTop: 12,
  },
  detailItem: {
    margin: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderBlockColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ccc",
    color: "#fff",
  },
  detail: {
    flex: 2,
    paddingVertical: 22,
    minHeight: 150,
  },
  moreInfo: {
    flex: 3,
  },
  forecastImage: {
    width: 40,
    height: 40,
  },
  forecast: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default Home;
