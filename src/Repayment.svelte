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
    selected = "35years";
  });

  $: if (selected === "35years") $use35years = true;
  else $use35years = false;
</script>

<div class="container">
  <h3>Repayment</h3>
  <label class="topdown"
    >Months between end of study and repayment (0-24)
    <div style="display: flex;">
      <input
        type="range"
        min="0"
        max="24"
        bind:value={$aflossingsVrijePeriode}
        class="topdown"
      />
      <p>{$aflossingsVrijePeriode}</p>
    </div>
  </label>

  <div class="radio-buttons">
    <label
      ><input
        bind:group={selected}
        type="radio"
        name="rdo"
        value="35years"
      />{"Repay in 35 years and pay €" +
        Math.round($monthlyRepaymentAmount * 100) / 100 +
        " per month. Your total repayment will be €" +
        Math.round($totalAmountPaid) +
        "."}</label
    >

    <div style="display:flex flex-wrap:wrap flex-direction:row">
      <input bind:group={selected} type="radio" name="rdo" value="custom" />
      <span
        >Repay sooner than 35 years, this will decrease the amount of interest
        you will pay. You will repay €</span
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
        per month. Your total repayment will be €{Math.round(
          $totalAmountPaid
        )}.</span
      >
    </div>

    <!-- 
    {#each options as option}
      <label
        ><input
          bind:group={selected}
          type="radio"
          name="rdo"
          value={option.value}
        />{option.text}</label
      >
    {/each} -->
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

  /* .euro-sign::before {
  content: "$";
  font-family: "Roboto Regular", sans-serif;
  font-size: 1.5em;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
} */
</style>
