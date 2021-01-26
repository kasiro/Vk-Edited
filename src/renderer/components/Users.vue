<template>
<div id="users">
	<User
		v-for="user in users"
		v-bind:selected="user.selected"
		v-bind:fromviod="user.from.length == 0"
		v-bind:IsUser="user.type == 'user' || user.type == 'group'"
		v-bind:IsConv="user.type == 'Conversation'"
		v-bind:IsGroup="user.type == 'group'"
		v-bind:user="user"
		v-bind:selectedId="selectedId"
		@select-chat="selectChat(user)"
	/>
	<div class="block-stabilization"></div>
</div>
</template>

<script>
	import User from '@/components/User'
	export default {
		props: ['selectedId', 'users', 'action', 'updates'],
		components: {
			User
		},
		methods: {
			selectChat(user){
				this.$emit('select-chat', user);
			}
		}
	}
</script>