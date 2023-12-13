<script>
  import {
    totalExpenses,
    totalIncome,
    moneyNeeded,
    pageIndex,
    chosenMonthlyAmount,
    currentDebt,
  } from "./stores";

  function goToIncome() {
    $pageIndex = 0;
  }

  function goToExpenses() {
    $pageIndex = 1;
  }

  function handleClick() {
    $chosenMonthlyAmount = Math.round($moneyNeeded);
  }
</script>

<div class="container">
  <div class="income-expenses">
    <p>
      Income: <span><strong>€{$totalIncome}</strong></span>
      <button on:click={goToIncome}>Edit</button>
    </p>
    <p>
      Expenses: <span><strong>€{$totalExpenses}</strong></span>
      <button on:click={goToExpenses}>Edit</button>
    </p>
  </div>

  <div style="display:flex; flex-direction: row; justify-content: right; align-items: center">
    <label style="margin-right: 10px" for="currentdebt">Prior Debt</label>
    <input
      id="currentdebt"
      data-type="currency"
      class="topdown"
      type="number"
      bind:value={$currentDebt}
    />
  </div>

  <hr />
  {#if $moneyNeeded > 0}
    <p>
      <span><strong>Recommendation to borrow: €{$moneyNeeded}</strong></span>
      <button on:click={handleClick}>Use this estimate</button>
    </p>
  {:else}
    <p>
      <span><strong>+€{Math.abs($moneyNeeded)}</strong></span>
    </p>
  {/if}
</div>

<style>
  .container {
    width: 200px;
    text-align: center;
  }

  p {
    margin-bottom: 0;
    margin-top: 0;
  }

  .income-expenses {
    text-align: end;
  }

  label {
    display: inline-block;
    text-align: right;
  }

  input[type="number"] {
    width: 80px;
  }
</style>
