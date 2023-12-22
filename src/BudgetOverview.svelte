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
      Income: <strong>€{$totalIncome}</strong>
      <button on:click={goToIncome} class="buttonnew"><img src="images/editicon.png" alt="edit icon"></button>
    </p>
    <p>
      Expenses: <strong>€{$totalExpenses}</strong>
      <button on:click={goToExpenses} class="buttonnew"><img src="images/editicon.png" alt="edit icon"></button>
    </p>
  </div>


  <hr />
  {#if $moneyNeeded > 0}
    <p>
      <span>Recommendation to borrow: <strong>€{$moneyNeeded}</strong></span>
      <!-- <button on:click={handleClick}>Use this estimate</button> -->
    </p>
  {:else}
    <p>
      <span><strong>+€{Math.abs($moneyNeeded)}</strong></span>
    </p>
  {/if}
</div>

<style>
  .container {
    width: 320px;
    text-align: center;
  }

  .income-expenses {
    width: 320px;
    display: flex;
    flex-direction: row;
    justify-content: space-between

  }

  p{
    display: inline;
    margin-bottom: 0;
    margin-top: 0;
  }

button{
  padding: 0px;
  width: 30px;
  height: 30px;
}

img {
    width: 20px;
    height: 20px;
  }

  hr{
    width: 100%;
  }
</style>
