import randomService from "~/services/randomService";

export default {
    currencyList: [
        'USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CNY', 'RUB', 'AED', 'AFN', 'ALL', 'AMD', 'AOA', 'ARS', 'AUD', 'AZN', 'BDT',
        'BGN', 'BHD', 'BIF', 'BND', 'BOB', 'BRL', 'BWP', 'BYN', 'CAD', 'CDF', 'CLP', 'COP', 'CRC', 'CUP', 'CZK', 'DJF',
        'DKK', 'DZD', 'EGP', 'ETB', 'GEL', 'GHS', 'GMD', 'GNF', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR',
        'ISK', 'JOD', 'KES', 'KGS', 'KHR', 'KPW', 'KRW', 'KWD', 'KZT', 'LAK', 'LBP', 'LKR', 'LYD', 'MAD', 'MDL', 'MGA',
        'MKD', 'MNT', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR',
        'PEN', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'SAR', 'SCR', 'SDG', 'SEK', 'SGD', 'SLL', 'SOS', 'SRD',
        'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TRY', 'TWD', 'TZS', 'UGX', 'UYU', 'UZS', 'VEF', 'VND', 'XAF', 'XDR',
        'XOF', 'YER', 'ZAR', 'ZMK', 'ATS', 'AZM', 'BEF', 'BGL', 'BYB', 'BYR', 'CSD', 'CYP', 'DEM', 'ECS', 'EEK', 'ESP',
        'FIM', 'FRF', 'GHC', 'GRD', 'HRD', 'IEP', 'ITL', 'LTL', 'LVL', 'MTL', 'NLG', 'PLZ', 'PTE', 'ROL', 'RUR', 'SDD',
        'SIT', 'SKK', 'TMM', 'TRL', 'VEB', 'XEU', 'XAU', 'XAG', 'XPT', 'XPD'
    ],

    getRandomCurrency() {
        return this.currencyList[randomService.getRandomInt(0, this.currencyList.length - 1)]
    },

    getRandomCurrencies(number) {
        const currencyList = [];

        while (currencyList.length < number) {
            const randCurrency = this.getRandomCurrency();
            if (!currencyList.includes(randCurrency)) currencyList.push(randCurrency);
        }

        return currencyList;
    },

    getCurrencyPairs(currencyList) {
        const currencyPairs = [];

        currencyList.forEach(baseCurrency => {
            currencyList.forEach(quoteCurrency => {
                if(baseCurrency !== quoteCurrency) {
                    currencyPairs.push({
                        base_currency: baseCurrency,
                        quote_currency: quoteCurrency,
                        comission: randomService.getRandomInt(1, 5)
                    })
                }
            });
        });

        return currencyPairs;
    },

    getCurrencyRates(currencyPairs) {
        return currencyPairs.map(pairItem => {
            return {
                pair: `${pairItem.base_currency}/${pairItem.quote_currency}`,
                rate: randomService.getRandomInt(10, 100)
            }
        });
    }
}
