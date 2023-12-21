<script>
  import ExpenseCategory from "./ExpenseCategory.svelte";
  import { pageIndex, expenseList, totalExpenses, chosenMonthlyAmount, moneyNeeded } from "./stores";

  function goToMainPage(){
    $pageIndex += 1
    if($moneyNeeded >= 0 && $moneyNeeded <= 1410){
      $chosenMonthlyAmount = Math.round($moneyNeeded);
    }
    else if($moneyNeeded >= 1410 ) $chosenMonthlyAmount = 1410;
    else if($moneyNeeded < 0) $chosenMonthlyAmount = 0

  }

  function addExpenseCategory() {
    let newCategory = {
      id: Math.random(),
      name: "",
      value: 0,
      editable: true,
    };
    $expenseList = [...$expenseList, newCategory];
    console.log($expenseList);
  }

  function fillInExpenseAverages() {
    $expenseList[0].value = 0;
    $expenseList[1].value = 49;
    $expenseList[2].value = 140;
    $expenseList[3].value = 0;
    $expenseList[4].value = 19;
    $expenseList[5].value = 72;
    $expenseList[6].value = 190;
    $expenseList[7].value = 71;
    $expenseList[8].value = 20;
    $expenseList[9].value = 122;
  }
</script>

<div class="container">
  <h1>Monthly Expenses</h1>
  <p>
    Enter your expenses manually, or use the national averages with the button
    below.
  </p>
  <button class="buttonnew" on:click={fillInExpenseAverages}
    >Use National Averages</button
  >
  <div class="formcontainer">
    <form>
      <div class="expensecontainer">
        {#each $expenseList as category, index (category.id)}
          <ExpenseCategory
            name={category.name}
            value={category.value}
            editable={category.editable}
            id={category.id}
          />
        {/each}
      </div>

      <p>Total Expenses per month: <strong>€{$totalExpenses}</strong></p>

      <div>
        <button class="buttonnew" on:click|preventDefault={addExpenseCategory}
          >Add new category</button
        >
        <button class="buttonnew" on:click={() => ($pageIndex -= 1)}
          >Previous</button
        >
        <button
          class="buttonnew"
          style="background-color: #298e46; color: #fff;"
          on:click={goToMainPage}>Next</button
        >
      </div>
    </form>
  </div>
</div>

<style>
  .expensecontainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
