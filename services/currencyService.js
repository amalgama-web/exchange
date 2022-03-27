function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

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
        return this.currencyList[getRandomInt(0, this.currencyList.length - 1)]
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
        const listLength = currencyList.length;

        for(let baseIndex = 0; baseIndex < listLength - 1; baseIndex++) {
            for(let quoteIndex = baseIndex + 1; quoteIndex < listLength; quoteIndex++) {

                const rate = getRandomInt(10, 100);
                // прямая пара
                currencyPairs.push({
                    base_currency: currencyList[baseIndex],
                    quote_currency: currencyList[quoteIndex],
                    commission: getRandomInt(1, 5),
                    rate: rate
                });

                // обратная пара
                currencyPairs.push({
                    base_currency: currencyList[quoteIndex],
                    quote_currency: currencyList[baseIndex],
                    commission: getRandomInt(1, 5),
                    rate: 1 / rate
                });
            }
        }

        return currencyPairs;
    },


    getFormattedPairs(pairsList) {
        return pairsList.map(pair => ({
            base_currency: pair.base_currency,
            quote_currency: pair.quote_currency,
            commission: pair.commission,
        }));
    },

    getFormattedRates(pairsList) {
        return pairsList.map(pair => ({
            pair: `${pair.base_currency}/${pair.quote_currency}`,
            rate: pair.rate
        }));
    }
}
