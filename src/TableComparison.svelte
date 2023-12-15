<script>
  import TableRow from "./TableRow.svelte";
  import { data, dataCollection } from "./stores";

  let PNGSortingImages = ["images/Ascending.png", "images/Descending.png"];

  let sortInterestToHigh = false;
  let sortFinalDateToHigh = false;
  let sortTotalPaidToHigh = false;
  let sortMonthlyLoanAmountToHigh = false;
  let sortMonthlyRepaymentToHigh = false;

  function sortOnInterest() {
    $dataCollection.sort((a, b) => {
      return a.interest - b.interest;
    });
    if (sortInterestToHigh) $dataCollection.reverse();
    sortInterestToHigh = !sortInterestToHigh;
    $dataCollection = $dataCollection;
  }

  function sortOnFinalDate() {
    $dataCollection.sort((a, b) => {
      return a.data[a.data.length - 1].date - b.data[b.data.length - 1].date;
    });
    if (sortFinalDateToHigh) $dataCollection.reverse();
    sortFinalDateToHigh = !sortFinalDateToHigh;
    $dataCollection = $dataCollection;
  }

  function sortOnTotalPaid() {
    $dataCollection.sort((a, b) => {
      return a.totalAmountPaid - b.totalAmountPaid;
    });

    if (sortTotalPaidToHigh) $dataCollection.reverse();
    sortTotalPaidToHigh = !sortTotalPaidToHigh;
    $dataCollection = $dataCollection;
  }

  function sortOnMonthlyLoanAmount() {
    $dataCollection.sort((a, b) => {
      return a.monthlyLoanAmount - b.monthlyLoanAmount;
    });

    if (sortMonthlyLoanAmountToHigh) $dataCollection.reverse();
    sortMonthlyLoanAmountToHigh = !sortMonthlyLoanAmountToHigh;
    $dataCollection = $dataCollection;
  }

  function sortOnMonthlyRepayment() {
    $dataCollection.sort((a, b) => {
      return a.monthlyRepayment - b.monthlyRepayment;
    });

    if (sortMonthlyRepaymentToHigh) $dataCollection.reverse();
    sortMonthlyRepaymentToHigh = !sortMonthlyRepaymentToHigh;
    $dataCollection = $dataCollection;
  }

  let interestSortingImageIndex = 0;
  let finalDateSortingImageIndex = 0;
  let totalPaidSortingImageIndex = 0;
  let monthlyLoanAmountSortingImageIndex = 0;
  let monthlyRepaymentSortingImageIndex = 0;

  $: sortInterestToHigh
    ? (interestSortingImageIndex = 0)
    : (interestSortingImageIndex = 1);

  $: sortFinalDateToHigh
    ? (finalDateSortingImageIndex = 0)
    : (finalDateSortingImageIndex = 1);

  $: sortTotalPaidToHigh
    ? (totalPaidSortingImageIndex = 0)
    : (totalPaidSortingImageIndex = 1);

  $: sortMonthlyLoanAmountToHigh
    ? (monthlyLoanAmountSortingImageIndex = 0)
    : (monthlyLoanAmountSortingImageIndex = 1);

  $: sortMonthlyRepaymentToHigh
    ? (monthlyRepaymentSortingImageIndex = 0)
    : (monthlyRepaymentSortingImageIndex = 1);
</script>

<table cellspacing="0">
  <tr>
    <th style="width: 40px;">Index</th>
    <th style="width: 40px;">Colour</th>
    <th
      ><div class="sort-button-container">
        Interest Rate <button on:click={sortOnInterest}
          ><img
            src={PNGSortingImages[interestSortingImageIndex]}
            alt="sortingpng"
          /></button
        >
      </div></th
    >
    <th
      ><div class="sort-button-container">
        Final Repayment Date <button on:click={sortOnFinalDate}
          ><img
            src={PNGSortingImages[finalDateSortingImageIndex]}
            alt="sortingpng"
          /></button
        >
      </div></th
    >
    <th
      ><div class="sort-button-container">
        Total Paid <button on:click={sortOnTotalPaid}
          ><img
            src={PNGSortingImages[totalPaidSortingImageIndex]}
            alt="sortingpng"
          /></button
        >
      </div></th
    >
    <th>
      <div class="sort-button-container">
        Monthly Loan Amount
        <button on:click={sortOnMonthlyLoanAmount}
          ><img
            src={PNGSortingImages[monthlyLoanAmountSortingImageIndex]}
            alt="sortingpng"
          /></button
        >
      </div></th
    >
    <th
      ><div class="sort-button-container">
        Monthly Repayment
        <button on:click={sortOnMonthlyRepayment}
          ><img
            src={PNGSortingImages[monthlyRepaymentSortingImageIndex]}
            alt="sortingpng"
          /></button
        >
      </div></th
    >
    <th>Interest Proportion</th>
    <th style="width: 40px;">Delete</th>
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
    width: 1100px;
  }

  th {
    width: 80px;
    word-wrap: break-word;
    background-color: #54585d;
    color: #ffffff;
    font-weight: bold;
  }

  img {
    width: 15px;
    height: 15px;
  }

  button {
    width: 20px;
    height: 20px;
    padding: 0px;
    margin: 0px;
  }

  .sort-button-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
