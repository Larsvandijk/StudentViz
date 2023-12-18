<script>
  import * as d3 from "d3";
  export let totalDebtNoInterest;
  export let totalInterestPaid;
  export let totalAmountPaid;
  export let colour;

  const width = 40;
  const height = 40;
  const margin = 0;

  let radius = Math.min(width, height) / 2 - margin;


  const dataDougnut = {
    interest: totalInterestPaid,
    amortization: totalDebtNoInterest,
  };

  const color = d3
    .scaleOrdinal()
    .domain(["Amortization", "Interest"])
    .range([colour.darkColour, colour.lightColour]);
    
    

  // Compute the position of each group on the pie:
  const pie = d3
    .pie()
    .sort(null) // Do not sort group by size
    .value((d) => d[1]);

  // The arc generator
  const arc = d3
    .arc()
    .innerRadius(radius * 0.5) // This is the size of the donut hole
    .outerRadius(radius * 0.8);

  // Another arc that won't be drawn. Just for labels positioning
  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  const data_ready = pie(Object.entries(dataDougnut));

</script>

<div class="container">
  <svg
  {width}
  {height}
  viewBox="{-width / 2}, {-height / 2}, {width}, {height}"
  style:max-width="100%"
  style:height="auto"
>
  <g class="chart-inner">
    {#each data_ready as slice}
      <path d={arc(slice)} fill={color(slice.data[1])} stroke="white" />
      <polyline stroke="black" stroke-width="1" fill="none" points={function(d) {var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        console.log(posA, posB, posC) // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]}}></polyline>
    {/each}
    <!-- <text
      text-anchor="middle"
      font-size="13"
      font-weight="bold"
      y="-5"
    >
      Total <tspan text-anchor="middle" y="12" x="-2"
        >€{Math.round(totalAmountPaid)}</tspan
      >
    </text> -->
  </g>
</svg>
</div>


<style>
  :global(body) {
    margin: 0;
  }

  .container{
    display: flex;
    justify-content: center;
  }
</style>
