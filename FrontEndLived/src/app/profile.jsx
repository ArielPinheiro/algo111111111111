import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, User } from 'lucide-react-native';

const PROFILE_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';

export default function EditProfileScreen() {
  const router = useRouter();
  const flashAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const triggerFlash = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    flashAnim.stopAnimation();
    flashAnim.setValue(0);

    Animated.sequence([
      Animated.timing(flashAnim, {
        toValue: 1,
        duration: 70,
        useNativeDriver: false,
      }),
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      isAnimating.current = false;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.push('/')}>
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
        </View>

        {/* Profile Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            {/* <Image
              source={{ uri: PROFILE_AVATAR }}
              style={styles.avatarImage}
            /> */}
            <View style={[styles.avatarImage, styles.avatarPlaceholder]}>
              <User size={48} color="#9CA3AF" />
            </View>
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
              <ImageIcon size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME</Text>
            <TextInput
              style={styles.input}
              defaultValue="Késsia Milana"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Usuário */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>USUÁRIO</Text>
            <TextInput
              style={styles.input}
              defaultValue="kessia.milana"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          {/* Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>BIO</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              defaultValue="Desenvolvedora e entusiasta de tecnologia. Apaixonada por compartilhar conhecimento!"
              placeholderTextColor="#9CA3AF"
              multiline
              scrollEnabled={false}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPressIn={triggerFlash}
            onPress={triggerFlash}>
            {/* Flash layer */}
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: '#0077B6',
                  opacity: flashAnim,
                },
              ]}
            />
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '650',
    color: '#111827',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#068CD4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#068CD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  form: {
    gap: 20,
    marginBottom: 36,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#068CD4',
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1F2937',
    outlineStyle: 'none',
  },
  bioInput: {
    height: 'auto',
    minHeight: 52,
    paddingTop: 12,
    paddingBottom: 12,
    lineHeight: 20,
    outlineStyle: 'none',
    ...(Platform.OS === 'web' ? { fieldSizing: 'content' } : {}),
  },
  avatarPlaceholder: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#068CD4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#068CD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disabledScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledScreenContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 10,
  },
  disabledScreenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  disabledScreenSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
