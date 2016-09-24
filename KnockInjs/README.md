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
KnockIn.setUserData("demoDesign","title");
KnockIn.setUserData("ttttgtggccacactgagccgcgagtgtgagattaagtaatatatatcactccagttttttggccacttcagttttggaccggccccacgaggaacgccaggcacgcttccagtttttaacgcctgccgcgacggccgctcggaaatcgc".toUpperCase(),"sequence");
KnockIn.setUserData(0,"shiftedFrameNum");
KnockIn.setUserData(56,"targetedPos");
KnockIn.setDesignMethod("NGG","PAM");
KnockIn.setDesignMethod(20,"LeftMHlen");
KnockIn.setDesignMethod(20,"RightMHlen");
KnockIn.setDesignMethod("C-insertion","MHMethod");
KnockIn.setDesignMethod("EGFP2APuroR","PrimerType");

//////////////////Designing sequences for KnockIn/////////////////////////
KnockIn.createPITChDesign();

//////////////////Showing the dataset.////////////////////////////////////
//retrievePITChDesign(shownDataType,designedDraftNo)
var writtenHTML=  "gRNA Direction : "+  KnockIn.retrievePITChDesign("Direction",0)+       "<br><br>";
writtenHTML+=     "gRNAbindingarray : "+KnockIn.retrievePITChDesign("gRNAbindingarray",0)+"<br><br>";
writtenHTML+=     "LeftMHarray : "+     KnockIn.retrievePITChDesign("LeftMHarray",0)+     "<br><br>";
writtenHTML+=     "RightMHarray : "+    KnockIn.retrievePITChDesign("RightMHarray",0)+    "<br><br>";
writtenHTML+=     "5fwdprimer : "+      KnockIn.retrievePITChDesign("5fwdprimer",0)+      "<br><br>";
writtenHTML+=     "5revprimer : "+      KnockIn.retrievePITChDesign("5revprimer",0)+      "<br><br>";
writtenHTML+=     "3fwdprimer : "+      KnockIn.retrievePITChDesign("3fwdprimer",0)+      "<br><br>";
writtenHTML+=     "3revprimer : "+      KnockIn.retrievePITChDesign("3revprimer",0)+      "<br><br>";
	</script>
</head>
<body>
	<p id="result"></p>
	<script>document.getElementById("result").innerHTML=writtenHTML;//loaded!!!</script>
</body>
</html>
```

###OUTPUT
![simpleexample_result](https://github.com/Kazuki-Nakamae/public/blob/master/KnockInjs/images/simpleexample_result.tiff "simpleexample_result")
