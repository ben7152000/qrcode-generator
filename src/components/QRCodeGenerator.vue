<template>
  <div class="container">
    <h1>QR Code 產生器</h1>
    <div class="input-group">
      <label for="text-input">輸入網址</label>
      <input
        type="text"
        id="text-input"
        v-model="textInput"
        @keypress.enter="generateQRCode"
        placeholder="https://www.google.com"
      >
      <div class="error" v-if="showError">請輸入網址</div>
    </div>

    <button @click="generateQRCode">產生 QR Code</button>

    <div class="qrcode-container" ref="qrcodeContainer"></div>

    <div v-if="showActionButtons" class="action-buttons">
      <button class="copy-btn" @click="copyQRCode">
        {{ copyButtonText }}
      </button>
      <button class="download-btn" @click="downloadQRCode">
        下載 QR Code
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'

const textInput = ref('')
const showError = ref(false)
const showActionButtons = ref(false)
const qrcodeContainer = ref(null)
const copyButtonText = ref('複製 QR Code')

const generateQRCode = async () => {
  const text = textInput.value.trim()

  if (!text) {
    showError.value = true
    return
  }

  showError.value = false
  qrcodeContainer.value.innerHTML = ''
  copyButtonText.value = '複製 QR Code'

  try {
    const qrText = `${text} flight-class`
    const canvas = await QRCode.toCanvas(qrText, {
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })

    const wrapper = document.createElement('div')
    wrapper.className = 'qrcode-wrapper'
    wrapper.appendChild(canvas)
    qrcodeContainer.value.appendChild(wrapper)

    showActionButtons.value = true
  } catch (error) {
    console.error(error)
    qrcodeContainer.value.innerHTML = '<p style="color: red;">產生 QR Code 時發生錯誤</p>'
  }
}

const copyQRCode = async () => {
  const canvas = qrcodeContainer.value.querySelector('canvas')
  if (canvas) {
    try {
      // 將 canvas 轉換為 blob
      canvas.toBlob(async (blob) => {
        const item = new ClipboardItem({ 'image/png': blob })
        await navigator.clipboard.write([item])
        copyButtonText.value = '✓ 已複製！'
        setTimeout(() => {
          copyButtonText.value = '複製 QR Code'
        }, 2000)
      })
    } catch (error) {
      console.error('複製失敗:', error)
      alert('複製失敗，請使用下載功能')
    }
  }
}

const downloadQRCode = () => {
  const canvas = qrcodeContainer.value.querySelector('canvas')
  if (canvas) {
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = url
    link.click()
  }
}
</script>

<style scoped>
.container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  max-width: 500px;
  min-width: 450px;
  width: 100%;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  text-align: center;
}

input[type="text"] {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}

.qrcode-container {
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qrcode-container :deep(.qrcode-wrapper) {
  position: relative;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  animation: fadeIn 0.5s ease-in-out;
}

.qrcode-container :deep(.qrcode-wrapper::before) {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}

.qrcode-container :deep(.qrcode-wrapper:hover::before) {
  opacity: 1;
}

.qrcode-container :deep(canvas) {
  display: block;
  border-radius: 12px;
  background: white;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.3s;
}

.qrcode-container :deep(canvas:hover) {
  transform: scale(1.02);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.action-buttons button {
  flex: 1;
}

.copy-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.copy-btn:hover {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.download-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.download-btn:hover {
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
}

.error {
  color: #f5576c;
  font-size: 14px;
  margin-top: 8px;
}
</style>
