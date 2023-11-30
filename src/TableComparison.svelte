<script>
  import TableRow from "./TableRow.svelte";

  export let dataCollection;
</script>

<table>
  <tr>
    <th>Index</th>
    <th>Colour</th>
    <th>Interest Rate</th>
    <th>Final Repayment</th>
    <th>Monthly Repayment</th>
    <th>Interest proportion</th>
  </tr>

  {#each dataCollection as data, i}
    <TableRow {data}></TableRow>
  {/each}
</table>
