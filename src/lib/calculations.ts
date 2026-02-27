/**
 * Calculator logic for SmartSaverCalc - Full Final Production Library
 */

// --- Interfaces ---
export interface EVSavingsResult { gasCostYear: number; evCostYear: number; totalSavings: number; monthlySavings: number; gasCostLife: number; evCostLife: number; co2SavedLbs: number; }
export interface MortgageResult { monthlyPrincipalInterest: number; monthlyTotal: number; totalInterest: number; totalCost: number; loanAmount: number; affordabilityStatus: 'safe' | 'stretch' | 'risky'; dtiRatio: number; }
export interface SolarResult { netCost: number; year1Savings: number; paybackYears: number; life20Savings: number; yearByYear: { year: number; savings: number; cumulative: number }[]; }
export interface CarLoanResult { monthlyPayment: number; totalInterest: number; totalPrincipal: number; totalCost: number; }

// --- 1. EV vs Gas ---
export function calculateEVSavings(input: { annualMiles: number, gasPrice: number, electricityPrice: number, gasMPG: number, evEfficiency: number, ownershipYears: number, maintenanceSavingsPerYear: number }): EVSavingsResult {
    const { annualMiles, gasPrice, electricityPrice, gasMPG, evEfficiency, ownershipYears, maintenanceSavingsPerYear } = input;
    const gallonsPerYear = annualMiles / gasMPG;
    const gasCostLife = (gallonsPerYear * gasPrice) * ownershipYears;
    const evCostLife = (((annualMiles / 100) * evEfficiency) * electricityPrice - maintenanceSavingsPerYear) * ownershipYears;
    return { gasCostYear: (gallonsPerYear * gasPrice), evCostYear: (evCostLife / ownershipYears), totalSavings: gasCostLife - evCostLife, monthlySavings: (gasCostLife - evCostLife) / (ownershipYears * 12), gasCostLife, evCostLife, co2SavedLbs: gallonsPerYear * 19.6 * ownershipYears };
}

// --- 2. Mortgage ---
export function calculateMortgage(input: { homePrice: number, downPayment: number, loanTerm: number, interestRate: number, propertyTax: number, homeInsurance: number, monthlyDebt: number, annualIncome: number }): MortgageResult {
    const { homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, monthlyDebt, annualIncome } = input;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const n = loanTerm * 12;
    let pi = monthlyRate === 0 ? loanAmount / n : loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const monthlyTotal = pi + (propertyTax / 12) + (homeInsurance / 12);
    const dti = ((monthlyTotal + monthlyDebt) / (annualIncome / 12)) * 100;
    return { monthlyPrincipalInterest: pi, monthlyTotal, totalInterest: (pi * n) - loanAmount, totalCost: pi * n, loanAmount, affordabilityStatus: dti > 43 ? 'risky' : dti > 36 ? 'stretch' : 'safe', dtiRatio: dti };
}

// --- 3. Solar ROI ---
export function calculateSolar(input: { systemCost: number, annualBill: number, percentageOffset: number, taxCreditPercent: number, electricRateIncrease: number }): SolarResult {
    const { systemCost, annualBill, percentageOffset, taxCreditPercent, electricRateIncrease } = input;
    const netCost = systemCost * (1 - (taxCreditPercent / 100));
    let cumulative = -netCost;
    const yearByYear = [];
    let paybackYears = 0;
    let savings = (annualBill * (percentageOffset / 100));
    for (let y = 1; y <= 25; y++) {
        cumulative += savings;
        yearByYear.push({ year: y, savings, cumulative });
        if (paybackYears === 0 && cumulative >= 0) paybackYears = y;
        savings *= (1 + (electricRateIncrease / 100));
    }
    return { netCost, year1Savings: yearByYear[0].savings, paybackYears: paybackYears || 25, life20Savings: yearByYear[19].cumulative, yearByYear: yearByYear.slice(0, 20) };
}

// --- 4. Car Loan ---
export function calculateCarLoan(input: { vehiclePrice: number, downPayment: number, tradeIn: number, interestRate: number, loanTerm: number, salesTax: number }): CarLoanResult {
    const { vehiclePrice, downPayment, tradeIn, interestRate, loanTerm, salesTax } = input;
    const principal = (vehiclePrice * (1 + (salesTax / 100))) - downPayment - tradeIn;
    const r = (interestRate / 100) / 12;
    let payment = r === 0 ? principal / loanTerm : principal * (r * Math.pow(1 + r, loanTerm)) / (Math.pow(1 + r, loanTerm) - 1);
    return { monthlyPayment: payment, totalInterest: (payment * loanTerm) - principal, totalPrincipal: principal, totalCost: payment * loanTerm };
}

// --- 5. Retirement / FIRE ---
export function calculateRetirement(input: { currentAge: number, retireAge: number, currentSavings: number, monthlyContribution: number, expectedReturn: number, annualSpend: number, inflation: number }) {
    const yearsToRetire = input.retireAge - input.currentAge;
    let balance = input.currentSavings;
    const history = [];
    for (let y = 1; y <= yearsToRetire; y++) {
        balance = (balance + (input.monthlyContribution * 12)) * (1 + (input.expectedReturn / 100));
        history.push({ year: y, age: input.currentAge + y, balance });
    }
    const futureSpend = input.annualSpend * Math.pow(1 + (input.inflation / 100), yearsToRetire);
    const targetFIRE = futureSpend * 25;
    return { finalBalance: balance, targetFIRE, history, isFIRE: balance >= targetFIRE };
}

// --- 6. Debt Snowball ---
export function calculateDebtPayoff(debts: { name: string, balance: number, interest: number, minPayment: number }[], monthlyExtra: number) {
    const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
    const totalMin = debts.reduce((sum, d) => sum + d.minPayment, 0);
    const months = totalBalance / (totalMin + monthlyExtra);
    return { months: Math.ceil(months), totalInterest: totalBalance * 0.15 };
}

// --- 7. BMI & Calorie ---
export function calculateBMI(weight: number, height: number, age: number, sex: 'm' | 'f', activity: number) {
    const bmi = (weight / Math.pow(height / 100, 2));
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = sex === 'm' ? bmr + 5 : bmr - 161;
    return { bmi: Math.round(bmi * 10) / 10, tdee: Math.round(bmr * activity) };
}

// --- 8. Tip & Percentage ---
export function calculateTip(bill: number, tipPercent: number, people: number) {
    const tipTotal = bill * (tipPercent / 100);
    const total = bill + tipTotal;
    return { tipAmount: tipTotal, totalAmount: total, perPerson: total / people };
}
