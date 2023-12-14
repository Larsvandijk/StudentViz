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
      disabled={$chosenMonthlyRepaymentAmount < $monthlyRepaymentAmount &&
        !$use35years}
      on:click={addData}>Add alternative</button
    >
  </div>

  <div class="top-down">
    <div class="right-side">
      <InterestExplorer data={$interestHistory} />
      <LineChart data={$data} />
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
    max-width: 320px;
    overflow-y: scroll;
    height: 100vh;
    margin-bottom: 15px;
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

  .buttonnew{
    font-size: 16px;
  }


</style>
