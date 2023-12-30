<script>
  import { expenseList } from "./stores.js";
  export let id;
  export let name;
  export let editable = new Boolean();
  export let tooltiptext;
  $: index = $expenseList.findIndex((x) => x.id === id);

  function deleteCategory() {
    let itemToDelete = $expenseList.findIndex((x) => x.id == id);
    $expenseList.splice(itemToDelete, 1);
    $expenseList = $expenseList;
  }
</script>

{#if editable == false}
  <div class="noneditablecontainer">
    <label class="noneditablelabel"
      ><div style="display: flex; justify-content: space-between;">{name} <div class="tooltip"><img src="images/infoicon.png" alt="information icon">
        <span class="tooltiptext">{tooltiptext}</span>
      </div> </div>
      <span class="input-euro left">
        <input
          class="noneditableinput"
          id={name}
          type="number"
          bind:value={$expenseList[index].value}
        />
      </span></label
    >
  </div>
{:else if editable == true}
  <div class="editablecontainer">
    <label class="editablecategorylabel"
      >Category
      <input
        class="editablecategoryinput"
        type="text"
        size="10"
        placeholder="Name of category"
        bind:value={$expenseList[index].name}
      />
    </label>

    <label class="editableamountlabel"
      >Amount
      <span class="input-euro left">
        <input
          class="editableamountinput"
          type="number"
          bind:value={$expenseList[index].value}
        />
      </span>
    </label>
    <button class="button-delete" on:click|preventDefault={deleteCategory}>Delete</button>
  </div>
{/if}

<style>
  .editablecontainer{
    display: flex;
  align-items: center;
  justify-content: center;
  }
  

  input{
    width: 150px;
  }

  .tooltip {
  position: relative;
  display: inline-block;
  width: 30px;

}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

  img{
    width: 20px;
    height: 20px;
  }
 
</style>
