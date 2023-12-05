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
    currentDebt,
    chosenMonthlyAmount,
    remainderLoanPeriod,
  } from "./stores";
  import { get } from "svelte/store";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte";
  import LineChart from "./LineChart.svelte";
  import Repayment from "./Repayment.svelte";
  import InterestExplorer from "./InterestExplorer.svelte";
  import TableComparison from "./TableComparison.svelte";

  function addData() {
    let monthlyAmount;
    if ($use35years) monthlyAmount = $monthlyRepaymentAmount;
    else monthlyAmount = $chosenMonthlyRepaymentAmount;
    let totalDebtNoInterest =
      $currentDebt + $chosenMonthlyAmount * $remainderLoanPeriod;
    $dataCollection.push({
      data: $data,
      interest: $interestRateYearly,
      monthlyRepayment: monthlyAmount,
      colour: $availableColours[0],
      totalDebtNoInterest: totalDebtNoInterest,
    });
    $dataCollection = $dataCollection;
    $availableColours.shift();
    $availableColours = $availableColours;
    console.log($dataCollection);
  }
</script>

<div class="maincontainer">
  <div class="left-side">
    <BudgetOverview />
    <AdditionalInformation />

    <Repayment />
  </div>

  <div class="top-down">
    <div class="right-side">
      <LineChart data={$data} />
      <InterestExplorer data={$interestHistory} />
      <button on:click={addData}>Add data</button>
    </div>
    <TableComparison dataCollection={$dataCollection}></TableComparison>
  </div>
</div>


<style>
  .maincontainer {
    display: flex;
    flex-direction: row;
    margin-top: 0px;
    justify-content: space-between;
  }

  .left-side {
    display: flex;
    flex-direction: column;

  }

  .right-side {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .top-down {
    display: flex;
    flex-direction: column;
  }
</style>
