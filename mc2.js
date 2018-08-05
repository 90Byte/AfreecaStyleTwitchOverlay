var avatars = {};
var badge_sets = {};
var balloon_recorder = {};

var balloon_ratio = 1;

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
	if(getOption('allow_balloon') == null) {
		balloon_ratio = 0.1;
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
});

function balloon_check(displayName, username, message) {
	var balloon = /^#balloon:([0-9]{1,3})/.exec(message);
	if(balloon) {
		process_donate(displayName, parseInt(balloon[1]));
		balloon_recorder[username] = getTS();
		return true;
	}
	return false;
}

chat.on('chat', (channel, userstate, message, self) => {
	if(debug_mode_) console.log(userstate);
	var subUser = getOption('subs').indexOf(userstate.username) > -1 || userstate.subscriber;
	var randomId = Math.floor(Math.random() * 10000000);
	var badges = "";
	var colors = {};

	message = message.replace(/(<([^>]+)>)/ig, '');

	if(getOption('allow_balloon') != null){
		var name = userstate['display-name']?userstate['display-name']:userstate.username;
		if(balloon_recorder[userstate.username]) {
			if((getTS() - balloon_recorder[userstate.username])/60000 > getOption('allow_balloon')) {
				if(balloon_check(name, userstate.username, message))
					return;
			}
		}
		else {
			if(balloon_check(name, userstate.username, message))
				return;
		}
	}

	var character = '<img class="character" src="statics/';// '<img class="character" src="statics/male.png" />';
	
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
				character = '<img class="character" src="statics/';
				if(badgeVersion == 0) {
					badges += '<img class="badge" src="statics/ic_gudok.png" />';
					character += 'fan_';
				}
				else if(badgeVersion == 3 || badgeVersion == 6 ) {
					badges += '<img class="badge" src="statics/ic_fanclub.gif" />';
					character += 'fan_';
				}
				else/* if(badgeVersion > 6) */{
					badges += '<img class="badge" src="statics/ic_hot.gif" />';
					character += 'hot_';
				}
				if(Math.random() > getOption('female_ratio')) {
					character += 'male.png" />';
				}
				else {
					character += 'female.png" />';
				}
			}

			if(badgeName == 'premium' || badgeName == 'turbo') {
				badges += '<img class="badge" src="statics/ic_quick.gif" />';
			}
			if(badgeName == 'moderator' || badgeName == 'global_mod') {
				badges += '<img class="badge" src="statics/ic_manager.gif" />';
				character = '<img class="character" src="statics/';
				if(Math.random() > getOption('female_ratio')) {
					character += 'manager_male.png" />';
				}
				else {
					character += 'manager_female.png" />';
				}
			}
			if(badgeName == 'staff' || badgeName == 'admin') {
				character = '<img class="character" src="statics/spanner.png" />';
			}
			if(badgeName == 'broadcaster') {
				badges += '<img class="badge" src="statics/ic_bj.gif" />';
				character = '<img class="character" src="statics/bj_';
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
		badges += '<img class="badge" src="statics/ssakdook.png" />';
	}

	if(userstate['emotes'] != null) {
		var mixed = {};
		var emoteInstances = userstate['emotes'];
		for(let emotesId in emoteInstances) {
			var emoteTokens = emoteInstances[emotesId];
			for(let token in emoteTokens) {
				var splitedToken = emoteTokens[token].split('-');
				mixed[parseInt(splitedToken[0])] = emotesId;
				mixed[parseInt(splitedToken[1])] = null;
			}
		}

		var new_message = '';
		var last_idx = 0;
		for(let key in mixed) {
			if(!mixed[key]) { //if value is null == key is end position of emoji
				last_idx = key + 1;
			}
			else {
				new_message += message.substr(last_idx, key);
				new_message += '<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v1/' + mixed[key] + '/3.0" />'

			}
		}
		message = new_message;
	}

	var script = '<span id="message_' +randomId + '" ';
		script += 'class="message ';
	if(subUser){
		script += 'subscriber';
	}
		script += '">';
		script += '<div class="pull-left">' + character + '</div>';
		script += '<b> ' + badges 
			+ (userstate['display-name'] ? userstate['display-name']+'('+userstate.username+')' : userstate.username) + ' :</b> ';
		script += '<p class="chat_text">' + message + '</p></span>';

	$('#messages').append(script);
	
	deleteIfOverHeight();
});

chat.on('cheer', (channel, userstate, message) => {
	//1bits = 10 won
	process_donate(userstate['display-name']?userstate['display-name']:userstate.username
		, parseInt(userstate['bits'])*10*balloon_ratio);
});

chat.on('action', (channel, userstate, message, self) => {
	if(userstate.username !== 'twipkr')
		return;
	var result = /([\w\W가-힑ㄱ-ㅎ ]*)님[, ]*([0-9,]*)원/.exec(message);
	process_donate(result[1], parseInt(result[2].replace(',', ''))*balloon_ratio);
});

chat.connect({
	connection: {
		cluster: 'main',
	}
});

$.get('https://badges.twitch.tv/v1/badges/global/display?language=en', (data) => {
	badge_sets = data.badge_sets;
});
