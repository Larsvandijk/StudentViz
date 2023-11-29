<script>
  import * as d3 from "d3";
  import { interestRateYearly, dataCollection } from "./stores";
  import { get } from "svelte/store";

  export let data;

  $: $interestRateYearly = Math.round(yScale.invert(y) * 100) / 100;

  const chartWidth = 400;
  const chartHeight = 400;

  let xAxis;
  let yAxis;

  let y = 300;
  let draggable = false;

  const paddings = {
    top: 50,
    left: 100,
    right: 50,
    bottom: 50,
  };

  let parseDate = d3.timeParse("%Y");
  data.forEach(function (d) {
    d.year = parseDate(d.year);
  });

  $: xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.year))
    .range([paddings.left, chartWidth - paddings.right]);

  $: yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.interest)])
    .range([chartHeight - paddings.bottom, paddings.top]);

  $: d3.select(yAxis).call(d3.axisLeft(yScale));
  $: d3.select(xAxis).call(d3.axisBottom(xScale).ticks(7));

  // FOLLOWING MOUSE MOVEMENT
  const idContainer = "interest-container";
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
    if (draggable && mousePosition.y != null) y = mousePosition.y;
  }

  function removePointer() {
    mousePosition = { x: null, y: null };
  }

  function handleDragLeave() {
    // console.log("Drag leave");
    // draggable = false;
  }

  function handleDrag(event, d) {
    // y = event.y;
    // console.log(event);
    // y += event.dy
    // console.log(event);
    // let x = d3.event.dx;
    // let y = d3.event.dy;

    // let line = d3.select(this);

    // // Update the line properties
    // let attributes = {
    //   // x1: parseInt(line.attr('x1')) + x,
    //   y1: parseInt(line.attr("y1")) + y,

    //   // x2: parseInt(line.attr('x2')) + x,
    //   y2: parseInt(line.attr("y2")) + y,
    // };

    // line.attr(attributes);
    followMouse(event);
    if (mousePosition.y != null) y = mousePosition.y;
    // let container = d3.select(".grabbable");
    // container.attr("transform", "translate(0, " + mousePosition.y + ")");
  }

  function handleDragStart() {
    // console.log("drag start");
    // draggable = true;
  }

  // var drag = d3.drag().on("drag", handleDrag);

  // let line = d3.select(".draggable");
  // line.call(drag);
</script>

<div class="container">
  <h2>Interest Explorer</h2>

  <label class="topdown"
    >Interest Rate<input
      bind:value={$interestRateYearly}
      class="topdown"
      type="number"
    /></label
  >

  <svg
    class="graph"
    id="interest-container"
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
        alignment-baseline="middle">Yearly Interest %</text
      >
    </g>

    <path />

    <!-- ALL DATA POINTS -->
    <g>
      {#each data as point, i}
        {#if i != data.length - 1}
          <line
            x1={xScale(point.year)}
            x2={xScale(data[i + 1].year)}
            y1={yScale(point.interest)}
            y2={yScale(data[i + 1].interest)}
            stroke="black"
            stroke-width="2"
          />
        {/if}
      {/each}
    </g>

    <!-- Movable line -->

    <line
      x1={paddings.left}
      x2={chartWidth - paddings.right}
      y1={y}
      y2={y}
      stroke="black"
      stroke-width="2"
    />

    <line
      class="grabbable"
      on:dragstart={handleDragStart}
      on:drag={handleDrag}
      on:dragend={handleDragLeave}
      x1={paddings.left}
      x2={chartWidth - paddings.right}
      y1={y}
      y2={y}
      stroke-width="20"
      stroke="black"
      stroke-opacity="0"
    />

    <!-- HERE NEW INTEREST LINES -->
    {#each $dataCollection as datagroup, i}
      <line
        x1={paddings.left}
        x2={chartWidth - paddings.right}
        y1={yScale(datagroup.interest)}
        y2={yScale(datagroup.interest)}
        stroke-width="2"
        stroke={datagroup.colour}
      />
    {/each}
  </svg>
</div>

<style>
  svg text {
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  svg text::selection {
    pointer-events: none;
    background: none;
  }

  text {
    user-select: none;
  }

  .grabbable {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }

  /* (Optional) Apply a "closed-hand" cursor during drag operation. */
  .grabbable:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

  .container{
    display: flex;
    flex-direction: column;
  }
</style>
