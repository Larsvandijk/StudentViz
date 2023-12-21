<script>
  import {
    currentDebt,
    remainderLoanPeriod,
    repaymentTerm,
    futureSalary,
    chosenMonthlyAmount,
    interestRateYearly,
    aflossingsVrijePeriode,
    monthlyRepaymentAmount,
    principal,
    moneyNeeded
  } from "./stores";
</script>

<div class="additionalinformationcontainer">
  <h3>Loan Information</h3>
  <p>
    My current debt is €<span><input type="number" bind:value={$currentDebt}></span> . I want to borrow €{$chosenMonthlyAmount}
    per month for a duration of {$remainderLoanPeriod} months.
  </p>

  <div class="column">
    <label class="topdown"
      >Borrow each month: €{$chosenMonthlyAmount}
      <input
        bind:value={$chosenMonthlyAmount}
        class="topdown"
        type="range"
        min="0"
        max="1410"
        step="1"
      /></label
    >

    <label class="topdown"
      >Borrow for a duration of {$remainderLoanPeriod} months.<input
        bind:value={$remainderLoanPeriod}
        class="topdown"
        type="range"
        min="0"
        max="240"
      /></label
    >
  </div>

</div>

<style>
  /* .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  } */

  .column {
    display: flex;
    flex-direction: column;
  }

  input[type="range"] {
    padding: 0;
    width: 300px;
  }

  p {
    margin-bottom: 15px;
  }

  .additionalinformationcontainer{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h3{
    text-align: center;
    margin-bottom: 0px;
  }

  input[type="number"] {
    width: 80px;
    height: 25px;
    display: inline-block;
  }
</style>
