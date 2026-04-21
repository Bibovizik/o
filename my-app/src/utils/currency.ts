const COUNTRY_TO_CURRENCY: Record<string, string> = {
  UA: 'UAH',
  US: 'USD',
  GB: 'GBP',
  PL: 'PLN',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  BR: 'BRL',
  JP: 'JPY',
  IN: 'INR',
};

export const getCurrencyByCountry = (countryCode: string): string =>
  COUNTRY_TO_CURRENCY[countryCode] ?? 'USD';

export interface NbuRate {
  cc: string; // currency code e.g. "USD"
  rate: number; // how many UAH per 1 unit of this currency
  txt: string;
}

export const fetchNbuRates = async (): Promise<NbuRate[]> => {
  const res = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
  );
  return res.json() as Promise<NbuRate[]>;
};

export const convertFromUah = (
  amountUah: number,
  rates: NbuRate[],
  targetCurrency: string,
): string => {
  if (targetCurrency === 'UAH') return `₴${amountUah.toFixed(2)}`;

  const rate = rates.find((r) => r.cc === targetCurrency);
  if (!rate) return `₴${amountUah.toFixed(2)}`; // fallback to UAH

  const converted = amountUah / rate.rate;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
  }).format(converted);
};
