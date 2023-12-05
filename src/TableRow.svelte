<script>
  import Colour from "./Colour.svelte";
  import Dougnut from "./Dougnut.svelte";
  import HorizontalBarChart from "./HorizontalBarChart.svelte";
  import { dataCollection } from "./stores";
  export let data;
  export let i;

  // $: index = $dataCollection.findIndex((x) => x.id === id);
</script>

<tr>
  <td style="text-align: center">{i + 1}</td>
  <td style="text-align: center"><Colour colour={data.colour}></Colour></td>
  <td style="text-align: center"
    >{Number(data.interest / 100).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    })}</td
  >
  <td style="text-align: center"
    >{data.data[data.data.length - 1].date.toLocaleDateString("en-GB")}</td
  >
  <td style="text-align: center">€{Math.round(data.monthlyRepayment * 100) / 100}</td>
  <!-- <td
    ><HorizontalBarChart index={i} amount={data.monthlyRepayment} colour={data.colour}
    ></HorizontalBarChart></td
  > -->
  <Dougnut totalDebtNoInterest={data.totalDebtNoInterest} {data}></Dougnut>
</tr>

<style>
/* tr:hover {background-color: grey;} */
tr:nth-child(even) {background-color: #f2f2f2;}

td{
  padding: 0;
}
</style>
