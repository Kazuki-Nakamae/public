#KnockIn.js

KnockIn.js implements an algorithm to design gRNAs targeting sequence and homology arms for KnockIn. It can be used in the browser.

Translated:  
KnockIn.jsではブラウザ上で動作可能な、KnockIn用のguideRNAおよびhomologyarm配列セットの検索アルゴリズムを実装しています。

##Download

##Simple Exsample

###HTML5+JavaScript
```html
<!DOCTYPE html>
<head>
	<meta charset="utf-8"/>
	<title>KnockIn.js Demo</title>
	<script src="../src/knockinjs.js"></script>
	<script>
		//Creating 'designCRISPITCh' Class instance
		var KnockIn=new	designCRISPITCh(
			//title
			"AAVS1",
			//target sequences
			"GAATTCCTAACTGCCCCGGGGCAGTCTGCTATTCATCCCCTTTACGCGGTGCTACACACACTTGCTAGTATGCCGTGGGGACCCCTCCGGCCTGTAGACTCCATTTCCCAGCATTCCCCGGAGGAGGCCCTCATCTGGCGATTTCCACTGGGGGCCTCGGAGCTGCGGACTTCCCAGTGTGCATCGGGGCACAGCGACTCCTGGAAGTGGCCACTTCTGCTAATGGACTCCATTTCCCAGGCTCCCGCTACCTGCCCAGCACACCCTGGGGCATCCGTGACGTCAGCAAGCCGGGCGGGGACCGGAGATCCTTGGGGCGGTGGGGGGCCAGCGGCAGTTCCCAGGCGGCC",
			//reading frame(0-2)
			0,
			//target position
			75
		);
		//Designing sequences for KnockIn
		KnockIn.createDesign();
		//Showing the dataset.
		//retrievePITChDesign(shownDataType,designedDraftNo)
		var writtenHTML="RESULT<br><br>"
		+"gRNA Direction : "+KnockIn.retrieveDesign("Direction",0)+"<br><br>"
		+"gRNA binding array : "+KnockIn.retrieveDesign("gRNAbindingarray",0)+"<br><br>"
		+"Left microhomology array : "+KnockIn.retrieveDesign("LeftMHarray",0)+"<br><br>"
		+"Right microhomology array : "+KnockIn.retrieveDesign("RightMHarray",0)+"<br><br>"
	</script>
</head>
<body>
	<p id="result"></p>
	<script>document.getElementById("result").innerHTML=writtenHTML;//loaded!!!</script>
</body>
</html>
```

###OUTPUT
Google Chrome ver53.0.2785.116 (64-bit)

![simpleexample_result](https://github.com/Kazuki-Nakamae/public/blob/master/KnockIn.js/images/simpleresult.jpg "simpleresult")

[DEMO page](https://codepen.io/nakazu/pen/jVEePj)
