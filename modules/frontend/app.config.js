module.exports = {
  expo: {
    name: 'frontend',
    slug: 'iprotect',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      env: {
        API_URL: process.env.API_URL,
        BASIC_AUTH_UID: process.env.BASIC_AUTH_UID,
        BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD
      },
      eas: {
        projectId: '59673487-2c90-491e-b93c-444d38c5b2f0'
      }
    },
    owner: 'aelesia'
  }
}
