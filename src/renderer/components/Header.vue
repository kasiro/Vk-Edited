<template>
	<div id="header">
		<div class="chat-header-user myhover">
			<figure class="avatar img" @click.right="onRightClick">
				<img
					src="../assets/3.jpg"
					class="rounded-circle myhover"
				>
			</figure>
			<div>
				<h5 class="name weight_bold">Кто то</h5>
				<small class="status">
					<i>{{ status }}</i>
				</small>
			</div>
		</div>
		<div class="chat-header-action">
			<ThreeDots
				@three-dots="ThreeDots"
				v-click-outside="ClickOut"
			/>
		</div>
	</div>
</template>

<script>
	import ThreeDots from '@/components/ThreeDots'
	export default {
		props: ['status'],
		components: {
			ThreeDots
		},
		methods: {
			ThreeDots(){
				this.$emit('three-dots-header');
			},
			onRightClick(){
				console.log('onRightClick');
			},
			ClickOut(){
				this.$emit('ClickOut')
			}
		}
	}
</script>