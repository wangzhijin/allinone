var lang;
var userLang = navigator.language || navigator.userLanguage;
if (userLang == 'zh-CN') {
	lang = "ZH"
} else if (userLang == 'en-US') {
	lang = "EN"
} else if (userLang == 'ja') {
	lang = "JA"
} else {
	lang = "EN"
}

var voc = [ 
	{"EN":"Refresh","ZH":"刷新","JA":"リフレッシュ"},
	{"EN":"My Account Info","ZH":"用户帐户状况","JA":"ユーザーアカウント情報"},
	{"EN":"Wallet Address：","ZH":"钱包地址：","JA":"ウォレット アドレス："},
	{"EN":"Enter Your Purchase Value","ZH":"购入登陆","JA":"買求めエントリ"},
	{"EN":"Wager","ZH":"下注额","JA":"コイン額"},
	{"EN":"BUY","ZH":"下注","JA":"購入"},
	{"EN":"[Wager] must be between [0.001 ETH ～ 100 ETH].","ZH":"[下注额]，请在[0.001 ETH ～ 100 ETH]范围内填写。","JA":"[ｳｪｲｼﾞｬｰ]、[0.001 ETH ～ 100 ETH]の範囲内に入力してください。"},
	{"EN":"The purchase was successful and is being processed. Please wait a moment!","ZH":"您的购入已经成功,正在处理,请稍等!","JA":"購入成功、今処理中です、しばらくお待ち下さい！"},
];

function translate(ele, lng){
	for(var i = 0; i < voc.length; i++){
		for(var k in voc[i]){
			if(voc[i][k] == ele.innerText.trim()){
				ele.innerText = voc[i][lng];
				break;
			}
		}
	}
}

function translateTo(lng){
	var trc = document.getElementsByClassName("translatable");
	for(var i = 0;i < trc.length; i++){
		translate(trc[i], lng);
	}
}

function doTranslateTo(lng){
	lang = lng;
	translateTo(lng);
}

window.addEventListener('load', function () {
	if (typeof web3 !== 'undefined') {
		console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
		window.web3 = new Web3(web3.currentProvider);
	} else {
		document.getElementById("msgArea").innerHTML = "Play this game you should install Metamask on a desktop browser like Chome or FireFox.<a href='faq.html'/>&nbsp;FAQ</a></li>";
		console.log('No web3? You should consider trying MetaMask!')
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		//window.web3 = new Web3(new Web3.providers.HttpProvider("https://proxy.mobilefish.com:9070"));
	}

	translateTo(lang);
	getUserAccountInfo();
	document.getElementById('langSelect').value=lang;

	var WorldCup2018Contract = web3.eth.contract([
		{
			"constant": false,
			"inputs": [
			],
			"name": "commitOrder",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		}
		]);	
		WorldCup2018 = WorldCup2018Contract.at('0x28a283fc02af6050f7e9c2d025850f3f7bb5296f');
		console.log(WorldCup2018);
	})

function getUserAccountInfo() {
	try {
		web3.eth.getAccounts((error, res) => {
			if(!error) {
				web3.eth.defaultAccount = res[0];
				$("#fromAccount").text(web3.eth.defaultAccount);
			} else {
				console.error(error);
			}
		})
	} catch (err) {
		document.getElementById("userAccountInfo").innerHTML = err;
	}
}


function doPrediction() {
	document.getElementById("doPredictionInfo").innerHTML = "";
	document.getElementById("userAccountInfo").innerHTML = "";
	try {
		var investValue = document.getElementById("inputInvest").value;
		// input check
		if (investValue < 0.001 || investValue > 100) {
			// Wager [0.001 ETH ～ 100 ETH]
			document.getElementById("doPredictionInfo").innerHTML = "[Wager] must be between [0.001 ETH ～ 100 ETH].";
		} else {
			WorldCup2018.commitOrder({from: web3.eth.accounts[0], gas: '9000000', gasPrice: '2000000000', value: web3.toWei(investValue, 'ether')}, function(error){
				if(!error) {
					document.getElementById("doPredictionInfo").innerHTML = "The purchase was successful and is being processed. Please wait a moment!";
					// console.log(result);
				} else
					console.error(error);
			});
		}
		translateTo(lang);
	} catch (err) {
		document.getElementById("doPredictionInfo").innerHTML = err;
	}
}
