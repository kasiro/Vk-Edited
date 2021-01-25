<template>
	<div class="settings_menu" style="display: none; opacity: 0;">
		<ul class="menu_list">
			<menu_item
				v-for="item of items"
				v-bind:item="item"
				@show-settings="Settings"
				@change-theme="change_theme"
			/>
		</ul>
	</div>
</template>

<script>
	import menu_item from '@/components/menu_item'
	export default {
		props: ['items'],
		components: {
			menu_item
		},
		methods: {
			Settings(){
				this.$emit('show-settings');
			},
			change_theme(){
				this.$emit('change-theme');
			}
		}
	}
</script>