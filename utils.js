var defaults = {
	channel: 'kimdoe',
	subs: [],
	gender: 'm',
	female_ratio: 0.2,
	max_chat: null,
	twip_key: null,
}
var urlVars = {};

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
	urlVars[key] = value;
});

function getOption(optionName) {
	if(urlVars[optionName] != null) {
		return urlVars[optionName];
	} else if(defaults[optionName] != null) {
		return defaults[optionName];
	} else {
		return null;
	}
}

function deleteIfOverHeight() {
	if(!getOption('max_chat')) {
		while(window.innerHeight < $('.message')[$('.message').length-1].offsetTop) {
			$('.message')[0].remove();
		}
	}
	else {
		if($('.message').length > getOption('max_chat')) {
			$('.message')[0].remove();
		}
	}
}

var debug_mode_ = false;