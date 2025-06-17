// CalendarData.js

// Example data structure to track completed workouts by day
const calendarData = {
  '2024-06-01': {
    completed: true,
    workoutDetails: {
      day: 'Monday',
      sets: 3,
      reps: 12,
      weights: '20 kg',
      description: 'Lorem Ipsum text for Monday workout.',
      instructions: 'Instructions for Monday workout.',
      musclesTargeted: 'Chest, Shoulders, Triceps',
      formTechnique: 'Preferred form and technique for Monday workout.',
      warmup: [
        {
          name: 'Light Cardiovascular Exercise',
          details: 'Details for Light Cardiovascular Exercise.',
        },
        {
          name: 'Dynamic Stretches',
          details: 'Details for Dynamic Stretches.',
          subItems: [
            'Arm circles',
            'Shoulder circles',
            'Thoracic spine rotations',
          ],
        },
        {
          name: 'Mobility Exercises',
          details: 'Details for Mobility Exercises.',
          subItems: [
            'Shoulder dislocations',
            'Doorway chest stretches',
          ],
        },
        {
          name: 'Warm-up Sets',
          details: 'Details for Warm-up Sets.',
          subItems: [
            'Dumbbell Bench Press',
          ],
        },
      ],
      exercises: [
        'Dumbbell Bench Press',
        'Incline Dumbbell Press',
        'Dumbbell Flyes',
        'Dumbbell Pullover',
        'Close-Grip Dumbbell Press',
        'Overhead Dumbbell Triceps Extension',
      ],
    },
  },
  '2024-06-02': {
    completed: false,
    workoutDetails: null, // Example for a day without a completed workout
  },
  // Add more entries as needed for other days
};

export default calendarData;
