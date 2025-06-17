import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const WeightTrackerScreen = () => {
  const [goalWeight, setGoalWeight] = useState(65);
  const [currentWeight, setCurrentWeight] = useState(45);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  // Load historical data from AsyncStorage on component mount
  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const data = await AsyncStorage.getItem('weightTrackerData');
        if (data !== null) {
          const { goalWeight: savedGoalWeight, currentWeight: savedCurrentWeight } = JSON.parse(data);
          setGoalWeight(savedGoalWeight);
          setCurrentWeight(savedCurrentWeight);
          updateProgressPercentage(savedCurrentWeight, savedGoalWeight);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load data. Please try again later.');
      }
    };

    loadHistoricalData();
  }, []); // Empty dependency array, as loadHistoricalData does not depend on any state or props

  // Save historical data to AsyncStorage whenever goalWeight or currentWeight changes
  useEffect(() => {
    const saveHistoricalData = async () => {
      try {
        const historicalData = JSON.stringify({ goalWeight, currentWeight });
        await AsyncStorage.setItem('weightTrackerData', historicalData);
      } catch (error) {
        Alert.alert('Error', 'Failed to save data. Please try again later.');
      }
    };

    saveHistoricalData();
  }, [goalWeight, currentWeight]); // Include goalWeight and currentWeight in the dependency array

  // Update progress percentage whenever currentWeight or goalWeight changes
  useEffect(() => {
    const updateProgressPercentage = (current, goal) => {
      const percentage = ((current / goal) * 100).toFixed(2);
      setProgressPercentage(percentage);

      // Check for achievement
      if (current >= goal) {
        setAchievementUnlocked(true);
      } else {
        setAchievementUnlocked(false);
      }
    };

    updateProgressPercentage(currentWeight, goalWeight);
  }, [currentWeight, goalWeight]); // Include currentWeight and goalWeight in the dependency array

  const handleGoalWeightChange = (value) => {
    // Validate numeric input
    if (!isNaN(value)) {
      setGoalWeight(parseFloat(value));
    } else {
      // Display error message or handle invalid input
      Alert.alert('Invalid Input', 'Please enter a valid number for Goal Weight');
    }
  };

  const handleCurrentWeightChange = (value) => {
    // Validate numeric input
    if (!isNaN(value)) {
      setCurrentWeight(parseFloat(value));
    } else {
      // Display error message or handle invalid input
      Alert.alert('Invalid Input', 'Please enter a valid number for Current Weight');
    }
  };

  return (
    <LinearGradient
      colors={['#7B68EE', '#FF6347']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.label}>Goal Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={goalWeight.toString()}
            onChangeText={handleGoalWeightChange}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Current Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={currentWeight.toString()}
            onChangeText={handleCurrentWeightChange}
            keyboardType="numeric"
          />
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
          {achievementUnlocked && (
            <View style={styles.achievementContainer}>
              <Ionicons name="medal" size={36} color="#FFD700" />
              <Text style={styles.achievementText}>Achievement Unlocked: Goal Weight Reached!</Text>
            </View>
          )}
          <Text style={styles.progressText}>{progressPercentage}%</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
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
  label: {
    fontSize: 18,
    color: '#FFFFFF', // White text color
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#000000', // Black text color
  },
  progressBarContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#555555', // Dark grey background
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#FFFFFF', // White color
  },
  progressText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF', // White text color
    textAlign: 'center',
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  achievementText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FFFFFF', // White text color
  },
});

export default WeightTrackerScreen;
