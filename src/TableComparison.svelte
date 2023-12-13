<script>
  import TableRow from "./TableRow.svelte";
  import { dataCollection } from "./stores";

  let sortInterestToHigh = false;
  function sortOnInterest() {
    $dataCollection.sort((a, b) => {
      return a.interest - b.interest;
    });
    if (sortInterestToHigh) $dataCollection.reverse();
    sortInterestToHigh = !sortInterestToHigh;
    $dataCollection = $dataCollection;
  }
</script>

<table cellspacing="0">
  <tr>
    <th>Index</th>
    <th>Colour</th>
    <th>Interest Rate <button on:click={sortOnInterest}>Sort</button></th>
    <th>Final Repayment Date</th>
    <th>Total Paid</th>
    <th>Monthly Loan Amount</th>
    <th>Monthly Repayment</th>
    <th>Interest Proportion & Total Repayment</th>
    <th>Delete</th>
  </tr>

  {#each $dataCollection as data, i (data.id)}
    <TableRow {data} {i} id={data.id}></TableRow>
  {/each}
</table>
{#if $dataCollection.length < 1}
  <p style="text-align: center;">
    <strong>Add alternatives to compare them in this table!</strong>
  </p>
{/if}

<style>
  table {
    table-layout: fixed;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  th {
    width: 80px;
    word-wrap: break-word;
    background-color: #54585d;
    color: #ffffff;
    font-weight: bold;
  }
</style>
