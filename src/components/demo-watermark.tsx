"use client"

export function DemoWatermark() {
  // Generate a grid of DEMO texts for the repeating pattern
  const rows = 12
  const cols = 8

  return (
    <div className="demo-watermark-container" aria-hidden="true">
      {/* Repeating small DEMO pattern (banknote style) */}
      <div className="demo-watermark-pattern">
        {Array.from({ length: rows * cols }).map((_, i) => (
          <span key={i} className="demo-watermark-text-small">
            DEMO
          </span>
        ))}
      </div>

      {/* Large central DEMO text */}
      <div className="demo-watermark-center">
        <span className="demo-watermark-text-large">DEMO</span>
      </div>

      {/* Top banner */}
      <div className="demo-banner-top">
        <div className="demo-banner-scroll">
          <span>⚠ DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM ⚠</span>
          <span>⚠ DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM — DEMO SÜRÜMÜ — LİSANSSIZ KULLANIM ⚠</span>
        </div>
      </div>

      {/* Bottom banner */}
      <div className="demo-banner-bottom">
        <div className="demo-banner-scroll demo-banner-scroll-reverse">
          <span>⚠ ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON ⚠</span>
          <span>⚠ ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON — ÖDENMEMİŞ LİSANS — DEMO VERSİYON ⚠</span>
        </div>
      </div>
    </div>
  )
}
