import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [periods, setPeriods] = useState({});
  const [workoutDays, setWorkoutDays] = useState([]);
  const [summary, setSummary] = useState({ periodDays: 0, cycleLength: 0, averageDaysBetween: 0, workoutDays: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const periodData = await AsyncStorage.getItem('periodTrackerData');
        const workoutData = await AsyncStorage.getItem('workoutTrackerData');
        if (periodData !== null) setPeriods(JSON.parse(periodData));
        if (workoutData !== null) setWorkoutDays(JSON.parse(workoutData));
      } catch (error) {
        Alert.alert('Error', 'Failed to load data. Please try again later.');
      }
    };

    loadData();
  }, []);

  const updateHistoricalData = useCallback(async () => {
    try {
      const historicalData = await AsyncStorage.getItem('weightTrackerData');
      if (historicalData !== null) {
        const parsedData = JSON.parse(historicalData);
        const updatedData = { ...parsedData, periods, workoutDays };
        await AsyncStorage.setItem('weightTrackerData', JSON.stringify(updatedData));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update historical data.');
    }
  }, [periods, workoutDays]);

  const updateSummary = useCallback(() => {
    let periodDays = 0;
    let cycleLengths = [];
    let previousStart = null;
    let workoutDaysCount = workoutDays.length;

    Object.keys(periods).forEach(date => {
      periodDays++;
      if (periods[date] === 'start') {
        if (previousStart) {
          const cycleLength = (new Date(date) - new Date(previousStart)) / (1000 * 60 * 60 * 24);
          cycleLengths.push(cycleLength);
        }
        previousStart = date;
      }
    });

    const averageCycleLength = cycleLengths.length ? (cycleLengths.reduce((a, b) => a + b) / cycleLengths.length) : 0;

    setSummary({
      periodDays,
      cycleLength: averageCycleLength.toFixed(1),
      averageDaysBetween: cycleLengths.length ? (cycleLengths.reduce((a, b) => a + b) / cycleLengths.length).toFixed(1) : 0,
      workoutDays: workoutDaysCount,
    });
  }, [periods, workoutDays]);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('periodTrackerData', JSON.stringify(periods));
        await AsyncStorage.setItem('workoutTrackerData', JSON.stringify(workoutDays));
        updateHistoricalData();
        updateSummary();
      } catch (error) {
        Alert.alert('Error', 'Failed to save data. Please try again later.');
      }
    };

    saveData();
  }, [periods, workoutDays, updateHistoricalData, updateSummary]);

  const formatDate = (day) => `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const updatePeriodDates = (date, isPeriodStart) => {
    const updatedPeriods = { ...periods };
    if (isPeriodStart) {
      updatedPeriods[date] = 'start';
    } else {
      delete updatedPeriods[date];
    }
    setPeriods(updatedPeriods);
  };

  const calendarDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = formatDate(day);
    const isInPeriod = periods[formattedDate] === 'start';

    calendarDays.push(
      <TouchableOpacity
        key={formattedDate}
        onPress={() => updatePeriodDates(formattedDate, !isInPeriod)}
        style={[
          styles.dayContainer,
          { backgroundColor: isInPeriod ? '#FF6347' : 'transparent', borderColor: formattedDate === formatDate(today.getDate()) ? '#FFD700' : 'transparent' },
        ]}
      >
        <Text style={[styles.dayText, { color: isInPeriod ? 'white' : 'black' }]}>{day}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      colors={['#7B68EE', '#FF6347']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button title="Previous" onPress={() => handleMonthChange(-1)} />
            <Text style={styles.title}>{getMonthName(currentMonth)} {currentYear}</Text>
            <Button title="Next" onPress={() => handleMonthChange(1)} />
          </View>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Period Days: {summary.periodDays}</Text>
            <Text style={styles.summaryText}>Average Cycle Length: {summary.cycleLength} days</Text>
            <Text style={styles.summaryText}>Average Days Between: {summary.averageDaysBetween} days</Text>
            <Text style={styles.summaryText}>Workout Days Logged: {summary.workoutDays}</Text>
          </View>
          <View style={styles.calendarContainer}>{calendarDays}</View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1];
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  dayContainer: {
    width: 36,
    height: 36,
    margin: 6,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  dayText: {
    fontSize: 16,
  },
});

export default CalendarScreen;
