<script>
	import Logo from '$lib/assets/static/VictoryAn_logo.svg'
	import { Text } from '$lib/atoms';
	export let name = 'JunoGains';
</script>

<a href="/" class="flex flex-row">
	<img src="{Logo}" alt="VA" class="w-10 h-10">
	<Text class="align-middle" props={{
		weight: 'semibold',
		size: 'xl',
		align: 'center',
	}}>{name}</Text>
</a>