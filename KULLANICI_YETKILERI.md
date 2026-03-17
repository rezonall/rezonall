# Kullanıcı Rolleri ve Yetkileri Detay Dokümantasyonu

Bu dokümantasyon, sistemdeki tüm kullanıcı rollerinin sahip olduğu yetkileri ve yapabilecekleri işlemleri detaylı olarak açıklar.

---

## 📋 İçindekiler

1. [Admin User (Yönetici Kullanıcı)](#1-admin-user-yönetici-kullanıcı)
2. [Restaurant User (Restoran Kullanıcı)](#2-restaurant-user-restoran-kullanıcı)
3. [Hotel User (Otel Kullanıcı)](#3-hotel-user-otel-kullanıcı)
4. [Super Admin (Platform Yöneticisi)](#4-super-admin-platform-yöneticisi)
5. [Genel Özellikler](#5-genel-özellikler)
..
---

## 1. Admin User (Yönetici Kullanıcı)

**Rol:** `ADMIN`  
**Erişim:** Kendi organizasyonundaki tüm verilere tam erişim

### 🎯 Genel Yetkiler

- ✅ Kendi organizasyonundaki tüm botları görüntüleme, oluşturma, düzenleme ve silme
- ✅ Müşteri (Customer) hesapları oluşturma, düzenleme ve silme
- ✅ Telefon numarası satın alma, import etme ve yönetme
- ✅ Bot ve telefon numarası atamaları yapma
- ✅ Bilgi bankası (Knowledge Base) oluşturma, düzenleme ve silme
- ✅ Tüm görüşmeleri görüntüleme ve analiz etme
- ✅ Organizasyon ayarlarını yönetme
- ✅ Retell API senkronizasyonu yapma

---

### 📄 Sayfalar ve İşlevler

#### 1.1. Bot Yönetimi (`/admin/bots`)

**Ana Sayfa:** `/admin/bots`

**Yapabilecekleri:**
- ✅ Tüm botları listeleme (organizasyon genelinde)
- ✅ Retell'den bot senkronizasyonu yapma
- ✅ Bot kartlarında şu bilgileri görme:
  - Bot adı ve açıklaması
  - Atanan müşteriler
  - Toplam görüşme sayısı
  - Bot durumu (aktif/pasif)
- ✅ Her bot için:
  - Bot detay sayfasına gitme
  - Bot düzenleme
  - Bot silme
  - Müşteriye atama

**API Endpoint'leri:**
- `GET /api/bots` - Bot listesi
- `POST /api/bots` - Yeni bot oluşturma
- `GET /api/bots/[botId]` - Bot detayları
- `PUT /api/bots/[botId]` - Bot güncelleme
- `DELETE /api/bots/[botId]` - Bot silme
- `POST /api/bots/[botId]/assign` - Müşteriye atama
- `POST /api/bots/sync` - Retell'den senkronizasyon

---

#### 1.2. Yeni Bot Oluşturma (`/admin/bots/new`)

**Yapabilecekleri:**
- ✅ Yeni AI asistanı (bot) oluşturma
- ✅ Bot konfigürasyonu:
  - **Temel Bilgiler:**
    - Bot adı
    - Bot açıklaması
    - Genel prompt (AI davranışı)
    - Başlangıç mesajı
  - **Ses Ayarları:**
    - Ses ID seçimi (11labs-Adrian, vb.)
    - Ses hızı (0.5-2)
    - Ses sıcaklığı (0-2)
    - Responsiveness (0-1)
    - Interruption sensitivity (0-1)
    - Backchannel etkinleştirme
    - Ambient sound seçimi
  - **Model Ayarları:**
    - LLM model seçimi (gpt-4o, vb.)
    - Dil ayarı (en-US, tr-TR, vb.)
  - **Gelişmiş Ayarlar:**
    - Webhook URL
    - Pronunciation dictionary
    - Boosted keywords
    - Normalize for speech
    - Opt out sensitive data storage
  - **Custom Tools:**
    - Özel fonksiyon tanımlama
    - Tool parametreleri

**İşlem Akışı:**
1. Form doldurulur
2. Backend Retell'de LLM oluşturur
3. Retell'de Agent oluşturulur
4. Veritabanına kaydedilir
5. Bot listesine yönlendirilir

---

#### 1.3. Bot Detay ve Düzenleme (`/admin/bots/[botId]`)

**Yapabilecekleri:**
- ✅ Bot detaylarını görüntüleme:
  - Temel bilgiler
  - Konfigürasyon ayarları
  - Atanan müşteriler
  - Bağlı bilgi bankaları
  - Versiyon geçmişi
  - Görüşme istatistikleri
- ✅ Bot düzenleme (`/admin/bots/[botId]/edit`):
  - Tüm bot ayarlarını güncelleme
  - Retell'de LLM ve Agent güncelleme
- ✅ Bot silme:
  - Retell'den agent ve LLM silme
  - Veritabanından kaldırma
- ✅ Versiyon yönetimi:
  - Yeni versiyon oluşturma
  - Versiyonları görüntüleme
  - Versiyon yayınlama
- ✅ Bilgi bankası atama:
  - Bot'a bilgi bankası ekleme
  - Top K ve Filter Score ayarlama
  - Bilgi bankası kaldırma
- ✅ Custom tool yönetimi:
  - Tool ekleme
  - Tool düzenleme
  - Tool silme

**API Endpoint'leri:**
- `GET /api/bots/[botId]` - Bot detayları
- `PUT /api/bots/[botId]` - Bot güncelleme
- `DELETE /api/bots/[botId]` - Bot silme
- `GET /api/bots/[botId]/versions` - Versiyon listesi
- `POST /api/bots/[botId]/versions` - Yeni versiyon
- `POST /api/bots/[botId]/versions/[versionId]/publish` - Versiyon yayınlama
- `GET /api/bots/[botId]/knowledge-bases` - Atanan KB listesi
- `POST /api/bots/[botId]/knowledge-bases` - KB atama
- `DELETE /api/bots/[botId]/knowledge-bases/[assignmentId]` - KB kaldırma
- `POST /api/bots/[botId]/tools` - Custom tool ekleme

---

#### 1.4. Müşteri Yönetimi (`/admin/customers`)

**Yapabilecekleri:**
- ✅ Tüm müşterileri listeleme
- ✅ Yeni müşteri oluşturma:
  - Email adresi
  - İsim
  - Şifre
  - Müşteri tipi seçimi (RESTAURANT veya HOTEL)
- ✅ Müşteri detaylarını görüntüleme (`/admin/customers/[customerId]`):
  - Temel bilgiler
  - Atanan botlar
  - Atanan telefon numaraları
  - Görüşme geçmişi
  - Sipariş/Rezervasyon istatistikleri
- ✅ Müşteri düzenleme:
  - İsim güncelleme
  - Email güncelleme
  - Şifre sıfırlama
  - Müşteri tipi değiştirme
- ✅ Müşteri silme:
  - Tüm ilişkili verilerle birlikte silme
  - Atamaları kaldırma

**API Endpoint'leri:**
- `GET /api/admin/customers` - Müşteri listesi
- `POST /api/admin/customers` - Yeni müşteri oluşturma
- `GET /api/admin/customers/[customerId]` - Müşteri detayları
- `PUT /api/admin/customers/[customerId]` - Müşteri güncelleme
- `DELETE /api/admin/customers/[customerId]` - Müşteri silme

---

#### 1.5. Telefon Numarası Yönetimi (`/admin/phone-numbers`)

**Yapabilecekleri:**
- ✅ Tüm telefon numaralarını listeleme
- ✅ Telefon numarası satın alma:
  - Retell üzerinden numara satın alma
  - Ülke ve bölge seçimi
  - Numara tipi seçimi
- ✅ Telefon numarası import etme:
  - Mevcut Retell numaralarını import etme
  - SIP numarası import etme
- ✅ Numara yönetimi:
  - Nickname ekleme/düzenleme
  - Numara aktif/pasif yapma
  - Bot atama:
    - Inbound bot (gelen aramalar için)
    - Outbound bot (giden aramalar için)
  - Müşteriye atama
- ✅ Numara silme:
  - Retell'den numara kaldırma
  - Veritabanından silme

**API Endpoint'leri:**
- `GET /api/phone-numbers` - Numara listesi
- `POST /api/phone-numbers/purchase` - Numara satın alma
- `POST /api/phone-numbers/import` - Numara import
- `PATCH /api/phone-numbers/[numberId]` - Numara güncelleme (bot atama)
- `DELETE /api/phone-numbers/[numberId]` - Numara silme

---

#### 1.6. Bilgi Bankası Yönetimi (`/admin/knowledge-bases`)

**Yapabilecekleri:**
- ✅ Tüm bilgi bankalarını listeleme (organizasyon genelinde)
- ✅ Yeni bilgi bankası oluşturma:
  - Müşteri seçimi (Restaurant veya Hotel)
  - Bilgi bankası tipi seçimi:
    - **Restaurant Bilgi Bankası:**
      - Restoran bilgileri
      - Menü öğeleri
      - Kampanyalar ve indirimler
      - Teslimat bilgileri
      - Çalışma saatleri
      - Özel notlar
    - **Hotel Bilgi Bankası:**
      - Otel bilgileri
      - Oda tipleri ve özellikleri
      - Günlük fiyatlar
      - Fiyat kuralları
      - Tesis özellikleri
      - Politikalar
      - Hizmetler
      - Konsept özellikleri
- ✅ Bilgi bankası düzenleme:
  - Tüm bilgileri güncelleme
  - Retell'de senkronizasyon
- ✅ Bilgi bankası silme:
  - Retell'den kaldırma
  - Veritabanından silme
- ✅ Bot'a bilgi bankası atama:
  - Bot seçimi
  - Top K ayarlama (kaç sonuç getirilecek)
  - Filter Score ayarlama (relevans eşiği)
- ✅ Bilgi bankası senkronizasyonu:
  - Retell'den güncel verileri çekme

**API Endpoint'leri:**
- `GET /api/knowledge-bases` - KB listesi
- `POST /api/knowledge-bases` - KB oluşturma
- `PUT /api/knowledge-bases/[id]` - KB güncelleme
- `DELETE /api/knowledge-bases/[id]` - KB silme

---

#### 1.7. Görüşme Yönetimi (`/admin/calls`)

**Yapabilecekleri:**
- ✅ Tüm görüşmeleri listeleme (organizasyon genelinde)
- ✅ Görüşme detaylarını görüntüleme:
  - Görüşme bilgileri (tarih, süre, durum)
  - Transkript (tam metin)
  - Ses kaydı (varsa)
  - Analiz verileri:
    - Sentiment analizi
    - Başarı değerlendirmesi
    - Latency metrikleri (E2E, LLM, ASR, TTS, KB)
    - Token kullanımı
    - Maliyet bilgileri
  - İlişkili sipariş/rezervasyon (varsa)
- ✅ Görüşme filtreleme:
  - Bot'a göre
  - Tarihe göre
  - Duruma göre
- ✅ Toplu görüşme başlatma:
  - CSV yükleme
  - Toplu arama yapma

**API Endpoint'leri:**
- `GET /api/calls` - Görüşme listesi
- `GET /api/calls/[callId]` - Görüşme detayları
- `GET /api/calls/[callId]/transcript` - Transkript
- `GET /api/calls/active` - Aktif görüşmeler
- `POST /api/calls/batch` - Toplu görüşme

---

#### 1.8. Sipariş Yönetimi (`/admin/orders`)

**Not:** Bu sayfa şu anda geliştirme aşamasındadır. Gelecekte sistem genelinde sipariş yönetimi eklenebilir.

**Planlanan Özellikler:**
- Tüm organizasyondaki siparişleri görüntüleme
- Sipariş istatistikleri
- Raporlama

---

#### 1.9. Ayarlar (`/admin/settings`)

**Yapabilecekleri:**
- ✅ Profil bilgilerini güncelleme:
  - İsim
  - Email
  - Şifre değiştirme
- ✅ Organizasyon ayarları:
  - **Retell API Anahtarı:**
    - API anahtarı ekleme/güncelleme
    - Mevcut anahtar durumunu görüntüleme
  - **Webhook Gizli Anahtarı:**
    - Webhook secret ekleme/güncelleme
    - Güvenlik için HMAC imza doğrulama
- ✅ Organizasyon bilgilerini görüntüleme:
  - Organizasyon adı
  - Slug
  - Subscription plan
  - Kota kullanımı

**API Endpoint'leri:**
- `GET /api/admin/settings` - Ayarları getirme
- `PUT /api/admin/settings` - Ayarları güncelleme
- `GET /api/profile` - Profil bilgileri
- `PUT /api/profile` - Profil güncelleme

---

## 2. Restaurant User (Restoran Kullanıcı)

**Rol:** `CUSTOMER`  
**Müşteri Tipi:** `RESTAURANT`  
**Erişim:** Sadece kendisine atanan botlar ve kendi verileri

### 🎯 Genel Yetkiler

- ✅ Kendisine atanan botları görüntüleme
- ✅ Atanan botlar ile görüşme başlatma
- ✅ Kendi görüşmelerini görüntüleme
- ✅ Canlı sipariş yönetimi
- ✅ Sipariş durumlarını güncelleme
- ✅ Kendi bilgi bankalarını görüntüleme
- ✅ Profil ayarlarını yönetme

---

### 📄 Sayfalar ve İşlevler

#### 2.1. Bot Yönetimi (`/customer/bots`)

**Yapabilecekleri:**
- ✅ Kendisine atanan botları listeleme
- ✅ Bot istatistiklerini görüntüleme:
  - Aktif bot sayısı
  - Atanan telefon numaraları
  - Toplam görüşme sayısı
- ✅ Bot detay sayfasına gitme (`/customer/bots/[botId]`):
  - Bot bilgilerini görüntüleme
  - Bot konfigürasyonunu görüntüleme (salt okunur)
  - Bağlı bilgi bankalarını görüntüleme
  - Görüşme geçmişini görüntüleme
- ✅ Bot düzenleme (`/customer/bots/[botId]/edit`):
  - **Sınırlı düzenleme yetkisi:** Sadece belirli alanları düzenleyebilir
  - Admin'in izin verdiği ayarları değiştirebilir

**API Endpoint'leri:**
- `GET /api/bots` - Atanan botları getirme (sadece kendisine atananlar)

---

#### 2.2. Görüşme Yönetimi (`/customer/calls`)

**Yapabilecekleri:**
- ✅ Kendi görüşmelerini listeleme:
  - Sadece kendisinin başlattığı görüşmeler
  - Kendisine atanan botlar üzerinden yapılan görüşmeler
- ✅ Görüşme detaylarını görüntüleme (`/customer/calls/[callId]`):
  - Görüşme bilgileri
  - Transkript
  - Ses kaydı (varsa)
  - Analiz verileri
- ✅ Yeni görüşme başlatma:
  - Telefon numarası girme
  - Bot seçimi (atanan botlar arasından)
  - Görüşme başlatma
- ✅ Web görüşmesi başlatma:
  - Tarayıcı üzerinden görüşme yapma

**API Endpoint'leri:**
- `GET /api/calls` - Kendi görüşmelerini getirme
- `POST /api/calls` - Yeni görüşme başlatma
- `GET /api/calls/[callId]` - Görüşme detayları
- `POST /api/calls/web` - Web görüşmesi başlatma

---

#### 2.3. Canlı Sipariş Yönetimi (`/customer/orders`)

**Yapabilecekleri:**
- ✅ Bekleyen siparişleri görüntüleme:
  - Gerçek zamanlı sipariş listesi
  - Otomatik yenileme (ayarlanabilir interval)
  - Yeni sipariş bildirimleri:
    - Ses bildirimi
    - Masaüstü bildirimi
- ✅ Sipariş detaylarını görüntüleme:
  - Müşteri bilgileri (isim, telefon)
  - Sipariş öğeleri
  - Teslimat adresi
  - Özel notlar
  - Toplam tutar
  - Görüşme kaydı ve transkript
- ✅ Sipariş durumlarını güncelleme:
  - **PENDING** → **PREPARING**: Hazırlanmaya başlama
  - **PREPARING** → **READY**: Hazır olduğunu işaretleme
  - **READY** → **COMPLETED**: Tamamlandı olarak işaretleme
  - **CANCELLED**: İptal etme
- ✅ Sipariş ayarları (`/customer/settings`):
  - Ses bildirimi açma/kapama
  - Ses seviyesi ayarlama
  - Otomatik yenileme açma/kapama
  - Yenileme interval'i ayarlama
  - Masaüstü bildirimleri açma/kapama

**Sipariş Durumları:**
- **PENDING**: Yeni geldi, bekliyor
- **PREPARING**: Hazırlanıyor
- **READY**: Hazır
- **COMPLETED**: Tamamlandı
- **CANCELLED**: İptal edildi

**API Endpoint'leri:**
- `GET /api/orders` - Sipariş listesi (durum filtresi ile)
- `GET /api/orders/[orderId]` - Sipariş detayları
- `PATCH /api/orders/[orderId]` - Sipariş durumu güncelleme

---

##### 📞 Sipariş Nasıl Geliyor? (Sipariş Oluşturma Süreci)

**1. Müşteri Telefonla Arama Yapar:**
   - Müşteri restoranın telefon numarasını arar
   - Retell AI bot'u aramayı cevaplar
   - Bot müşteri ile konuşur ve sipariş bilgilerini alır

**2. Sipariş Oluşturma Yöntemleri:**

   **A) Tool Call ile (Gerçek Zamanlı):**
   - Bot görüşme sırasında `create_order` tool'unu çağırır
   - Tool-call webhook'u (`/api/webhooks/tool-call`) tetiklenir
   - Sipariş anında oluşturulur ve veritabanına kaydedilir
   - **Avantaj:** Sipariş görüşme bitmeden önce oluşur, restoran hemen görebilir
   
   **B) Call Analyzed ile (Görüşme Sonrası):**
   - Görüşme bittiğinde Retell analiz yapar
   - `call_analyzed` webhook event'i gönderilir (`/api/webhooks/retell`)
   - Webhook handler'ı (`handleCallAnalyzed`) çalışır:
     - Görüşme analiz verilerinden sipariş bilgilerini çıkarır
     - `custom_analysis_data.order` objesinden sipariş bilgilerini alır
     - Siparişi veritabanına kaydeder
   - **Avantaj:** Daha detaylı analiz ve doğrulama yapılabilir

**3. Sipariş Verisi Çıkarımı:**
   ```typescript
   // Webhook'tan gelen veri yapısı:
   {
     custom_analysis_data: {
       order: {
         customer_name: "Ahmet Yılmaz",
         customer_phone: "+905551234567",
         items: "2 Adana Kebap, 1 Ayran, 1 Salata",
         total_amount: "150.00",
         delivery_address: "İstanbul, Kadıköy, ...",
         notes: "Acılı olsun"
       }
     }
   }
   ```

**4. Sipariş Kaydedilir:**
   - `customerId`: Restoran sahibinin (User) ID'si
   - `callId`: İlişkili görüşme ID'si
   - `status`: "PENDING" (varsayılan)
   - Tüm sipariş bilgileri Order tablosuna kaydedilir

**5. Sipariş Atama Mantığı:**
   - Telefon numarasına atanan müşteri varsa → O müşteriye atanır
   - Yoksa → Organizasyondaki ilk CUSTOMER rolündeki kullanıcıya atanır
   - Yoksa → Admin'e atanır (fallback)

---

##### 📋 Sipariş Nasıl Listeleniyor?

**1. Frontend Sayfası (`/customer/orders`):**
   - Sayfa yüklendiğinde `GET /api/orders?status=PENDING` çağrısı yapılır
   - API sadece o kullanıcıya ait (`customerId`) siparişleri döner
   - Siparişler tarih sırasına göre (en yeni önce) listelenir

**2. Otomatik Yenileme (Polling):**
   - Sayfa varsayılan olarak her 5 saniyede bir yenilenir
   - `fetchOrders()` fonksiyonu periyodik olarak çağrılır
   - Yeni sipariş geldiğinde:
     - Önceki sipariş sayısı ile karşılaştırılır
     - Yeni sipariş varsa:
       - Ses bildirimi çalar (`/notification.mp3`)
       - Masaüstü bildirimi gösterilir (tarayıcı izni gerekir)
       - Sipariş kartı animasyonlu şekilde görünür

**3. Sipariş Filtreleme:**
   - Varsayılan: Sadece `PENDING` durumundaki siparişler gösterilir
   - API'ye `?status=PENDING` parametresi gönderilir
   - İsteğe bağlı diğer durumlar da filtrelenebilir

**4. Sipariş Görüntüleme:**
   - Her sipariş bir kart olarak gösterilir
   - Kart içeriği:
     - Müşteri adı ve telefon numarası
     - Sipariş zamanı ve ne kadar önce geldiği
     - Sipariş öğeleri (detaylı liste)
     - Teslimat adresi (varsa)
     - Özel notlar (varsa)
     - Toplam tutar
     - Durum badge'i (renkli)
     - Aksiyon butonları (Detay, Hazırla, Tamamlandı)
     - Görüşme kaydı (açılır/kapanır)

**5. Gerçek Zamanlı Güncelleme:**
   - Sipariş durumu değiştirildiğinde (`PATCH /api/orders/[orderId]`)
   - Sayfa otomatik olarak yenilenir
   - Güncel durum anında yansır

**6. Bildirim Ayarları:**
   - Kullanıcı ayarlardan bildirimleri özelleştirebilir:
     - Ses bildirimi açma/kapama
     - Ses seviyesi (0-100)
     - Otomatik yenileme açma/kapama
     - Yenileme interval'i (saniye cinsinden, örn: 3, 5, 10)
     - Masaüstü bildirimleri açma/kapama
   - Ayarlar `localStorage`'da saklanır

**7. Veri Güvenliği:**
   - Her kullanıcı sadece kendi siparişlerini görebilir
   - API seviyesinde `customerId` kontrolü yapılır
   - Başka kullanıcının siparişine erişim engellenir

---

#### 2.4. Sipariş Detay Sayfası (`/customer/orders/[orderId]`)

**Yapabilecekleri:**
- ✅ Siparişin tüm detaylarını görüntüleme:
  - Müşteri bilgileri
  - Sipariş öğeleri (detaylı)
  - Teslimat bilgileri
  - Özel notlar
  - Fiyat detayları
  - Sipariş zaman çizelgesi
- ✅ İlişkili görüşme bilgilerini görüntüleme:
  - Görüşme transkripti
  - Ses kaydı (varsa)
  - Görüşme analizi
- ✅ Sipariş durumunu güncelleme

---

#### 2.5. Bilgi Bankası (`/customer/knowledge-bases`)

**Yapabilecekleri:**
- ✅ Kendi bilgi bankalarını görüntüleme:
  - Sadece kendisine ait bilgi bankaları
  - Admin tarafından oluşturulan bilgi bankaları
- ✅ Bilgi bankası detaylarını görüntüleme:
  - Restoran bilgileri
  - Menü öğeleri
  - Kampanyalar
  - Teslimat bilgileri
- ⚠️ **Sınırlı Yetki:** 
  - Bilgi bankası oluşturma/düzenleme şu anda devre dışı
  - Sadece görüntüleme yapılabilir
  - Oluşturma/düzenleme Admin tarafından yapılır

**API Endpoint'leri:**
- `GET /api/knowledge-bases` - Kendi bilgi bankalarını getirme

---

#### 2.6. Ayarlar (`/customer/settings`)

**Yapabilecekleri:**
- ✅ Profil bilgilerini güncelleme:
  - İsim
  - Email
  - Şifre değiştirme
- ✅ Sipariş bildirim ayarları:
  - Ses bildirimi açma/kapama
  - Ses seviyesi (0-100)
  - Otomatik yenileme açma/kapama
  - Yenileme interval'i (saniye cinsinden)
  - Masaüstü bildirimleri açma/kapama
- ⚠️ **Sınırlı Yetki:**
  - Organizasyon ayarlarına erişemez
  - Retell API anahtarlarını göremez/değiştiremez

**API Endpoint'leri:**
- `GET /api/profile` - Profil bilgileri
- `PUT /api/profile` - Profil güncelleme

---

## 3. Hotel User (Otel Kullanıcı)

**Rol:** `CUSTOMER`  
**Müşteri Tipi:** `HOTEL`  
**Erişim:** Sadece kendisine atanan botlar ve kendi verileri

### 🎯 Genel Yetkiler

- ✅ Kendisine atanan botları görüntüleme
- ✅ Atanan botlar ile görüşme başlatma
- ✅ Kendi görüşmelerini görüntüleme
- ✅ Rezervasyon yönetimi
- ✅ Oda yönetimi (oda tipleri, fiyatlar, müsaitlik)
- ✅ Kendi bilgi bankalarını görüntüleme
- ✅ Profil ayarlarını yönetme

---

### 📄 Sayfalar ve İşlevler

#### 3.1. Bot Yönetimi (`/customer/bots`)

**Yapabilecekleri:**
- ✅ Kendisine atanan botları listeleme
- ✅ Bot istatistiklerini görüntüleme
- ✅ Bot detay sayfasına gitme
- ✅ Bot düzenleme (sınırlı yetki)

**Not:** Restaurant User ile aynı yetkilere sahiptir.

---

#### 3.2. Görüşme Yönetimi (`/customer/calls`)

**Yapabilecekleri:**
- ✅ Kendi görüşmelerini listeleme
- ✅ Görüşme detaylarını görüntüleme
- ✅ Yeni görüşme başlatma
- ✅ Web görüşmesi başlatma

**Not:** Restaurant User ile aynı yetkilere sahiptir.

---

#### 3.3. Rezervasyon Yönetimi (`/customer/reservations`)

**Yapabilecekleri:**
- ✅ Tüm rezervasyonları listeleme:
  - Kendi oteline ait rezervasyonlar
  - Tarih sırasına göre sıralama
- ✅ Rezervasyon detaylarını görüntüleme:
  - Misafir bilgileri (isim, telefon, email)
  - Giriş/çıkış tarihleri
  - Oda tipi bilgisi
  - Oda sayısı ve misafir sayısı
  - Özel istekler
  - Toplam fiyat
  - Rezervasyon durumu
  - İlişkili görüşme bilgileri
- ✅ Rezervasyon durumlarını güncelleme:
  - **PENDING** → **CONFIRMED**: Rezervasyonu onaylama
  - **CONFIRMED** → **CHECKED_IN**: Giriş yapıldı olarak işaretleme
  - **CHECKED_IN** → **CHECKED_OUT**: Çıkış yapıldı olarak işaretleme
  - **CANCELLED**: İptal etme
- ✅ Rezervasyon filtreleme:
  - Duruma göre
  - Tarihe göre
  - Oda tipine göre

**Rezervasyon Durumları:**
- **PENDING**: Bekliyor (onay bekliyor)
- **CONFIRMED**: Onaylandı
- **CHECKED_IN**: Giriş yapıldı
- **CHECKED_OUT**: Çıkış yapıldı
- **CANCELLED**: İptal edildi

**API Endpoint'leri:**
- `GET /api/reservations` - Rezervasyon listesi
- `GET /api/reservations/[reservationId]` - Rezervasyon detayları (planlanan)
- `PATCH /api/reservations/[reservationId]` - Rezervasyon durumu güncelleme (planlanan)

---

#### 3.4. Oda Yönetimi (`/customer/rooms`)

**Yapabilecekleri:**
- ✅ Oda tiplerini listeleme:
  - Tüm oda tiplerini görüntüleme
  - Liste görünümü
  - Takvim görünümü
- ✅ Yeni oda tipi ekleme:
  - **Temel Bilgiler:**
    - Oda adı (örn: "Deluxe Deniz Manzaralı")
    - Açıklama
    - Toplam oda sayısı
    - Maksimum misafir sayısı
  - **Fiyatlandırma:**
    - Gece başına temel fiyat
  - **Oda Detayları:**
    - Oda büyüklüğü (m²)
    - Yatak tipi (örn: "1 King", "2 Single")
    - Manzara tipi (örn: "Deniz", "Bahçe")
  - **Özellikler:**
    - Oda özellikleri listesi (örn: "Balkon", "Jakuzi", "Minibar")
  - **Görseller:**
    - Oda fotoğrafları (URL listesi)
- ✅ Oda tipi düzenleme:
  - Tüm bilgileri güncelleme
- ✅ Oda tipi silme:
  - Odayı ve ilişkili verileri silme
- ✅ Müsaitlik Yönetimi (Takvim Görünümü):
  - Tarih bazlı müsaitlik kontrolü
  - Oda bloklama:
    - Belirli tarihleri bloklama
    - Bloklama nedeni ekleme
  - Fiyat override:
    - Belirli tarihler için özel fiyat belirleme
    - Sezonsal fiyatlandırma
- ✅ Fiyat Kuralları:
  - **Fiyat Kuralı Oluşturma:**
    - Kural adı
    - Başlangıç ve bitiş tarihleri
    - Haftanın günleri seçimi (boşsa her gün)
    - Fiyat ayarlama tipi:
      - **PERCENTAGE**: Yüzde artış/azalış (örn: +20%)
      - **FIXED_AMOUNT**: Sabit tutar artış/azalış (örn: +100 TL)
      - **FIXED_PRICE**: Sabit fiyat (örn: 1500 TL)
    - Ayarlama değeri
    - Öncelik (çakışma durumunda)
  - Fiyat kuralı düzenleme
  - Fiyat kuralı silme
  - Fiyat kuralı aktif/pasif yapma

**API Endpoint'leri:**
- `GET /api/rooms` - Oda tipi listesi
- `POST /api/rooms` - Yeni oda tipi oluşturma
- `GET /api/rooms/[roomId]` - Oda tipi detayları
- `PUT /api/rooms/[roomId]` - Oda tipi güncelleme
- `DELETE /api/rooms/[roomId]` - Oda tipi silme
- `GET /api/rooms/[roomId]/availability` - Müsaitlik bilgisi
- `POST /api/rooms/[roomId]/availability` - Müsaitlik güncelleme
- `GET /api/rooms/[roomId]/price-rules` - Fiyat kuralları
- `POST /api/rooms/[roomId]/price-rules` - Fiyat kuralı oluşturma
- `PUT /api/rooms/[roomId]/price-rules/[ruleId]` - Fiyat kuralı güncelleme
- `DELETE /api/rooms/[roomId]/price-rules/[ruleId]` - Fiyat kuralı silme

---

#### 3.5. Bilgi Bankası (`/customer/knowledge-bases`)

**Yapabilecekleri:**
- ✅ Kendi bilgi bankalarını görüntüleme:
  - Sadece kendisine ait bilgi bankaları
  - Admin tarafından oluşturulan bilgi bankaları
- ✅ Bilgi bankası detaylarını görüntüleme:
  - Otel bilgileri
  - Oda tipleri ve özellikleri
  - Günlük fiyatlar
  - Fiyat kuralları
  - Tesis özellikleri
  - Politikalar
  - Hizmetler
  - Konsept özellikleri
- ⚠️ **Sınırlı Yetki:** 
  - Bilgi bankası oluşturma/düzenleme şu anda devre dışı
  - Sadece görüntüleme yapılabilir
  - Oluşturma/düzenleme Admin tarafından yapılır

**API Endpoint'leri:**
- `GET /api/knowledge-bases` - Kendi bilgi bankalarını getirme

---

#### 3.6. Ayarlar (`/customer/settings`)

**Yapabilecekleri:**
- ✅ Profil bilgilerini güncelleme:
  - İsim
  - Email
  - Şifre değiştirme
- ⚠️ **Sınırlı Yetki:**
  - Organizasyon ayarlarına erişemez
  - Retell API anahtarlarını göremez/değiştiremez

**Not:** Restaurant User ile aynı yetkilere sahiptir, ancak sipariş bildirim ayarları yerine rezervasyon bildirim ayarları olabilir (gelecekte).

---

## 4. Super Admin (Platform Yöneticisi)

**Rol:** `isSuperAdmin: true`  
**Erişim:** Tüm organizasyonlara erişim

### 🎯 Genel Yetkiler

- ✅ Tüm organizasyonları görüntüleme
- ✅ Platform geneli istatistikleri görüntüleme
- ✅ Kota kullanımlarını izleme
- ✅ Organizasyon bazlı analiz yapma

---

### 📄 Sayfalar ve İşlevler

#### 4.1. Platform Dashboard (`/super-admin`)

**Yapabilecekleri:**
- ✅ Platform geneli istatistikleri görüntüleme:
  - Toplam organizasyon sayısı
  - Toplam kullanıcı sayısı
  - Toplam bot sayısı
  - Toplam görüşme sayısı
  - Toplam kullanılan dakika
- ✅ Her organizasyon için detaylı bilgiler:
  - Organizasyon adı ve slug
  - Subscription plan (FREE, BASIC, PRO, ENTERPRISE)
  - Kota kullanımı:
    - Kullanılan dakika / Maksimum dakika
    - Yüzde kullanım
    - Progress bar (renk kodlu):
      - %90+: Kırmızı (kritik)
      - %75-89: Turuncu (uyarı)
      - %50-74: Sarı (orta)
      - <%50: Yeşil (normal)
  - Dönem bilgileri:
    - Dönem başlangıç tarihi
    - Dönem bitiş tarihi
  - İstatistikler:
    - Kullanıcı sayısı
    - Bot sayısı
    - Görüşme sayısı
- ✅ Organizasyon filtreleme ve arama

**API Endpoint'leri:**
- `GET /api/super-admin/organizations` - Tüm organizasyonları getirme

---

## 5. Genel Özellikler

### 5.1. Kimlik Doğrulama ve Yetkilendirme

**Middleware:** `src/middleware.ts`

- ✅ Tüm `/admin/*` ve `/customer/*` route'ları kimlik doğrulama gerektirir
- ✅ Role bazlı yönlendirme:
  - `ADMIN` → `/admin/bots`
  - `CUSTOMER` → `/customer/bots`
  - `isSuperAdmin` → `/super-admin`
- ✅ Role bazlı erişim kontrolü:
  - Admin sadece `/admin/*` route'larına erişebilir
  - Customer sadece `/customer/*` route'larına erişebilir
  - Admin ayrıca `/customer/*` route'larına da erişebilir (middleware'de tanımlı)

---

### 5.2. Veri İzolasyonu

**Multi-Tenant Yapı:**
- ✅ Her kullanıcı kendi `organizationId`'si ile izole edilir
- ✅ Admin: Kendi organizasyonundaki tüm verilere erişir
- ✅ Customer: Sadece kendi verilerine erişir
- ✅ Bot atamaları: Customer sadece kendisine atanan botları görebilir
- ✅ Telefon numarası atamaları: Customer sadece kendisine atanan numaraları görebilir

---

### 5.3. API Güvenliği

**Yetkilendirme:**
- ✅ Tüm API endpoint'leri session kontrolü yapar
- ✅ Role bazlı erişim kontrolü
- ✅ Organization bazlı veri filtreleme
- ✅ Customer: Sadece kendi verilerine erişebilir
- ✅ Admin: Kendi organizasyonundaki tüm verilere erişebilir

---

### 5.4. Bilgi Bankası Yönetimi

**Restaurant Bilgi Bankası İçeriği:**
- Restoran bilgileri (adres, telefon, çalışma saatleri)
- Menü öğeleri (yemekler, fiyatlar, açıklamalar)
- Kampanyalar ve indirimler
- Teslimat bilgileri ve ücretleri
- Özel notlar ve politikalar

**Hotel Bilgi Bankası İçeriği:**
- Otel bilgileri (adres, telefon, yıldız)
- Oda tipleri ve özellikleri
- Günlük fiyatlar
- Fiyat kuralları (sezonsal, hafta sonu, vb.)
- Tesis özellikleri (havuz, spa, restoran, vb.)
- Politikalar (iptal, check-in/out saatleri)
- Hizmetler (room service, concierge, vb.)
- Konsept özellikleri

---

### 5.5. Görüşme Özellikleri

**Görüşme Başlatma:**
- ✅ Telefon numarası ile görüşme
- ✅ Web üzerinden görüşme (tarayıcı)
- ✅ Toplu görüşme (Admin)

**Görüşme Analizi:**
- Transkript (tam metin)
- Ses kaydı
- Sentiment analizi
- Başarı değerlendirmesi
- Latency metrikleri:
  - E2E Latency (P50, P90, P95, P99)
  - LLM Latency
  - ASR Latency (Speech Recognition)
  - TTS Latency (Text-to-Speech)
  - KB Latency (Knowledge Base)
- Token kullanımı
- Maliyet bilgileri

---

### 5.6. Bildirimler

**Sipariş Bildirimleri (Restaurant):**
- ✅ Ses bildirimi (ayarlanabilir ses seviyesi)
- ✅ Masaüstü bildirimi (tarayıcı izni gerekir)
- ✅ Otomatik yenileme (ayarlanabilir interval)
- ✅ Yeni sipariş animasyonu ve vurgulama

**Rezervasyon Bildirimleri (Hotel):**
- Gelecekte eklenebilir

---

### 5.7. Kota Yönetimi

**Subscription Plans:**
- **FREE**: 100 dakika/ay
- **BASIC**: Daha yüksek limit
- **PRO**: Çok daha yüksek limit
- **ENTERPRISE**: Özel limit

**Kota Kontrolü:**
- ✅ Her görüşme başlatıldığında kota kontrolü
- ✅ Aylık kullanım takibi
- ✅ Dönem bazlı sıfırlama
- ✅ Kota dolduğunda uyarı

---

## 📊 Özet Tablo

| Özellik | Admin | Restaurant User | Hotel User |
|---------|-------|-----------------|------------|
| **Bot Oluşturma** | ✅ | ❌ | ❌ |
| **Bot Düzenleme** | ✅ Tam | ⚠️ Sınırlı | ⚠️ Sınırlı |
| **Bot Silme** | ✅ | ❌ | ❌ |
| **Bot Atama** | ✅ | ❌ | ❌ |
| **Müşteri Oluşturma** | ✅ | ❌ | ❌ |
| **Telefon Numarası Satın Alma** | ✅ | ❌ | ❌ |
| **Telefon Numarası Atama** | ✅ | ❌ | ❌ |
| **Bilgi Bankası Oluşturma** | ✅ | ❌ | ❌ |
| **Bilgi Bankası Düzenleme** | ✅ | ❌ | ❌ |
| **Görüşme Başlatma** | ✅ | ✅ | ✅ |
| **Tüm Görüşmeleri Görme** | ✅ | ❌ | ❌ |
| **Kendi Görüşmelerini Görme** | ✅ | ✅ | ✅ |
| **Sipariş Yönetimi** | ⚠️ Planlanan | ✅ | ❌ |
| **Rezervasyon Yönetimi** | ❌ | ❌ | ✅ |
| **Oda Yönetimi** | ❌ | ❌ | ✅ |
| **Organizasyon Ayarları** | ✅ | ❌ | ❌ |
| **Profil Ayarları** | ✅ | ✅ | ✅ |

---

## 🔒 Güvenlik Notları

1. **Veri İzolasyonu:** Her kullanıcı sadece kendi organizasyonundaki verilere erişebilir
2. **Role-Based Access Control:** Middleware ve API seviyesinde çift kontrol
3. **Session Yönetimi:** NextAuth ile güvenli session yönetimi
4. **API Güvenliği:** Tüm API endpoint'leri yetkilendirme kontrolü yapar
5. **Webhook Güvenliği:** HMAC SHA256 imza doğrulama

---

## 📝 Notlar

- ⚠️ Bazı özellikler geliştirme aşamasındadır
- ✅ İşaretli özellikler aktif ve kullanılabilir
- ❌ İşaretli özellikler bu rol için mevcut değil
- ⚠️ İşaretli özellikler sınırlı yetki ile kullanılabilir

---

**Son Güncelleme:** 2024
**Versiyon:** 1.0

