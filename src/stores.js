import { derived, writable } from "svelte/store";

export const pageIndex = writable(0);

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

export const interestRate = writable(2.56);
export const interestRateDecimal = derived(
  interestRate,
  ($interestRate) => $interestRate / 100
);
export const currentDebt = writable(0);
export const repaymentTerm = writable(35);
export const principal = writable(0);
export const r = derived(
  interestRateDecimal,
  ($interestRateDecimal) => $interestRateDecimal / 12
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

export const remainderStudyPeriod = writable(0);
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
  ([$totalIncome, $totalExpenses]) => $totalIncome - $totalExpenses
);
