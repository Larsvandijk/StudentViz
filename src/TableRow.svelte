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
  import StackedBarChart from "./StackedBarChart.svelte";
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
  <td style="text-align: center"><div class="colour">{i + 1} <Colour colour={data.colour}></Colour></div></td>

  <td style="text-align: center"
    >{Number(data.interest / 100).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    })}</td
  >

  <td style="text-align: center">
    <HorizontalBarChart
      amount={data.monthlyLoanAmount}
      colour={data.colour}
      displayedContent={"monthlyLoanAmount"}
    ></HorizontalBarChart></td
  >

  <td style="text-align: center"
    ><HorizontalBarChart
      amount={Math.round(data.monthlyRepayment * 100) / 100}
      colour={data.colour}
      displayedContent={"monthlyRepayment"}
    ></HorizontalBarChart></td
  >

  <td style="text-align: center"
    ><HorizontalBarChart
      amount={Math.round(data.totalAmountPaid)}
      colour={data.colour}
      displayedContent={"totalAmountPaid"}
    ></HorizontalBarChart></td
  >

  <!-- <td
    ><Dougnut
      totalDebtNoInterest={data.totalDebtNoInterest}
      totalInterestPaid={data.totalInterestPaid}
      totalAmountPaid={data.totalAmountPaid}
      colour={data.colour}
    ></Dougnut></td
  > -->

  <td
    ><StackedBarChart
      totalDebtNoInterest={data.totalDebtNoInterest}
      totalInterestPaid={data.totalInterestPaid}
      totalAmountPaid={data.totalAmountPaid}
      colour={data.colour}
    ></StackedBarChart></td
  >
  <td style="text-align: center"
    >{data.data[data.data.length - 1].date.toLocaleDateString("en-GB")}</td
  >
  <td>
    <div class="container">
      <button class="buttonnew" on:click={deleteCategory}><img src="/images/delete.png" alt="deleteicon"></button>
    </div></td
  >
</tr>

<style>
  /* tr:hover {background-color: grey;} */
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr{
    max-height: 30px;
  }

  td {
    padding: 0px;
  }
  .container {
    display: flex;
    justify-content: center;
  }

  button {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 5px;
  }

  img{
    width: 20px;
    height: 20px;
  }

  .colour{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
