<template>
	<div class="acAvatar">
		<img class="myhover" @click="$emit('select-accs', Acc.id);" :src="Acc.img" alt="">
	</div>
</template>

<script>
	export default {
		props: {
			Acc: {
				type: Object,
				required: true
			}
		}
	}
</script>