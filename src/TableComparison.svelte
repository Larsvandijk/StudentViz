<script>
  import TableRow from "./TableRow.svelte";

  export let dataCollection;
</script>

<table cellspacing="0">
  <tr>
    <th>Index</th>
    <th>Colour</th>
    <th>Interest Rate</th>
    <th>Final Repayment Date</th>
    <th>Monthly Repayment</th>
    <th>Interest proportion</th>
    <th>Delete</th>
  </tr>

  {#each dataCollection as data, i (data.id)}
    <TableRow {data} {i} id={data.id}></TableRow>
  {/each}
</table>

<style>
</style>
