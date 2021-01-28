<template>
<div id="users">
	<User
		v-for="user in users"
		:selected="user.selected"
		:isOnline="user.online"
		:online_type="user.online_type"
		:fromviod="user.from.length == 0"
		:IsUser="user.type == 'user' || user.type == 'group'"
		:IsConv="user.type == 'Conversation'"
		:IsGroup="user.type == 'group'"
		:user="user"
		:selectedId="selectedId"
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