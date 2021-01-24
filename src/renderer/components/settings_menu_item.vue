<template>
	<li
	class="list_item myhover"
	:class="{ select: item.isSelect}"
	@click="$emit(item.event);$emit('settings-menu-select', item)"
	>
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