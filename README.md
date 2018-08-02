# 아프리카 스타일 트위치 오버레이
본 프로젝트는 MikuChat 2 클라이언트를 포크하여 개발했습니다.

사용법 : 
1. xsplit 등에서 웹 기반 오버레이에 https://90byte.github.io/AfreecaStyleTwitchOverlay?channel=<채널 ID> 를 입력하세요.
2. 다음과 같은 옵션이 준비되어 있습니다.
	- channel: 출력할 채널 아이디 (default: 'kimdoe')
	- gender: 채팅창에 스트리머가 쓴 글의 아바타 성별 (default: 'm', 여성이면 'f', 남성이면 'm')
	- female_ratio: 시청자가 글을 쓸 때 마다 랜덤하게 시청자 아바타의 성별이 정해집니다. 여성의 비율만 입력하며, 나머지는 남성입니다. (default: 0.2)
	- max_chat: 한 번에 오버레이에 출력되는 채팅의 수. 스크롤이 마지막 채팅까지 채워지면 올라가게 되어있으므로 써보시고 적당한 크기를 알아서 찾으세요.(default: 20)
	
3. 옵션을 추가할 때는, channel=<채널 ID> 뒤에 &<키>=<값> 식으로 이어붙이면 됩니다.
  - ex) female_ratio:0.5, max_chat:10으로 변경 => https://90byte.github.io/AfreecaStyleTwitchOverlay?channel=<채널 ID>&female_ratio=0.5&max_chat=10

4. 일부러 글씨가 작게 보이게 만들었습니다. 너무 안보이면 xsplit custom CSS에 다음과 같이 추가하세요.
```css
body {
 zoom: 120%;
}
```
zoom 값을 적절하게 설정해주심 됩니다.

5. xsplit 에서 설정 시, layout tab에서 'keep aspect ratio' 옵션을 해제하고 width, height 값을 조절해 Scene에 적절하게 보이도록 설정해주세요!

![lol](https://90byte.github.io/AfreecaStyleTwitchOverlay/lol.gif)

재밌게 사용해주세요!

# USE AT YOUR OWN RISK
본 소프트웨어를 사용함에 따르는 책임은 사용자에게 있습니다!
