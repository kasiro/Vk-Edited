<template>
	<div id="app" data-mode="dark">
		<div id="placeholder" style="cursor: default;">
			<div class="plase_mini">
				<div class="sync_icon">
					<i class="fas fa-spin fa-sync-alt"></i>
				</div>
				<div class="text">Данные загружаются</div>
			</div>
		</div>
		<div class="addAcount_" style="display: none;">
			<form class="form bg round-15">
				<div class="first">
					<div class="text">token: </div>
					<input
						type="text"
						v-model="token_text"
						class="search feild"
					>
				</div>
				<div
					class="save_tok myhover"
					@click="add_token"
				>
					<div class="text myhover">Добавить token</div>
				</div>
				<div class="close_two">
					<div class="close_form">
						<i class="fas fa-times myhover" @click="Close_token()"></i>
					</div>
				</div>
			</form>
		</div>
		<div class="menu_wrap">
			<Main_menu
				v-bind:items="items"
				@show-settings="Settings"
				@change-theme="change_theme"
			/>
		</div>
		<div class="hider" style="display: none;"></div>
		<div class="settings" style="display: none;">
			<span class="setText weight_bold">Настройки</span>
			<div class="settings_close">
				<i class="fas fa-times myhover" @click="Close_settings()"></i>
			</div>
			<div class="bar"></div>
			<div class="settings_panel">
				<settings_menu
					@settings-menu-select="settings_menu_select"
					:settings_menu_items="settings_menu_items"
				/>
				<div class="hr"></div>
			</div>
		</div>
		<Accs
			@add-acount="addAcount"
			@settings="Settings_menu"
			@click-out="Settings_menu_close"
			@select-accs="select_accs"
			v-bind:Accs_users="Accs_users"
		/>
		<div class="list">
			<labelSearch
				@search="Search"
				@search-ClickOut="Search_ClickOut"
				@search-click="Search_Click"
				@search-enter="search_enter"
			/>
			<Users
				v-bind:users="users"
				@select-chat="selectChat"
			/>
		</div>
		<div class="list2_wrap">
			<div class="list2">
				<div class="banner">
					<div class="text weight_bold">Выберете Диалог</div>
				</div>
				<Header
					class="hidden"
					@three-dots-header="HeaderUserDots"
				/>
				<div class="header_menu_wrap">
					<Main_menu
						v-bind:items="Header_items"
						@show-settings="Settings"
						@change-theme="change_theme"
					/>
				</div>
				<!-- <Chat />
				<Sender /> -->
			</div>
		</div>
	</div>
</template>

