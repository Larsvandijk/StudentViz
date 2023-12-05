<script>
  import {
    selectedEducation,
    selectedLivingSituation,
    studentGrant,
  } from "./stores";
  // 466.69 uni uit
  // 121.33
  // 99.94 thuis mbo
  // 490.46

  $: if (
    $selectedEducation === "University of applied science" ||
    $selectedEducation === "University"
  ) {
    if ($selectedLivingSituation === "Living at home") $studentGrant = 121.33;
    if ($selectedLivingSituation === "Living away from home")
      $studentGrant = 466.69;
  } else if ($selectedEducation === "Secondary vocational education") {
    if ($selectedLivingSituation === "Living at home") $studentGrant = 99.94;
    if ($selectedLivingSituation === "Living away from home")
      $studentGrant = 490.46;
  }

  let radioValue = "receive";

  function onChange(event) {
    radioValue = event.currentTarget.value;
    if (radioValue === "notReceive") $studentGrant = 0;
    else if (radioValue === "receive") {
      let tempEdu = $selectedEducation;
      let tempLiv = $selectedLivingSituation;
      $selectedEducation = "";
      $selectedEducation = tempEdu;
      $selectedLivingSituation = "";
      $selectedLivingSituation = tempLiv;
    }
  }
</script>

<div class="studiefinanciering">
  <h2>Student Grant</h2>
  <label
    ><input
      on:change={onChange}
      type="radio"
      name="rdo"
      value="receive"
      checked={radioValue === "receive"}
    /> I do receive a student grant</label
  >
  <label
    ><input
      on:change={onChange}
      type="radio"
      name="rdo"
      value="notReceive"
      checked={radioValue === "notReceive"}
    /> I do not receive a student grant</label
  >

  <label for="studylevel">Choose your education level:</label>
  <select
    disabled={radioValue == "notReceive"}
    bind:value={$selectedEducation}
    name="Educational Level"
    id="studylevel"
  >
    <option value="Secondary vocational education"
      >Secondary vocational education (MBO)</option
    >
    <option value="University of applied science"
      >University of applied science (HBO)</option
    >
    <option value="University">University (WO)</option>
  </select>

  <label for="livingsituation">Choose your living situation:</label>
  <select
    disabled={radioValue == "notReceive"}
    bind:value={$selectedLivingSituation}
    name="Living situation"
    id="livingsituation"
  >
    <option value="Living at home">I live at my own registered adress</option>
    <option value="Living away from home">I do not live at my own registered adress</option>
  </select>

  {#if radioValue === "receive"}
    <p>
      A student with education <strong>"{$selectedEducation}"</strong> and
      living situation <strong>"{$selectedLivingSituation}"</strong> is entitled
      to a studdent grant of €{$studentGrant}
    </p>
  {:else}
    <p>
      <s>
        A student with education <strong>"{$selectedEducation}"</strong> and
        living situation <strong>"{$selectedLivingSituation}"</strong> is
        entitled to a studdent grant of €{$studentGrant}
      </s>
    </p>
  {/if}
</div>

<style>
  .studiefinanciering {
    border: 1px solid black;
    width: 400px;
  }

  p {
    width: 100%;
  }
</style>
