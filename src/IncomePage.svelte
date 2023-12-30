<script>
  import FinanceCategory from "./financeCategory.svelte";
  import Studiefinanciering from "./studiefinanciering.svelte";
  import {
    pageIndex,
    incomeList,
    totalIncomeCategories,
    totalIncome,
  } from "./stores";

  function addIncomeCategory() {
    let newCategory = {
      id: Math.random(),
      name: "",
      value: 0,
      editable: true,
    };
    $incomeList = [...$incomeList, newCategory];
  }

  function fillInIncomeAverages() {
    $incomeList[0].value = 508;
    $incomeList[1].value = 0;
    $incomeList[2].value = 154;
    $incomeList[3].value = 150;
  }
</script>

<h1 style="text-align: center;">Monthly Income</h1>
<div class="container">
  <div class="studentgrant">
    <Studiefinanciering></Studiefinanciering>
  </div>

  <div class="formcontainer">
    <p>
      Enter your monthly income manually, or use the national averages with the button
      below.
    </p>
    <button class="buttonnew" on:click={fillInIncomeAverages}
      >Use national averages</button
    >
    <form>
      <div class="incomecontainer">
        {#each $incomeList as category, index (category.id)}
          <FinanceCategory
            name={category.name}
            value={category.value}
            editable={category.editable}
            id={category.id}
            tooltiptext={category.tooltip}
          />
        {/each}
      </div>
      <p>Total income per month: <strong>€{$totalIncome}</strong></p>

      <button class="buttonnew" on:click|preventDefault={addIncomeCategory}
        >Add new category</button
      >
      <button
        style="background-color: #298e46; color: #fff;"
        class="buttonnew"
        on:click={() => ($pageIndex += 1)}>Go to expenses</button
      >
    </form>
  </div>
</div>

<style>
  .incomecontainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  .container {
    display: flex;
    align-items: top;
    justify-content: space-evenly;
    flex-direction: row;
  }

  .formcontainer {
    border: 1px solid black;
    border-radius: 5px;
    padding: 8px;
  }
</style>
