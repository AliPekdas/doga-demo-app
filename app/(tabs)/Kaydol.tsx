import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';

const HOST = 'http://192.168.50.51:8081';
const LOGO = 'https://storage.dogasigorta.com/app-1433/images/doga-cta.png';

interface RegisterResponse {
  message: string;
}
 
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
          router.replace('/'); // or router.push('/') to go back to login
        },
      },
    ],
    { cancelable: true }
  );
};

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Hata', 'Tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor.');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post<RegisterResponse>(`${HOST}/register`, { username, password});
      Alert.alert('Başarılı', 'Giriş yapınız.');
      router.push('/'); // Redirect to login page
    } catch (error: any) {
      const message = error?.response?.data?.error || error.message || 'Kayıt başarısız.';
      Alert.alert('Hata', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Kaydol' }} />
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
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifreyi Onayla"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kaydol</Text>
        </TouchableOpacity>
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
  slogan: {
    fontSize: 16,
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8f8f8',
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
  input: {
    fontSize: 16,
    borderColor: '#000',
    borderRadius: 10,
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,    
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#62c490ff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
