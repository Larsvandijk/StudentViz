<script>
  import * as d3 from "d3";
  import { dataCollection } from "./stores";

  export let indentifier;
  export let width, height;
  let brushelement;

  let isBrushing = false;
  let xAxis;

  let maxValue = 10;

  let minimum, maximum;

  const padding = { top: 10, right: 10, bottom: 10, left: 10 };

  $: if (indentifier == "monthlyLoanAmount") {
    maxValue = d3.max($dataCollection, (d) => d.monthlyLoanAmount);
  } else if (indentifier == "monthlyRepayment")
    maxValue = d3.max($dataCollection, (d) => d.monthlyRepayment);
  else if (indentifier == "totalAmountPaid")
    maxValue = d3.max($dataCollection, (d) => d.totalAmountPaid);

  $: xScale = d3.scaleLinear().domain([0, maxValue]).range([0, width - padding.right]);

  $: brush = d3
    .brushX()
    .extent([
      [padding.left, 0],
      [width, height],
    ])
    .on("start", () => (isBrushing = true))
    .on("brush", brush);

  $: if (brushelement) {
    d3.select(brushelement).call(brush);
  }

  $: d3.select(xAxis).call(d3.axisBottom(xScale).ticks(4));

  function brush(e){
    minimum = xScale.invert(e.selection[0] - padding.left)
    maximum = xScale.invert(e.selection[1] - padding.left)
    console.log(minimum, maximum)
  }


  function handlePanLeft(event) {
    var x = left + event.detail.dx;
    if (x > leftmin && x < leftmax) {
      left = x;
      let i = Math.round(xScale(x));
      minx.set(points[i].x);
    }
  }

  function handlePanRight(event) {
    var x = right + event.detail.dx;
    if (x > rightmin && x < rightmax) {
      right = x;
      let i = Math.round(xScale(x));
      maxx.set(points[i].x);
    }
  }
</script>

<svg {width} {height}>
  <g bind:this={xAxis} transform="translate({padding.left},{0})" {width} {height}/>
  <g bind:this={brushelement} {width} {height} />
</svg>

<style>
</style>
