# Profiles App (Lab 10)

Bu proje, Mobil Programlama Lab 10 kapsamında React Native kullanılarak geliştirilmiştir. Uygulama, yerel bir Express.js sunucusundan (API) veri çeker, listeler ve detaylarını gösterir.

**Öğrenci Adı:** Eda Nur Sezgin  
**Öğrenci No:** 220404039

## Proje Özellikleri
* **API Entegrasyonu:** Axios kullanılarak veri çekme işlemleri.
* **Sayfalama (Pagination):** Liste aşağı kaydırıldıkça yeni verilerin yüklenmesi.
* **Navigasyon:** Stack Navigation ile liste ve detay sayfaları arası geçiş.
* **Dinamik İçerik:** Seçilen profile göre detay sayfasının doldurulması.
* **Hata Yönetimi:** Ağ hataları ve yükleme durumları için kullanıcı bilgilendirmesi.
* **Yenileme:** "Pull-to-refresh" özelliği ile listenin yenilenmesi.

---

## Kurulum ve Çalıştırma

Bu projeyi çalıştırmak için hem **Sunucu (Backend)** hem de **Uygulama (Frontend)** tarafını ayağa kaldırmanız gerekir.

### 1. Sunucu (Backend) Kurulumu
1. `ProfilesServer` klasörünü indirin.
2. Terminalde bu klasörün içine girin.
3. Bağımlılıkları yükleyin ve sunucuyu başlatın:
   ```bash
   npm install
   node server.js

* **IP Yapılandırması:** Proje ana dizininde `.env` dosyası oluşturun ve bilgisayarınızın yerel IP adresini şu formatta ekleyin: `EXPO_PUBLIC_API_BASE_URL=http://172.20.10.2:3000`
