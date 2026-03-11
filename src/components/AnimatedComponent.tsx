import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SIZE = 280;
const SPEED = 1;

const REACTIONS = [
  "Hi there! 👋",
  "Yay! 🎉",
  "Let's play! 🚀",
  "✨ So fun! ✨",
  "You got this! 💪",
];

const AnimatedComponent = () => {
  const lottieRef = useRef<LottieView>(null);
  const isTapping = useRef(false);

  const tapScale = useRef(new Animated.Value(1)).current;
  const tapRotate = useRef(new Animated.Value(0)).current;
  const bobAnim = useRef(new Animated.Value(0)).current;
  const shadowScale = useRef(new Animated.Value(1)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const bubbleY = useRef(new Animated.Value(10)).current;
  const sparklePulse = useRef(new Animated.Value(1)).current;

  const [message, setMessage] = useState(REACTIONS[0]);
  const [reactionIndex, setReactionIndex] = useState(0);

  useEffect(() => {
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -7,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    const shadow = Animated.loop(
      Animated.sequence([
        Animated.timing(shadowScale, {
          toValue: 0.85,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shadowScale, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    bob.start();
    shadow.start();
    return () => {
      bob.stop();
      shadow.stop();
    };
  }, []);

  // ── Sparkle pulse ──────────────────────────────────────────────────────────
  useEffect(() => {
    const sparkle = Animated.loop(
      Animated.sequence([
        Animated.timing(sparklePulse, {
          toValue: 1.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sparklePulse, {
          toValue: 0.6,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    sparkle.start();
    return () => sparkle.stop();
  }, []);

  // ── Speech bubble ──────────────────────────────────────────────────────────
  const showBubble = useCallback(() => {
    bubbleOpacity.setValue(0);
    bubbleY.setValue(12);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bubbleOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleY, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1600),
      Animated.timing(bubbleOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Tap bounce ─────────────────────────────────────────────────────────────
  const animateTap = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(tapScale, {
          toValue: 0.85,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(tapRotate, {
          toValue: -7,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(tapScale, {
          toValue: 1.15,
          friction: 3,
          tension: 200,
          useNativeDriver: true,
        }),
        Animated.timing(tapRotate, {
          toValue: 7,
          duration: 130,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(tapScale, {
          toValue: 1,
          friction: 5,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(tapRotate, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      isTapping.current = false;
    });
  }, []);

  // ── Handle tap ─────────────────────────────────────────────────────────────
  const handleTap = useCallback(() => {
    if (isTapping.current) return;
    isTapping.current = true;

    setReactionIndex((prev) => {
      const next = (prev + 1) % REACTIONS.length;
      setMessage(REACTIONS[next]);
      return next;
    });

    lottieRef.current?.reset();
    lottieRef.current?.play();

    animateTap();
    showBubble();
  }, [animateTap, showBubble]);

  const rotate = tapRotate.interpolate({
    inputRange: [-7, 7],
    outputRange: ["-7deg", "7deg"],
  });

  return (
    <View style={styles.container}>
      {/* Speech bubble */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bubble,
          { opacity: bubbleOpacity, transform: [{ translateY: bubbleY }] },
        ]}
      >
        <Text style={styles.bubbleText}>{message}</Text>
        <View style={styles.bubbleTail} />
      </Animated.View>

      {/* Sparkle overlay */}
      <Animated.Text
        pointerEvents="none"
        style={[styles.sparkle, { transform: [{ scale: sparklePulse }] }]}
      >
        ✨
      </Animated.Text>

      {/* Mascot */}
      <TouchableWithoutFeedback
        onPress={handleTap}
        accessibilityLabel="Tap the mascot"
      >
        <Animated.View
          style={{
            transform: [
              { translateY: bobAnim },
              { scale: tapScale },
              { rotate },
            ],
          }}
        >
          <LottieView
            ref={lottieRef}
            source={require("../assets/mascot.json")}
            autoPlay
            loop
            speed={SPEED}
            style={{ width: SIZE, height: SIZE }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Drop shadow */}
      <Animated.View
        style={[styles.shadow, { transform: [{ scaleX: shadowScale }] }]}
      />
    </View>
  );
};

export default AnimatedComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    position: "absolute",
    top: -52,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    zIndex: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  bubbleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
  },
  bubbleTail: {
    position: "absolute",
    bottom: -9,
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ffffff",
  },
  sparkle: {
    position: "absolute",
    top: 30,
    right: 14,
    fontSize: 20,
    zIndex: 10,
  },
  shadow: {
    width: SIZE * 0.5,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.10)",
    marginTop: -8,
  },
});
