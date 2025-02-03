var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000;           //         1.000.000.000 (9)
var ONE_TRILLION = 1000000000000;       //     1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)

var LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

function toWords(c: number): string {
    var words: string;
    var num = parseInt(String(c), 10);

    words = generateWords(num);

    return words;
}

function generateWords(num: number, incomingWords?: string[]) {
    var remainder: number, word: string, words: string[] = arguments[1];

    // We’re done
    if (num === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (num < 0) {
        words.push('minus');
        num = Math.abs(num);
    }

    if (num < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[num];

    } else if (num < ONE_HUNDRED) {
        remainder = num % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (num < ONE_THOUSAND) {
        remainder = num % ONE_HUNDRED;
        word = generateWords(Math.floor(num / ONE_HUNDRED)) + ' hundred';

    } else if (num < ONE_MILLION) {
        remainder = num % ONE_THOUSAND;
        word = generateWords(Math.floor(num / ONE_THOUSAND)) + ' thousand,';

    } else if (num < ONE_BILLION) {
        remainder = num % ONE_MILLION;
        word = generateWords(Math.floor(num / ONE_MILLION)) + ' million,';

    } else if (num < ONE_TRILLION) {
        remainder = num % ONE_BILLION;
        word = generateWords(Math.floor(num / ONE_BILLION)) + ' billion,';

    } else if (num < ONE_QUADRILLION) {
        remainder = num % ONE_TRILLION;
        word = generateWords(Math.floor(num / ONE_TRILLION)) + ' trillion,';

    } else if (num <= MAX) {
        remainder = num % ONE_QUADRILLION;
        word = generateWords(Math.floor(num / ONE_QUADRILLION)) +
            ' quadrillion,';
    }

    // @ts-ignore
    if(word) {
        words.push(word);
    }
    // @ts-ignore
    return generateWords(remainder, words);
}

console.log(toWords(100))
