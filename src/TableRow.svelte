<script>
  import Colour from "./Colour.svelte";
  export let data;
  export let i;
</script>

<tr>
    <td>{i+1}</td>
  <td><Colour colour={data.colour}></Colour></td>
  <td>{Number(data.interest/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</td>
  <td>{data.data[data.data.length - 1].date.toLocaleDateString("en-GB")}</td>
  <td>€{data.monthlyRepayment}</td>
</tr>
