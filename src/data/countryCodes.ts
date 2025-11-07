// src/data/countryCodes.ts
export type CountryCode = {
  code: string;
  country: string;
  flag: string;
  iso: string;
};

export const COUNTRY_CODES: CountryCode[] = [
  // Africa
  { code: "+234", country: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA" },
  { code: "+254", country: "Kenya", flag: "🇰🇪", iso: "KE" },
  { code: "+233", country: "Ghana", flag: "🇬🇭", iso: "GH" },
  { code: "+20", country: "Egypt", flag: "🇪🇬", iso: "EG" },
  { code: "+212", country: "Morocco", flag: "🇲🇦", iso: "MA" },
  { code: "+256", country: "Uganda", flag: "🇺🇬", iso: "UG" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿", iso: "TZ" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹", iso: "ET" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮", iso: "CI" },

  // North America
  { code: "+1", country: "United States", flag: "🇺🇸", iso: "US" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", iso: "MX" },

  // Europe
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT" },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", iso: "NL" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", iso: "CH" },
  { code: "+46", country: "Sweden", flag: "🇸🇪", iso: "SE" },
  { code: "+47", country: "Norway", flag: "🇳🇴", iso: "NO" },
  { code: "+45", country: "Denmark", flag: "🇩🇰", iso: "DK" },
  { code: "+48", country: "Poland", flag: "🇵🇱", iso: "PL" },
  { code: "+7", country: "Russia", flag: "🇷🇺", iso: "RU" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦", iso: "UA" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", iso: "PT" },
  { code: "+30", country: "Greece", flag: "🇬🇷", iso: "GR" },
  { code: "+43", country: "Austria", flag: "🇦🇹", iso: "AT" },
  { code: "+32", country: "Belgium", flag: "🇧🇪", iso: "BE" },

  // Asia
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN" },
  { code: "+86", country: "China", flag: "🇨🇳", iso: "CN" },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP" },
  { code: "+82", country: "South Korea", flag: "🇰🇷", iso: "KR" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", iso: "SG" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "+63", country: "Philippines", flag: "🇵🇭", iso: "PH" },
  { code: "+66", country: "Thailand", flag: "🇹🇭", iso: "TH" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳", iso: "VN" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰", iso: "PK" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", iso: "LK" },
  { code: "+95", country: "Myanmar", flag: "🇲🇲", iso: "MM" },
  { code: "+855", country: "Cambodia", flag: "🇰🇭", iso: "KH" },
  { code: "+856", country: "Laos", flag: "🇱🇦", iso: "LA" },

  // Middle East
  { code: "+971", country: "UAE", flag: "🇦🇪", iso: "AE" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "+972", country: "Israel", flag: "🇮🇱", iso: "IL" },
  { code: "+974", country: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "+968", country: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "+962", country: "Jordan", flag: "🇯🇴", iso: "JO" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧", iso: "LB" },
  { code: "+90", country: "Turkey", flag: "🇹🇷", iso: "TR" },
  { code: "+98", country: "Iran", flag: "🇮🇷", iso: "IR" },

  // Oceania
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿", iso: "NZ" },
  { code: "+679", country: "Fiji", flag: "🇫🇯", iso: "FJ" },

  // South America
  { code: "+55", country: "Brazil", flag: "🇧🇷", iso: "BR" },
  { code: "+54", country: "Argentina", flag: "🇦🇷", iso: "AR" },
  { code: "+56", country: "Chile", flag: "🇨🇱", iso: "CL" },
  { code: "+57", country: "Colombia", flag: "🇨🇴", iso: "CO" },
  { code: "+51", country: "Peru", flag: "🇵🇪", iso: "PE" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪", iso: "VE" },
  { code: "+593", country: "Ecuador", flag: "🇪🇨", iso: "EC" },
  { code: "+595", country: "Paraguay", flag: "🇵🇾", iso: "PY" },
  { code: "+598", country: "Uruguay", flag: "🇺🇾", iso: "UY" },

  // Caribbean
  { code: "+1876", country: "Jamaica", flag: "🇯🇲", iso: "JM" },
  { code: "+1868", country: "Trinidad & Tobago", flag: "🇹🇹", iso: "TT" },
  { code: "+1809", country: "Dominican Republic", flag: "🇩🇴", iso: "DO" },
];

// Helper to search countries
export function searchCountries(query: string): CountryCode[] {
  const q = query.toLowerCase().trim();
  if (!q) return COUNTRY_CODES;
  
  return COUNTRY_CODES.filter(
    (c) =>
      c.country.toLowerCase().includes(q) ||
      c.code.includes(q) ||
      c.iso.toLowerCase().includes(q)
  );
}

// Helper to format phone number
export function formatPhoneNumber(countryCode: string, number: string): string {
  // Remove any non-digit characters from number
  const cleanNumber = number.replace(/\D/g, '');
  
  // Format based on country
  if (countryCode === '+1') {
    // US/Canada format: (XXX) XXX-XXXX
    if (cleanNumber.length === 10) {
      return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
    }
  } else if (countryCode === '+234') {
    // Nigeria format: XXX XXX XXXX
    if (cleanNumber.length === 10) {
      return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)} ${cleanNumber.slice(6)}`;
    }
  } else if (countryCode === '+44') {
    // UK format: XXXX XXX XXX
    if (cleanNumber.length === 10) {
      return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 7)} ${cleanNumber.slice(7)}`;
    }
  }
  
  // Default: just return the number with spaces every 3-4 digits
  return cleanNumber.replace(/(\d{3,4})/g, '$1 ').trim();
}

// Helper to validate phone number
export function isValidPhoneNumber(number: string): boolean {
  const cleanNumber = number.replace(/\D/g, '');
  return cleanNumber.length >= 7 && cleanNumber.length <= 15;
}