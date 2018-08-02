var avatars = {};
var badge_sets = {};
var defaults = {
	channel: 'kimdoe',
	subs: [],
	gender: 'm',
	female_ratio: 0.2,
	max_chat: 35,
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

var chat = new tmi.client({
	options: {
		debug: false
	},
	connection: {
		reconnect: true,
		secure: true
	},
	channels: [getOption('channel')]
});

chat.on('connected', () => {
	if(urlVars.subs != null) {
		urlVars.subs = urlVars.subs.split(',');
	}
});

chat.on('roomstate', (channel, state) => {
	if(state['room-id'] != null) {
		$.get('https://badges.twitch.tv/v1/badges/channels/' + state['room-id'] + '/display?language=en', (data) => {
			if(data.badge_sets.subscriber != null) {
				badge_sets.subscriber = data.badge_sets.subscriber;
			}
		});
	}
})

chat.on('chat', (channel, userstate, message, self) => {
	//console.log(userstate);
	var subUser = getOption('subs').indexOf(userstate.username) > -1 || userstate.subscriber;
	var randomId = Math.floor(Math.random() * 10000000);
	var badges = "";
	var colors = {};

	message = message.replace(/(<([^>]+)>)/ig, '');

	var character = '<img class="character" src="./statics/';// '<img class="character" src="./statics/male.png" />';
	
	if(Math.random() > getOption('female_ratio')) {
		character += 'male.png" />';
	}
	else {
		character += 'female.png" />';
	}

	if(userstate['badges-raw'] != null) {
		var badgeInstances = userstate['badges-raw'].split(',');
		for(let badgeInstanceId in badgeInstances) {
			var badgeInstance = badgeInstances[badgeInstanceId];
			var badgeTokens = badgeInstance.split('/');
			var badgeName = badgeTokens[0];
			var badgeVersion = badgeTokens[1];
			/*
			if(badge_sets[badgeName] != null && badge_sets[badgeName].versions[badgeVersion] != null) {
				badges += '<img class="badge" src="' + badge_sets[badgeName].versions[badgeVersion].image_url_4x + '" />'
			}
			*/

			if(badgeName == 'subscriber'){
				character = '<img class="character" src="./statics/';
				if(badgeVersion == 0) {
					badges += '<img class="badge" src="./statics/ic_fanclub.gif" />';
					character += 'fan_';
				}
				else if(badgeVersion == 3 || badgeVersion == 6 ) {
					badges += '<img class="badge" src="./statics/ic_gudok.png" />';
					character += 'fan_';
				}
				else/* if(badgeVersion > 6) */{
					badges += '<img class="badge" src="./statics/ic_hot.gif" />';
					character += 'hot_';
				}
				if(Math.random() > getOption('female_ratio')) {
					character += 'male.png" />';
				}
				else {
					character += 'female.png" />';
				}
			}

			if(badgeName == 'premium') {
				badges += '<img class="badge" src="./statics/ic_quick.gif" />';
			}
			if(badgeName == 'moderator' || badgeName == 'global_mod') {
				badges += '<img class="badge" src="./statics/ic_manager.gif" />';
				character = '<img class="character" src="./statics/';
				if(Math.random() > getOption('female_ratio')) {
					character += 'manager_male.png" />';
				}
				else {
					character += 'manager_female.png" />';
				}
			}
			if(badgeName == 'staff' || badgeName == 'admin') {
				character = '<img class="character" src="./statics/spanner.png" />';
			}
			if(badgeName == 'broadcaster') {
				badges += '<img class="badge" src="./statics/ic_bj.gif" />';
				character = '<img class="character" src="./statics/bj_';
				if(getOption('gender') == 'f') {
					character += 'female';
				}
				else if(getOption('gender') == 'm') {
					character += 'male';
				}
				else {
					if(Math.random() > getOption('female_ratio')) {
						character += 'male';
					}
					else {
						character += 'female';
					}
				}
				character += '.png" />';
			}
		}
	}

	if(userstate.username == 'ssakdook' || userstate.username == 'nightbot' || userstate.username == 'moobot') {
		badges += '<img class="badge" src="./statics/ssakdook.png" />';
	}

	if(userstate['emotes-raw'] != null) {
		var emoteInstances = userstate['emotes-raw'].split('/').reverse();
		for(let emoteInstanceId in emoteInstances) {
			var emoteInstance = emoteInstances[emoteInstanceId];
			var emoteTokens = emoteInstance.split(':');
			var emoteId = emoteTokens[0];
			var emotePos = emoteTokens[1].split('-');
			var startPos = parseInt(emotePos[0]);
			var endPos = parseInt(emotePos[1]);

			message = message.substr(0, startPos) + '<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v1/' + emoteId + '/3.0" />' + message.substr(endPos + 1);				

		}

	}

	var script = '<span id="message_' +randomId + '" ';
		script += 'class="message ';
	if(subUser){
		script += 'subscriber';
	}
		script += '">';
		script += '<div class="pull-left">' + character + '</div>';
		script += '<b class="pull-left"> ' + badges 
			+ (userstate['display-name'] ? userstate['display-name']+'('+userstate.username+')' : userstate.username) + ' :</b> ';
		script += '<p class="chat_text">' + message + '</p></span>';

	$('#messages').append(script);
	
	if($('.message').length > getOption('max_chat')) {
		$('.message')[0].remove();
	}
});

chat.connect({
	connection: {
		cluster: 'main',
	}
});

$.get('https://badges.twitch.tv/v1/badges/global/display?language=en', (data) => {
	badge_sets = data.badge_sets;
});
