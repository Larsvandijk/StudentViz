<script>
  import * as d3 from "d3";
  import {
    interestRateYearly,
    dataCollection,
    interestHistory,
  } from "./stores";
  import { onDestroy, onMount } from "svelte";
  export let data;

  let copy;
  $: $interestRateYearly = Math.round(yScale.invert(y) * 100) / 100;

  const chartWidth = 300;
  const chartHeight = 300;

  let xAxis;
  let yAxis;

  let y = 157;

  let draggable = false;

  const paddings = {
    top: 25,
    left: 50,
    right: 25,
    bottom: 50,
  };

  // Change the years in the store from year in strings to date objects
  let parseDate = d3.timeParse("%Y");
  data.forEach(function (d) {
    if (!(d.year instanceof Date)) d.year = parseDate(d.year);
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

  const unsubscribe = interestRateYearly.subscribe((value) => {
    copy = 225 - value * (225 / 6.09) + 25;
  });

  $: y = copy;

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
    draggable = false;
  }

  function handleDrag(event, d) {
    followMouse(event);
    if (mousePosition.y != null) y = mousePosition.y;
  }

  function handleDragStart() {
    draggable = true;
  }
</script>

<div class="container">
  <h3>Interest Explorer</h3>
  <input bind:value={$interestRateYearly} class="topdown" type="number" />

  <svg
    class="graph"
    id="interest-container"
    width={chartWidth}
    height={chartHeight}
    on:mousemove={followMouse}
    on:mouseleave={removePointer}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 {y} 25 25"
      width="25px"
      height="25px"
      ><path
        style="fill:#232326"
        d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
        data-name="Left"
      /></svg
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
        x="50"
        y="15"
        transform="rotate(270) translate(-200, 0)"
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

    <g transform="translate(200, {y - 16})"
    >
      <path
      style="transform: scale(0.5)"
        d="M29 35v13.6l-2.8-3.1-4.4 4L32 61l10.2-11.5-4.4-4-2.8 3.1V35m0-6V15.4l2.8 3.1 4.4-4L32 3 21.8 14.5l4.4 4 2.8-3.1V29"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke="#202020"
        fill="none"
        data-name="layer2"
        stroke-linejoin="round"
      />
      <path
      style= "transform: scale(0.5)"
      class="arrow"
        d="M6 29h52v6H6z"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke="#202020"
        fill="none"
        data-name="layer1"
        stroke-linejoin="round"
      />
    </g>

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
        stroke-width="3"
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

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 100px;
  }
</style>
