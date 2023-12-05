<script>
  import * as d3 from "d3";
  export let data;
  export let totalDebtNoInterest;

  let interestPaid =
    (data.data.length - 1) * data.monthlyRepayment - totalDebtNoInterest;

  let residu = Math.abs(data.data[data.data.length - 1].amount);
  const width = 100;
  const height = 100;
  const margin = 0;

  let radius = Math.min(width, height) / 2 - margin;

  const dataDougnut = {
    interest: interestPaid,
    amortization: totalDebtNoInterest,
  };
  console.log(dataDougnut);

  const color = d3
    .scaleOrdinal()
    .domain(["Amortization", "Interest"])
    .range(d3.schemePaired);
    
    

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

  // svg.append("svg:text")
  //   .attr("dy", ".35em")
  //   .attr("text-anchor", "middle")
  //   .attr("style","font-family:Ubuntu")
  //   .attr("font-size","40")
  //   .attr("fill","#5CB85C")
  //   .text("60%");
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
    {/each}
    <text
      text-anchor="middle"
      font-size="13"
      font-weight="bold"
      y="-5"
    >
      Total <tspan text-anchor="middle" y="12" x="-2"
        >€{Math.round(interestPaid + totalDebtNoInterest - residu)}</tspan
      >
    </text>
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
