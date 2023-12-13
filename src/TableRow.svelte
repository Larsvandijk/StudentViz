<script>
  import { get } from "svelte/store";
  import Colour from "./Colour.svelte";
  import Dougnut from "./Dougnut.svelte";
  import HorizontalBarChart from "./HorizontalBarChart.svelte";
  import {
    availableColours,
    dataCollection,
    totalDebtNoInterest,
    totalInterestPaid,
    totalAmountPaid,
  } from "./stores";
  export let data;
  export let i;
  export let id;

  function deleteCategory() {
    let itemToDelete = $dataCollection.findIndex((x) => x.id == id);
    $availableColours.push($dataCollection[itemToDelete].colour);
    $availableColours = $availableColours;
    $dataCollection.splice(itemToDelete, 1);
    $dataCollection = $dataCollection;
  }
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
  <td style="text-align: center">€{data.monthlyLoanAmount}</td>
  <td style="text-align: center">€{data.totalAmountPaid}</td>
  <td style="text-align: center"
    >€{Math.round(data.monthlyRepayment * 100) / 100}</td
  >

  <td
    ><Dougnut
      totalDebtNoInterest={data.totalDebtNoInterest}
      totalInterestPaid={data.totalInterestPaid}
      totalAmountPaid={data.totalAmountPaid}
      colour={data.colour}
    ></Dougnut></td
  >
  <td>
    <div class="container">
      <button class="buttonnew" on:click={deleteCategory}>Delete</button>
    </div></td
  >
</tr>

<style>
  /* tr:hover {background-color: grey;} */
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td {
    padding: 0px;
  }
  .container {
    display: flex;
    justify-content: center;
  }

  button {
    width: 60px;
  }
</style>
