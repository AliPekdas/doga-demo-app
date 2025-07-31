import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; 

const LOGO = 'https://storage.dogasigorta.com/app-1433/images/doga-cta.png';

export default function Profil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

    const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Oturumunuzu kapatmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Evet',
          onPress: () => {
            setMenuOpen(false);
            router.replace('/'); // or router.push('/') to go back to login
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
    <View style={styles.bar}>
        <TouchableOpacity style={styles.menuContainer} onPress={() => setMenuOpen(true)}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        <Text style={styles.brand}>Doğa Sigorta</Text>
        <Text style={styles.slogan}>güven doğasında var</Text>
      </View>
      
      {menuOpen && ( <View style={styles.menu}>
        <TouchableOpacity onPress={() => setMenuOpen(false)}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {setMenuOpen(false), router.push('/AnaSayfa')}}>
          <Text style={styles.menuItems}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setMenuOpen(false), router.push('/Profil')}}>
          <Text style={styles.menuItems}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setMenuOpen(false), router.push('/Ayarlar')}}>
          <Text style={styles.menuItems}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuItems}>Çıkış Yap</Text>
        </TouchableOpacity>

        <Image source={{ uri: LOGO }} style={styles.logo} />
      </View>
      )}

      <View style={styles.container}>
        <Text style={styles.profile}>Profil</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 120,
    alignItems: 'center',
    backgroundColor: '#008e5d',
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 100,
    width: 36,
    height: 36,
  },
  menuLine: {
    width: 28,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 2,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 100,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 999,
    paddingTop: 120,
  },
  close: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 30,
  },
  menuItems: {
    fontSize: 24,
    backgroundColor: '#f5e181ff',
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: 20,
    marginRight: 150,
    paddingVertical: 3,
    paddingLeft: 10,
  },
  logo: {
    width: 120,
    height: 84,
    position: 'absolute',
    top: 720,
    right: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    marginTop: 50,
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: '#fff',
  },
  profile: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});