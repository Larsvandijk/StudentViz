<script>
  //  import { scaleLinear, scaleTime } from "d3-scale";
  import * as d3 from "d3";

  export let data;

  const chartWidth = 800;
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
    .domain(d3.extent(data, (d) => d.date))
    .range([paddings.left, chartWidth - paddings.right]);

  $: yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.amount)])
    .range([chartHeight - paddings.bottom, paddings.top]);

  $: d3.select(yAxis).call(d3.axisLeft(yScale));
  $: d3.select(xAxis).call(d3.axisBottom(xScale));

  const idContainer = "svg-container";
  let mousePosition = { x: null, y: null };
  function followMouse(event) {
    const svg = document.getElementById(idContainer);
    if (svg === null) return;
    const dim = svg.getBoundingClientRect();
    const positionInSVG = {
      x: event.clientX - dim.left,
      y: event.clientY - dim.top,
    };
    mousePosition =
      positionInSVG.x > paddings.left &&
      positionInSVG.x < chartWidth - paddings.right &&
      positionInSVG.y > paddings.top &&
      positionInSVG.y < chartHeight - paddings.bottom
        ? { x: positionInSVG.x, y: positionInSVG.y }
        : { x: null, y: null };
        // console.log(positionInSVG)
  }
  function removePointer() {
    mousePosition = { x: null, y: null };
  }
  function computeSelectedXValue(value) {
    return data.filter((d) => xScale(d[xVar]) >= value)[0][xVar];
  }
</script>

<svg
  class="graph"
  id="svg-container"
  width={chartWidth}
  height={chartHeight}
  on:mousemove={followMouse}
  on:mouseleave={removePointer}
>
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

  <path />

  <!-- ALL DATA POINTS -->
  <g>
    {#each data as point, i}
      {#if i != data.length - 1}
        <line
          x1={xScale(point.date)}
          x2={xScale(data[i + 1].date)}
          y1={yScale(point.amount)}
          y2={yScale(data[i + 1].amount)}
          stroke="black"
          stroke-width="2"
        />
      {/if}
    {/each}
  </g>
</svg>
