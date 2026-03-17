# Retell AI Webhook Kurulum Rehberi

## Sorun: Siparişler Gözükmüyor

Eğer müşteri dashboard'da siparişler gözükmüyorsa, aşağıdaki adımları takip et:

---

## Adım 1: Mevcut Kullanıcıları Düzelt (İLK KEZ YAPILACAK)

Mevcut customer'lara `customerType` atanması gerekiyor.

### Local'den çalıştır:

```bash
# Vercel environment variables'ları çek
vercel env pull .env.local

# Setup endpoint'ini çağır
curl -X POST http://localhost:3000/api/setup/seed \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

### VEYA Vercel'den çalıştır:

1. Admin olarak login ol
2. Browser console'u aç (F12)
3. Şu komutu çalıştır:

```javascript
fetch('/api/setup/seed', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

---

## Adım 2: Retell Webhook URL'ini Yapılandır

### 2.1 Webhook URL'ini Al

Deployment URL'in: `https://siparisbot.vercel.app` (veya kendi domain'in)

Webhook URL: `https://siparisbot.vercel.app/api/webhooks/retell`

### 2.2 Retell Dashboard'da Yapılandır

1. **Retell Dashboard'a git:** https://dashboard.retellai.com
2. **Settings → Webhooks** bölümüne git
3. **Add Webhook** butonuna tıkla
4. **Webhook URL'i gir:**
   ```
   https://siparisbot.vercel.app/api/webhooks/retell
   ```
5. **Events'i seç:**
   - ✅ `call_started`
   - ✅ `call_ended`
   - ✅ `call_analyzed`
6. **Save** butonuna tıkla

### 2.3 Webhook Secret'ı Vercel'e Ekle

1. Retell Dashboard'da webhook'u oluşturduktan sonra **Secret**'ı kopyala
2. Vercel Dashboard → `siparisbot` → **Settings** → **Environment Variables**
3. **Add**:
   - Key: `RETELL_WEBHOOK_SECRET`
   - Value: (Retell'den kopyaladığın secret)
   - Environments: Production, Preview, Development (hepsini seç)
4. **Save**
5. **Redeploy** et

---

## Adım 3: Bot'ları Yapılandır (Her Bot İçin)

Her bot'un webhook URL'i olması gerekiyor.

### Admin Dashboard'dan:

1. **Admin → Bots** sayfasına git
2. Her bot'u düzenle (Edit butonuna tıkla)
3. **Webhook URL** field'ına şunu gir:
   ```
   https://siparisbot.vercel.app/api/webhooks/retell
   ```
4. **Save**

---

## Adım 4: Test Et!

### Test Araması Yap:

1. **Customer** olarak login ol
2. **Görüşmeler** → **Web Araması** tab'ına git
3. Test araması yap
4. Arama bittikten sonra:
   - **Görüşmeler → Görüşme Geçmişi**'nde görünmeli
   - **Canlı Siparişler** sayfasında sipariş görünmeli (eğer bot sipariş aldıysa)

### Webhook Log'larını Kontrol Et:

Vercel Dashboard'da → **Deployments** → **Functions** → `api/webhooks/retell`

Log'larda şunları ara:
- ✅ `Received webhook event: call_started`
- ✅ `Received webhook event: call_ended`
- ✅ `Received webhook event: call_analyzed`
- ✅ `Created order for call ...`
 
---

## Sorun Giderme

### Sipariş Hâlâ Gelmiyor?

1. **Webhook'lar geliyor mu?**
   - Vercel function logs'a bak
   - Retell Dashboard → Webhooks → Delivery log'a bak

2. **Customer Type doğru mu?**
   ```sql
   SELECT id, email, role, "customerType" FROM "User" WHERE role = 'CUSTOMER';
   ```
   - `customerType` NULL ise → Adım 1'i tekrar yap
   - `customerType` "HOTEL" ise ama restaurant iseniz → Manuel düzelt:
     ```sql
     UPDATE "User" SET "customerType" = 'RESTAURANT' WHERE id = 'USER_ID';
     ```

3. **Bot'un webhook URL'i doğru mu?**
   - Admin → Bots → Bot'u düzenle → Webhook URL kontrol et

4. **Retell webhook secret doğru mu?**
   - Vercel environment variables kontrol et
   - Retell Dashboard'daki secret ile aynı mı?

---

## Özet Checklist

- [ ] `/api/setup/seed` endpoint'ini çalıştırdım
- [ ] Retell Dashboard'da webhook URL'i ekledim
- [ ] Webhook secret'ı Vercel'e ekledim
- [ ] Her bot'un webhook URL'i var
- [ ] Test araması yaptım ve sipariş geldi ✅

---

## Sorular?

Webhook log'larını ve error'ları bana göster, yardımcı olayım! 🚀
