import { derived, writable, get } from "svelte/store";

export const pageIndex = writable(2);

export const incomeList = writable([
  { id: Math.random(), name: "Side job", value: 0, editable: false },
  { id: Math.random(), name: "Rental allowance", value: 0, editable: false },
  {
    id: Math.random(),
    name: "Healthcare allowance",
    value: 0,
    editable: false,
  },
  {
    id: Math.random(),
    name: "Parental contibution",
    value: 0,
    editable: false,
  },
]);

export const totalIncomeCategories = derived(incomeList, ($incomeList) =>
  $incomeList.reduce((prev, next) => prev + next.value, 0)
);

export const expenseList = writable([
  { id: Math.random(), name: "Tuition", value: 0, editable: false },
  { id: Math.random(), name: "Study Material", value: 0, editable: false },
  {
    id: Math.random(),
    name: "Healthcare insurance",
    value: 0,
    editable: false,
  },
  {
    id: Math.random(),
    name: "Rent (incl gas electra etc)",
    value: 0,
    editable: false,
  },
  { id: Math.random(), name: "Phone", value: 0, editable: false },
  { id: Math.random(), name: "Transport", value: 0, editable: false },
  {
    id: Math.random(),
    name: "Groceries",
    value: 0,
    editable: false,
  },
  {
    id: Math.random(),
    name: "Clothes",
    value: 0,
    editable: false,
  },
  {
    id: Math.random(),
    name: "Monthly subscriptions",
    value: 0,
    editable: false,
  },
  {
    id: Math.random(),
    name: "Leisure Activities, going out, sports",
    value: 0,
    editable: false,
  },
]);

export const totalExpenses = derived(expenseList, ($expenseList) =>
  $expenseList.reduce((prev, next) => prev + next.value, 0)
);

export const chosenMonthlyAmount = writable(0);

// INTEREST RATES
export const interestRateYearly = writable(2.56);

export const interestRateDecimalYearly = derived(
  interestRateYearly,
  ($interestRateYearly) => $interestRateYearly / 100
);
export const interestRateDecimalMonthly = derived(
  interestRateDecimalYearly,
  ($interestRateDecimalYearly) =>
    Math.pow(1 + $interestRateDecimalYearly, 1 / 12) - 1
);

export const currentDebt = writable(10000);
export const repaymentTerm = writable(35);
export const remainderLoanPeriod = writable(0);
export const aflossingsVrijePeriode = writable(12);

export const principal = derived(
  [
    currentDebt,
    chosenMonthlyAmount,
    interestRateDecimalMonthly,
    remainderLoanPeriod,
    aflossingsVrijePeriode,
  ],
  ([
    $currentDebt,
    $chosenMonthlyAmount,
    $interestRateDecimalMonthly,
    $remainderLoanPeriod,
    $aflossingsVrijePeriode,
  ]) => {
    let principal = 0;
    principal += $currentDebt;
    for (let i = 1; i <= $remainderLoanPeriod; i++) {
      principal += $chosenMonthlyAmount;
      principal *= 1 + $interestRateDecimalMonthly;
    }
    for (let i = 1; i <= $aflossingsVrijePeriode; i++) {
      principal *= 1 + $interestRateDecimalMonthly;
    }
    return principal;
  }
);

// CALCULATIONS OF MONTHLY REPAYMENT AMOUNT ---------------------------------------------------------------------
export const r = derived(
  interestRateDecimalYearly,
  ($interestRateDecimalYearly) => $interestRateDecimalYearly / 12
);
export const X = derived([repaymentTerm, r], ([$repaymentTerm, $r]) => {
  return Math.pow(1 + $r, $repaymentTerm * 12) - 1;
});
export const Y = derived(
  [repaymentTerm, r],
  ([$repaymentTerm, $r]) => Math.pow(1 + $r, $repaymentTerm * 12) * $r
);
export const Z = derived([X, Y], ([$X, $Y]) => $X / $Y);

export const monthlyRepaymentAmount = derived(
  [principal, Z],
  ([$principal, $Z]) => $principal / $Z
);

// END OF MONTHLY REPAYMENT AMOUNT ---------------------------------------------------------------------

export const basisbeursPeriod = writable(0);
export const selectedEducation = writable();
export const selectedLivingSituation = writable();
export const studentGrant = writable(0);

export const totalIncome = derived(
  [studentGrant, totalIncomeCategories],
  ([$studentGrant, $totalIncomeCategories]) =>
    $studentGrant + $totalIncomeCategories
);

export const moneyNeeded = derived(
  [totalIncome, totalExpenses],
  ([$totalIncome, $totalExpenses]) => ($totalExpenses - $totalIncome).toFixed(2)
);

export const futureSalary = writable(30000);

export const totalMoneySpend = derived(
  [monthlyRepaymentAmount, repaymentTerm],
  ([$monthlyRepaymentAmount, $repaymentTerm]) =>
    $monthlyRepaymentAmount * ($repaymentTerm * 12)
);

function addYears(date, years) {
  date.setYear(date.getYear() + years);

  return date;
}

function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);

  return date;
}

export const data = derived(
  [
    monthlyRepaymentAmount,
    remainderLoanPeriod,
    chosenMonthlyAmount,
    repaymentTerm,
    aflossingsVrijePeriode,
    principal,
    interestRateDecimalYearly,
    currentDebt,
  ],
  ([
    $monthlyRepaymentAmount,
    $repaymentTerm,
    $aflossingsVrijePeriode,
    $principal,
    $interestRateDecimalYearly,
    $interestRateDecimalMonthly,
    $currentDebt,
    $chosenMonthlyAmount,
    $remainderLoanPeriod,
  ]) => {
    let data = [];
    // ADDING FIRST DATA ENTRY WITH CURRENT DATE AND CURRENT DEBT
    data.push({ date: new Date(Date.now()), amount: get(currentDebt) });

    // ADDING DATA OF REMAINING BORROWING PERIOD
    for (let i = 1; i <= get(remainderLoanPeriod); i++) {
      let newDate = addMonths(new Date(Date.now()), i);
      let lastAmount = data[data.length - 1].amount;
      data.push({
        date: newDate,
        amount:
          (lastAmount + get(chosenMonthlyAmount)) *
          (get(interestRateDecimalMonthly) + 1),
      });
    }

    // lOOP OVER AFLOSSINGSVRIJEPERIODE TO ADD THE INTEREST IN THE FIRST YEARS THAT YOU DONT REPAY YET
    for (let i = 1; i <= get(aflossingsVrijePeriode); i++) {
      let lastDate = data[data.length - 1].date;
      let newDate = addMonths(new Date(lastDate), 1);
      let lastAmount = data[data.length - 1].amount;
      data.push({
        date: newDate,
        amount: lastAmount * (get(interestRateDecimalMonthly) + 1),
      });
    }

    // ADDING DATA OF REPAYMENTS OF THE LOAN
    for (let i = 1; i <= get(repaymentTerm) * 12; i++) {
      let lastDate = data[data.length - 1].date;
      let newDate = addMonths(new Date(lastDate), 1);
      let lastAmount = data[data.length - 1].amount;
      let newAmount =
        lastAmount * (1 + get(interestRateDecimalMonthly)) -
        get(monthlyRepaymentAmount);
      data.push({ date: newDate, amount: newAmount });
    }

    return data;
  }
);

export const totalInterestPaid = derived(
  [totalMoneySpend, principal],
  ([$totalMoneySpend, $principal]) => $totalMoneySpend - $principal
);
