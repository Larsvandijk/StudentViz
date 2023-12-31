<script>
  import * as d3 from "d3";
  import { dataCollection, selectionBoundaries } from "./stores";

  export let indentifier;
  export let width, height;
  let brushelement;

  let isBrushing = false;
  let xAxis;

  let maxValue = 10;

  let minimum, maximum;

  const padding = { top: 10, right: 10, bottom: 10, left: 10 };

  $: if (indentifier == "monthlyLoanAmount") {
    maxValue = d3.max($dataCollection, (d) => d.monthlyLoanAmount);
  } else if (indentifier == "monthlyRepayment")
    maxValue = d3.max($dataCollection, (d) => d.monthlyRepayment);
  else if (indentifier == "totalAmountPaid")
    maxValue = d3.max($dataCollection, (d) => d.totalAmountPaid);
  else if (indentifier == "interestRate")
    maxValue = d3.max($dataCollection, (d) => d.interest);
  else if (indentifier == "interestProportion")
    maxValue = d3.max($dataCollection, (d) => (d.totalInterestPaid / d.totalAmountPaid * 100));


  $: xScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, width - padding.right]);

  $: brush = d3
    .brushX()
    .extent([
      [padding.left, 0],
      [width, height - 10],
    ])
    .on("start", () => (isBrushing = true))
    .on("brush", brush)
    .on("end", endBrush);

  $: if (brushelement) {
    d3.select(brushelement).call(brush);
  }

  $: d3.select(xAxis).call(d3.axisBottom(xScale).ticks(6, "s"));

  $: if (indentifier == "monthlyLoanAmount") {
    $selectionBoundaries.monthlyLoanAmount.minimum = minimum;
    $selectionBoundaries.monthlyLoanAmount.maximum = maximum;
  }

  $: if (indentifier == "monthlyRepayment") {
    $selectionBoundaries.monthlyRepayment.minimum = minimum;
    $selectionBoundaries.monthlyRepayment.maximum = maximum;
  }

  $: if (indentifier == "totalAmountPaid") {
    $selectionBoundaries.totalPaid.minimum = minimum;
    $selectionBoundaries.totalPaid.maximum = maximum;
  }

  $: if (indentifier == "interestRate") {
    $selectionBoundaries.interestRate.minimum = minimum;
    $selectionBoundaries.interestRate.maximum = maximum;
  }

  $: if (indentifier == "interestProportion") {
    $selectionBoundaries.interestProportion.minimum = minimum;
    $selectionBoundaries.interestProportion.maximum = maximum;
  }

  function brush(e) {
    if (indentifier == "interestRate") {
      minimum =
        Math.round(xScale.invert(e.selection[0] - padding.left) * 100) / 100;
      maximum =
        Math.round(xScale.invert(e.selection[1] - padding.left) * 100) / 100;
    } else {
      minimum = Math.round(xScale.invert(e.selection[0] - padding.left));
      maximum = Math.round(xScale.invert(e.selection[1] - padding.left));
    }
    console.log($selectionBoundaries);
  }

  function endBrush(e) {
    if (e.selection == null) {
      minimum = undefined;
      maximum = undefined;
    }
  }
</script>

<svg {width} {height}>
  <g
    bind:this={xAxis}
    transform="translate({padding.left},{0})"
    {width}
    {height}
  />
  <g bind:this={brushelement} {width} {height} />
  {#if minimum != undefined && maximum != undefined}
    <text
      font-size="10"
      fill="white"
      x={xScale(minimum) + padding.left}
      y={height}>{minimum}</text
    >
    <text
      font-size="10"
      fill="white"
      x={xScale(maximum) - padding.right}
      y={height}>{maximum}</text
    >
  {/if}
</svg>

<style>
</style>
