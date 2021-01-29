<template>
	<div id="chat">
		<div class="When">
			<div>Вчера</div>
		</div>
		<div class="region">
			<div class="message">
				<div class="img">
					<img src="https://i.pinimg.com/736x/2b/7c/a3/2b7ca33e8836d3c5672e44d11f3978ce.jpg">
				</div>
				<div class="description">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Анастасия Вохминцева</p> <span>11:36</span>
						</div>
						<div class="user_last_message">Привет как ты?</div>
					</div>
				</div>
			</div>
			<div class="When_in_message">
				<div>Сегодня</div>
			</div>
			<div class="message">
				<div class="img">
					<img src="https://pp.userapi.com/c849532/v849532787/2ec6f/Sm9F-qlVnGY.jpg?ava=1">
				</div>
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Даня Каширских</p> <span>11:37</span>
						</div>
						<div class="user_last_message">Привет, Да нормально, а ты?</div>
					</div>
				</div>
			</div>
			<div class="message">
				<div class="img">
					<img src="https://i.pinimg.com/736x/2b/7c/a3/2b7ca33e8836d3c5672e44d11f3978ce.jpg">
				</div>
				<div class="description">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Анастасия Вохминцева</p> <span>11:37</span>
						</div>
						<div class="user_last_message">Я да нормально, вот сижу уроки делаю</div>
					</div>
				</div>
			</div>
			<div class="message photo_img_txt">
				<div class="img">
					<img src="https://pp.userapi.com/c849532/v849532787/2ec6f/Sm9F-qlVnGY.jpg?ava=1">
				</div>
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Даня Каширских</p> <span>11:38</span>
						</div>
						<div class="user_last_message">
							<div class="text">Понятно А я вот Доделываю</div>
							<div class="attachments">
								<div class="photo">
									<img
										class="myhover"
										src="https://sun9-28.userapi.com/impg/1Iy69UIcS74-5i2N0_xUJ-g2vnxrA7qJfDxr4g/BIfVfI2jFE4.jpg?size=1920x1080&quality=96&proxy=1&sign=47c208848c79e77a7f1feead5e151c3b&type=album"
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="message">
				<div class="img">
					<img src="https://i.pinimg.com/736x/2b/7c/a3/2b7ca33e8836d3c5672e44d11f3978ce.jpg">
				</div>
				<div class="description">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Анастасия Вохминцева</p> <span>11:38</span>
						</div>
						<div class="user_last_message">Ммм преклольна</div>
					</div>
				</div>
			</div>
			<div class="message last">
				<div class="description">
					<div class="name_last_message">
						<div class="user_last_message">А я вот BTS слушаю чимн как всегда жжёт >~<</div>
					</div>
				</div>
			</div>
			<div class="message">
				<div class="img">
					<img src="https://pp.userapi.com/c849532/v849532787/2ec6f/Sm9F-qlVnGY.jpg?ava=1">
				</div>
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Даня Каширских</p> <span>11:37</span>
						</div>
						<div class="user_last_message">Мне не особо интересно об этом говорить :т</div>
					</div>
				</div>
			</div>
			<div class="message">
				<div class="img">
					<img src="https://pp.userapi.com/c849532/v849532787/2ec6f/Sm9F-qlVnGY.jpg?ava=1">
				</div>
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_name">
							<p class="name">Даня Каширских</p> <span>11:37</span>
						</div>
						<div class="user_last_message">Меня заебали эти ваши BTS</div>
					</div>
				</div>
				<div class="dot_read">
					<div class="notread"></div>
				</div>
			</div>
			<div class="message last">
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_last_message">Я не хочу их видеть</div>
					</div>
				</div>
				<div class="dot_read">
					<div class="notread"></div>
				</div>
			</div>
			<div class="message_last_time">
				<div class="description_me">
					<div class="name_last_message">
						<div class="user_name">
							<span>11:37</span>
						</div>
						<div class="user_last_message">От слова совсем, Вот на столько они у меня уже в печёнках</div>
					</div>
				</div>
				<div class="dot_read">
					<div class="notread"></div>
				</div>
			</div>
			<div class="typing" v-if="user.isTyping">
				<div>Печатает</div>
				<div class="dots">
					<small class="s1"></small>
					<small class="s2"></small>
					<small class="s3"></small>
				</div>
			</div>
			<div class="block-stabilization-chat"></div>
			<!-- <img class="chatBackground" src=""> -->
		</div>
	</div>
</template>

<script>
	export default {
		props: ['user']
	}
</script>