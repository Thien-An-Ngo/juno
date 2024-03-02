<script lang="ts">
	interface $$TextProps {
		size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9x';
		family?: 'sans' | 'serif' | 'mono';
		italic?: boolean;
		weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
		align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
		color?: string;
	}

	const defaultProps: $$TextProps = {
		size: 'base',
		family: 'sans',
		italic: false,
		weight: 'normal',
		align: 'left',
		color: 'text',
	}

	let className:string = '';
	export { className as class };
	export let props: $$TextProps;

	const { size, family, italic, weight, align, color } = {...defaultProps, ...props};
</script>

<span class="text-{size} font-{family} {italic ? 'italic' : ''} font-{weight} text-{align} text-{color} {className}">
	<slot />
</span>