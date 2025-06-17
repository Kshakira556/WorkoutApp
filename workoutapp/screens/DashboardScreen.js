import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DashboardScreen = ({ navigation }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  let dayWorkout = '';

  switch (today) {
    case 'Monday':
      dayWorkout = 'Push (Chest, Shoulders, Triceps)';
      break;
    case 'Tuesday':
      dayWorkout = 'Pull (Back, Biceps)';
      break;
    case 'Wednesday':
      dayWorkout = 'Legs';
      break;
    case 'Thursday':
      dayWorkout = 'Core and Lower Back';
      break;
    case 'Friday':
      dayWorkout = 'Rest';
      break;
    case 'Saturday':
      dayWorkout = 'Full Body (Optional)';
      break;
    case 'Sunday':
      dayWorkout = 'Rest';
      break;
    default:
      dayWorkout = 'Rest';
      break;
  }

  return (
    <LinearGradient colors={['#7B68EE', '#FF6347']} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Text style={styles.appName}>My Workout App</Text>
            <Text style={styles.title}>Today's Workout</Text>
            <Text style={styles.workoutText}>{today} = {dayWorkout}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, Platform.OS === 'web' ? styles.webButton : null]}
              onPress={() => navigation.navigate('Workouts')}
            >
              <Text style={styles.buttonText}>Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, Platform.OS === 'web' ? styles.webButton : null]}
              onPress={() => navigation.navigate('WeightTracker')}
            >
              <Text style={styles.buttonText}>Weight Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, Platform.OS === 'web' ? styles.webButton : null]}
              onPress={() => navigation.navigate('Calendar')}
            >
              <Text style={styles.buttonText}>Completed Workouts</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  workoutText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#7B68EE',
    fontWeight: 'bold',
  },
  webButton: {
    borderWidth: 1,
    borderColor: '#7B68EE',
  },
});

export default DashboardScreen;
