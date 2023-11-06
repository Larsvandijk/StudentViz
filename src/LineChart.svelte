<script>
    import * as d3 from "d3";

    export let data = {};

    const width = 800;
    const height = 600;

    const xScale = d3.scaleLinear()

    const yScale = d3.scaleLinear(
    [0, d3.max(data, (d) => d.close)],
    [height - marginBottom, marginTop]
  );
</script>
