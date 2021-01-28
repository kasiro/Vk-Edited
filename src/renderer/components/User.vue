<template>
	<div 
		class="user myhover"
		:class="{ selected: selected }"
		@click="$emit('select-chat', user)"
		v-if="IsUser || IsGroup"
	>
		<div class="img">
			<img class="user-img" :src="user.img_link" alt="">
			<div class="act" v-if="isOnline">
				<div v-if="online_type == true" class="ActiveStatus comp"></div>
				<div v-else class="ActiveStatus tel">
					<i class="fas fa-mobile-alt"></i>
				</div>
			</div>
		</div>
		<div class="description">
			<div class="name_last_message">
				<div class="user_name">
					<p class="name">
						{{ user.name }} <span>{{ user.time }}</span>
					</p>
				</div>
				<div class="last_message_and_count">
					<div class="user_last_message" :class="{ weight_bold: fromviod, myhover: !selected }">
						<span v-show="user.from.length > 0" class="from">{{ user.from }}: </span>
						{{ user.text }}
					</div>
				</div>
			</div>
			<div class="count" v-if="user.count > 0">
				<span>{{ user.count }}</span>
			</div>
			<div class="unread" v-if="user.unread">
				<div class="ActiveStatus unread"></div>
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
		isOnline: {
			type: Boolean
		},
		online_type: {
			type: Boolean
		},
		user: {
			type: Object,
			required: true
		}
	}
}
</script>