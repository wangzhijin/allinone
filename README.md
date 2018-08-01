# allinone  
metamask経由して、ethコインを転送するウェブサイト  
# 背景：  
ブロックチェーンを勉強するために、簡単なものを作ろうと思いました。  
html/js/smartcontactだけで動けます。  
# 開発環境：  
・Windows7  
・chrome  
・metamask  
・Geth  
※metamaskインストールはChrome拡張機能でmetamaskを検索してインストール  
※Gethインストールは下記リンクをご参照  
[geth インストールと設定（1/2）┃スマートコントラクト開発環境構築](https://it-developer.info/blockchain/development-environment-1/)   
[geth マイニングと送金（2/2）┃スマートコントラクト開発環境構築](https://it-developer.info/blockchain/development-environment-2/)  
  
# ローカル検証方法： 
①Geth起動  
②allinone.htmlをchromeで開く  
③[browser-solidity](https://ethereum.github.io/browser-solidity)でallinone\assets\allinone.solの内容をdeploy  
  ⇒RUNタブ  
  ・Environment：Web3 Provider  
  ・Account：①で作ったmainウォレット  
  ・Createボタンで実行  
④上記でdeployしたsmartcontactのアドレスで下記アドレス(0x28a283fc02af6050f7e9c2d025850f3f7bb5296f)を置き換える  
  ⇒allinone\assets\js\allinone.js  
  ・75行目：Contract.at('0x28a283fc02af6050f7e9c2d025850f3f7bb5296f');  
⑤画面に0.001 ETH ～ 100 ETHを入力して、購入ボタンをクリック  
⑥eth転送結果を確認  
