<script>
  import * as d3 from "d3";

  export let totalInterestPaid;
  export let totalAmountPaid;
  export let colour;

  const width = 150;
  const height = 30;

  const paddings = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  };

  $: yScale = d3.scaleBand().range([height - paddings.bottom, paddings.top]);
</script>

<svg {width} {height}>
  <rect
    x={paddings.left}
    y={yScale(0)}
    width={width}
    {height}
    fill={"#d3d3d3"}
  />

  <rect
    x={paddings.left}
    y={yScale(0)}
    width={(totalInterestPaid / totalAmountPaid) * (width - paddings.left)}
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
  {Number(totalInterestPaid / totalAmountPaid).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  })}
  </text>


    
</svg
>
