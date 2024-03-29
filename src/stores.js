import { derived, writable, readable, get } from "svelte/store";

export const minimumWageYearly = readable(23212);
export const draagvoet = readable(0.04);
export const pageIndex = writable(2);

export const selectionBoundaries = writable({
  interestRate: { minimum: undefined, maximum: undefined },
  monthlyLoanAmount: { minimum: undefined, maximum: undefined },
  monthlyRepayment: { minimum: undefined, maximum: undefined },
  totalPaid: { minimum: undefined, maximum: undefined },
  interestProportion: { minimum: undefined, maximum: undefined },
  finalDate:{ minimum: undefined, maximum: undefined }
});

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
  {
    id: Math.random(),
    name: "Side job per month",
    value: 0,
    editable: false,
    tooltip: "How much you earn each month with your side job. ",
  },
  {
    id: Math.random(),
    name: "Rental allowance per month",
    value: 0,
    editable: false,
    tooltip:
      "Some student can receive rental allowance. This is based on the income of your caretakers.",
  },
  {
    id: Math.random(),
    name: "Healthcare allowance per month",
    value: 0,
    editable: false,
    tooltip:
      "Most students are entitled to healthcare allowance in order to pay for their health insurance. ",
  },
  {
    id: Math.random(),
    name: "External financial contribution per month",
    value: 0,
    editable: false,
    tooltip:
      "The amount you receive each month by for example your caretakers, family or friends.",
  },
]);

export const totalIncomeCategories = derived(incomeList, ($incomeList) =>
  $incomeList.reduce((prev, next) => prev + next.value, 0)
);

export const expenseList = writable([
  {
    id: Math.random(),
    name: "Tuition",
    value: 0,
    editable: false,
    tooltip: "Monthly costs of tuition",
  },
  {
    id: Math.random(),
    name: "Study Material",
    value: 0,
    editable: false,
    tooltip: "Monthly costs of books, notebooks and other study material",
  },
  {
    id: Math.random(),
    name: "Healthcare insurance",
    value: 0,
    editable: false,
    tooltip: "Monthly cost of your healthcare insurance",
  },
  {
    id: Math.random(),
    name: "Rent (incl gas electra etc)",
    value: 0,
    editable: false,
    tooltip:
      "The total rent you pay each month, including gas, electra WiFi etc.",
  },
  {
    id: Math.random(),
    name: "Phone",
    value: 0,
    editable: false,
    tooltip: "Monthly costs of your mobile phone subscription",
  },
  {
    id: Math.random(),
    name: "Transport",
    value: 0,
    editable: false,
    tooltip:
      "This includes public transport (bus, metro, train) as well as private transport (gas for car)",
  },
  {
    id: Math.random(),
    name: "Groceries",
    value: 0,
    editable: false,
    tooltip: "How much you spend each month on your groceries",
  },
  {
    id: Math.random(),
    name: "Clothes",
    value: 0,
    editable: false,
    tooltip: "How much you spend each month on buying clothes",
  },
  {
    id: Math.random(),
    name: "Monthly subscriptions",
    value: 0,
    editable: false,
    tooltip:
      "Streaming subscriptions like Netflix, but also perhaps a bike rental subscription",
  },
  {
    id: Math.random(),
    name: "Leisure Activities, going out, sports",
    value: 0,
    editable: false,
    tooltip:
      "How much you spend on your hobbies and activities you do in your spare time",
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

export const currentDebt = writable(0);
export const chosenMonthlyRepaymentAmount = writable(100);
export const repaymentTerm = writable(35);
export const remainderLoanPeriod = writable(36);
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
      // console.log(get(chosenMonthlyRepaymentAmount) <= get(monthlyRepaymentAmount))
      // console.log(get(chosenMonthlyRepaymentAmount))
      // console.log(get(monthlyRepaymentAmount))
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

export const maxMonthlyRepaymentAmount = derived(
  [futureSalary, minimumWageYearly, draagvoet],
  ([$futureSalary, $minimumWageYearly, $draagvoet]) => {
    let result;
    result = (($futureSalary - $minimumWageYearly) * $draagvoet) / 12;
    return result;
  }
);

export const availableColours = writable([
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
]);

export const dataCollection = writable([]);

export const allDataForAxes = derived(
  [data, dataCollection],
  ([$data, $dataCollection]) => {
    let result = [];
    result = result.concat($data);
    $dataCollection.forEach((e) => (result = result.concat(e.data)));
    return result;
  }
);

export const totalDebtNoInterest = derived(
  [currentDebt, chosenMonthlyAmount, remainderLoanPeriod],
  ([$currentDebt, $chosenMonthlyAmount, $remainderLoanPeriod]) => {
    return $currentDebt + $chosenMonthlyAmount * $remainderLoanPeriod;
  }
);

export const totalInterestPaid = derived(
  [
    totalDebtNoInterest,
    data,
    use35years,
    monthlyRepaymentAmount,
    chosenMonthlyRepaymentAmount,
    aflossingsVrijePeriode,
    remainderLoanPeriod,
  ],
  ([
    $totalDebtNoInterest,
    $data,
    $use35years,
    $monthlyRepaymentAmount,
    $chosenMonthlyRepaymentAmount,
    $aflossingsVrijePeriode,
    $remainderLoanPeriod,
  ]) => {
    let residu = Math.abs($data[$data.length - 1].amount);
    let monthlyAmount;
    if ($use35years) monthlyAmount = $monthlyRepaymentAmount;
    else monthlyAmount = $chosenMonthlyRepaymentAmount;
    return (
      ($data.length - 1 - $aflossingsVrijePeriode - $remainderLoanPeriod) *
        monthlyAmount -
      $totalDebtNoInterest -
      residu
    );
  }
);

export const totalAmountPaid = derived(
  [totalInterestPaid, totalDebtNoInterest],
  ([$totalInterestPaid, $totalDebtNoInterest]) => {
    return $totalInterestPaid + $totalDebtNoInterest;
  }
);

export const alternativeCounter = writable(0)
export const interestRatesEnteredList = writable([])

export const uniqueInterestRatesEntered = derived(interestRatesEnteredList, ($interestRatesEnteredList)=>{
  return Array.from(new Set($interestRatesEnteredList)).length
})
