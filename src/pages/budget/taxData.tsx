
const federalIncomeTaxBrackets = [
    { bracket: '.1', taxableIncome: { start: 0, end: 11600 } },
    { bracket: '.12', taxableIncome: { start: 11601, end: 47650 } },
    { bracket: '.22', taxableIncome: { start: 40526, end: 86375 } },
    { bracket: '.24', taxableIncome: { start: 86376, end: 164925 } },
    { bracket: '.32', taxableIncome: { start: 164926, end: 209425 } },
    { bracket: '.35', taxableIncome: { start: 209426, end: 523600 } },
    { bracket: '.37', taxableIncome: { start: 523601 } }
];

export default federalIncomeTaxBrackets;