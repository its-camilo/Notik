import React from 'react';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { Text } from 'react-native';

/*
  Configuración personalizada de toasts con colores de fondo y estilos
*/
export const toastConfig = {
  /*
    Toast de éxito con fondo verde y emojis
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#22C55E',
        backgroundColor: '#DCFCE7',
        borderRadius: 12,
        height: 70,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#DCFCE7',
        borderRadius: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#15803D',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#166534',
        lineHeight: 18,
      }}
      text2NumberOfLines={2}
    />
  ),

  /*
    Toast de información con fondo azul
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: '#3B82F6',
        backgroundColor: '#DBEAFE',
        borderRadius: 12,
        height: 70,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#DBEAFE',
        borderRadius: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#1D4ED8',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#1E40AF',
        lineHeight: 18,
      }}
      text2NumberOfLines={2}
    />
  ),

  /*
    Toast de error con fondo rojo
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#EF4444',
        backgroundColor: '#FEE2E2',
        borderRadius: 12,
        height: 70,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#FEE2E2',
        borderRadius: 12,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#DC2626',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#B91C1C',
        lineHeight: 18,
      }}
      text2NumberOfLines={2}
    />
  ),
};
