<template>
	<div id="myAccs">
		<div class="acAvatar">
			<img class="myhover" src="../assets/1.jpg" alt="">
		</div>
		<div class="acAvatar">
			<img class="myhover" src="../assets/4.jpg" alt="">
		</div>
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
	export default {
		components: {
			ThreeDots
		},
		methods: {
			Threedots(){
				this.$emit('settings');
			},
			ClickOut(){
				this.$emit('click-out');
			}
		}
	}
</script>