<script>
  import * as d3 from "d3";
  export let data;

  const width = 928;
  const height = 500;

  const pie = d3.pie()
		.sort(null)
		.value(d => d.value);
</script>

<svg />

<style>
</style>
