<script>
  import {
    totalIncomeCategories,
    totalExpenses,
    totalIncome,
    interestRateYearly,
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
    data

  } from "./stores";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte"

  $: $data, console.log($data)

</script>

<BudgetOverview></BudgetOverview>

<AdditionalInformation></AdditionalInformation>


<ul>
  <li>Monthly amount = {$monthlyRepaymentAmount}</li>
  <li>Repayment term = {$repaymentTerm}</li>
</ul>



<style>

</style>
