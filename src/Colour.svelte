<script>
  export let colour;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<div class="container">
  <div class="colour" style="background-color:{colour.colourName}"></div>
    {capitalizeFirstLetter(colour.colourName)}
</div>

<style>
  .colour {
    width: 20px;
    height: 20px;
  }

  .container{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
