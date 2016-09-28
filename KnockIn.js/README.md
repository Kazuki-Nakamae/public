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
	<script src="KnockIn-v1.0.7.js"></script>
	<script>
//////////////////Creating 'designCRISPITCh' Class instance///////////////
var KnockIn=new	designCRISPITCh();

//////////////////Setting data////////////////////////////////////////////
//setUserData(inputData,inputDataType) or setDesignMethod(inputData,inputDataType)
KnockIn.setUserData("ttttgtggccacactgagccgcgagtgtgagattaagtaatatatatcactccagttttttggccacttcagttttggaccggccccacgaggaacgccaggcacgcttccagtttttaacgcctgccgcgacggccgctcggaaatcgc".toUpperCase(),"sequence");
KnockIn.setUserData(56,"targetedPos");

//////////////////Designing sequences for KnockIn/////////////////////////
KnockIn.createPITChDesign();

//////////////////Showing the dataset.////////////////////////////////////
//retrievePITChDesign(shownDataType,designedDraftNo)
var writtenHTML=  "gRNA Direction : "+  KnockIn.retrievePITChDesign("Direction",0)+       "<br><br>";
writtenHTML+=     "gRNAbindingarray : "+KnockIn.retrievePITChDesign("gRNAbindingarray",0)+"<br><br>";
writtenHTML+=     "LeftMHarray : "+     KnockIn.retrievePITChDesign("LeftMHarray",0)+     "<br><br>";
writtenHTML+=     "RightMHarray : "+    KnockIn.retrievePITChDesign("RightMHarray",0)+    "<br><br>";
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

![simpleexample_result](https://github.com/Kazuki-Nakamae/public/blob/master/KnockIn.js/images/SEresult.jpg "simpleexample_result")
