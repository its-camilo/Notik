

import { StyleSheet, View } from 'react-native';
import { KeepAliveIndicator } from '@/components/keepalive';
import { MainScreen } from '@/src/screens/MainScreen';
import { AuthScreen } from '@/src/screens/AuthScreen';

const isAuthenticated = false; // Cambia a true para mostrar MainScreen

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <View style={styles.indicatorContainer}>
        <KeepAliveIndicator />
      </View> */}
      {isAuthenticated ? <MainScreen /> : <AuthScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
