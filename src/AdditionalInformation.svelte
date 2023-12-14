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
  } from "./stores";
</script>

<div class="additionalinformationcontainer">
  <h3>Loan Information</h3>

  <div class="column">
    <label class="topdown"
      >Borrow each month: €{$chosenMonthlyAmount}
      <input
        bind:value={$chosenMonthlyAmount}
        class="topdown"
        type="range"
        min="0"
        max="1410"
        step="10"
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
  <p>
    My current debt is €{$currentDebt}. I want to borrow €{$chosenMonthlyAmount}
    per month for a duration of {$remainderLoanPeriod} months.
  </p>
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
    margin-bottom: 0px;
  }
</style>
