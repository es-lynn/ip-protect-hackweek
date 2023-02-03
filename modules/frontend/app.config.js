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
        APP_DOMAIN: process.env.APP_DOMAIN,
        API_URL: process.env.API_URL,
        BASIC_AUTH_UID: process.env.BASIC_AUTH_UID,
        BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_REDIRECT_PATH: process.env.AUTH0_REDIRECT_PATH
      },
      eas: {
        projectId: '59673487-2c90-491e-b93c-444d38c5b2f0'
      }
    },
    owner: 'aelesia'
  }
}
