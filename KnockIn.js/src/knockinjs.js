/**
 * @license
 * Copyright (c) 2016 Kazuki Nakamae.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//version 1.0
//update date 2017/3/21
//"use strict";
//function//////////////////////////////////////////////////////////////////////

/**
* @description Sets the prototype
* @function setInherits
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {Object} childCtor  child constructor
* @param {Object} parentCtor parent constructor
*/
var setInherits=function(childCtor,parentCtor) {
  Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

//inputSequence class///////////////////////////////////////////////////////////
/**
* @namespace inputSequence
* @constructor
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @classdesc Enter sequence and operate sequence
* @param {string} [inputTitle=no_title]        Title
* @param {string} [inputSeq]          Target sequence
* @param {number} [shiftedFrameNum=0]   Reading frame
* @param {number} [inputtargetedPos=41]  Target position
*/
var inputSequence = inputSequence || {};
inputSequence=function(inputTitle,inputSeq,shiftedFrameNum,inputtargetedPos){
  if(typeof inputTitle==="undefined"){
  	this.inputTitle ="no_title";
  }else{
    this.inputTitle =inputTitle;
  }
  console.info("[Set] this.inputTitle : "+this.inputTitle);
  if(typeof inputSeq==="undefined"){
    this.inputSeq ="";
  	console.info("This class need input sequences as input\nUSAGE:Constructor(<inputTitle>,<inputSeq>,<shiftedFrameNum>,<inputtargetedPos>)\nOR\nsetData(<inputSeq>,'sequence') after declearing instance");
  }else{
    this.inputSeq =inputSeq.toUpperCase();
  }
  console.info("[Set] this.inputSeq : "+this.inputSeq);
  if(typeof shiftedFrameNum==="undefined"){
    this.shiftedFrameNum=0;
  }else{
    this.shiftedFrameNum=shiftedFrameNum;
  }
  console.info("[Set] this.shiftedFrameNum : "+this.shiftedFrameNum);
  if(typeof inputtargetedPos==="undefined"){
    this.inputtargetedPos=41;
  }else{
    this.inputtargetedPos=inputtargetedPos;
  }
  console.info("[Set] this.inputtargetedPos : "+this.inputtargetedPos);
};
/**
* Change the input sequence and targeting data using KnockIn design (Public setter method)
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param  {(string|number)} inputData Setting value
* @param  {string} inputDataType Type of data
* @return {boolean} isSuccess true:success|false:failture
*/
inputSequence.prototype.setData=function(inputData,inputDataType)  {
  var isSuccess=false;
  try{
    if(inputDataType==="title"){
      this.inputTitle=inputData;
    }else if(inputDataType==="sequence"){
      if(typeof inputData === 'string'){
        this.inputSeq=inputData.toUpperCase();
      }
      else{
        throw new Error("Sequence data is not string");
      }
    }else if(inputDataType==="shiftedFrameNum"){
      this.shiftedFrameNum=inputData;
    }else if (inputDataType==="targetedPos"){
      this.inputtargetedPos=inputData;
    }else{
      throw new Error("Undefined DataType : "+inputDataType);
    }
    console.info("[Set] "+inputDataType+" : "+inputData);
    isSuccess=true;
  }catch(e){
    console.error(e);
  }finally{
    return isSuccess;
  }
};
/**
* Getter (private method)
*  : This method is private method. The public getter method is retrieveData().
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   type of data
* @return {?(string|number)} returnedData  gotten data
*
*/
inputSequence.prototype.getData_=function(getDataType)  {
  var returnedData=null;
  if(getDataType==="title"){
    returnedData=this.inputTitle;
  }else if(getDataType==="sequence"){
    returnedData=this.inputSeq;
  }else if(getDataType==="shiftedFrameNum"){
    returnedData=this.shiftedFrameNum;
  }else if(getDataType==="targetedPos"){
    returnedData=this.inputtargetedPos;
  }
  return returnedData;
};
/**
* Getter (private method)
*  : This method is private method. The public getter method is retrieveData().
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   type of data
* @return {?(Array|number)} returnedData  made data
*/
inputSequence.prototype.makeData_=function(getDataType){
  var returnedData=null;
  if(getDataType==="sequencearray"){
    returnedData=this.getData_("sequence").split("");
  }else if(getDataType==="inputTotalLen"){
    returnedData=this.getData_("sequence").length;;
  }else if(getDataType==="remainedBaseNum"){//[J]フレームも考慮にいれた標的コドンにおいて標的塩基から3'方向に余る塩基の数
    returnedData=(this.inputtargetedPos-this.shiftedFrameNum)%3;
  }
  return returnedData;
}
/**
* Get the input sequence and targeting data using KnockIn design (Public getter method)
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   type of data
* @return {?(string|Array|number)} returnedData  gotten or made data
*/
inputSequence.prototype.retrieveData=function(getDataType){
  try{
    var returnedData=null;
    returnedData=this.getData_(getDataType);
    if(returnedData===null){
      returnedData=this.makeData_(getDataType);
      if(returnedData===null){
        throw new Error("Undefined DataType or Getting feilture : "+getDataType);
      }
    }
  }catch(e){
    console.error(e);
  }
  return returnedData;
}
/**
* get complementaly base
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} inputBase     base
* @param {string} getNucType    type of nucleotide acid
* @return {string} returnedData  gotten complementaly base
*/
inputSequence.prototype.getCompBase=function(inputBase,getNucType){
  try{
    var complementBase=null;
    if(inputBase==="A"&&getNucType==="DNA"){
      complementBase="T";
    }else if(inputBase==="A"&&getNucType==="RNA"){
      complementBase="U";
    }else if(inputBase==="T"){
      complementBase="A";
    }else if(inputBase==="C"){
      complementBase="G";
    }else if(inputBase==="G"){
      complementBase="C";
    }else if(inputBase==="U"){
      complementBase="A";
    }else{
      throw new Error("Undefined nucleotide type : "+getNucType);
    }
  }catch(e){
    console.error(e);
  }
  return complementBase;
};
/**
* Confirm whether bases is same on IUB code (private method)
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} inputBase compared base
* @param {string} refBase   reference base (IUB code)
* @return {boolean} isSame    whether bases is same(true:same/false:different)
*/
inputSequence.prototype.isSameBase_=function(inputBase,refBase){
  var isSame=false;
  if((refBase==="Y")&&(inputBase==="T"||inputBase==="C"||inputBase==="U")){
    isSame=true;
  }else if((refBase==="R")&&(inputBase==="A"||inputBase==="G")){
    isSame=true;
  }else if((refBase==="M")&&(inputBase==="A"||inputBase==="C")){
    isSame=true;
  }else if((refBase==="K")&&(inputBase==="T"||inputBase==="G")){
    isSame=true;
  }else if((refBase==="S")&&(inputBase==="G"||inputBase==="C")){
    isSame=true;
  }else if((refBase==="W")&&(inputBase==="T"||inputBase==="A")){
    isSame=true;
  }else if((refBase==="B")&&(inputBase==="G"||inputBase==="C"||inputBase==="T")){
    isSame=true;
  }else if((refBase==="H")&&(inputBase==="A"||inputBase==="C"||inputBase==="T")){
    isSame=true;
  }else if((refBase==="V")&&(inputBase==="A"||inputBase==="C"||inputBase==="G")){
    isSame=true;
  }else if((refBase==="D")&&(inputBase==="A"||inputBase==="G"||inputBase==="T")){
    isSame=true;
  }else if((refBase==="N")){
    isSame=true;
  }else if(refBase===inputBase){
    isSame=true;
  }
  return isSame;setMethod
};
/**
* Translate codon into amino acid
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} inputCodon codon
* @return {string} returnedAA amino acid
*/
inputSequence.prototype.convertCodon=function(inputCodon){
  inputCodon=inputCodon.toUpperCase()
  var referenceCodon={
    "TTT":"Phe","TTC":"Phe",
    "TTA":"Leu","TTG":"Leu","CTT":"Leu","CTC":"Leu","CTA":"Leu","CTG":"Leu",
    "ATT":"Ile","ATC":"Ile","ATA":"Ile",
    "ATG":"Met",
    "GTT":"Val","GTC":"Val","GTA":"Val","GTG":"Val",
    "TCT":"Ser","TCC":"Ser","TCA":"Ser","TCG":"Ser",
    "CCT":"Pro","CCC":"Pro","CCA":"Pro","CCG":"Pro",
    "ACT":"Thr","ACC":"Thr","ACA":"Thr","ACG":"Thr",
    "GCT":"Ala","GCC":"Ala","GCA":"Ala","GCG":"Ala",
    "TAT":"Tyr","TAC":"Tyr",
    "TAA":"STOP","TAG":"STOP",
    "CAT":"His","CAC":"His",
    "CAA":"Gln","CAG":"Gln",
    "AAT":"Asn","AAC":"Asn",
    "AAA":"Lys","AAG":"Lys",
    "GAT":"Asp","GAC":"Asp",
    "GAA":"Glu","GAG":"Glu",
    "TGT":"Cys","TGC":"Cys",
    "TGA":"STOP",
    "TGG":"Trp",
    "CGT":"Arg","CGC":"Arg","CGA":"Arg","CGG":"Arg",
    "AGT":"Ser","AGC":"Ser",
    "AGA":"Arg","AGG":"Arg",
    "GGT":"Gly","GGC":"Gly","GGA":"Gly","GGG":"Gly",
  }
  var returnedAA=referenceCodon[inputCodon];
  //不明なコドンの場合は無名表記
  if(typeof(returnedAA)==="undefined"){
    returnedAA="---";
  }
  return returnedAA;
}

//designCRISPITCh class/////////////////////////////////////////////////////////
/**
* @namespace designCRISPITCh
* @constructor
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @classdesc Design sequence for CRISPITCh system
* @extends inputSequence
* @param {string} [inputTitle=no_title]        Title
* @param {string} [inputSeq]          Target sequence
* @param {number} [shiftedFrameNum=0]   Reading frame
* @param {number} [inputtargetedPos=41]  Target position
*/
var designCRISPITCh = designCRISPITCh || {};
designCRISPITCh=function(inputTitle,inputSeq,shiftedFrameNum,inputtargetedPos){
  //メンバ変数の継承
  inputSequence.call(this,inputTitle,inputSeq,shiftedFrameNum,inputtargetedPos);
  //設計オプション
  this.inputPAMpattarray=["N","G","G"];
  this.designLeftMHLen=20;
  this.designRightMHLen=20;
  this.designMHmethod="C-insertion";
  this.designPrimerType="EGFP2APuroR";
  //設計結果
  this.designedDraftMaxNum=null;
	this.designedDirection=[null];
	this.designedPAMendPos=[null];
	this.designedgRNAendPos=[null];
  this.designedCutPos=[null];
	this.designedRightMH=[null];
	this.designedRightMHEndpos=[null];
	this.designedLeftMH=[null];
	this.designedLeftMHEndPos=[null];
  //設計結果
  this.loadedSeqList ={
    "EGFP2APuroR":{
      "5fwdfore":"CCGGATCCATGGTGAGCAAGGG"
      ,"5fwdrear":"CCGCGTTACATAGCATCGTACGCGTACGTGTTTGG"
      ,"5rev":"TGCTATGTAACGCGGAACTCCATATATGGG"
      ,"3fwd":"CAAACACGTACGCGTACGATGCTCTAGAATG"
      ,"3revfore":"TCAGGCACCGGGCTTGCG"
      ,"3revrear":"ACGCGTACGTGTTTGG"
      ,"5vectorfore":"CCGGATCCATGGTGAGCAAGGGCGA"
      ,"5vectorrear":"TAGCCCATATATGGAGTTCCGCGTTACATAGCATCGTACGCGTACGTGTTTGG"
      ,"3vectorfore":"CCAAACACGTACGCGTACGATGCTCTAGAATGCTG"
      ,"3vectorrear":"ACCCGCAAGCCCGGTGCCTGA"
    },
    "CMV-EGFP2APuroR":{
      "5fwdfore":"CAGCTGGTTCTTTCCGCCTCAGAAGCC"
      ,"5fwdrear":"ACGCGTACGTGTTTGG"
      ,"5rev":"CAAACACGTACGCGTACGATGCTATGTAACGC"
      ,"3fwd":"TCTAGAATGCTGATGGGCTAGCAAAATCAGCCTC"
      ,"3revfore":"GCTTCGCGATGTACGGGCCAGATATACG"
      ,"3revrear":"CATCAGCATTCTAGAGCATCGTACGCGTACGTGTTTGG"
      ,"5vectorfore":"CAGCTGGTTCTTTCCGCCTCAGAAGCCATA"
      ,"5vectorrear":"TCCGCGTTACATAGCATCGTACGCGTACGTGTTTGG"
      ,"3vectorfore":"CCAAACACGTACGCGTACGATGCTCTAGAATGCTGATGGGCTAGCAAAATCAGCCTCGAC"
      ,"3vectorrear":"ACGCGTATATCTGGCCCGTACATCGCGAAGC"
    }
  };
};
//methodの継承
setInherits(designCRISPITCh,inputSequence);
/**
* Change the CRISPITCh design method
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {(string|Array|number)} inputData Setting value
* @param {string} inputDataType Type of data
* @return {boolean} isSuccess true:success|false:failture
*/
designCRISPITCh.prototype.setMethod=function(inputData,inputDataType){
  var isSuccess=false;
  try{
    if (inputDataType==="PAM"){
      this.inputPAMpattarray=inputData;
    }else if(inputDataType==="LeftMHlen"){
      inputData=parseInt(inputData);
      this.designLeftMHLen=inputData;
    }else if(inputDataType==="RightMHlen"){
      inputData=parseInt(inputData);
      this.designRightMHLen=inputData;
    }else if(inputDataType==="MHMethod"){
      this.designMHmethod=inputData;
    }else if(inputDataType==="PrimerType"){
      this.designPrimerType=inputData;
    }else{
      throw new Error("Undefined DataType : "+inputDataType);
    }
    console.info("[Set] "+inputDataType+" : "+inputData);
    isSuccess=true;
  }catch(e){
    console.error(e);
  }finally{
      return isSuccess;
  }
}
/**
* Check method setting.
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @return {boolean} hasAll (true:All setting is ok./false:not ok.)
*/
designCRISPITCh.prototype.hasMethod=function(){
  var hasAll=false;
  try{
    if(typeof this.inputPAMpattarray==="undefined"){
      throw new Error("this.inputPAMpattarray is 'undefined':"+this.inputPAMpattarray);
    }else if(typeof this.designLeftMHLen==="undefined"){
      throw new Error("this.designLeftMHLen is 'undefined':"+this.designLeftMHLen);
    }else if(typeof this.designRightMHLen==="undefined"){
      throw new Error("this.designRightMHLen is 'undefined':"+this.designRightMHLen);
    }else if(typeof this.designMHmethod==="undefined"){
      throw new Error("this.designMHmethod is 'undefined':"+this.designMHmethod);
    }else if(typeof this.designPrimerType==="undefined"){
      throw new Error("this.designPrimerType is 'undefined':"+this.designPrimerType);
    }else{
      hasAll=true;
    }
  }catch(e){
    console.error(e);
  }finally{
    console.info("[Check] hasMethod() judge : "+hasAll);
    return hasAll;
  }
}
/**[J]
* Get the CRISPITCh design method
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   Type of data
* @return {?(string|Array|number)} returnedData  Gotten data
*/
designCRISPITCh.prototype.getMethod=function(getDataType){
  try{
    var returnedData=null;
    if (getDataType==="PAM"){
      returnedData=this.inputPAMpattarray;
    }else if(getDataType==="LeftMHlen"){
      returnedData=this.designLeftMHLen
    }else if(getDataType==="RightMHlen"){
      returnedData=this.designRightMHLen
    }else if(getDataType==="MHMethod"){
      returnedData=this.designMHmethod
    }else if(getDataType==="PrimerType"){
      returnedData=this.designPrimerType
    }else{
      throw new Error("Undefined DataType or Getting feilture : "+getDataType);
    }
  }catch(e){
    console.error(e);
  }
  return returnedData
}


/**
* Enter the CRISPITCh design result
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string|number} inputData Setting value
* @param {string} inputDataType   Type of data
* @param {number} designedDraftNo id number in design dataset
* @return {boolean} isSuccess       true:success|false:failture
*/
designCRISPITCh.prototype.setDesign=function(inputData,inputDataType,designedDraftNo){
  var isSuccess=false;
  try{
    if(inputDataType==="DraftMaxNum"){
      this.designedDraftMaxNum=inputData;
    }else if(inputDataType==="Direction"){
      this.designedDirection[designedDraftNo]=inputData;
    }else if(inputDataType==="PAMendPos"){
      this.designedPAMendPos[designedDraftNo]=inputData;
    }else if (inputDataType==="gRNAendPos"){
      this.designedgRNAendPos[designedDraftNo]=inputData;
    }else if (inputDataType==="CutPos"){
      this.designedCutPos[designedDraftNo]=inputData;
    }else{
      throw new Error("Undefined DataType : "+inputDataType);
    }
    console.info("[Set] "+inputDataType+" ["+designedDraftNo+"] : "+inputData);
    isSuccess=true;
  }catch(e){
    console.error(e);
    isSuccess=false;
  }finally{
    return isSuccess;
  }
}
/**
* Clear the CRISPITCh design result
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @return {boolean} true:success|false:failture
*/
designCRISPITCh.prototype.clearDesign=function(){
  var isSuccess=false;
  this.designedDraftMaxNum=null;
  for(var pointDelDraft=0,len=this.designedDirection.length;pointDelDraft<len;pointDelDraft++){
    this.designedDirection[pointDelDraft]=null;
    this.designedPAMendPos[pointDelDraft]=null;
    this.designedgRNAendPos[pointDelDraft]=null;
    this.designedCutPos[pointDelDraft]=null;
  }
  isSuccess=true;
  return isSuccess;
}
/**[J]
* Getter of the CRISPITCh design result(private method)
*  : This method is private method. The public getter method is retrieveDesign().
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   Type of data
* @param {number} designedDraftNo id number in design dataset
* @return {?(string|number)} returnedData  gotten data
* @todo Implement default value of DraftMaxNum.
*/
designCRISPITCh.prototype.getDesign_=function(getDataType,designedDraftNo){
  var returnedData=null;
  if((getDataType==="DraftMaxNum")&&(typeof this.designedDirection !== "undefined")){
    //getDataType:"DraftMaxNum" is not Array object.So "designedDraftNo" is not necessary.
    returnedData=this.designedDraftMaxNum;
  }else if((getDataType==="Direction")&&(typeof this.designedDirection !== "undefined")){
    returnedData=this.designedDirection[designedDraftNo];
  }else if((getDataType==="PAMendPos")&&(typeof this.designedPAMendPos !== "undefined")){
    returnedData=this.designedPAMendPos[designedDraftNo];
  }else if((getDataType==="gRNAendPos")&&(typeof this.designedgRNAendPos !== "undefined")){
    returnedData=this.designedgRNAendPos[designedDraftNo];
  }else if((getDataType==="CutPos")&&(typeof this.designedgRNAendPos !== "undefined")){
    returnedData=this.designedCutPos[designedDraftNo];
  }
  return returnedData
};
/**[J]
* Make CRISPITCh design based on setting (private method)
*  : This method is private method. The public getter method is retrieveDesign().
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} makeDataType    Type of data
* @param {number} designedDraftNo id number in design dataset
* @return {?(string|Array|number)} returnedData    made data
*/
designCRISPITCh.prototype.makeDesign_=function(makeDataType,designedDraftNo){
  var returnedData=null;
  if(makeDataType==="gRNAbindingarray"){
    if(this.designedDirection[designedDraftNo]==="plus"){
      var returnedData=this.retrieveData("sequencearray").slice(
        this.designedgRNAendPos[designedDraftNo]+1
        ,this.designedPAMendPos[designedDraftNo]+1
      );
    }else if(this.designedDirection[designedDraftNo]==="minus") {
      var returnedData=this.retrieveData("sequencearray").slice(
        this.designedPAMendPos[designedDraftNo]
        ,this.designedgRNAendPos[designedDraftNo]
      );
    }
  }else if(makeDataType==="LeftMHarray"){
    var startedPos=null;
    var endedPos=null;
    //codon-deletion pattern
    //選択部位のコドンを削除してmicrohomologyを構築
    if(this.designMHmethod==="codon-deletion"){
      endedPos=this.retrieveData("targetedPos",designedDraftNo)-this.retrieveData("remainedBaseNum");
      startedPos=endedPos-this.designLeftMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
    }else if(this.designMHmethod==="C-insertion"){
      //C-insertion pattern
      //選択部位から次のコドンまでをCでうめてmicrohomologyを構築
      endedPos=this.retrieveData("targetedPos",designedDraftNo);
      startedPos=endedPos-this.designLeftMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
      for(var pushedCount=0,len=(3-this.retrieveData("remainedBaseNum"));pushedCount<len;pushedCount++){
        returnedData.push("C");
      }
    }
    //ドナー側のコドン調整
    returnedData.push("C");
  }else if(makeDataType==="LeftMHarrayOnly"){
    var startedPos=null;
    var endedPos=null;
    //codon-deletion pattern
    //選択部位のコドンを削除してmicrohomologyを構築
    if(this.designMHmethod==="codon-deletion"){
      endedPos=this.retrieveData("targetedPos",designedDraftNo)-this.retrieveData("remainedBaseNum");
      startedPos=endedPos-this.designLeftMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
    }else if(this.designMHmethod==="C-insertion"){
      //C-insertion pattern
      //選択部位から次のコドンまでをCでうめてmicrohomologyを構築
      endedPos=this.retrieveData("targetedPos",designedDraftNo);
      startedPos=endedPos-this.designLeftMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
    }
  }else if(makeDataType==="RightMHarray"){
    var startedPos=null;
    var endedPos=null;
    //codon-deletion pattern
    if(this.designMHmethod==="codon-deletion"){
      startedPos=this.retrieveData("targetedPos",designedDraftNo)+(3-this.retrieveData("remainedBaseNum"));
      endedPos=startedPos+this.designRightMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
    }else if(this.designMHmethod==="C-insertion"){
      //C-insertion pattern
      startedPos=this.retrieveData("targetedPos",designedDraftNo)+(3-this.retrieveData("remainedBaseNum"));
      endedPos=startedPos+this.designRightMHLen;
      var returnedData=this.retrieveData("sequencearray").slice(startedPos,endedPos);
    }
  }else if(makeDataType==="Seq"){
    var returnedData=this.retrieveData("sequencearray").slice(
      this.retrieveData("targetedPos")-48-this.retrieveData("remainedBaseNum")
      ,this.retrieveData("targetedPos")-48-this.retrieveData("remainedBaseNum")+96
    );
  }else if(makeDataType==="5fwdprimer"){
    var pushedForeSeq=this.loadedSeqList[this.designPrimerType]["5fwdfore"].split("");
    var pushedRearSeq=this.loadedSeqList[this.designPrimerType]["5fwdrear"].split("");
    Array.prototype.push.apply(pushedRearSeq, this.retrieveDesign('LeftMHarray',designedDraftNo));
    Array.prototype.push.apply(pushedRearSeq, pushedForeSeq);
    var returnedData=pushedRearSeq;
  }else if(makeDataType==="5revprimer"){
    var returnedData=this.loadedSeqList[this.designPrimerType]["5rev"].split("");
  }else if(makeDataType==="3fwdprimer"){
    var returnedData=this.loadedSeqList[this.designPrimerType]["3fwd"].split("");
  }else if(makeDataType==="3revprimer"){
    var pushedForeSeq=this.loadedSeqList[this.designPrimerType]["3revfore"].split('');
    var pushedRearSeq=this.loadedSeqList[this.designPrimerType]["3revrear"].split('');
    var revcompRightMHarray=this.retrieveDesign('RightMHarray',designedDraftNo).reverse()
    for(var i=0; i<revcompRightMHarray.length; i++){
      revcompRightMHarray[i]=this.getCompBase(revcompRightMHarray[i],"DNA")
    }
    Array.prototype.push.apply(pushedRearSeq, revcompRightMHarray);
    Array.prototype.push.apply(pushedRearSeq, pushedForeSeq);
    var returnedData=pushedRearSeq;
  }else if(makeDataType==="5vector"){
    var pushedForeSeq=this.loadedSeqList[this.designPrimerType]["5vectorfore"].split('');
    var pushedRearSeq=this.loadedSeqList[this.designPrimerType]["5vectorrear"].split('');
    Array.prototype.push.apply(pushedRearSeq, this.retrieveDesign('LeftMHarray',designedDraftNo));
    Array.prototype.push.apply(pushedRearSeq, pushedForeSeq);
    var returnedData=pushedRearSeq;
  }else if(makeDataType==="3vector"){
    var pushedForeSeq=this.loadedSeqList[this.designPrimerType]["3vectorfore"].split('');
    var pushedRearSeq=this.loadedSeqList[this.designPrimerType]["3vectorrear"].split('');
    Array.prototype.push.apply(pushedRearSeq, this.retrieveDesign('RightMHarray',designedDraftNo));
    Array.prototype.push.apply(pushedRearSeq, pushedForeSeq);
    var returnedData=pushedRearSeq;
  }
  return returnedData;
}
/**[J]
* Get CRISPITCh design (Public getter method)
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {string} getDataType   type of data
* @param {number} designedDraftNo id number in design dataset
* @return {?(string|Array|number)} returnedData  gotten or made data
*/
designCRISPITCh.prototype.retrieveDesign=function(getDataType,designedDraftNo){
  try{
    var returnedData=null;
    returnedData=this.getDesign_(getDataType,designedDraftNo);
    if(returnedData===null){
      returnedData=this.makeDesign_(getDataType,designedDraftNo);
      if(returnedData===null){
        throw new Error("Undefined DataType or Getting feilture : "+getDataType);
      }
    }
  }catch(e){
    console.error(e);
  }
  return returnedData;
}
/**[J]
* Check design result.
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {number} designedDraftNo id number in design dataset
* @param {Array} exeptedDataList exception
* @return {boolean} hasAll          (true:All setting is ok./false:not ok.)
*/
designCRISPITCh.prototype.hasAllDesign=function(designedDraftNo,exeptedDataList){
  var hasAll=true;
  //Some console function changed to null function temporarily.
  var stockedLog=window.console.log
  var stockedWarn=window.console.warn
  var stockedError=window.console.error
  window.console.log = function(i){return;};
  window.console.warn = function(i){return;};
  window.console.error = function(i){return;};
  //Checking
  var checkedDataList=["Direction","PAMendPos","gRNAendPos","CutPos"
    ,"gRNAbindingarray","LeftMHarray","RightMHarray","Seq"
    ,"5fwdprimer","5revprimer","3fwdprimer","3revprimer","5vector","3vector"];
  //例外にはいっていないnullをもつデータを検索する。
  for(var pointedCheckedNum=0,len=checkedDataList.length;pointedCheckedNum<len;pointedCheckedNum++){
    if(this.retrieveDesign(checkedDataList[pointedCheckedNum],designedDraftNo)===null){
      if(exeptedDataList.indexOf(checkedDataList[pointedCheckedNum])==-1){
        //For debug
        //console.info(checkedDataList[pointedCheckedNum]+"["+designedDraftNo+"] : "+this.retrieveDesign(checkedDataList[pointedCheckedNum],designedDraftNo));
        hasAll=false;
      }
    }
  }
  console.info("[Check] hasAllDesign() judge : "+hasAll);
  window.console.log = stockedLog;
  window.console.warn = stockedWarn;
  window.console.error = stockedError;
  return hasAll;
}
/**[J]
* Recognize PAM sequence
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {number} searchPos       search point on "sequencearray"
* @param {string} designDirection Direction of gRNA sequences("plus":sence/"minus":antisence)
* @return {boolean} isPAM           whether the point is PAM sequence
* createDesign()の補助メソッド
* searchPosをPAM5'末端としてPAM領域の塩基と合致するか調べる。
*/
designCRISPITCh.prototype.recognizePAM_=function(searchPos,designDirection){
  var isPAM=true;
  for(var pointPAMPos=0,len=this.inputPAMpattarray.length;pointPAMPos<len;pointPAMPos++){
    if((designDirection==="plus")
        &&(!(this.isSameBase_(this.retrieveData("sequencearray")[searchPos+pointPAMPos],this.inputPAMpattarray[pointPAMPos])))
      ||((designDirection==="minus")
        &&(!(this.isSameBase_(this.getCompBase(this.retrieveData("sequencearray")[searchPos-pointPAMPos],"DNA"),this.inputPAMpattarray[pointPAMPos]))))
    ){
      isPAM=false;
      break;
    }
  }
  return isPAM;
}
/**[J]
* search dgRNA for CRISPITCh
* searching PAM 5' end is the point of searchPos.
* searching range is from -6bp to +6bp.
* @author Kazuki Nakamae
* @version 1.0
* @since 1.0
* @param {number} requestedDraftNum the required number of design
* @return {boolean} hasgRNA whether sgRNA can design
*/
designCRISPITCh.prototype.createDesign=function(requestedDraftNum){
  //The default arguments
  if(typeof requestedDraftNum==="undefined"){
    requestedDraftNum=10000;
  }
  console.info("[Note] The maximum draft number : "+requestedDraftNum);
  var hasgRNA=false;
  //PAMの検索
  var countSetData=0;
	for(var targetedPosDelta=0;targetedPosDelta<6;targetedPosDelta++){
		//3'側検索
		if(this.recognizePAM_(this.inputtargetedPos+targetedPosDelta,"plus")){
      //gRNA設計
      this.setDesign(this.inputtargetedPos+targetedPosDelta+this.inputPAMpattarray.length-1,"PAMendPos",countSetData);
      this.setDesign("plus","Direction",countSetData);
      this.setDesign(this.getDesign_("PAMendPos",countSetData)-this.inputPAMpattarray.length-20,"gRNAendPos",countSetData);
      this.setDesign(this.inputtargetedPos+targetedPosDelta-3,"CutPos",countSetData);
      if(this.hasAllDesign(countSetData,["Seq"])===true){
        console.info("[Note] "+(countSetData+1)+" Design is complete.");
        hasgRNA=true;
        this.setDesign(countSetData,"DraftMaxNum",countSetData);
        countSetData++;
        if(countSetData>=requestedDraftNum){
          break;
        }
      }
		}
		//5'側検索
		else if(this.recognizePAM_(this.inputtargetedPos-targetedPosDelta,"minus")){
      //gRNA設計
      this.setDesign(this.inputtargetedPos-targetedPosDelta-(this.inputPAMpattarray.length-1),"PAMendPos",countSetData);
      this.setDesign("minus","Direction",countSetData);
      this.setDesign(this.getDesign_("PAMendPos",countSetData)+this.inputPAMpattarray.length+20,"gRNAendPos",countSetData);
      this.setDesign(this.inputtargetedPos-targetedPosDelta+3,"CutPos",countSetData);
        if(this.hasAllDesign(countSetData,["Seq"])===true){
          console.info("[Note] "+(countSetData+1)+" Design is complete.");
          hasgRNA=true;
          this.setDesign(countSetData,"DraftMaxNum",countSetData);
          countSetData++;
          if(countSetData>=requestedDraftNum){
            break;
          }
        }
    }
	}
	if(hasgRNA==false){
		console.info("gRNA can not be designed.");
	}
	return hasgRNA;
};
