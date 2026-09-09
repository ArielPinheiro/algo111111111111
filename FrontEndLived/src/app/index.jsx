import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  Search,
  Menu,
  Heart,
  MessageCircle,
  Bookmark,
  X,
  User,
  Image as ImageIcon,
} from 'lucide-react-native';

const AVATAR_WOMAN =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
const AVATAR_MAN =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80';
const POST_LAPTOP_IMG =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
const LOGO_IMG = require('../../assets/images/image 18.png');

export default function FeedScreen() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const stories = [
    { id: '1', image: AVATAR_WOMAN },
    { id: '2', image: AVATAR_WOMAN },
    { id: '3', image: AVATAR_WOMAN },
    { id: '4', image: AVATAR_WOMAN },
    { id: '5', image: AVATAR_WOMAN },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {isSearchOpen ? (
            /* Active Expanded Search Bar */
            <View style={styles.expandedSearchContainer}>
              <View style={styles.expandedSearchInputWrapper}>
                <Search size={20} color="#068CD4" strokeWidth={2.4} style={styles.expandedSearchIcon} />
                <TextInput
                  ref={searchInputRef}
                  style={styles.expandedSearchTextInput}
                  placeholder="Pesquisar no Lived..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                    <X size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={handleCloseSearch} style={styles.cancelSearchButton}>
                <Text style={styles.cancelSearchText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Normal Header with Logo + Search Trigger */
            <>
              <View style={styles.logoContainer}>
                {/* Imagem da logo comentada conforme solicitado */}
                <Image source={LOGO_IMG} style={styles.logoImage} resizeMode="contain" />
                {Platform.OS === 'web' ? (
                  <Text style={[styles.logoText, { backgroundImage: 'linear-gradient(90deg, #068CD4, #068CD4 70%, #00B4D8 85%, #2ECC71 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }]}>Lived</Text>
                ) : (
                  <MaskedView
                    maskElement={
                      <Text style={[styles.logoText, { backgroundColor: 'transparent' }]}>Lived</Text>
                    }>
                    <LinearGradient
                      colors={['#068CD4', '#068CD4', '#00B4D8', '#2ECC71']}
                      locations={[0, 0.65, 0.85, 1]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ height: 30 }}
                    >
                      <Text style={[styles.logoText, { opacity: 0 }]}>Lived</Text>
                    </LinearGradient>
                  </MaskedView>
                )}
              </View>

              <View style={styles.searchSection}>
                <TouchableOpacity
                  style={styles.searchIconBtn}
                  activeOpacity={0.7}
                  onPress={handleOpenSearch}>
                  <Search size={22} color="#068CD4" strokeWidth={2.4} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.searchPill}
                  activeOpacity={0.8}
                  onPress={handleOpenSearch}>
                  <Text style={styles.searchPillPlaceholder}>
                    {searchQuery || ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Stories Carousel */}
        <View style={styles.storiesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScroll}>
            {stories.map((story, index) => (
              <LinearGradient
                key={`${story.id}-${index}`}
                colors={['#068CD4', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.storyRing}
              >
                <View style={styles.storyInnerRing}>
                  {/* Imagem do story comentada */}
                  {/* <Image source={{ uri: story.image }} style={styles.storyAvatar} /> */}
                  <View style={[styles.storyAvatar, styles.avatarPlaceholder]}>
                    <User size={22} color="#9CA3AF" />
                  </View>
                </View>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        {/* Feed Posts */}
        <View style={styles.feedContainer}>
          {/* Post 1 */}
          <View style={styles.postCard}>
            {/* Post Author */}
            <View style={styles.postHeader}>
              <View style={styles.postAuthorInfo}>
                {/* Imagem do autor comentada */}
                {/* <Image source={{ uri: AVATAR_WOMAN }} style={styles.authorAvatar} /> */}
                <View style={[styles.authorAvatar, styles.avatarPlaceholder]}>
                  <User size={20} color="#9CA3AF" />
                </View>
                <View style={styles.authorTextContainer}>
                  <Text style={styles.authorName}>Maria Oliveira</Text>
                  <Text style={styles.postTime}>Ontem às 18:20</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.menuButton}>
                <Menu size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.postDescription}>
              Meu primeiro projeto mobile ficou pronto! Testado no iOS e Android. Sensação maravilhosa de ver as telas funcionando em tempo real.
            </Text>

            {/* Post Image */}
            {/* Imagem do post comentada */}
            {/* <View style={styles.postImageWrapper}>
              <Image source={{ uri: POST_LAPTOP_IMG }} style={styles.postImage} />
            </View> */}
            <View style={[styles.postImageWrapper, styles.postImagePlaceholder]}>
              <ImageIcon size={32} color="#9CA3AF" />
            </View>

            {/* Post Actions Footer */}
            <View style={styles.postFooter}>
              <View style={styles.leftActions}>
                <TouchableOpacity style={styles.actionBadge} activeOpacity={0.7}>
                  <Heart size={16} color="#FF4D6D" fill="#FF4D6D" />
                  <Text style={styles.actionCount}>32</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBadge} activeOpacity={0.7}>
                  <MessageCircle size={16} color="#068CD4" fill="#068CD4" />
                  <Text style={styles.actionCount}>8</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
                <Bookmark size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Post 2 */}
          <View style={styles.postCard}>
            {/* Post Author */}
            <View style={styles.postHeader}>
              <View style={styles.postAuthorInfo}>
                {/* Imagem do autor comentada */}
                {/* <Image source={{ uri: AVATAR_MAN }} style={styles.authorAvatar} /> */}
                <View style={[styles.authorAvatar, styles.avatarPlaceholder]}>
                  <User size={20} color="#9CA3AF" />
                </View>
                <View style={styles.authorTextContainer}>
                  <Text style={styles.authorName}>Carlos Lima</Text>
                  <Text style={styles.postTime}>Ontem às 09:15</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.menuButton}>
                <Menu size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.postDescription}>
              Café + Código ☕ Nada como começar o dia resolvendo bugs complexos antes da primeira reunião de sync da equipe.
            </Text>

            {/* Post Actions Footer */}
            <View style={styles.postFooter}>
              <View style={styles.leftActions}>
                <TouchableOpacity style={styles.actionBadge} activeOpacity={0.7}>
                  <Heart size={16} color="#FF4D6D" fill="#FF4D6D" />
                  <Text style={styles.actionCount}>14</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBadge} activeOpacity={0.7}>
                  <MessageCircle size={16} color="#068CD4" fill="#068CD4" />
                  <Text style={styles.actionCount}>2</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    minHeight: 64,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#068CD4',
    letterSpacing: -0.5,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchIconBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchPill: {
    width: 146,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchPillPlaceholder: {
    fontSize: 14,
    color: '#374151',
  },
  expandedSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expandedSearchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#068CD4',
    paddingHorizontal: 12,
    height: 40,
  },
  expandedSearchIcon: {
    marginRight: 6,
  },
  expandedSearchTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 0,
    outlineStyle: 'none',
  },
  clearButton: {
    padding: 4,
  },
  cancelSearchButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  cancelSearchText: {
    color: '#068CD4',
    fontSize: 14,
    fontWeight: '600',
  },
  storiesContainer: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  storiesScroll: {
    paddingHorizontal: 16,
    gap: 14,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInnerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
  },
  feedContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  postAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorTextContainer: {
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 12,
  },
  postImageWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 14,
  },
  postImagePlaceholder: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 190,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actionCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  bookmarkButton: {
    padding: 4,
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
