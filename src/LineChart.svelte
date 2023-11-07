<script>
    import * as d3 from "d3";

    export let data = {};

    const width = 800;
    const height = 600;

    const padding = { top: 20, right: 15, bottom: 20, left: 25 };

    $: xScale = d3.scaleTime().domain().range([0, width])

    $: yScale = d3.scaleLinear(
    [0, d3.max(data, (d) => d.close)],
    [height - marginBottom, marginTop]
  );
</script>
