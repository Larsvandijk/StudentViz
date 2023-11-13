<script>
 import { scaleLinear, scaleTime } from "d3-scale";

  export let data;

  const chartWidth = 800;
  const chartHeight = 600;

  const paddings = {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  };

  // $: xScale  =  scaleTime()
  //   .domain(extent(data, (d)  =>  d.date))
  //   .range([0, chartWidth]);

  // $: yScale = scaleLinear().domain().range()

</script>

<svg width={chartWidth} height={chartHeight}>
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
</svg>
