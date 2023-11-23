<script>
  import {
    chosenMonthlyRepaymentAmount,
    data,
    dataCollection,
    interestRateYearly,
    monthlyRepaymentAmount,
    use35years,
  } from "./stores";
  import { get } from "svelte/store";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte";
  import LineChart from "./LineChart.svelte";
  import Repayment from "./Repayment.svelte";

  $: $data, console.log($data);

  function addData() {
    let monthlyAmount;
    if ($use35years) monthlyAmount = $monthlyRepaymentAmount;
    else monthlyAmount = $chosenMonthlyRepaymentAmount;
    $dataCollection.push({
      data: $data,
      Interest: $interestRateYearly,
      MonthlyRepayment: monthlyAmount,
    });
    console.log($dataCollection);
  }
</script>

<div class="maincontainer">
  <div class="left-side">
    <BudgetOverview />
    <div class="nexteachother">
      <AdditionalInformation />

      <Repayment />
    </div>



  </div>

  <div class="right-side">
    <LineChart data={$data} />
  </div>

</div>
<button on:click={addData}>Add data</button>

<style>
  .maincontainer {
    display: flex;
  }

</style>
