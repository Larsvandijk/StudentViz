<script>
  import {
    chosenMonthlyRepaymentAmount,
    monthlyRepaymentAmount,
    use35years,
    data,
    interestRateYearly,
  } from "./stores";

  let options = [
    { text: "I want to repay in 35 years.", value: "35years" },
    { text: "I want to repay earlier than 35 years.", value: "custom" },
  ];
  let selected = options[0];

  $: if (selected === options[0]) $use35years = true;
  else $use35years = false;

  $: lastDate = $data[$data.length - 1].date;

</script>

<h2>Repayment</h2>
{#each options as option}
  <label
    ><input
      bind:group={selected}
      type="radio"
      name="rdo"
      value={option}
    />{option.text}</label
  >
{/each}

<label class="topdown"
  >Monthly repayment amount<input
    min={monthlyRepaymentAmount}
    disabled={selected === options[0]}
    bind:value={$chosenMonthlyRepaymentAmount}
    class="topdown"
    type="number"
  /></label
>

{#if $chosenMonthlyRepaymentAmount < $monthlyRepaymentAmount && !$use35years && $interestRateYearly != 0}
  <p class="warning">
    <strong
      >Your monthly repayment amount should be at least €{Math.ceil(
        $monthlyRepaymentAmount * 100
      ) / 100}</strong
    >
  </p>
{/if}

<p>Your final payment will be on {lastDate.toLocaleDateString("en-GB")}</p>

<style>
  .warning {
    color: red;
  }

</style>
