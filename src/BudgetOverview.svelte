<script>
  import { totalExpenses, totalIncome, moneyNeeded, pageIndex } from "./stores";

  function goToIncome() {
    $pageIndex = 0;
  }

  function goToExpenses() {
    $pageIndex = 1;
  }
</script>

<div class="budgetoverview">
  <p>
    Your total income included student grant is €{$totalIncome}
    <button on:click={goToIncome}>Edit</button>
  </p>
  <p>
    Your total expenses are €{$totalExpenses}
    <button on:click={goToExpenses}>Edit</button>
  </p>
  {#if $moneyNeeded > 0}
    <p>
      You are €{$moneyNeeded} short to pay your expenses.
      <button>Use this estimate</button>
    </p>
  {:else}
    <p>
      You have enough income to pay for your expenses. There is no need to
      borrow money.
    </p>
  {/if}
</div>

<style>
  .budgetoverview {
    width: 500px;
  }
</style>
