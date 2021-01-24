<template>
	<div class="menu_wrap">
		<div class="settings_menu" style="display: none; opacity: 0;">
			<ul class="menu_list">
				<li class="menu_list_item myhover" @click="$emit('show-settings')">
					<i class="fas fa-cog"></i>
					Настройки
				</li>
				<li class="menu_list_item myhover" @click="$emit('change-theme')">
					<i class="fas fa-moon"></i>
					Тёмная
				</li>
				<!-- <li class="menu_list_item myhover" @click="$emit('change-avatar')">
					<i class="far fa-user-circle"></i>
					Аватарки
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	
</script>