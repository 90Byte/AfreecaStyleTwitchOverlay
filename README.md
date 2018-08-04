# 아프리카 스타일 트위치 오버레이
본 프로젝트는 MikuChat 2 클라이언트를 포크하여 개발했습니다.

간단히 요약하자면 트위치의 배지들을 아프리카 채팅방처럼 변환해서 출력하는 오버레이입니다.

![lol](https://90byte.github.io/AfreecaStyleTwitchOverlay/lol.gif)

- 스트리머 : BJ
- 스패너, 어드민 : 운영자
- 진은검, 글로벌 매니저 : 매니저
- 3, 6, 12이상 구독자 : 구독자, 팬, 열혈팬
- 프라임 : 퀵뷰

~~가능하면 트윕과 연동해서 별풍선 알림도 띄워주고 싶데 가능한지는 둘째치고 귀찮아서 일단 안함.~~

사용법 : 
1. xsplit 등에서 웹 기반 오버레이에 https://90byte.github.io/AfreecaStyleTwitchOverlay?channel=<채널 ID> 를 입력하세요.
2. 다음과 같은 옵션이 준비되어 있습니다.
	- `channel`: 출력할 채널 아이디 (default: 'kimdoe')
	- `allow_balloon`: 채팅으로 별풍선 알림을 띄울 수 있습니다. 분 단위로 숫자를 입력하면 같은 사용자가 해당 시간 이내로 다시 별풍선을 띄울 수 없게 됩니다. 소숫점 단위도 입력 가능합니다. 값을 설정하지 않으면 별풍선 알림을 쓸 수 없습니다!! 시간 제한을 두기 싫다면 0으로 설정해주세요!
	- `gender`: 채팅창에 스트리머가 쓴 글의 아바타 성별 (default: 'm', 여성이면 'f', 남성이면 'm')
	- `female_ratio`: 시청자가 글을 쓸 때 마다 랜덤하게 시청자 아바타의 성별이 정해집니다. 여성의 비율만 입력하며, 나머지는 남성입니다. (default: 0.2)
	- max_chat: ~~한 번에 오버레이에 출력되는 채팅의 수. 스크롤이 마지막 채팅까지 채워지면 올라가게 되어있으므로 써보시고 적당한 크기를 알아서 찾으세요.(default: 35)~~ 업데이트를 통해 좌표 기반으로 알아서 끝을 넘어가면 위부터 삭제되어 스크롤되도록 변경했습니다. 수동으로 표시 개수를 정하시려할 때만 입력하세요.
	- twip_key: ~~도네이션 알림을 별풍선으로 받을 수 있는 키입니다. 입력하지 않아도 채팅 오버레이 기능은 잘 작동합니다. 하단을 참조해주세요.~~
	
3. 옵션을 추가할 때는, channel=<채널 ID> 뒤에 &<키>=<값> 식으로 이어붙이면 됩니다.
  - ex) female_ratio:0.5, allow_balloon:1로 변경 => https://90byte.github.io/AfreecaStyleTwitchOverlay?channel=<채널 ID>&female_ratio=0.5&allow_balloon=1

4. 일부러 글씨가 작게 보이게 만들었습니다. 너무 안보이면 xsplit custom CSS에 다음과 같이 추가하세요.
```css
body {
 zoom: 120%;
}
```
zoom 값을 적절하게 설정해주심 됩니다.

5. xsplit 에서 설정 시, layout tab에서 'keep aspect ratio' 옵션을 해제하고 width, height 값을 조절해 Scene에 적절하게 보이도록 설정해주세요!

# ~~별풍선 알림 기능 추가!~~

~~트윕 후원을 별풍선으로 변환해주는 기능을 추가했습니다.~~

해당 기능은 문제의 소지가 있어서 삭제됐습니다... 흑흑흑...

대신, 채팅으로 별풍선을 띄울 수 있습니다. 채팅창에 "#balloon:개수"와 같이 써보세요! 1~999까지 입력 가능합니다! 명령어를 입력하시면 채팅창에는 입력한 채팅 대신 별풍선이 뜹니다.

혹은 비트를 쏘시면 알림이 뜹니다. 비트는 10배, 즉, 100개 -> 별풍선 1000개가 됩니다. 비트는 스트리머가 허용 옵션을 설정하지 않아도 볼 수 있습니다!

스트리머가 입력한 시간까지는 재입력이 불가능하니 주의하세요

재밌게 사용해주세요!

# Update History
1. Version 1.0
	- 스크롤이 더 자연스러워 졌습니다.
	- 연달아 여러 이모티콘을 쓰면 크고 작은 문제들(엑박, 이상한 크기, 한 개만 정상 표시되는 등)이 발생해 알고리즘을 수정했습니다.
	- 아프리카 구독 시스템을 몰라서 그런지 구독자보단 팬클럽이 더 익숙해서, 트위치에 자주 보이는 3~11개월 구독자를 팬클럽으로 변경했습니다. (사실 아프리카 안봐서 잘 몰라요...)
2. Version 1.1
	- 트윕 도네이션 기반 별풍선 기능 삭제..
	- 채팅창으로 별풍선 쏘기 기능 추가
3. Version 1.2
	- 비트로 별풍선 쏘기 기능 

# USE AT YOUR OWN RISK
본 소프트웨어를 사용함에 따르는 책임은 사용자에게 있습니다!
