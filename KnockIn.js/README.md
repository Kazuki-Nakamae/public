#KnockIn.js

KnockIn.js implements an algorithm to design gRNAs targeting sequence and homology arms for KnockIn. It can be used in the browser.


##Download

##Simple Exsample

###HTML5(demo.html)
```html
<!DOCTYPE html>
<head>
	<meta charset="utf-8"/>
	<script src="../src/knockinjs.js"></script>
</head>
<body>
	<p id="result"></p>
	<script src="demo.js"></script>
</body>
</html>
```
###JavaScript(demo.js)
```js
//Creating 'designCRISPITCh' Class instance
var KnockIn=new	designCRISPITCh(
  //title
  "AAVS1",
  //target sequence
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
//show result
document.getElementById("result").innerHTML=writtenHTML;
```

###OUTPUT
Google Chrome ver53.0.2785.116 (64-bit)

![simpleexample_result](https://github.com/Kazuki-Nakamae/public/blob/master/KnockIn.js/images/simpleresult.jpg "simpleresult")

[DEMO page](https://codepen.io/nakazu/pen/jVEePj)


##Tutorial
We introduce the users to the basic workflow of KnockIn.js. You can design sequences by running the programs without external library.

###1.Setting Sequence
First, you create a 'designCRISPITCh' instance using `var <instance> new	designCRISPITCh()`
```
Usage: designCRISPITCh(inputTitle, inputSeq, shiftedFrameNum, inputtargetedPos)

 create instance and set sequence and targeting data using KnockIn design

Arguments:
 inputTitle      <String global object>	Title (default: "no_title")
 inputSeq        <String global object>	Target sequence (default: "")
                                         NOTE: >100bp is recommended
 shiftedFrameNum <0|1|2>                Reading frame (default: 0)
 inputtargetedPos <Number:integer>      Target position (default: 41)
```

You can change the input data using `<instance>.setData()` method
```
Usage: setData(inputData, inputDataType)

 change the input sequence and targeting data using KnockIn design

Arguments:
 inputData     <String global object|Number>                        Setting value
 inputDataType <"title"|"sequence"|"shiftedFrameNum"|"targetedPos"> Type of data
                    "title"           -- Title
                    "sequence"        -- Target sequence
                    "shiftedFrameNum" -- Reading frames
                    "targetedPos"     -- Target position
```

###2.Setting Design Method

You set the design method using `<instance>.setMethod()` method
```
Usage: setMethod(inputData, inputDataType)

 change the input sequence and targeting data using KnockIn design

Arguments:
 inputData     <Array global object|String global object|Number>        Setting value
 inputDataType <"PAM"|"LeftMHlen"|"RightMHlen"|"MHMethod"|"PrimerType"> Type of data
                    "PAM"         -- PAM sequense array
                    "LeftMHlen"   -- The length of left microhomology
                    "RightMHlen"  -- The length of right microhomology
                                     NOTE: >10-40bp is recommended
                    "MHMethod"    -- Microhomology arms design method          inputData:<"codon-deletion"|"C-insertion">
                    "PrimerType"  -- Primer type for Knock-in Targeting Vector inputData:<"EGFP2APuroR"|"CMV-EGFP2APuroR">
```

The design program will not work without setting the design method. We recommend checking method setting using `<instance>.hasMethod()` method. If this is okay, the method returns `true`.

###3.Designing Sequences

You can design sequences for KnockIn using `<instance>.createDesign()` method
```
Usage: createDesign(requestedDraftNum)

 search gRNA targeting site and design microhomology

Arguments:
 requestedDraftNum <Number:integer> The number of searching gRNA targeting sites (default: 10000)
```

####Design Algorithm

![searchgrna](https://github.com/Kazuki-Nakamae/public/blob/master/KnockIn.js/images/searchgrna.jpg "searchgrna")

This program searches PAM sequences in target site ± 6bp and design microhomology arms in accordance with the design method.
For the detailed explanation, please refer to the "[PITCh KnockIn](https://codepen.io/nakazu/pen/jVEePj)" page.

###4.Showing Result

You can get result using `<instance>.retrieveDesign()` method.

```
Usage: retrieveDesign(getDataType,designedDraftNo)

 get design results

Arguments:
 getDataType     <Array global object|String global object|Number> type of data
					"Direction"        -- Direction of gRNA sequences                   <"plus"|"minus">
					"PAMendPos"        -- Position of 5'end PAM sequense                <Number>
					"gRNAendPos"       -- Position of 3'end gRNA sequense               <Number>
					"CutPos"           -- Position 3bp downstream from "PAMendPos"      <Number>
					"gRNAbindingarray" -- PAM and spacer sequense array                 <Array global object>
					"LeftMHarray"      -- Left microhomology sequense array             <Array global object>
					"RightMHarray"     -- Right microhomology sequense array            <Array global object>
					"Seq"              -- Sequense around target site                   <Array global object>
					"5fwdprimer"       -- Forward primer for making left microhomology  <Array global object>
					"5revprimer"       -- Reverse primer for making left microhomology  <Array global object>
					"3fwdprimer"       -- Forward primer for making right microhomology <Array global object>
					"3revprimer"       -- Reverse primer for making right microhomology <Array global object>
					"5vector"          -- 5'side sequense of donor vector               <Array global object>
					"3vector"          -- 3'side sequense of donor vector               <Array global object>
 designedDraftNo <Number:integer> id number in design dataset(from 0)
```

###Supplements

####List Of Classess and function in KnockIn.js

KnockIn.js has many methods. For the detailed explanation, please refer to the source code.

#####Function
```
setInherits(childCtor,parentCtor)
```
#####"inputSequence" Class
```
//Constructor
inputSequence(inputTitle,inputSeq,shiftedFrameNum,inputtargetedPos)
//Methods
inputSequence.setData(inputData,inputDataType)
inputSequence.getData(getDataType)
inputSequence.makeData_(getDataType)
inputSequence.retrieveData(getDataType)
inputSequence.getCompBase(inputBase,getNucType)
inputSequence.isSameBase_(inputBase,refBase)
inputSequence.convertCodon(inputCodon)
```
#####"designCRISPITCh" Class(subclass from "inputSequence" Class)
```
//Constructor
designCRISPITCh(inputTitle,inputSeq,shiftedFrameNum,inputtargetedPos)
//Methods
designCRISPITCh.setMethod(inputData,inputDataType)
designCRISPITCh.hasMethod()
designCRISPITCh.getMethod(getDataType)
designCRISPITCh.setDesign(inputData,inputDataType,designedDraftNo)
designCRISPITCh.clearDesign()
designCRISPITCh.getDesign_(getDataType,designedDraftNo)
designCRISPITCh..makeDesign_(makeDataType,designedDraftNo)
designCRISPITCh.retrieveDesign(getDataType,designedDraftNo)
designCRISPITCh.hasAllDesign(designedDraftNo,exeptedDataList)
designCRISPITCh.recognizePAM_(searchPos,designDirection)
designCRISPITCh.createDesign(requestedDraftNum)
```
