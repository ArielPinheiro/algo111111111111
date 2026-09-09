import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, PlusCircle, Bell, User } from 'lucide-react-native';

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const bottomInset = Platform.OS === 'ios' ? Math.max(insets.bottom, 16) : 6;

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomInset }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = options.tabBarIcon;
        const color = isFocused ? '#068CD4' : '#9CA3AF';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}>
            {IconComponent && IconComponent({ color, size: 22 })}
            <Text style={[styles.tabLabel, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Criar',
            tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notificações',
            tabBarIcon: ({ color, size }) => <Bell color={color} size={size} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={2.2} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
    minHeight: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
