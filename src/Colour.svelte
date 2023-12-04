<script>
  export let colour;
</script>

<div class="container">
  <div class="colour" style="background-color:{colour}"></div>
  {colour}
</div>

<style>
  .colour {
    width: 20px;
    height: 20px;
  }

  .container{
    display: flex;
    flex-direction: row;
    justify-content: left;
  }
</style>
