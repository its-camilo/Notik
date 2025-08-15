import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { KeepAliveIndicator } from '@/components/keepalive';

export default function HomeScreen() {
  return (
    <ThemedView>
      <ThemedView style={styles.indicatorContainer}>
        <KeepAliveIndicator />
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Hello World!
        </ThemedText>
      </ThemedView>
    </ThemedView>
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
