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
    <button class="button-delete" on:click|preventDefault={deleteCategory}>Delete</button>
  </div>
{/if}

<style>
  /* .input-euro {
    position: relative;
  }
  .input-euro.left input {
    padding-left: 18px;
  }

  .input-euro:before {
    position: absolute;
    top: 0;
    content: "€";
  }
  .input-euro.left:before {
    left: 5px;
    top: 19px;
  }

  .noneditablelabel {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px 0;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  }

  .editablecontainer{
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  }

  .editableamountlabel{
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .editablecategorylabel{
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  input {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.1);
  }

  input:focus {
    outline: none;
    box-shadow: 0 0 0 4px hsl(213, 90%, 70%);
  }

  .editablecategoryinput {
    width: 200px;
  }

  .editablecontainer {
    display: flex;
    flex-direction: column;
  } */

</style>
