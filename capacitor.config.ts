import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '389824675125-99qjdgtc48blc2p7c40otses2jcnn015.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

  appId: 'com.sunset.sunset',
  appName: 'Sunset',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
