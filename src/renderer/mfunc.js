class Myvk {

	constructor(token){
		this.token = token;
		const VK = require('vk-api-help');
		this.vk = new VK.VkRequest(token);
	}

	async myMethod(name, ops){
		await this.vk.method(name, ops).then((json) => {
			global.json = json;
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
			console.log(`Other error ${error} | in name ${name}`);
		});
		return global.json;
	}
}

class func {

	static in_array(needle, haystack) {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	}

	static loadJson(filename){
		var fs = require('fs');
		return JSON.parse(fs.readFileSync(__dirname + '/' + filename, 'utf8'));
	}

	static saveJson(filename, data){
		var fs = require('fs');
		fs.writeFileSync(__dirname + '/' + filename, JSON.stringify(data, null, '\t'));
	}

}

export {
	Myvk,
	func
}