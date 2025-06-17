// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerProvider } from './TimerContext'; // Import TimerProvider
import { ProgressProvider } from './ProgressContext'; // Import ProgressProvider

// Import your screens
import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import WeightTrackerScreen from './screens/WeightTrackerScreen';
import CalendarScreen from './screens/CalendarScreen';
import WorkoutDetailsScreen from './screens/WorkoutDetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <TimerProvider>
      <ProgressProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
            <Stack.Screen name="Workouts" component={WorkoutsScreen} options={{ title: 'Workouts' }} />
            <Stack.Screen name="WeightTracker" component={WeightTrackerScreen} options={{ title: 'Weight Tracker' }} />
            <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
            <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} options={{ title: 'Workout Details' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProgressProvider>
    </TimerProvider>
  );
}

export default App;
