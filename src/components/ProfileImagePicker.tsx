// components/ProfileImagePicker.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PROFILE_IMAGE_KEY = "@profile_image_uri";
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export interface ProfileImagePickerProps {
  userId: string;
  onImageChange?: (uri: string | null) => void;
  onError?: (error: string) => void;
  imageStyle?: object;
  containerStyle?: object;
  placeholderIcon?: React.ReactNode;
  disabled?: boolean;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  userId,
  onImageChange,
  onError,
  imageStyle,
  containerStyle,
  placeholderIcon,
  disabled = false,
}) => {
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const openSettings = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  }, []);

  const validateImageUri = useCallback(
    async (uri: string): Promise<boolean> => {
      try {
        // Check if URI is accessible
        const response = await fetch(uri, { method: "HEAD" });
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.startsWith("image/")) {
          return false;
        }

        const contentLength = response.headers.get("content-length");
        if (contentLength) {
          const size = parseInt(contentLength, 10);
          if (size > MAX_IMAGE_SIZE_BYTES) {
            return false;
          }
        }

        return true;
      } catch (error) {
        // For local URIs, try loading as image
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = uri;
          setTimeout(() => resolve(false), 5000);
        });
      }
    },
    [],
  );

  const loadProfileUri = useCallback(async () => {
    if (!isMounted.current || !userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const key = `${PROFILE_IMAGE_KEY}_${userId}`;
      const saved = await AsyncStorage.getItem(key);

      if (isMounted.current) {
        if (saved) {
          const isValid = await validateImageUri(saved);
          if (isValid) {
            setProfileUri(saved);
            onImageChange?.(saved);
          } else {
            await AsyncStorage.removeItem(key);
            setProfileUri(null);
            onImageChange?.(null);
          }
        } else {
          setProfileUri(null);
          onImageChange?.(null);
        }
      }
    } catch (error) {
      console.error("Failed to load profile image:", error);
      if (isMounted.current) {
        setError("Failed to load profile image");
        onError?.("Failed to load profile image");
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [userId, onImageChange, onError, validateImageUri]);

  const validateImageFile = useCallback((uri: string): boolean => {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const extension = uri.substring(uri.lastIndexOf(".")).toLowerCase();

    if (!validExtensions.includes(extension)) {
      Alert.alert(
        "Invalid File Type",
        "Please select a valid image file (JPG, PNG, GIF, WEBP)",
      );
      return false;
    }

    return true;
  }, []);

  const pickImage = useCallback(async () => {
    if (isUploading || disabled) return;

    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "We need camera roll access to set a profile picture. Please enable it in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: openSettings },
          ],
        );
        return;
      }

      setIsUploading(true);
      setError(null);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        allowsMultipleSelection: false,
      });

      if (!isMounted.current) return;

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const uri = selectedAsset.uri;

        if (!validateImageFile(uri)) {
          setIsUploading(false);
          return;
        }

        if (
          selectedAsset.fileSize &&
          selectedAsset.fileSize > MAX_IMAGE_SIZE_BYTES
        ) {
          Alert.alert(
            "File Too Large",
            `Please select an image under ${MAX_IMAGE_SIZE_MB}MB`,
          );
          setIsUploading(false);
          return;
        }

        const key = `${PROFILE_IMAGE_KEY}_${userId}`;
        setProfileUri(uri);
        onImageChange?.(uri);
        await AsyncStorage.setItem(key, uri);

        Alert.alert("Success", "Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      if (isMounted.current) {
        Alert.alert("Error", "Failed to pick image. Please try again.");
        setError("Failed to pick image");
        onError?.("Failed to pick image");
      }
    } finally {
      if (isMounted.current) {
        setIsUploading(false);
      }
    }
  }, [
    userId,
    validateImageFile,
    onImageChange,
    onError,
    isUploading,
    disabled,
    openSettings,
  ]);

  const removeProfileImage = useCallback(async () => {
    if (disabled) return;

    Alert.alert(
      "Remove Profile Picture",
      "Are you sure you want to remove your profile picture?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              setIsUploading(true);
              const key = `${PROFILE_IMAGE_KEY}_${userId}`;
              await AsyncStorage.removeItem(key);
              if (isMounted.current) {
                setProfileUri(null);
                onImageChange?.(null);
                Alert.alert("Success", "Profile picture removed");
              }
            } catch (error) {
              console.error("Error removing profile image:", error);
              if (isMounted.current) {
                Alert.alert("Error", "Failed to remove profile picture");
                onError?.("Failed to remove profile picture");
              }
            } finally {
              if (isMounted.current) {
                setIsUploading(false);
              }
            }
          },
        },
      ],
    );
  }, [userId, onImageChange, onError, disabled]);

  // Load on mount
  useEffect(() => {
    loadProfileUri();
  }, [loadProfileUri]);

  if (isLoading) {
    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={loadProfileUri}
          style={styles.retryContainer}
        >
          <Ionicons name="alert-circle" size={32} color="#FF3B30" />
          <Text style={styles.errorText}>Failed to load image</Text>
          <Text style={styles.retryText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={pickImage}
        disabled={isUploading || disabled}
        activeOpacity={0.7}
        style={[styles.imageContainer, containerStyle]}
      >
        {isUploading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : profileUri ? (
          <Image
            source={{ uri: profileUri }}
            style={[styles.image, imageStyle]}
          />
        ) : (
          <View style={[styles.placeholderContainer, imageStyle]}>
            {placeholderIcon || (
              <Ionicons name="person" size={48} color="#CCCCCC" />
            )}
          </View>
        )}
      </TouchableOpacity>

      {!disabled && (
        <View style={styles.buttonContainer}>
          {profileUri && !isUploading && (
            <TouchableOpacity
              onPress={removeProfileImage}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={pickImage} style={styles.changeButton}>
            <Text style={styles.changeButtonText}>
              {profileUri ? "Change" : "Add Photo"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  retryContainer: {
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#FF3B30",
    marginTop: 8,
    fontSize: 14,
  },
  retryText: {
    color: "#007AFF",
    marginTop: 4,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  changeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ProfileImagePicker;