<script>
	import Accs from '@/components/Accs'
	import labelSearch from '@/components/labelSearch'
	import Users from '@/components/Users'
	import Header from '@/components/Header'
	import Main_menu from '@/components/menu'
	import settings_menu from '@/components/settings_menu'
	// import Chat from '@/components/Chat'
	// import Sender from '@/components/Sender'
	import VK from 'vk-api-help'
	// import token from 'raw-loader!./token.txt'
	import fs from 'fs'
	export default {
		name: 'general',
		components: {
			Accs,
			labelSearch,
			Users,
			Header,
			Main_menu,
			settings_menu
		},
		data() {
			return {
				selectedId: 0,
				Active_token: '',
				users: [],
				items: [
					{
						name: 'Настройки',
						icon: 'fas fa-cog',
						event: 'show-settings'
					},
					{
						name: 'Тёмная',
						icon: 'fas fa-moon',
						event: 'change-theme'
					}
				],
				Header_items: [
					{
						name: 'Аккаунт',
						icon: 'far fa-user-circle',
						event: 'show-acount'
					},
					{
						name: 'Отключить уведомления',
						icon: 'far fa-bell',
						event: 'notify-off'
					}
				],
				token_text: '',
				Accs_users: [],
				Avatars_json: [],
				settings_menu_items: [
					{
						isSelect: true,
						name: 'Аккаунт',
						icon: 'far fa-user-circle',
						event: 'settings-acount'
					},
					{
						isSelect: false,
						name: 'Основное',
						icon: 'fas fa-cog',
						event: 'settings-general'
					},
					{
						isSelect: false,
						name: 'Аватарки',
						icon: 'fas fa-user-circle',
						event: 'settings-avatars'
					}
				],
				Search_action: 'open',
				Search_action_last: 'SearchOut',
				settings_menu: 'open',
				settings_menu_last: 'open',
				header_settings_menu: 'open',
				header_settings_menu_last: 'open',
				updates: true
			}
		},
		created(){
			console.log('created');
			const token = this.getToken();
			var vk = new VK.VkRequest(token)
			var loadmessages = true;
			if (loadmessages === true){
				this.load_chats();
			}
		},
		async mounted() {
			console.log('mounted');
			this.Avatars_json = this.loadJson('Avatars.json');
			setInterval(() => {
				if (this.updates){
					this.update_chats();
				}
			}, 5000);
			
			var preloadAvatar = true;
			if (preloadAvatar === true){
				var users_json = this.loadJson('users.json');
				var arr = [];
				global.arr;
				if (users_json.length > 0){
					if (users_json.length > 1){
						for (var i = 0; i < users_json.length; i++){
							var el = users_json[i];
							
							this.Active_token = el.token;
							var vk = new VK.VkRequest(this.Active_token)
							await vk.method('users.get', { fields: 'photo_200, id' }).then((json) => {
								var user = json.response[0];
								global.arr;
								if (this.avatarFilter(user.id) !== false){
									arr.push({
										img: this.avatarFilter(user.id),
										id: user.id,
										token: this.Active_token
									});
								} else {
									arr.push({
										img: user.photo_200,
										id: user.id,
										token: this.Active_token
									});
								}
							}).catch({ name: 'VkApiError' }, error => {
								console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
								switch(error.error_code) {
										case 14:
												console.log('Captcha error');
										break;  
										case 5:
												console.log('No auth');
										break;
										default:
											console.log(error.error_msg);
								}
							}).catch(error => {
								console.log(`Other error ${error}`);
							});
						}
						// console.log('arr:', arr);
					} else {
						this.Active_token = users_json[0].token;
						var vk = new VK.VkRequest(this.Active_token)
						await vk.method('users.get', { fields: 'photo_200, id' }).then((json) => {
							var user = json.response[0];
							global.arr;
							if (this.avatarFilter(user.id) !== false){
								arr.push({
									img: this.avatarFilter(user.id),
									id: user.id,
									token: this.Active_token
								});
							} else {
								arr.push({
									img: user.photo_200,
									id: user.id,
									token: this.Active_token
								});
							}
						}).catch({ name: 'VkApiError' }, error => {
							console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
							switch(error.error_code) {
									case 14:
											console.log('Captcha error');
									break;  
									case 5:
											console.log('No auth');
									break;
									default:
										console.log(error.error_msg);
							}
						}).catch(error => {
							console.log(`Other error ${error}`);
						});
					}
				} else {
					document.querySelector('.add.myhover').click();
					document.querySelector('.hider').style.display = 'block';
					document.querySelector('.hider').style.background = '#212121';
					document.querySelector('.hider').style.opacity = 1;
					this.hidePlaceholder();
				}
			}
			this.Active_token = '';
			this.getToken();
			this.Accs_users = arr;
			console.log(this.Accs_users);
		},
		methods: {
			loaded(){
				var time = '0.5s';
				var avs = document.querySelectorAll('[class="acAvatar"]');
				if (avs.length > 1){
					var ot = 10;
					var p = 50;
					var i = 1;
					for (let av of avs){
						av.setAttribute("style", "margin-top: " + ot + `px; transition: ${time};`);
						ot += p;
						i++;
					}
				} else {
					var ot = 10;
					avs[0].setAttribute("style", "margin-top: " + ot + `px; transition: ${time};`);
				}
			},
			Close_token(){
				document.querySelector('.addAcount_').style.display = 'none';
			},
			addAcount() {
				document.querySelector('.addAcount_').style.display = 'flex';
			},
			addAvatarRemove(obj){
				
			},
			add_token() {
				if (this.token_text.length > 0){
					var text = this.token_text;
					var json = this.loadJson('users.json');
					var exist = false;
					for (var el of json){
						if (el.token == text){
							var exist = true;
							break;
						}
					}
					if (exist == false){
						this.token_text = '';
						json.push({
							token: text
						});
						this.saveJson('users.json', json);
						window.location.reload();
					} else {

					}
				}
			},
			avatarFilter(id){
				if (this.Avatars_json.length == 0){
					var json = this.loadJson('Avatars.json');
					for (var el of json){
						if (el.id == id){
							if (el.use == true){
								return el.img;
							}
						}
					}
					return false;
				} else {
					var json = this.Avatars_json;
					for (var el of json){
						if (el.id == id){
							if (el.use == true){
								return el.img;
							}
						}
					}
					return false;
				}
			},
			select_accs(user_id){
				var banner = document.querySelector('.banner');
				if (this.in_array('hidden', banner.classList)){
					banner.classList.remove('hidden');
				}
				var header = document.querySelector('#header');
				if (!this.in_array('hidden', header.classList)){
					header.classList.add('hidden');
				}
				var Accs = this.Accs_users;
				for (var el of Accs){
					if (el.id == user_id){
						this.Active_token = el.token;
					}
				}
				this.load_chats();
				this.selectedId = 0;
				// console.log(user_id, this.Active_token);
			},
			loadJson(filename){
				return JSON.parse(fs.readFileSync(__dirname + '/' + filename, 'utf8'));
			},
			saveJson(filename, data){
				fs.writeFileSync(__dirname + '/' + filename, JSON.stringify(data, null, '\t'));
			},
			getToken(){
				if (this.Active_token.length == 0){
					var json = this.loadJson('users.json');
					this.Active_token = json[0].token;
				}
				return this.Active_token;
			},
			settings_menu_select(item){
				for (var settings_menu_item of this.settings_menu_items){
					if (settings_menu_item.isSelect == true){
						settings_menu_item.isSelect = false;
					}
				}
				for (var settings_menu_item of this.settings_menu_items){
					if (item.isSelect == false){
						if (item.name == settings_menu_item.name){
							settings_menu_item.isSelect = true;
						}
					}
				}
			},
			Close_settings(){
				document.querySelector('.hider').style.display = 'none';
				document.querySelector('.settings').style.display = 'none';
				// this.saveJson('Avatars.json', this.Avatars_json);
			},
			search_enter(text){
				console.log(text)
				// this.VkMethod('messages.searchConversations', {
				// 	q: text,
				// 	count: 100,
				// 	extended: 1,
				// 	fields: 'photo_200, id, first_name, last_name'
				// }, (json) => {

				// });
			},
			change_theme() {
				this.settings_menu_last = 'menu_list_item';
				setTimeout(() => {
					this.settings_menu_last = 'menu';
				}, 500);
				if (document.querySelector('#app').getAttribute('data-mode') == 'dark'){
					document.querySelector('.menu_list_item:nth-of-type(2) i').classList.remove('fas');
					document.querySelector('.menu_list_item:nth-of-type(2) i').classList.add('far');
					document.querySelector('.menu_list_item:nth-of-type(2)').childNodes[1].data = 'Светлая';
					document.querySelector('#app').setAttribute('data-mode', 'light');
				} else {
					document.querySelector('.menu_list_item:nth-of-type(2) i').classList.remove('far');
					document.querySelector('.menu_list_item:nth-of-type(2) i').classList.add('fas');
					document.querySelector('.menu_list_item:nth-of-type(2)').childNodes[1].data = 'Тёмная';
					document.querySelector('#app').setAttribute('data-mode', 'dark');
				}
			},
			change_avatar(){
				this.settings_menu_last = 'menu_list_item';
				setTimeout(() => {
					this.settings_menu_last = 'menu';
				}, 500);
			},
			Settings(){
				// this.settings_menu_last = 'menu_list_item';
				// setTimeout(() => {
				// 	this.settings_menu_last = 'menu';
				// }, 500);
				document.querySelector('.hider').style.display = 'block';
				document.querySelector('.hider').style.opacity = 0.3;
				document.querySelector('.settings').style.display = 'flex';
			},
			Settings_menu_close(){
				// v-click-outside="Settings_menu_close"
				if (this.settings_menu == 'close' && this.settings_menu_last != 'menu_list_item'){
					var settings_menu = document.querySelector('.menu_wrap .settings_menu');
					settings_menu.style.opacity = 0;
					settings_menu.style.display = 'none';
					this.settings_menu = 'open';
				}
			},
			Settings_menu(){
				var settings_menu = document.querySelector('.menu_wrap .settings_menu');
				if (this.settings_menu == 'open'){
					settings_menu.style.display = 'flex';
					settings_menu.style.opacity = 1;
					settings_menu.style.display = 'flex';
					this.settings_menu = 'close';
					this.settings_menu_last = 'menu';
				} else {
					settings_menu.style.opacity = 0;
					settings_menu.style.display = 'none';
					this.settings_menu = 'open';
					this.settings_menu_last = 'menu';
				}
			},
			HeaderUserDots(){
				var settings_menu = document.querySelector('.header_menu_wrap .settings_menu');
				if (this.header_settings_menu == 'open'){
					settings_menu.style.display = 'flex';
					settings_menu.style.opacity = 1;
					settings_menu.style.display = 'flex';
					this.header_settings_menu = 'close';
					this.header_settings_menu_last = 'menu';
					console.log('open menu')
				} else {
					settings_menu.style.opacity = 0;
					settings_menu.style.display = 'none';
					this.header_settings_menu = 'open';
					this.header_settings_menu_last = 'menu';
					console.log('close menu')
				}
			},
			async openChat(user_id){
				var HedAvatar = document.querySelector('.avatar img');
				var HedName = document.querySelector('h5');

				var vk = new VK.VkRequest(this.Active_token);
				await vk.method('users.get', { user_ids: user_id, fields: 'photo_200, first_name, last_name' }).then(json => {
					var User = json.response[0];
					if (this.avatarFilter(user_id) !== false){
						var img_link = this.avatarFilter(user_id);
					} else {
						var img_link = User.photo_200;
					}
					HedAvatar.setAttribute('src', img_link);
					HedName.textContent = `${User.first_name} ${User.last_name}`;
				}).catch({ name: 'VkApiError' }, error => {
					console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
					switch(error.error_code) {
							case 14:
									console.log('Captcha error');
							break;  
							case 5:
									console.log('No auth');
							break;
							default:
								console.log(error.error_msg);
					}
				}).catch(error => {
					console.log(`Other error ${error}`);
				});
				
				// статус онлайна (0|1)
				// Статус времени когда был последний раз в сети (timestamp)
				// this.VkMethod('messages.getLastActivity', { user_ids: user_id }, (json) => {
					
				// });
				var banner = document.querySelector('.banner');
				if (!('hidden' in banner.classList)){
					banner.classList.add('hidden');
				}
				var header = document.querySelector('#header');
				if (this.in_array('hidden', header.classList)){
					header.classList.remove('hidden');
				}
			},
			selectChat(CurUser){
				this.selectedId = CurUser.id;
				this.openChat(this.selectedId);
				for (var TUser of this.users){
					if (TUser.id == CurUser.id){
						TUser.selected = true;
					} else {
						TUser.selected = false;
					}
				}
				console.log(this.selectedId);
			},
			Search_ClickOut(){
				if (this.Search_action == 'close' && this.Search_action_last != 'Search'){
					var Mes = document.querySelector('.Messenger');
					Mes.style.opacity = 1;
					Mes.style.transition = 1 + 's';
					var si = document.querySelector('.search-icon');
					var sii = document.querySelector('.search-icon i');
					var fe = document.querySelector('.all-search .search');
					fe.classList.remove('inpfull');
					fe.style.paddingLeft = '5px';
					si.classList.remove('search-icon-full');

					this.Search_action = 'open';
					this.Search_action_last = 'SearchOut';
				}
			},
			Search_Click(){
				this.Search_action_last = 'Search';
				setTimeout(() => {
					this.Search_action_last = 'SearchOut';
				}, 500);
			},
			Search(text){
				if (this.Search_action == 'open'){
					var Mes = document.querySelector('.Messenger');
					Mes.style.opacity = 0;
					Mes.style.transition = 1 + 's';
					var si = document.querySelector('.search-icon');
					var sii = document.querySelector('.search-icon i');
					var fe = document.querySelector('.all-search .search');
					fe.classList.add('inpfull');
					fe.style.paddingLeft = '16px';
					si.classList.add('search-icon-full');
					
					// si.style.marginTop = '1px';
					// sii.classList.remove('fa-search');
					// sii.classList.add('fa-times');

					this.Search_action = 'close';
					this.Search_action_last = 'close';
				} else {
					this.search_enter(text);
				}
			},
			send_message(to, msg){
				const token = this.getToken();
				var vk = new VK.VkRequest(token)
				vk.method('messages.send', {
					user_id: to,
					random_id: this.randomInteger(100000, 999999),
					message: msg
				}).then(json => {
						
				}).catch({ name: 'VkApiError' }, error => {
					console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
					switch(error.error_code) {
							case 14:
									console.log('Captcha error');
							break;  
							case 5:
									console.log('No auth');
							break;
							default:
								console.log(error.error_msg);
					}
				}).catch(error => {
					console.log(`Other error ${error}`);
				});
			},
			VkMethod(met, opt, callcback){
				const token = this.getToken();
				var vk = new VK.VkRequest(token)
				vk.method(met, opt).then(json => callcback(json)).catch({ name: 'VkApiError' }, error => {
					console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
					switch(error.error_code) {
							case 14:
									console.log('Captcha error');
							break;  
							case 5:
									console.log('No auth');
							break;
							default:
								console.log(error.error_msg);
					}
				}).catch(error => {
					console.log(`Other error ${error}`);
				});
			},
			load_chats(){
				const token = this.getToken();
				var vk = new VK.VkRequest(token)
				vk.method('messages.getConversations', {
					offset: 0,
					count: 100,
					filter: 'all',
					fields: 'photo_200',
					extended: 1
				}).then( async (json) => {
					// console.log(json);
					// console.log(json.response.items[0]);
					await this.addUsers(json);
					this.hidePlaceholder();
					this.sleep(500).then(() => {
						this.loaded();
					});
					
				}).catch({ name: 'VkApiError' }, error => {
					console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
					switch(error.error_code) {
							case 14:
									console.log('Captcha error');
							break;  
							case 5:
									console.log('No auth');
							break;
							default:
								console.log(error.error_msg);
					}
				}).catch(error => {
					console.log(`Other error ${error}`);
				});
			},
			hidePlaceholder(){
				document.querySelector('#placeholder').style.opacity = 0;
				this.sleep(500).then(() => {
					document.querySelector('#placeholder').style.display = 'none';
				});
			},
			update_chats(){
				const token = this.getToken();
				var vk = new VK.VkRequest(token)
				vk.method('messages.getConversations', {
					offset: 0,
					count: 100,
					filter: 'all',
					fields: 'photo_200',
					extended: 1
				}).then(json => {
					// console.log(json);
					// console.log(json.response.items[0]);
					this.addUsers(json);
				}).catch({ name: 'VkApiError' }, error => {
					console.log(`VKApi error ${error.error_code} ${error.error_msg}`);
					switch(error.error_code) {
							case 14:
									console.log('Captcha error');
							break;
							case 5:
									console.log('No auth');
							break;
							default:
								console.log(error.error_msg);
					}
				}).catch(error => {
					console.log(`Other error ${error}`);
				});
			},
			sleep(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			in_array(needle, haystack) {
			    var length = haystack.length;
			    for(var i = 0; i < length; i++) {
			        if(haystack[i] == needle) return true;
			    }
			    return false;
			},
			randomInteger(min, max) {
				// случайное число от min до (max+1)
				let rand = min + Math.random() * (max + 1 - min);
				return Math.floor(rand);
			},
			addUsers(json){
				var curent_user;
				var profile;
				var CUsers = [];
				var element_id = 1;
				for (curent_user of json.response.items){
					for (profile of json.response.profiles){
						if (curent_user.conversation.peer.type == 'user'){
							if (curent_user.conversation.peer.id == profile.id){
								if (curent_user.last_message.out == 1){
									var from_me = true;
								} else {
									var from_me = false;
								}

								if (profile.first_name == 'Администрация ВКонтакте'){
									var full_name = profile.first_name.split(' ')[0];
								} else {
									var full_name = `${profile.first_name} ${profile.last_name}`;
								}
								
								if (curent_user.conversation.unread_count != undefined){
									var count = curent_user.conversation.unread_count;
								} else {
									var count = 0;
								}

								if (curent_user.last_message.attachments.length > 0){
									var attah_one = curent_user.last_message.attachments;
									// var attah_prom = attah_one[attah_one.length-1].wall.attachments;
									// var attah_two = attah_prom[attah_prom.length-1];
									var attachments_type_one = attah_one[attah_one.length-1].type;
									// var attachments_type_two = attah_two.type;\
									if (from_me){
										if (attachments_type_one == 'wall'){
											var last_message = {
												from: 'Вы',
												text: 'Запись на стене'
											};
										}
										if (attachments_type_one == 'sticker'){
											var last_message = {
												from: 'Вы',
												text: 'Стикер'
											};
										}
										if (attachments_type_one == 'audio'){
											var last_message = {
												from: 'Вы',
												text: 'Аудиозапись'
											};
										}
										if (attachments_type_one == 'photo'){
											var last_message = {
												from: 'Вы',
												text: 'Фотография'
											};
										}
									} else {
										if (attachments_type_one == 'wall'){
											var last_message = {
												from: '',
												text: 'Запись на стене'
											};
										}
										if (attachments_type_one == 'sticker'){
											var last_message = {
												from: '',
												text: 'Стикер'
											};
										}
										if (attachments_type_one == 'audio'){
											var last_message = {
												from: '',
												text: 'Аудиозапись'
											};
										}
										if (attachments_type_one == 'photo'){
											var last_message = {
												from: '',
												text: 'Фотография'
											};
										}
									}
								} else {
									if (curent_user.last_message.fwd_messages.length > 0 && curent_user.last_message.text.length == 0){
										var messCount = curent_user.last_message.fwd_messages.length;
										if (messCount == 1){
											var last_message = {
												from: '',
												text: `${messCount} сообщение`
											};
										} else if (messCount > 1 && messCount < 5) {
											var last_message = {
												from: '',
												text: `${messCount} сообщения`
											};
										} else if (messCount >= 5){
											var last_message = {
												from: '',
												text: `${messCount} сообщений`
											};
										}
									} else if (from_me == false){
										if (count > 0){
											var last_message = {
												from: '',
												text: curent_user.last_message.text
											};
										} else {
											if (profile.first_name == 'Администрация ВКонтакте'){
												var last_message = {
													from: profile.first_name.split(' ')[0],
													text: curent_user.last_message.text
												};
											} else {
												var last_message = {
													from: profile.first_name,
													text: curent_user.last_message.text
												};
											}
										}
									} else {
										var last_message = {
											from: 'Вы',
											text: curent_user.last_message.text
										};
									}
								}

								var id = curent_user.last_message.peer_id;
								if (this.avatarFilter(id) !== false){
									var img_link = this.avatarFilter(id);
								} else {
									var img_link = profile.photo_200;
								}
								// var img_link = profile.photo_200;
									
								var timestamp = curent_user.last_message.date;
								var dt = new Date(timestamp*1000);
								var tdt = new Date();
								var messdate  = dt.toLocaleString().split(', ')[0];
								var tmessdate = tdt.toLocaleString().split(', ')[0];

								if (messdate == tmessdate){
									var messtime = dt.toLocaleString().split(', ')[1].substr(0, dt.toLocaleString().split(', ')[1].length-3);
								} else {
									var day   = parseInt(messdate.split('.')[0]);
									var month = parseInt(messdate.split('.')[1]);
									var year  = parseInt(messdate.split('.')[2]);
									// текущая дата сообшения
									var MessengeDate = `${day}.${month}.${year}`;

									var day   = parseInt(tmessdate.split('.')[0]) - 1;
									var month = parseInt(tmessdate.split('.')[1]);
									var year  = parseInt(tmessdate.split('.')[2]);

									var CurrentDate = `${day}.${month}.${year}`;
									if (MessengeDate == CurrentDate){
										var messtime = 'Вчера';
									} else {
										var day   = parseInt(MessengeDate.split('.')[0]);
										var month = parseInt(MessengeDate.split('.')[1]);
										var year  = parseInt(MessengeDate.split('.')[2]);

										var Currentyear  = parseInt(CurrentDate.split('.')[2]);
										if (Currentyear != year){
											switch(month){
												case 1:
													var messtime = `${day} Янв ${year}`;
												break;
												case 2:
													var messtime = `${day} Фев ${year}`;
												break;
												case 3:
													var messtime = `${day} Мар ${year}`;
												break;
												case 4:
													var messtime = `${day} Апр ${year}`;
												break;
												case 5:
													var messtime = `${day} Май ${year}`;
												break;
												case 6:
													var messtime = `${day} Июн ${year}`;
												break;
												case 7:
													var messtime = `${day} Июл ${year}`;
												break;
												case 8:
													var messtime = `${day} Авг ${year}`;
												break;
												case 9:
													var messtime = `${day} Сен ${year}`;
												break;
												case 10:
													var messtime = `${day} Окт ${year}`;
												break;
												case 11:
													var messtime = `${day} Ноя ${year}`;
												break;
												case 12:
													var messtime = `${day} Дек ${year}`;
												break;
											}
										} else {
											switch(month){
												case 1:
													var messtime = `${day} Янв`;
												break;
												case 2:
													var messtime = `${day} Фев`;
												break;
												case 3:
													var messtime = `${day} Мар`;
												break;
												case 4:
													var messtime = `${day} Апр`;
												break;
												case 5:
													var messtime = `${day} Май`;
												break;
												case 6:
													var messtime = `${day} Июн`;
												break;
												case 7:
													var messtime = `${day} Июл`;
												break;
												case 8:
													var messtime = `${day} Авг`;
												break;
												case 9:
													var messtime = `${day} Сен`;
												break;
												case 10:
													var messtime = `${day} Окт`;
												break;
												case 11:
													var messtime = `${day} Ноя`;
												break;
												case 12:
													var messtime = `${day} Дек`;
												break;
											}
										}
									}
								}
								var maxLenMessage = 24;
								if (last_message.text.length > maxLenMessage){
									last_message.text = last_message.text.substr(0, maxLenMessage) + '...';
								}

								if (this.selectedId == id){
									var TSel = true;
								} else {
									var TSel = false;
								}
								
								CUsers.push({
									selected: TSel,
									type: 'user',
									element_id: element_id,
									from_me: from_me,
									id: id,
									img_link: img_link,
									name: full_name,
									time: messtime,
									count: count,
									from: last_message.from,
									text: last_message.text
								});
								element_id++;
							}
						}
					}
				}
				this.users = CUsers;
			}
		}
	}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import 'css/main.css';
</style>
