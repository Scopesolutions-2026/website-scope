// Thai Baht Text Converter - Converts numbers to Thai text
const thaiNumbers = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"]
const thaiPositions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"]

export function convertToThaiBahtText(amount: number): string {
  if (isNaN(amount) || amount < 0) return "กรุณากรอกจำนวนเงินที่ถูกต้อง"
  if (amount === 0) return "ศูนย์บาทถ้วน"
  
  // Handle decimal
  const [integerPart, decimalPart] = amount.toFixed(2).split(".")
  const intValue = parseInt(integerPart, 10)
  const satangValue = parseInt(decimalPart, 10)

  let result = ""
  
  if (intValue > 0) {
    result = convertIntegerToThai(intValue) + "บาท"
  }

  if (satangValue === 0) {
    result += "ถ้วน"
  } else {
    result += convertIntegerToThai(satangValue) + "สตางค์"
  }

  return result
}

function convertIntegerToThai(num: number): string {
  if (num === 0) return ""
  if (num > 99999999) return "จำนวนเกินขีดจำกัด"

  let result = ""
  
  // Handle millions
  if (num >= 1000000) {
    const millions = Math.floor(num / 1000000)
    result += convertGroupToThai(millions) + "ล้าน"
    num = num % 1000000
  }

  // Handle remaining digits (less than a million)
  result += convertGroupToThai(num)
  
  return result
}

function convertGroupToThai(num: number): string {
  if (num === 0) return ""
  
  let result = ""
  const digits = num.toString().split("").map(Number).reverse()
  
  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = digits[i]
    
    if (digit === 0) continue
    
    // Special case for 1 in tens position
    if (i === 1 && digit === 1) {
      result += "สิบ"
      continue
    }
    
    // Special case for 2 in tens position
    if (i === 1 && digit === 2) {
      result += "ยี่สิบ"
      continue
    }
    
    // Special case for 1 in ones position when there are more digits
    if (i === 0 && digit === 1 && digits.length > 1) {
      result += "เอ็ด"
      continue
    }
    
    result += thaiNumbers[digit] + thaiPositions[i]
  }
  
  return result
}

// Test examples:
// 1500 -> "หนึ่งพันห้าร้อยบาทถ้วน"
// 25.50 -> "ยี่สิบห้าบาทห้าสิบสตางค์"
// 1234567 -> "หนึ่งล้านสองแสนสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน"
