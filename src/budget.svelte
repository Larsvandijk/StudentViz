<script>
  import {
    chosenMonthlyRepaymentAmount,
    data,
    dataCollection,
    interestRateYearly,
    monthlyRepaymentAmount,
    use35years,
    interestHistory,
    availableColours,
  } from "./stores";
  import { get } from "svelte/store";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte";
  import LineChart from "./LineChart.svelte";
  import Repayment from "./Repayment.svelte";
  import InterestExplorer from "./InterestExplorer.svelte";

  function addData() {
    let monthlyAmount;
    if ($use35years) monthlyAmount = $monthlyRepaymentAmount;
    else monthlyAmount = $chosenMonthlyRepaymentAmount;
    $dataCollection.push({
      data: $data,
      interest: $interestRateYearly,
      monthlyRepayment: monthlyAmount,
      colour: $availableColours[0],
    });
    $dataCollection = $dataCollection;
    $availableColours.shift();
    $availableColours = $availableColours;
  }
</script>

<div class="maincontainer">
  <div class="top-side">
    <BudgetOverview />
    <AdditionalInformation />

    <Repayment />
    <InterestExplorer data={$interestHistory} />
  </div>

  <div class="bottom-side">
    <LineChart data={$data} />

    
  </div>
</div>
<button on:click={addData}>Add data</button>

<style>
  .maincontainer {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
  }

  .top-side{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .bottom-side{
    display: flex;
    flex-direction: row;
  }
</style>
