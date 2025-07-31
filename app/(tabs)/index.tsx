import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import axios from 'axios';

const HOST = 'http://192.168.50.51:8081';
const LOGO = 'https://storage.dogasigorta.com/app-1433/images/doga-cta.png';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!username || !password) {
        Alert.alert('Hata', 'Kullanıcı adı ve şifre gerekli!');
        return;
      }
      const { data } = await axios.post(`${HOST}/login`, { username, password });
      router.push({
        pathname: '/AnaSayfa',
        params: { username: data.username },
      });
    } catch (error) {
      alert('Login failed: ' + (error?.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/Kaydol');
  };

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
          setUsername('');
          setPassword('');
          router.replace('/'); // or router.push('/') to go back to login
        },
      },
    ],
    { cancelable: true }
  );
};

  return (
    <>
      <Stack.Screen options={{ title: 'Giriş Yap' }} />

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

        <Text style={styles.username}>Kullanıcı Adı</Text>
        <TextInput
          style={styles.usernameinput}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.password}>Şifre</Text>
        <TextInput
          style={styles.passwordinput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.logintext}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={handleSignup}>
          <Text style={styles.signuptext}>Kaydol</Text>
        </TouchableOpacity>
        
        <View style={styles.end}>
          <TouchableOpacity onPress={() => alert("Bizi arayın: 0850 811 5228")}>
            <Text style={styles.contact}>İletişime geç</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert("Ali Doğan Pekdaş - Mobile Developer \nMÜ Bilgisayar Mühendisliği \nDoğa Sigorta IT")}>
            <Text style={styles.by}>Powered By Ali Pekdaş</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0F0F0',
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
  username: {
    marginTop: 80,
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
  },
  usernameinput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  password: {
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
  },
  passwordinput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  login: {
    backgroundColor: '#90ecbeff',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 10,
  },
  logintext: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  signup: {
    marginTop: 50,
    backgroundColor: '#62c490ff',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginBottom: 220,
  },
  signuptext: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  end:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 10,
  },
  contact: {
    fontSize: 18,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  by: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'bred',
    backgroundColor: 'white',
  },
});
