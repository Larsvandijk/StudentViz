<script>
  import Colour from "./Colour.svelte";
  export let data;
</script>

<tr>
    <td></td>
  <td><Colour colour={data.colour}></Colour></td>
</tr>
