<script>
  //  import { scaleLinear, scaleTime } from "d3-scale";
  import * as d3 from "d3";
  import { dataCollection, allDataForAxes } from "./stores";

  export let data;

  const chartWidth = 600;
  const chartHeight = 400;

  let xAxis;
  let yAxis;

  const paddings = {
    top: 50,
    left: 100,
    right: 50,
    bottom: 50,
  };

  $: xScale = d3
    .scaleTime()
    .domain(d3.extent($allDataForAxes, (d) => d.date))
    .range([paddings.left, chartWidth - paddings.right]);

  $: yScale = d3
    .scaleLinear()
    .domain([0, d3.max($allDataForAxes, (d) => d.amount)])
    .range([chartHeight - paddings.bottom, paddings.top]);

  $: d3.select(yAxis).call(d3.axisLeft(yScale));
  $: d3.select(xAxis).call(d3.axisBottom(xScale));

  $: line = d3
    .line()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d.amount));
</script>

<svg class="graph" id="svg-container" width={chartWidth} height={chartHeight}>
  <!-- X AND Y SCALE LINES -->
  <g>
    <line
      x1={paddings.left}
      x2={chartWidth - paddings.right}
      y1={chartHeight - paddings.bottom}
      y2={chartHeight - paddings.bottom}
      stroke="black"
      stroke-width="2"
    />
    <line
      x1={paddings.left}
      x2={paddings.left}
      y1={paddings.top}
      y2={chartHeight - paddings.bottom}
      stroke="black"
      stroke-width="2"
    />
  </g>

  <!-- x AND Y AXES -->
  <g
    bind:this={xAxis}
    transform="translate(0,{chartHeight - paddings.bottom})"
  />
  <g bind:this={yAxis} transform="translate({paddings.left},0)" />

  <!-- AXIS LABELS -->
  <g>
    <text x={paddings.left} y={chartHeight} text-anchor="middle">Time</text>
    <text
      x="0"
      y="150"
      transform="rotate(-90 20,130)"
      alignment-baseline="middle">Total Debt</text
    >
  </g>

  <!-- Path of movable line -->
  <path fill="none" stroke="black" stroke-width="1.5" d={line(data)} />

  <!-- Paths of all data collections lines -->
  {#each $dataCollection as datagroup, i}
    <path
      fill="none"
      stroke={datagroup.colour.colourName}
      stroke-width="2"
      d={line(datagroup.data)}
    />
    <!-- Legend of all lines -->
    <g transform="translate({chartWidth - paddings.right - 50}, {60 + i*12})">
      <text font-size="10px">{i+1}</text>
      <rect transform="translate(10, -7)" width = 20 height=5 fill={datagroup.colour.colourName}></rect>
    </g>
  {/each}
</svg>
