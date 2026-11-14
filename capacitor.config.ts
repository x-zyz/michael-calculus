import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.michael.calculus',
  appName: 'Michael calculus',
  webDir: 'dist',
  // Bundle the app locally: the APK does not depend on the hosted Site or sign-in.
  server: { androidScheme: 'https' },
  android: {
    backgroundColor: '#f7f8fa',
    allowMixedContent: false,
    adjustMarginsForEdgeToEdge: 'auto',
    minWebViewVersion: 111,
  },
};

export default config;
