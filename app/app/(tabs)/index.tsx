import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useKeepAlive } from '@/hooks/useKeepAlive';
import { useAutoStart } from '@/hooks/useAutoStart';

export default function HomeScreen() {
  const { isRunning, start, stop } = useKeepAlive();
  const { autoStart, setAutoStart, loading } = useAutoStart();

  // Iniciar el servicio automáticamente si está habilitado
  useEffect(() => {
    if (!loading && autoStart && !isRunning) {
      start();
    }
  }, [loading, autoStart, isRunning, start]);

  const toggleAutoStart = async () => {
    try {
      const newValue = !autoStart;
      await setAutoStart(newValue);
      
      if (newValue && !isRunning) {
        start();
        Alert.alert('Auto Start Activado', 'El servicio Keep-Alive se ha iniciado automáticamente.');
      } else if (!newValue && isRunning) {
        stop();
        Alert.alert('Auto Start Desactivado', 'El servicio Keep-Alive se ha detenido.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar la configuración del Auto Start.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Hello World! 👋
        </ThemedText>
        
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              autoStart ? styles.buttonActive : styles.buttonInactive
            ]} 
            onPress={toggleAutoStart}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? 'Cargando...' : `Auto Start: ${autoStart ? 'ON' : 'OFF'}`}
            </ThemedText>
          </TouchableOpacity>
          
          <ThemedText style={styles.statusText}>
            Keep-Alive Status: {isRunning ? '🟢 Activo' : '🔴 Inactivo'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonInactive: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
});
