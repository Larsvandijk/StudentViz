<script>
  import {
    totalIncomeCategories,
    totalExpenses,
    totalIncome,
    interestRate,
    currentDebt,
    repaymentTerm,
    principal,
    r,
    X,
    Y,
    Z,
    pageIndex,
    monthlyRepaymentAmount,
    moneyNeeded,


  } from "./stores";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte"

</script>

<BudgetOverview></BudgetOverview>

<AdditionalInformation></AdditionalInformation>


<ul>
  <li>Monthly amount = {$monthlyRepaymentAmount}</li>
  <li>Repayment term = {$repaymentTerm}</li>
</ul>

<style>

</style>
