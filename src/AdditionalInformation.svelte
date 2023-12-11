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
      >Borrow each month
      <p class="valueDisplay">€{$chosenMonthlyAmount}</p>
      <input
        bind:value={$chosenMonthlyAmount}
        class="topdown"
        type="range"
        min="0"
        max="1410"
        step="10"
      /></label
    >
    <div class="row">
      <label class="topdown"
        >Current Debt
        <input
          data-type="currency"
          class="topdown"
          type="number"
          bind:value={$currentDebt}
        />
      </label>

      <label class="topdown"
        >Remaining months<input
          bind:value={$remainderLoanPeriod}
          class="topdown"
          type="number"
        /></label
      >
    </div>
  </div>
  <p>
    My current debt is €{$currentDebt}. I want to borrow €{$chosenMonthlyAmount}
    for a remainder of {$remainderLoanPeriod} months.
  </p>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  input[type="number"] {
    width: 100px;
  }

  input[type="range"] {
    padding: 0;
    width: 200px;
  }

  .valueDisplay {
    margin: 0;
  }
</style>
