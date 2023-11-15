<script>
  import { totalExpenses, totalIncome, moneyNeeded, pageIndex, chosenMonthlyAmount } from "./stores";

  function goToIncome() {
    $pageIndex = 0;
  }

  function goToExpenses() {
    $pageIndex = 1;
  }

  function handleClick(){
    $chosenMonthlyAmount = Math.round($moneyNeeded);
  }
</script>

<div class="container">
  <h2>Recommendation</h2>
  <div class="income-expenses">
    <p>
      Income: <span style="color: green"><strong>€{$totalIncome}</strong></span>
      <button on:click={goToIncome}>Edit</button>
    </p>
    <p>
      Expenses: <span style="color: red"><strong>€{$totalExpenses}</strong></span>
      <button on:click={goToExpenses}>Edit</button>
    </p>

  </div>

  <hr>
  {#if $moneyNeeded > 0}
    <p>
      <span style="color: red"><strong>-€{$moneyNeeded}</strong></span>
      <button on:click={handleClick}>Use this estimate</button>
    </p>
  {:else}
    <p>
      <span style="color: green"><strong>+€{Math.abs($moneyNeeded)}</strong></span>
    </p>
  {/if}
</div>

<style>
  .container {
    width: 300px;
  }

  p{
    margin-bottom: 0;
    margin-top: 0;
  }
</style>
