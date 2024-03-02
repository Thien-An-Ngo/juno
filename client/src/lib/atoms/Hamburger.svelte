<script lang="ts">
	import '$lib/assets/stylesheets/hamburgers/hamburgers.scss';

	export let active: boolean = false;

	const handleClick = () => {
		active = !active;
	};
</script>

<button
	class="hamburger hamburger--minus"
	class:is-active={active}
	type="button"
	on:click={handleClick}
>
  <span class="hamburger-box">
    <span class="hamburger-inner"></span>
  </span>
</button>