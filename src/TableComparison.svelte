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
  </tr>

  {#each dataCollection as data, i}
    <TableRow {data} {i}></TableRow>
  {/each}
</table>

<style>
</style>
