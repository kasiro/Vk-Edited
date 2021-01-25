<template>
	<li class="menu_list_item myhover" @click="$emit(item.event)">
		<i :class="item.icon"></i>
		{{ item.name }}
	</li>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: true
			}
		}
	}
</script>