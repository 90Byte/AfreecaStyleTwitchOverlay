var debug_mode_ = true;

function fake_donate(nick, amount) {
	process_donate(nick, amount);
}

function process_donate(nick, amount) {
	if(debug_mode_) console.log(nick, amount);
	var balloon_amount = parseInt(amount/ 100);
	var balloon_class = 2;
	if(balloon_amount >= 100)
		balloon_class = 4;
	else if(balloon_amount >= 50)
		balloon_class = 3;
	else
		balloon_class = 2;

	var script = '<div class="message balloon-message"><div class="balloon"><div class="balloon-amount">' + balloon_amount +
	'</div><img src="statics/balloon'+ balloon_class +
	'.png"><div class="balloon-text"><strong>' + nick +
	'님께서</strong><br><span>별풍선 ' + balloon_amount +
	'개 선물!</span></div></div></div>';

	$('#messages').append(script);

	if($('.message').length > getOption('max_chat')) {
		$('.message')[0].remove();
	}
}
var _sock = null;
$('document').ready(function() {
	if(!getOption('twip_key')) {
		return;
	}
	_sock = io('https://io.mytwip.net?eventlist_key=' + getOption('twip_key'));
	if(!_sock){
		return;
	}
	_sock.on('new donate', function(data){
		if(!debug_mode_ && data.repeat) {
			return;
		}
		process_donate(data.nickname, data.amount);
	});
});