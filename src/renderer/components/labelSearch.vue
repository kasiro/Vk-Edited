<template>
	<div id="label-search">
		<span class="Messenger">Мессенджер</span>
		<form @submit.prevent="enter">
			<div class="all-search">
				<input @click="$emit('search-click')" v-model="searchtext" class="search mycurtext" type="text" placeholder="Search">
				<SearchButton
					@search="Search"
					v-click-outside="ClickOut"
				/>
			</div>
		</form>
	</div>
</template>

<script>
	// import {mapGetters} from 'vuex'
	import SearchButton from '@/components/SearchButton'
	export default {
		components: {
			SearchButton
		},
		data(){
			return {
				searchtext: ''
			}
		},
		// computed: mapGetters(['getText']),
		methods: {
			Search(){
				var text = this.searchtext.trim();
				this.$emit('search', text);
			},
			ClickOut(){
				this.$emit('search-ClickOut');
			},
			enter(){
				var text = this.searchtext.trim();
				this.$emit('search-enter', text);
			}
		}
	}
</script>