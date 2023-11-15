<script>
  import {
    chosenMonthlyRepaymentAmount,
    monthlyRepaymentAmount,
    use35years,
  } from "./stores";

  let options = [
    { text: "I want to repay in 35 years.", value: "35years" },
    { text: "I want to repay earlier than 35 years.", value: "custom" },
  ];
  let selected = options[0];

  $: if (selected === options[0]) $use35years = true;
  else $use35years = false;
</script>

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

{$use35years}
