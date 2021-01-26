<template>
	<div 
		class="user myhover"
		v-bind:class="{ selected: selected }"
		@click="$emit('select-chat', user)"
		v-if="IsUser || IsGroup"
	>
		<div class="img">
			<img class="user-img" :src="user.img_link" alt="">
		</div>
		<div class="description" v-bind:class="{ myhover: !selected }">
			<div class="name_last_message" v-bind:class="{ myhover: !selected }">
				<div class="user_name" v-bind:class="{ myhover: !selected }">
					<p class="name" v-bind:class="{ myhover: !selected }">
						{{ user.name }} <span>{{ user.time }}</span>
					</p>
				</div>
				<div class="last_message_and_count" v-bind:class="{ myhover: !selected }">
					<div class="user_last_message" v-bind:class="{ weight_bold: fromviod, myhover: !selected }">
						<span v-show="user.from.length > 0" class="from">{{ user.from }}: </span>
						{{ user.text }}
					</div>
				</div>
			</div>
			<div class="count" v-if="user.count > 0" v-bind:class="{ myhover: !selected }">
				<span>{{ user.count }}</span>
			</div>
		</div>	
	</div>
</template>

<script>
export default {
	props: {
		selectedId: {
			type: Number
		},
		selected: {
			type: Boolean
		},
		fromviod: {
			type: Boolean
		},
		IsUser: {
			type: Boolean
		},
		IsConv: {
			type: Boolean
		},
		IsGroup: {
			type: Boolean
		},
		user: {
			type: Object,
			required: true
		}
	}
}
</script>