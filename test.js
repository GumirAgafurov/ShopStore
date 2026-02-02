const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: "USD", 
    style: "currency"
});

function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number);
}

console.log('=== ТЕСТЫ ДЛЯ USD ===');

// Тест 1
const test1 = formatCurrency(0);
console.log('1. 0 →', test1, test1 === '$0.00' ? '✅ PASS' : '❌ FAIL');

// Тест 2  
const test2 = formatCurrency(10.5);
console.log('2. 10.5 →', test2, test2 === '$10.50' ? '✅ PASS' : '❌ FAIL');

// Тест 3
const test3 = formatCurrency(1000);
console.log('3. 1000 →', test3, test3 === '$1,000.00' ? '✅ PASS' : '❌ FAIL');

// Тест 4
const test4 = formatCurrency(1234.56);
console.log('4. 1234.56 →', test4, test4 === '$1,234.56' ? '✅ PASS' : '❌ FAIL');

console.log('\n=== ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ ===');