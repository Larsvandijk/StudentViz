<script>
  import * as d3 from "d3";
  import { dataCollection, allDataForAxes } from "./stores";

  export let amount;
  export let index;

  const width = 100;
  const height = 50;

  const paddings = {
    top: 50,
    left: 100,
    right: 50,
    bottom: 50,
  };
  let xAxis;
  let yAxis;

  $: xScale = d3
    .scaleLinear()
    .domain(
      0,
      d3.extent($allDataForAxes, (d) => d.monthlyRepayment)
    )
    .range([paddings.left, width - paddings.right]);

  $: yScale = d3
    .scaleBand()
    .domain([0, 1])
    .range([height - paddings.bottom, paddings.top]);
</script>

<svg {width} {height}>
  <g transform={`translate(${paddings.left}, ${paddings.top})`}>
    <text
      text-anchor="end"
      x={-10}
      y={height/2}
      dy=".35em"
    >
      {index}
    </text>

    <rect
      x={0}
      y={yScale(0)}
      width={xScale(amount)}
      height={height/2}
    />

    <text
      text-anchor="start"
      x={xScale(amount)}
      dx="10"
      y={height/2}
      dy=".35em"
    >
    {amount}
    </text>
  </g>
</svg>

<style>
</style>
