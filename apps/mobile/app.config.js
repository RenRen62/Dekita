const APP_VARIANT = process.env.APP_VARIANT ?? 'development';

const IS_PRODUCTION = APP_VARIANT === 'production';
const APP_NAME = IS_PRODUCTION ? 'Dekita!' : `Dekita! (${APP_VARIANT})`;
const APP_ID = IS_PRODUCTION
  ? 'com.dekita.app'
  : `com.dekita.app.${APP_VARIANT}`;

module.exports = {
  name: APP_NAME,
  owner: 'rereren62',
  slug: 'dekita-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './images/icon.png',
  scheme: 'dekita-app',
  userInterfaceStyle: 'light',
  runtimeVersion: {
    policy: 'appVersion'
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/484e7458-83fc-4b39-b973-03bbbe9a7c03'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: APP_ID,
    googleServicesFile: './GoogleService-Info.plist',
    config: {
      usesNonExemptEncryption: false
    },
    infoPlist: {
      CFBundleLocalizations: ['ja_JP'],
      CFBundleDevelopmentRegion: 'ja_JP'
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './images/android-icon-foreground.png',
      backgroundColor: '#FFFFFF'
    },
    package: APP_ID,
    googleServicesFile: './google-services.json'
  },
  web: {
    favicon: './images/favicon.png'
  },
  plugins: [
    'expo-router',
    '@react-native-firebase/app',
    '@react-native-firebase/perf',
    '@react-native-firebase/crashlytics',
    'expo-font',
    "expo-web-browser",
    [
      "expo-build-properties", {
        "ios": {
          "useFrameworks": "static",
          "buildReactNativeFromSource": true
        }
      }
    ],
    [
      'expo-camera',
      {
        cameraPermission: '写真撮影にカメラを使用します',
        recordAudioAndroid: false
      }
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        image: './images/splash-icon.png',
        imageWidth: 200
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: '484e7458-83fc-4b39-b973-03bbbe9a7c03'
    }
  }
};
