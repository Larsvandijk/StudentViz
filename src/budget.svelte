<script>
  import {
    totalIncomeCategories,
    totalExpenses,
    totalIncome,
    interestRate,
    currentDebt,
    repaymentTerm,
    principal,
    r,
    X,
    Y,
    Z,
    pageIndex,
    monthlyRepaymentAmount,
    moneyNeeded,


  } from "./stores";

  function goToIncome(){
    $pageIndex = 0
  }

  function goToExpenses(){
    $pageIndex = 1
  }

  $: totalNeeded = $totalIncomeCategories - $totalExpenses;
</script>

<div class="budgetoverview">
  <p>Your total income included student grant is €{$totalIncome} <button on:click={goToIncome}>Edit</button></p>
  <p>Your total expenses are €{$totalExpenses} <button on:click={goToExpenses}>Edit</button></p>
  <p>you need {$moneyNeeded}</p>
</div>

<label>
  Interest Rate
  <input type="number" bind:value={$interestRate}/>
</label>

<label>
  Principal
  <input type="number" bind:value={$principal}/>
</label>

<label>
  repayment term
  <input type="number" bind:value={$repaymentTerm}/>
</label>


<ul>
  <li>r = {$r}</li>
  <li>X = {$X}</li>
  <li>Y = {$Y}</li>
  <li>Z = {$Z}</li>
  <li>Mothly amount = {$monthlyRepaymentAmount}</li>
</ul>
