<template>
	<div id="header">
		<div class="chat-header-user">
			<figure class="avatar img">
				<img src="../assets/3.jpg" class="rounded-circle">
			</figure>
			<div>
				<h5 class="name weight_bold">Кто то</h5>
				<small class="status">
					<i>Печатает...</i>
				</small>
			</div>
		</div>
		<div class="chat-header-action">
			<ThreeDots
				@three-dots="ThreeDots"
			/>
		</div>
	</div>
</template>

<script>
	import ThreeDots from '@/components/ThreeDots'
	export default {
		components: {
			ThreeDots
		},
		methods: {
			ThreeDots(){
				this.$emit('three-dots-header');
			}
		}
	}
</script>