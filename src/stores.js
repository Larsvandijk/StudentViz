import { derived, writable, readable, get } from "svelte/store";

export const minimumWageYearly = readable(23212);
export const draagvoet = readable(0.04);
export const pageIndex = writable(2);

export const interestHistory = readable([
  { year: 1998, interest: 6.09 },
  { year: 1999, interest: 4.89 },
  { year: 2000, interest: 5.92 },
  { year: 2001, interest: 5.18 },
  { year: 2002, interest: 4.03 },
  { year: 2003, interest: 3.73 },
  { year: 2004, interest: 3.35 },
  { year: 2005, interest: 3.05 },
  { year: 2006, interest: 2.74 },
  { year: 2007, interest: 3.7 },
  { year: 2008, interest: 4.17 },
  { year: 2009, interest: 3.58 },
  { year: 2010, interest: 2.39 },
  { year: 2011, interest: 1.5 },
  { year: 2012, interest: 1.39 },
  { year: 2013, interest: 0.6 },
  { year: 2014, interest: 0.81 },
  { year: 2015, interest: 0.12 },
  { year: 2016, interest: 0.01 },
  { year: 2017, interest: 0 },
  { year: 2018, interest: 0 },
  { year: 2019, interest: 0 },
  { year: 2020, interest: 0 },
  { year: 2021, interest: 0 },
  { year: 2022, interest: 0 },
  { year: 2023, interest: 0.46 },
  { year: 2024, interest: 2.56 },
]);

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
export const chosenMonthlyRepaymentAmount = writable(100);
export const repaymentTerm = writable(35);
export const remainderLoanPeriod = writable(12);
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
export const X = derived(
  [repaymentTerm, interestRateDecimalMonthly],
  ([$repaymentTerm, $interestRateDecimalMonthly]) => {
    return Math.pow(1 + $interestRateDecimalMonthly, $repaymentTerm * 12) - 1;
  }
);
export const Y = derived(
  [repaymentTerm, interestRateDecimalMonthly],
  ([$repaymentTerm, $interestRateDecimalMonthly]) =>
    Math.pow(1 + $interestRateDecimalMonthly, $repaymentTerm * 12) *
    $interestRateDecimalMonthly
);
export const Z = derived([X, Y], ([$X, $Y]) => $X / $Y);

export const monthlyRepaymentAmount = derived(
  [principal, Z, interestRateYearly, repaymentTerm],
  ([$principal, $Z, $interestRateYearly, $repaymentTerm]) => {
    if ($interestRateYearly === 0 || $interestRateYearly === null)
      return $principal / ($repaymentTerm * 12);
    else return $principal / $Z;
  }
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

export const use35years = writable(true);

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
    use35years,
    chosenMonthlyRepaymentAmount,
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
    $use35years,
    $chosenMonthlyRepaymentAmount,
  ]) => {
    let data = [];
    // ADDING FIRST DATA ENTRY WITH CURRENT DATE AND CURRENT DEBT
    data.push({ date: new Date(Date.now()), amount: get(currentDebt) });

    // ADDING DATA OF REMAINING BORROWING PERIOD
    for (let i = 1; i <= get(remainderLoanPeriod); i++) {
      let newDate = addMonths(new Date(Date.now()), i);
      let lastAmount = data[data.length - 1].amount;
      let newAmount;
      // CHECKING INTEREST RATE, IF 0 THEN DIFFERENT CALCULATION
      if (get(interestRateYearly) === null || get(interestRateYearly) === 0)
        newAmount = lastAmount + get(chosenMonthlyAmount);
      else
        newAmount =
          (lastAmount + get(chosenMonthlyAmount)) *
          (get(interestRateDecimalMonthly) + 1);
      data.push({
        date: newDate,
        amount: newAmount,
      });
    }

    // lOOP OVER AFLOSSINGSVRIJEPERIODE TO ADD THE INTEREST IN THE FIRST YEARS THAT YOU DONT REPAY YET
    for (let i = 1; i <= get(aflossingsVrijePeriode); i++) {
      let lastDate = data[data.length - 1].date;
      let newDate = addMonths(new Date(lastDate), 1);
      let lastAmount = data[data.length - 1].amount;
      let newAmount;
      if (get(interestRateYearly) === null || get(interestRateYearly) === 0)
        newAmount = lastAmount;
      else newAmount = lastAmount * (get(interestRateDecimalMonthly) + 1);
      data.push({
        date: newDate,
        amount: newAmount,
      });
    }

    // ADDING DATA OF REPAYMENTS OF THE LOAN, BASED ON WHETHER USER WANTS TO REPAY IN 35 YEARS OR EARLIER
    if (
      get(use35years) ||
      get(chosenMonthlyRepaymentAmount) === null ||
      get(chosenMonthlyRepaymentAmount) <= get(monthlyRepaymentAmount)
    ) {
      for (let i = 1; i <= get(repaymentTerm) * 12; i++) {
        let lastDate = data[data.length - 1].date;
        let newDate = addMonths(new Date(lastDate), 1);
        let lastAmount = data[data.length - 1].amount;
        let newAmount;
        if (get(interestRateYearly) === null || get(interestRateYearly) === 0)
          newAmount = lastAmount - get(monthlyRepaymentAmount);
        else
          newAmount =
            lastAmount * (1 + get(interestRateDecimalMonthly)) -
            get(monthlyRepaymentAmount);
        data.push({ date: newDate, amount: newAmount });
      }
    } else if (!get(use35years)) {
      console.log(get(chosenMonthlyRepaymentAmount) <= get(monthlyRepaymentAmount))
      console.log(get(chosenMonthlyRepaymentAmount))
      console.log(get(monthlyRepaymentAmount))
      while (data[data.length - 1].amount > 0) {
        let lastDate = data[data.length - 1].date;
        let newDate = addMonths(new Date(lastDate), 1);
        let lastAmount = data[data.length - 1].amount;
        let newAmount;
        if (get(interestRateYearly) === null || get(interestRateYearly) === 0)
          newAmount = lastAmount - get(chosenMonthlyRepaymentAmount);
        else
          newAmount =
            lastAmount * (1 + get(interestRateDecimalMonthly)) -
            get(chosenMonthlyRepaymentAmount);
        data.push({ date: newDate, amount: newAmount });
      }
    }

    return data;
  }
);

export const totalInterestPaid = derived(
  [totalMoneySpend, principal],
  ([$totalMoneySpend, $principal]) => $totalMoneySpend - $principal
);

export const maxMonthlyRepaymentAmount = derived(
  [futureSalary, minimumWageYearly, draagvoet],
  ([$futureSalary, $minimumWageYearly, $draagvoet]) => {
    let result;
    result = (($futureSalary - $minimumWageYearly) * $draagvoet) / 12;
    return result;
  }
);

export const availableColours = writable([
  "red",
  "green",
  "purple",
  "yellow",
  "brown",
  "blue",
  "orange",
]);

export const dataCollection = writable([]);

export const allDataForAxes = derived(
  [data, dataCollection],
  ([$data, $dataCollection]) => {
    let result = [];
    result = result.concat($data);
    $dataCollection.forEach((e) => result = result.concat(e.data));
    return result;
  }
);
