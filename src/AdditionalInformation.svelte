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

<!-- <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-colors-flat.css"> -->

<div class="additionalinformationcontainer">
  <h3>Loan Information</h3>

  <div class="row">
    <div class="column">
      <label class="topdown"
        >Current Debt
        <input class="topdown" type="number" bind:value={$currentDebt} />
      </label>

      <label class="topdown"
        >Remaining months<input
          bind:value={$remainderLoanPeriod}
          class="topdown"
          type="number"
        /></label
      >
    </div>

    <div class="column">
      <label class="topdown"
        >Borrow each month<input
          bind:value={$chosenMonthlyAmount}
          class="topdown"
          type="number"
        /></label
      >

      <!-- <label class="topdown"
        >Expected yearly salary<input
          bind:value={$futureSalary}
          class="topdown"
          type="number"
        /></label
      > -->
    </div>
  </div>
</div>

<style>


  .row{
    display: flex;
    flex-direction: row;
  }

  .column{
    display: flex;
    flex-direction: column;
  }

  input{
    width: 150px;
  }
</style>
