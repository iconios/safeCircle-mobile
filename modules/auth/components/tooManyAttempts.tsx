import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const MAX_WIDTH = 400;

export default function TooManyAttemptsScreen() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Pulse animation for the main icon
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Spin animation for hourglass
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    // Handle close action
    console.log('Close pressed');
  };

  const handleContactSupport = () => {
    // Handle contact support
    console.log('Contact support pressed');
  };

  const handleReturnToLogin = () => {
    // Handle return to login
    console.log('Return to login pressed');
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <View style={styles.blurCircle1} />
          <View style={styles.blurCircle2} />
        </View>

        {/* Main Content */}
        <View style={[styles.contentContainer, { maxWidth: MAX_WIDTH }]}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={24} color="#6b5e5e" />
          </TouchableOpacity>

          {/* Hero Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <Animated.View style={[styles.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.iconInnerCircle}>
                <MaterialIcons 
                  name="lock-clock" 
                  size={40} 
                  color="#f20d0d" 
                />
              </View>
            </Animated.View>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>
            Too many attempts
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            For security, please wait 15 minutes before trying again. We've temporarily paused verification for this number.
          </Text>

          {/* Timer Card */}
          <View style={styles.timerCard}>
            <Text style={styles.timerLabel}>
              You can try again in
            </Text>
            <View style={styles.timerDisplay}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialIcons 
                  name="hourglass-top" 
                  size={20} 
                  color="#f20d0d" 
                />
              </Animated.View>
              <Text style={styles.timerText}>
                {formatTime(timeLeft)}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {/* Disabled Resend Button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonDisabled]}
              disabled={true}
              activeOpacity={1}
            >
              <Text style={styles.buttonDisabledText}>
                Resend Verification Code
              </Text>
            </TouchableOpacity>

            {/* Contact Support Button */}
            <TouchableOpacity
              style={[styles.button, styles.buttonSupport]}
              onPress={handleContactSupport}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name="support-agent" 
                size={20} 
                color="#f20d0d" 
              />
              <Text style={styles.buttonSupportText}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <TouchableOpacity
            style={styles.footerLink}
            onPress={handleReturnToLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLinkText}>
              Return to Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5f5',
  },
  safeArea: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    opacity: 0.4,
  },
  blurCircle1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#f20d0d',
    opacity: 0.05,
  },
  blurCircle2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#f20d0d',
    opacity: 0.05,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    zIndex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#f20d0d',
    opacity: 0.1,
    transform: [{ scale: 1.5 }],
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(242, 13, 13, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconInnerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#181111',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    color: '#6b5e5e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  timerCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b5e5e',
    marginBottom: 8,
  },
  timerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f20d0d',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  actionsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  buttonDisabledText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9ca3af',
  },
  buttonSupport: {
    borderWidth: 2,
    borderColor: 'rgba(242, 13, 13, 0.2)',
    backgroundColor: 'transparent',
  },
  buttonSupportText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f20d0d',
  },
  footerLink: {
    marginTop: 32,
    padding: 8,
  },
  footerLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b5e5e',
  },
});