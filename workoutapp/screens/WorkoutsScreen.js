import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useProgress } from '../ProgressContext'; // Import the ProgressContext

const WorkoutsScreen = ({ navigation }) => {
  const { progressData } = useProgress(); // Access progressData from context

  const daysOfWeek = [
    { day: 'Monday', workout: 'Push (Chest, Shoulders, Triceps)', icon: require('../assets/snack-icon.png') },
    { day: 'Tuesday', workout: 'Pull (Back, Biceps)', icon: require('../assets/snack-icon.png') },
    { day: 'Wednesday', workout: 'Legs', icon: require('../assets/snack-icon.png') },
    { day: 'Thursday', workout: 'Core and Lower Back', icon: require('../assets/snack-icon.png') },
    { day: 'Friday', workout: 'Rest', icon: require('../assets/snack-icon.png') },
    { day: 'Saturday', workout: 'Full Body (Optional)', icon: require('../assets/snack-icon.png') },
    { day: 'Sunday', workout: 'Rest', icon: require('../assets/snack-icon.png') },
  ];

  const handleWorkoutPress = (day) => {
    navigation.navigate('WorkoutDetails', { day });
  };

  return (
    <View style={styles.container}>
      {daysOfWeek.map((item) => (
        <TouchableOpacity
          key={item.day}
          style={styles.buttonContainer}
          onPress={() => handleWorkoutPress(item.day)}
          activeOpacity={0.8}
        >
          <Text style={styles.titleText}>{item.day}</Text>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.descriptionText}>{item.workout}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progressData[item.day]}%` }]} />
            <Text style={styles.progressText}>{progressData[item.day]}%</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Light grey background
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#7B68EE',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
    tintColor: '#7B68EE', // Icon color
  },
  descriptionText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
    marginTop: 10,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#DDD',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row', // Ensure progress bar and text are aligned horizontally
    alignItems: 'center', // Center items vertically
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7B68EE', // Progress bar color
    borderRadius: 5,
  },
  progressText: {
    marginLeft: 5, // Add space between progress bar and text
    color: '#555', // Text color
  },
});

export default WorkoutsScreen;
