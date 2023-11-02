<script>
  import IncomePage from "./IncomePage.svelte";
  import ExpensesPage from "./ExpensesPage.svelte";
  import Budget from "./budget.svelte";
  import { pageIndex } from "./stores";

  //List of all pages
  const pages = [IncomePage, ExpensesPage, Budget];
</script>

<main>
  <svelte:component this={pages[$pageIndex]} />
</main>

<style>
</style>
