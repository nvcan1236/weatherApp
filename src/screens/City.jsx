import { useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  Touchable,
  Pressable,
  Alert,
} from "react-native";
import { cities } from "./components/dumb-data";
import { APIKey } from "../weatherConfig";

function City() {
  const key = APIKey;
  const [input, setInput] = useState("");
  const [detail, setDetail] = useState({});

  const showDetail = async (id = 0, q = "") => {
    if (id !== 0) {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&id=${id}&appid=${key}`
      ).then((res) => res.json());

      console.info(data);

      if (data.cod === 200) {
        setDetail(data);
      } else {
        Alert.alert("Weather App", "Không tìm thấy địa điểm");
      }
    } else if (q) {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&q=${q}&appid=${key}`
      ).then((res) => res.json());

      console.info(data);

      if (data.cod === 200) {
        setDetail(data);
      } else {
        Alert.alert("Weather App", data.message);
      }
    }
  };

  useEffect(() => {}, [detail]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Nhập tên địa điểm cần tìm kiếm ..."
          style={styles.input}
          onChangeText={(text) => setInput(text.trim() ? text : "")}
          value={input}
        />
        <Button onPress={() => showDetail(0, input)} title="Search" />
      </View>

      {detail.name ? (
        <View style={styles.center}>
          <View style={styles.info}>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.location}>
                {detail.name}, {detail.sys.country}
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
                {detail.weather[0].description[0].toUpperCase() +
                  detail.weather[0].description.slice(1)}
              </Text>
              <Text style={styles.h2}>{detail.main.temp} o C</Text>

              <Text style={{ marginTop: 100, textAlign: "center" }}>
                Thông tin chi tiết
              </Text>
              <View style={styles.moreTemp}>
                <View style={[styles.detailItem, { width: "40%" }]}>
                  <Text>Thấp nhất</Text>
                  <Text style={{ fontWeight: "600", fontSize: 18 }}>
                    {detail.main.temp_min} o C
                  </Text>
                </View>
                <View style={[styles.detailItem, { width: "40%" }]}>
                  <Text>Cao nhất</Text>
                  <Text style={{ fontWeight: "600", fontSize: 18 }}>
                    {detail.main.temp_max} o C
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailItem}>
                <Text>Áp suất</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {detail.main.pressure} mbar
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Độ ẩm</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {detail.main.humidity}%
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text>Tốc độ gió</Text>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  {detail.wind.speed}m/s
                </Text>
              </View>
            </View>
          </View>
          <Button title="Đóng" onPress={() => setDetail({})} />
        </View>
      ) : (
        <ScrollView>
          {cities.map((c) => (
            <View onPress={() => showDetail(c.id, 0)} key={c.id}>
              <Text>{c.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
  info: {
    backgroundColor: "transparent",
    width: "88%",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOpacity: 0.5,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    marginHorizontal: "auto",
    marginBottom: 20,
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

export default City;
