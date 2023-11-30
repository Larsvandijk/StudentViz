<script>
  import {
    chosenMonthlyRepaymentAmount,
    monthlyRepaymentAmount,
    use35years,
    data,
    interestRateYearly,
    maxMonthlyRepaymentAmount,
    aflossingsVrijePeriode,
  } from "./stores";

  let options = [
    { text: "Repay in 35 years.", value: "35years" },
    { text: "Repay sooner than 35 years.", value: "custom" },
  ];
  let selected = options[1];

  $: if (selected === options[0]) $use35years = true;
  else $use35years = false;

  $: lastDate = $data[$data.length - 1].date;
</script>

<div class="container">
  <h3>Repayment</h3>
  <label class="topdown"
    >Months between end of study and repayment (0-24)<input
      bind:value={$aflossingsVrijePeriode}
      class="topdown"
      type="number"
    /></label
  >

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

  .container{
    width: 300px;
    display: flex;
    flex-direction: column;
  }

</style>
