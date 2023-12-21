<script>
  import { incomeList } from "./stores.js";
  export let id;
  export let name;
  export let editable = new Boolean();
  $: index = $incomeList.findIndex((x) => x.id === id);

  function deleteCategory() {
    let itemToDelete = $incomeList.findIndex((x) => x.id == id);
    $incomeList.splice(itemToDelete, 1);
    $incomeList = $incomeList;
  }
</script>

{#if editable == false}
  <div class="noneditablecontainer">
    <label class="noneditablelabel"
      >{name}
      <span class="input-euro left">
        <input
          class="noneditableinput"
          id={name}
          type="number"
          bind:value={$incomeList[index].value}
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
        bind:value={$incomeList[index].name}
      />
    </label>

    <label class="editableamountlabel"
      >Amount
      <span class="input-euro left">
        <input
          class="editableamountinput"
          type="number"
          bind:value={$incomeList[index].value}
        />
      </span>
    </label>
    <button class="button-delete" on:click|preventDefault={deleteCategory}
      >Delete</button
    >
  </div>
{/if}

<style>
  .editablecontainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
