<template>
	<div id="myAccs">
		<Account
			v-for="Acc in Accs_users"
			v-bind:Acc="Acc"
			@select-accs="select_accs"
		/>
		<div class="acAvatar">
			<div class="add myhover" @click="$emit('add-acount')">
				<i class="fas fa-plus myhover"></i>
			</div>
		</div>
		<ThreeDots
			@three-dots="Threedots"
			v-click-outside="ClickOut"
		/>
	</div>
</template>

<script>
	import ThreeDots from '@/components/ThreeDots'
	import Account from '@/components/Account'
	export default {
		name: 'Accs',
		props: ['Accs_users'],
		components: {
			ThreeDots,
			Account
		},
		methods: {
			Threedots(){
				this.$emit('settings');
			},
			ClickOut(){
				this.$emit('click-out');
			},
			select_accs(Acc_id){
				this.$emit('select-accs', Acc_id);
			}
		}
	}
</script>