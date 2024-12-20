import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Check if the platform is not web before calling native methods
        if (Platform.OS !== 'web') {
            // Warm up the android browser to improve UX
            // https://docs.expo.dev/guides/authentication/#improving-user-experience
            void WebBrowser.warmUpAsync()
            return () => {
                void WebBrowser.coolDownAsync()
            }
        }
    }, [])
}
