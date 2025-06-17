import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../ProgressContext'; // Import useProgress hook

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { day } = route.params;
  const { progressData, updateProgress } = useProgress(); // Access progressData and updateProgress from context

  // Define workout details for each day
  const workoutDetails = {
    Monday: {
      warmup: [
        { name: 'Light Cardiovascular Exercise', details: '5-10 minutes' },
        { name: 'Dynamic Stretches', details: 'Arm circles, shoulder circles, thoracic spine rotations (2 sets of 8-10 reps each)' },
        { name: 'Mobility Exercises', details: 'Shoulder dislocations, doorway chest stretches (1 set of 8-10 reps each)' },
        { name: 'Warm-up Sets', details: 'Dumbbell Bench Press - 1-2 sets of 10-12 reps with lighter weights' },
      ],
      exercises: [
        { name: 'Dumbbell Bench Press', sets: 4, reps: 8-12, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
        { name: 'Incline Dumbbell Press', sets: 4, reps: 8-12, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
        { name: 'Dumbbell Flyes', sets: 3, reps: 12-15, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
        { name: 'Dumbbell Pullover', sets: 3, reps: 10-12, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
        { name: 'Close-Grip Dumbbell Press', sets: 3, reps: 8-12, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
        { name: 'Overhead Dumbbell Triceps Extension', sets: 3, reps: 10-12, weights: '', description: '', editedSets: '', editedReps: '', editedWeights: '' },
      ],
      image: require('../assets/snack-icon.png'), // Example image import
    },
    // Define details for other days similarly
  };

  // Ensure day exists in workoutDetails before accessing it
  if (!workoutDetails[day]) {
    return (
      <LinearGradient colors={['#7B68EE', '#FF6347']} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.dayText}>No workout details found for {day}.</Text>
        </View>
      </LinearGradient>
    );
  }

  const { warmup, exercises, image } = workoutDetails[day];

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [warmupCompleted, setWarmupCompleted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const handleSectionToggle = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null); // Collapse if already selected
    } else {
      setSelectedSection(section); // Expand selected section
    }
    // Clear selected exercise when switching sections
    setSelectedExercise(null);
  };

  const handleExerciseClick = (section, item) => {
    if (selectedSection === section && selectedExercise === item) {
      setSelectedExercise(null); // Collapse if already selected
      setModalVisible(false); // Close modal if same item clicked again
    } else {
      setSelectedSection(section); // Expand selected section
      setSelectedExercise(item); // Select clicked item
      setModalVisible(true); // Open modal
    }
  };

  const handleWarmupCompletion = () => {
    setWarmupCompleted(true);
    setModalVisible(false); // Close the modal after warm-up completion
    // Update progress for warm-up completion
    updateProgress(day, 50); // Adjust up the progress percentage as needed
  };

  const handleWorkoutCompletion = () => {
    setWorkoutCompleted(true);
    setModalVisible(false); // Close the modal after workout completion
    // Update progress for workout completion
    updateProgress(day, 100); // Adjust the progress percentage as needed
  };

  const handleModalClose = () => {
    setSelectedSection(null);
    setSelectedExercise(null);
    setModalVisible(false);
  };

  const navigateWorkout = (direction) => {
    const workoutList = selectedSection === 'warmup' ? warmup : exercises;
    const currentIndex = workoutList.findIndex((item) => item.name === selectedExercise);
    if (direction === 'left') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : workoutList.length - 1;
      setSelectedExercise(workoutList[prevIndex].name);
    } else if (direction === 'right') {
      const nextIndex = currentIndex < workoutList.length - 1 ? currentIndex + 1 : 0;
      setSelectedExercise(workoutList[nextIndex].name);
    }
  };

  const handleDetailChange = (index, key, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][key] = value;
    workoutDetails[day].exercises = updatedExercises;
  };

  return (
    <LinearGradient colors={['#7B68EE', '#FF6347']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.dayText}>{day}'s Workout Details:</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Warm-up Section */}
          <TouchableOpacity style={styles.sectionButton} onPress={() => handleSectionToggle('warmup')}>
            <Text style={styles.sectionButtonText}>Warm-up</Text>
          </TouchableOpacity>
          {selectedSection === 'warmup' && (
            <View style={styles.detailsContainer}>
              {warmup.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.subSectionButton}
                    onPress={() => handleExerciseClick('warmup', item.name)}
                  >
                    <Text style={styles.subSectionButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                  {selectedExercise === item.name && (
                    <Text style={styles.exerciseDetails}>{item.details}</Text>
                  )}
                </View>
              ))}
              {!warmupCompleted && (
                <TouchableOpacity style={styles.sectionButton} onPress={handleWarmupCompletion}>
                  <Text style={styles.sectionButtonText}>Complete Warm-up</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Workout Section */}
          <TouchableOpacity style={styles.sectionButton} onPress={() => handleSectionToggle('workout')}>
            <Text style={styles.sectionButtonText}>Workout</Text>
          </TouchableOpacity>
          {selectedSection === 'workout' && (
            <View style={styles.detailsContainer}>
              {exercises.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.subSectionButton}
                    onPress={() => handleExerciseClick('workout', item.name)}
                  >
                    <Text style={styles.subSectionButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                  {selectedExercise === item.name && (
                    <View>
                      <Text style={styles.exerciseDetails}>Sets: {item.editedSets || item.sets}</Text>
                      <Text style={styles.exerciseDetails}>Reps: {item.editedReps || item.reps}</Text>
                      <Text style={styles.exerciseDetails}>Weights: {item.editedWeights || item.weights}</Text>
                      <TextInput
                        style={styles.input}
                        value={item.editedSets}
                        onChangeText={(text) => handleDetailChange(index, 'editedSets', text)}
                        placeholder="Enter sets"
                      />
                      <TextInput
                        style={styles.input}
                        value={item.editedReps}
                        onChangeText={(text) => handleDetailChange(index, 'editedReps', text)}
                        placeholder="Enter reps"
                      />
                      <TextInput
                        style={styles.input}
                        value={item.editedWeights}
                        onChangeText={(text) => handleDetailChange(index, 'editedWeights', text)}
                        placeholder="Enter weights"
                      />
                    </View>
                  )}
                </View>
              ))}
              {!workoutCompleted && (
                <TouchableOpacity style={styles.sectionButton} onPress={handleWorkoutCompletion}>
                  <Text style={styles.sectionButtonText}>Complete Workout</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        {/* Workout Details Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
                    <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              {selectedExercise && (
                <>
                  <Image source={image} style={styles.exerciseImage} />
                  <Text style={styles.modalTitle}>{selectedExercise}</Text>
                  <Text style={styles.exerciseDetails}>Sets: {exercises.find(e => e.name === selectedExercise)?.editedSets || exercises.find(e => e.name === selectedExercise)?.sets}</Text>
                  <Text style={styles.exerciseDetails}>Reps: {exercises.find(e => e.name === selectedExercise)?.editedReps || exercises.find(e => e.name === selectedExercise)?.reps}</Text>
                  <Text style={styles.exerciseDetails}>Weights: {exercises.find(e => e.name === selectedExercise)?.editedWeights || exercises.find(e => e.name === selectedExercise)?.weights}</Text>
                  <TextInput
                    style={styles.input}
                    value={exercises.find(e => e.name === selectedExercise)?.editedSets || ''}
                    onChangeText={(text) => handleDetailChange(exercises.findIndex(e => e.name === selectedExercise), 'editedSets', text)}
                    placeholder="Enter sets"
                  />
                  <TextInput
                    style={styles.input}
                    value={exercises.find(e => e.name === selectedExercise)?.editedReps || ''}
                    onChangeText={(text) => handleDetailChange(exercises.findIndex(e => e.name === selectedExercise), 'editedReps', text)}
                    placeholder="Enter reps"
                  />
                  <TextInput
                    style={styles.input}
                    value={exercises.find(e => e.name === selectedExercise)?.editedWeights || ''}
                    onChangeText={(text) => handleDetailChange(exercises.findIndex(e => e.name === selectedExercise), 'editedWeights', text)}
                    placeholder="Enter weights"
                  />
                </>
              )}
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={() => navigateWorkout('left')}>
                  <Text style={styles.navigationButtonText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateWorkout('right')}>
                  <Text style={styles.navigationButtonText}>→</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  sectionButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  sectionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  subSectionButton: {
    backgroundColor: '#FFB6C1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  subSectionButtonText: {
    fontSize: 16,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  exerciseImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  navigationButtonText: {
    fontSize: 24,
    marginHorizontal: 20,
  },
});

export default WorkoutDetailsScreen;
