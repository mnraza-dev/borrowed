import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen name="home" options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="explore" options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="activity" options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "notifications" : "notifications-outline"} color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="create-listing" options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "add-circle" : "add-circle-outline"} color={color} size={size} />
        ),
      }} />
    </Tabs>
  );
}