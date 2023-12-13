<script>
  import {
    chosenMonthlyRepaymentAmount,
    monthlyRepaymentAmount,
    use35years,
    data,
    interestRateYearly,
    maxMonthlyRepaymentAmount,
    aflossingsVrijePeriode,
    totalAmountPaid,
  } from "./stores";

  import { onMount } from "svelte";

  let selected;
  onMount(async () => {
    selected = "35years";
  });

  $: if (selected === "35years") $use35years = true;
  else $use35years = false;

  let totalSpend35 = 0;
  let totalSpendCustom = 0;
  $: if ($use35years) totalSpend35 = $totalAmountPaid;
  else totalSpendCustom = $totalAmountPaid;
</script>

<div class="container">
  <h3>Repayment</h3>
  <label class="topdown"
    >After my study, I will start repaying in {$aflossingsVrijePeriode} months.
    <div style="display: flex margin-top:0px;">
      <input
        type="range"
        min="0"
        max="24"
        bind:value={$aflossingsVrijePeriode}
        class="topdown"
      />
    </div>
  </label>

  <div class="radio-buttons">
    <fieldset>
      <legend>Select a repayment option:</legend>
    <label
      ><input
        bind:group={selected}
        type="radio"
        name="rdo"
        value="35years"
      />{"I will repay in 35 years and pay €" +
        Math.round($monthlyRepaymentAmount * 100) / 100 +
        " per month. My total repayment will be €" +
        Math.round(totalSpend35) +
        "."}</label
    >

    <div style="display:flex flex-wrap:wrap flex-direction:row">
      <input bind:group={selected} type="radio" name="rdo" value="custom" />
      <span
        >I will repay sooner than 35 years which will save money. If I repay €</span
      >
      <span class="euro-sign">
        <input
          disabled={selected === "35years"}
          bind:value={$chosenMonthlyRepaymentAmount}
          class="topdown"
          type="number"
        />
      </span>
      <span>
        per month, my total repayment will be €{Math.round(
          totalSpendCustom
        )}.</span
      >
    
    </div>
  </fieldset>

  </div>

  {#if $chosenMonthlyRepaymentAmount < $monthlyRepaymentAmount && !$use35years}
    <p class="warning">
      <strong
        >Your monthly repayment amount should be at least €{Math.ceil(
          $monthlyRepaymentAmount * 100
        ) / 100}</strong
      >
    </p>
  {/if}
</div>

<style>
  .warning {
    color: red;
  }

  .container {
    width: 300px;
    display: flex;
    flex-direction: column;
  }

  input[type="range"] {
    padding: 0;
  }

  input[type="number"] {
    width: 80px;
    height: 25px;
    display: inline-block;
  }

  input[type="radio"] {
    vertical-align: baseline;
  }

  label {
    vertical-align: baseline;
  }

  fieldset{
    margin-bottom: 15px;
    margin-top: 15px;
  }

  
</style>
