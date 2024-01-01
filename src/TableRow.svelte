<script>
  import Colour from "./Colour.svelte";
  import HorizontalBarChart from "./HorizontalBarChart.svelte";
  import {
    availableColours,
    dataCollection,
    totalDebtNoInterest,
    totalInterestPaid,
    totalAmountPaid,
    selectionBoundaries,
  } from "./stores";
  import StackedBarChart from "./StackedBarChart.svelte";
  export let data;
  export let i;
  export let id;

  let shouldBeDisplayed = true;

  $: deleteCategory = () => {
    let itemToDelete = $dataCollection.findIndex((x) => x.id == id);
    $availableColours.push($dataCollection[itemToDelete].colour);
    $availableColours = $availableColours;
    $dataCollection.splice(itemToDelete, 1);
    $dataCollection = $dataCollection;
  };

  $: isInsideInterestRateBoundaries = () => {
    if ($selectionBoundaries.interestRate.minimum == undefined) return true;
    else if (
      $selectionBoundaries.interestRate.minimum <= data.interest &&
      $selectionBoundaries.interestRate.maximum >= data.interest
    )
      return true;
    else return false;
  };

  $: isInsideMonthlyLoanAmountBoundaries = () => {
    if ($selectionBoundaries.monthlyLoanAmount.minimum == undefined)
      return true;
    else if (
      $selectionBoundaries.monthlyLoanAmount.minimum <=
        data.monthlyLoanAmount &&
      $selectionBoundaries.monthlyLoanAmount.maximum >= data.monthlyLoanAmount
    )
      return true;
    else return false;
  };

  $: isInsideMonthlyRepaymentBoundaries = () => {
    if ($selectionBoundaries.monthlyRepayment.minimum == undefined) return true;
    else if (
      $selectionBoundaries.monthlyRepayment.minimum <= data.monthlyRepayment &&
      $selectionBoundaries.monthlyRepayment.maximum >= data.monthlyRepayment
    )
      return true;
    else return false;
  };

  $: isInsideTotalPaidBoundaries = () => {
    if ($selectionBoundaries.totalPaid.minimum == undefined) return true;
    else if (
      $selectionBoundaries.totalPaid.minimum <= data.totalAmountPaid &&
      $selectionBoundaries.totalPaid.maximum >= data.totalAmountPaid
    )
      return true;
    else return false;
  };

  $: isInsideInterestProportionBoundaries = () => {
    if ($selectionBoundaries.interestProportion.minimum == undefined)
      return true;
    else if (
      $selectionBoundaries.interestProportion.minimum <=
        (data.totalInterestPaid / data.totalAmountPaid) * 100 &&
      $selectionBoundaries.interestProportion.maximum >=
        (data.totalInterestPaid / data.totalAmountPaid) * 100
    )
      return true;
    else return false;
  };

  $: shouldBeDisplayed =
    (isInsideInterestRateBoundaries() &&
    isInsideMonthlyLoanAmountBoundaries() &&
    isInsideMonthlyRepaymentBoundaries() &&
    isInsideTotalPaidBoundaries() &&
    isInsideInterestProportionBoundaries());

</script>

<tr class:inactive ={!shouldBeDisplayed}>
  <td style="text-align: center"
    ><div class="colour">
      {i + 1}
      <Colour colour={data.colour}></Colour>
    </div></td
  >

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
      <button class="buttonnew" on:click={deleteCategory}
        ><img src="/images/delete.png" alt="deleteicon" /></button
      >
    </div></td
  >
</tr>

<style>
  /* tr:hover {background-color: grey;} */
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr {
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

  img {
    width: 20px;
    height: 20px;
  }

  .colour {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .inactive {
    opacity: 0.25;
  }
</style>
