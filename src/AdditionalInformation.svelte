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
    principal
  } from "./stores";



</script>

<div class="additionalinformationcontainer">
  <h2>Additional Information</h2>

  <label class="topdown"
    >Current Debt
    <input class="topdown" type="number" bind:value={$currentDebt} />
  </label>

  <label class="topdown"
    >Remaining months of borrowing<input
      bind:value={$remainderLoanPeriod}
      class="topdown"
      type="number"
    /></label
  >

  <label class="topdown"
    >Loan amount each month<input
      bind:value={$chosenMonthlyAmount}
      class="topdown"
      type="number"
    /></label
  >

  <label class="topdown"
  >Expected yearly salary<input
    bind:value={$futureSalary}
    class="topdown"
    type="number"
  /></label
>

</div>

<style>
  .additionalinformationcontainer {
    width: 400px;
  }


</style>
