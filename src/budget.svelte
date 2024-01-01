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
    totalInterestPaid,
    totalDebtNoInterest,
    totalAmountPaid,
  } from "./stores";
  import { get } from "svelte/store";
  import AdditionalInformation from "./AdditionalInformation.svelte";
  import BudgetOverview from "./BudgetOverview.svelte";
  import LineChart from "./LineChart.svelte";
  import Repayment from "./Repayment.svelte";
  import InterestExplorer from "./InterestExplorer.svelte";
  import TableComparison from "./TableComparison.svelte";
  import FilterBar from "./FilterBar.svelte";

  function addData() {
    if ($availableColours.length > 0) {
      let monthlyAmount;
      if ($use35years) monthlyAmount = $monthlyRepaymentAmount;
      else monthlyAmount = $chosenMonthlyRepaymentAmount;

      $dataCollection.push({
        id: Math.random(),
        data: $data,
        interest: $interestRateYearly,
        monthlyRepayment: monthlyAmount,
        monthlyLoanAmount: $chosenMonthlyAmount,
        colour: $availableColours[0],
        totalDebtNoInterest: $totalDebtNoInterest,
        totalInterestPaid: $totalInterestPaid,
        totalAmountPaid: $totalAmountPaid,
      });
      $dataCollection = $dataCollection;
      $availableColours.shift();
      $availableColours = $availableColours;
    }
  }
</script>

<div class="maincontainer">
  <div class="left-side">
    <BudgetOverview />
    <AdditionalInformation />

    <Repayment />
    <button
    class="buttonnew"
    style="margin-bottom: 0px;"
      disabled={$chosenMonthlyRepaymentAmount < $monthlyRepaymentAmount &&
        !$use35years}
      on:click={addData}>Add to comparison table</button
    >
    
  </div>
  

  <div class="top-down">
    <div class="right-side">
      <LineChart data={$data} />
      <InterestExplorer data={$interestHistory} />
    </div>
    <TableComparison></TableComparison>
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
    max-width: 350px;
    max-height: 100vh;

    margin-bottom: 0px;
    border: 2px solid black;
    border-radius: 5px;
    padding: 8px;
  }

  .right-side {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: space-evenly;
  }

  .top-down {
    display: flex;
    flex-direction: column;
  }

  .buttonnew{
    font-size: 16px;
  }


</style>
