<script lang="ts">
	import '../app.css'
	import { Nav } from '$lib/molecules';
	import Logo from '$lib/assets/static/VictoryAn_logo.svg';
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="{Logo}">
	<title>
		Juno
	</title>
</svelte:head>

<Nav>
</Nav>
<slot />
