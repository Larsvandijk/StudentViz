<script>
  import {
    totalIncomeCategories,
    totalExpenses,
    totalIncome,
    interestRateYearly,
    interestRateDecimalMonthly,
    currentDebt,
    repaymentTerm,
    principal,
    pageIndex,
    monthlyRepaymentAmount,
    moneyNeeded,
    data,
  } from "./stores";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte";
  import LineChart from "./LineChart.svelte";
  import Repayment from "./Repayment.svelte";

  $: $data, console.log($data);
</script>

<div class="maincontainer">
  <div class="left-side">
    <BudgetOverview />

    <AdditionalInformation />

    <Repayment></Repayment>

    <!-- <ul>
      <li>Monthly amount = {$monthlyRepaymentAmount}</li>
      <li>Repayment term = {$repaymentTerm}</li>
      <li>Principal = {$principal}</li>
    </ul> -->
  </div>
  <div class="right-side">
    <LineChart data={$data} />
  </div>
</div>

<style>
  .maincontainer{
    display: flex;
    
  }
</style>
