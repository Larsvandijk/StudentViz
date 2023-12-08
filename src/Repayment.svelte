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

  $: options = [
    {
      text:
        "Repay in 35 years and pay €" +
        Math.round($monthlyRepaymentAmount * 100) / 100 +
        " per month. Your total repayment will be €" +
        Math.round($totalAmountPaid) +
        ".",
      value: "35years",
    },
    {
      text: "Repay sooner than 35 years. You will need to pay more per month which saves you money in the long run.",
      value: "custom",
    },
  ];

  let selected;
  onMount(async () => {
    selected = options[0].value;
  });

  $: if (selected === options[0].value) $use35years = true;
  else $use35years = false;
</script>

<div class="container">
  <h3>Repayment</h3>
  <label class="topdown"
    >Months between end of study and repayment (0-24)
    <p>{$aflossingsVrijePeriode}</p>

    <input
      type="range"
      min="0"
      max="24"
      bind:value={$aflossingsVrijePeriode}
      class="topdown"
    />
  </label>
  <div class="radio-buttons">
    {#each options as option}
    <label
      ><input
        bind:group={selected}
        type="radio"
        name="rdo"
        value={option.value}
      />{option.text}</label
    >
  {/each}

  </div>
  
  <label class="topdown"
    >Monthly repayment amount<input
      disabled={selected === options[0]}
      bind:value={$chosenMonthlyRepaymentAmount}
      class="topdown"
    /></label
  >

  {#if $chosenMonthlyRepaymentAmount < $monthlyRepaymentAmount && !$use35years}
    <p class="warning">
      <strong
        >Your monthly repayment amount should be at least €{Math.ceil(
          $monthlyRepaymentAmount * 100
        ) / 100}</strong
      >
    </p>
  {/if}

  <!-- <p>Your final payment will be on {lastDate.toLocaleDateString("en-GB")}</p>

  <p>Max repay will be {$maxMonthlyRepaymentAmount}</p> -->
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


</style>
