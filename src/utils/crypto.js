import CryptoJS from 'crypto-js'

const SECRET_KEY = 'flight-class'

export const encrypt = (text) => {
  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString()
  } catch (error) {
    console.error('加密失敗:', error)
    throw new Error('加密失敗')
  }
}

export const decrypt = (encryptedText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('解密失敗:', error)
    throw new Error('解密失敗')
  }
}
