<script>
  import * as d3 from "d3";
  import { dataCollection } from "./stores";

  export let amount;
  export let colour;
  export let displayedContent;

  const width = 145;
  const height = 30;

  const paddings = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  };

  let maxValue;

  $: if (displayedContent == "monthlyLoanAmount")
    maxValue = d3.max($dataCollection, (d) => d.monthlyLoanAmount);
  else if (displayedContent == "monthlyRepayment")
    maxValue = d3.max($dataCollection, (d) => d.monthlyRepayment);
  else if(displayedContent == "totalAmountPaid") maxValue = d3.max($dataCollection, (d) => d.totalAmountPaid);
 
  // $: console.log(maxValue);

  // $: xScale = d3
  //   .scaleLinear()
  //   .domain(
  //     0,
  //     d3.max($dataCollection, (d) => d.monthlyLoanAmount)
  //   )
  //   .range([paddings.left, width - paddings.right]);

  $: yScale = d3.scaleBand().range([height - paddings.bottom, paddings.top]);
</script>

<svg {width} {height}>
  <g transform={`translate(${0}, ${0})`}>
    <rect
      x={paddings.left}
      y={yScale(0)}
      width={(width - paddings.right) * (amount / maxValue)}
      {height}
      fill={colour}
    />

    <text
      font-weight="bold"
      text-anchor="start"
      x={0}
      dx="10"
      y={height / 2}
      dy=".35em"
    >
      €{amount}
    </text>
  </g>
</svg>

<style>
</style>
