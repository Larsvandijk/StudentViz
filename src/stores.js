import { derived, writable, readable, get } from "svelte/store";

export const minimumWageYearly = readable(23212);
export const draagvoet = readable(0.04);
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
export const chosenMonthlyRepaymentAmount = writable(100);
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

// export const monthlyRepaymentAmountNoInterest = derived(
//   [principal,
//   repaymentTerm],
//   ([$principal, $repaymentTerm]) => {return $principal / ($repaymentTerm * 12)}
// );

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
