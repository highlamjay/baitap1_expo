import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import formatTime from "minutes-seconds-milliseconds";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [times, setTimes] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const intervalRef = useRef(null);

  const handleStopStart = () => {
    if (isStart) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsStart(!isStart);
  };

  const handleLap = () => {
    setTimes([...times, time]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{formatTime(time)}s</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="gray"
            onPress={handleLap}
          >
            <Text>Lap</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="gray"
            onPress={handleStopStart}
          >
            <Text>{isStart ? "Stop" : "Start"}</Text>
          </TouchableHighlight>
        </View>
      </View>
      <ScrollView style={styles.footer}>
        {times.map((lapTime, index) => (
          <View key={index} style={styles.lap}>
            <Text style={styles.lapText}>Lap #{index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(lapTime)}s</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20 },
  header: { flex: 1 },
  footer: { flex: 1 },
  timerWrapper: { flex: 5, justifyContent: "center", alignItems: "center" },
  buttonWrapper: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lap: {
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "gray",
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: { fontSize: 50 },
  lapText: { fontSize: 30 },
});