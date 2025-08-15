import { TouchableOpacity, StyleSheet } from 'react-native';
import { useKeepAlive } from '@/hooks/useKeepAlive';

export default function KeepAliveIndicator() {
  const { isRunning, start, stop } = useKeepAlive();

  const toggleService = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.indicator,
        { backgroundColor: isRunning ? '#22c55e' : '#ef4444' } // Verde si está corriendo, rojo si está pausado
      ]}
      onPress={toggleService}
      activeOpacity={0.7}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
