<script>
  export let colour;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<div class="colour" style="background-color:{colour}"></div>

<style>
  .colour {
    width: 20px;
    height: 20px;
  }


</style>
