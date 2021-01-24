<template>
	<ul class="left_list">
		<settings_menu_item
			v-for="item of settings_menu_items"
			:item="item"
			@settings-acount="Settings_acount"
			@settings-general="Settings_general"
			@settings-avatars="Settings_avatars"
			@settings-menu-select="Select(item)"
		/>
	</ul>
</template>

<script>
	import settings_menu_item from '@/components/settings_menu_item'
	export default {
		props: ['settings_menu_items'],
		components: {
			settings_menu_item
		},
		methods: {
			Settings_acount(){
				// console.log('Settings_acount')
			},
			Settings_general(){
				// console.log('Settings_general')
			},
			Settings_avatars(){
				// console.log('Settings_avatars')
			},
			Select(item){
				this.$emit('settings-menu-select', item);
			}
		}
	}
</script>