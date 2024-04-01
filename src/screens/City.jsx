import { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { cities } from "./components/dumb-data";
import { APIKey } from "../weatherConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";

function City() {
  const key = APIKey;
  const [input, setInput] = useState("");
  const [detail, setDetail] = useState({});

  const showDetail = async ({ id = 0, q = "", lat = "", lon = "" }) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&lat=${lat}&lon=${lon}&id=${id}&q=${q}&appid=${key}`
    ).then((res) => res.json());

    if (data.cod === 200) {
      setDetail(data);
    } else {
      Alert.alert("Weather App", "Không tìm thấy địa điểm");
    }

    setResult([]);
  };

  const [result, setResult] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${key}`
      )
        .then((res) => res.json())
        .then((data) => setResult(data));
    }, 700);

    return () => {
      setResult([]);
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Nhập tên địa điểm cần tìm kiếm ..."
          style={styles.input}
          onChangeText={(text) => setInput(text.trim() ? text : "")}
          value={input}
        />
        <Button onPress={() => showDetail({ q: input })} title="Search" />
        {input && (
          <TouchableOpacity
            style={{ position: "absolute", right: 90 }}
            onPress={() => setInput("")}
          >
            <Ionicons name="close-outline" size={20} />
          </TouchableOpacity>
        )}
        {result.length > 0 && input && (
          <View style={styles.results}>
            {result.map((r) => (
              <TouchableOpacity
                key={r.lat}
                onPress={() => showDetail({ lat: r.lat, lon: r.lon })}
              >
                <View style={styles.result}>
                  <Text>
                    {r.name}, {r.country}
                  </Text>
                  <Text>
                    {r.lat}, {r.lon}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {detail.name ? (
        <View
          style={[
            styles.center,
            {
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              paddingVertical: 20,
              marginTop: 20,
              borderRadius: 12,
            },
          ]}
        >
          <View style={[styles.wrapper, styles.container]}>
            <Text style={styles.location}>
              {detail.name}, {detail.sys.country}
            </Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>

            <View>
              <View style={styles.general}>
                <View>
                  <Text style={styles.temp}>{detail.main.temp} ºC</Text>
                  <Text style={styles.desc}>
                    {detail.weather[0].description[0].toUpperCase() +
                      detail.weather[0].description.slice(1)}
                  </Text>
                </View>
                <Image
                  style={styles.weatherImage}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detail.weather[0].icon}@2x.png`,
                  }}
                />
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={[styles.detail, styles.detailItem]}>
                  <Text style={{ fontWeight: "500" }}>Thông tin chi tiết:</Text>
                  <Text>
                    Nhiệt độ cao nhất là {detail.main.temp_max}ºC, thấp nhất là{" "}
                    {detail.main.temp_min}ºC. Bình minh lúc{" "}
                    {new Date(detail.sys.sunrise * 1000).toLocaleTimeString(
                      "vi-VI",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
                    . Hoàng hôn lúc{" "}
                    {new Date(detail.sys.sunset * 1000).toLocaleTimeString(
                      "vi-Vi",
                      { hour: "2-digit", minute: "2-digit", hour12: false }
                    )}
                    .
                  </Text>
                </View>

                <View style={styles.moreInfo}>
                  <View
                    style={[
                      styles.detailItem,
                      { flex: 1, alignItems: "center" },
                    ]}
                  >
                    <Ionicons name="rainy-outline" size={20} />
                    <Text>Mưa</Text>
                    <Text>{detail.rain?.["1h"] || 0} mm</Text>
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
                      <Text>{detail.main.humidity}%</Text>
                    </View>

                    <View
                      style={[
                        styles.detailItem,
                        { flex: 1, alignItems: "center" },
                      ]}
                    >
                      <Ionicons name="rainy-outline" size={20} />
                      <Text>Gió</Text>
                      <Text>{detail.wind.speed}m/s</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={styles.container}>
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
            </View> */}
          </View>

          <View style={styles.container}>
            <Button title="Đóng" onPress={() => setDetail(0, input)} />
          </View>
        </View>
      ) : (
        <View>
          {cities.map((c) => (
            <TouchableOpacity
              onPress={() => showDetail({ id: c.id })}
              key={c.id}
            >
              <View style={styles.availbaleCity}>
                <Text>{c.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginRight: 12,
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  availbaleCity: {
    borderWidth: 1,
    borderRadius: 12,
    borderBlockColor: "#333",
    padding: 12,
    marginTop: 12,
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
  },
  date: {
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
    borderBlockColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ccc",
    color: "#fff",
  },
  detail: {
    flex: 2,
    paddingVertical: 22,
    minHeight: 180,
  },
  moreInfo: {
    flex: 3,
  },
  results: {
    position: "absolute",
    top: "100%",
    zIndex: 1,
    left: 0,
    right: 0,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderBlockColor: "#333",
    marginTop: 8,
  },
  result: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default City;
