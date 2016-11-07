/*!
 * knockinjs-v1.0.js
 * Copyright 2016 Kazuki Nakamae
 * Licensed under the MIT license
 */
"use strict";
//function//////////////////////////////////////////////////////////////////////

/**[J]
* 擬似クラス継承用プロトタイプチェーン指定
* @param {Function} childCtor  子クラスのコンストラクタ
* @param {Function} parentCtor 親クラスのコンストラクタ
*/
var setInherits=function(childCtor,parentCtor) {
  Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

//inputSequence class///////////////////////////////////////////////////////////
/**
* Namespace
*/
var inputSequence = inputSequence || {};
/**
* Constructor
* @param {StringGlobalObject} inputTitle        タイトル
* @param {StringGlobalObject} inputSeq          読み込み配列
* @param {Number} shiftedFrameNum   フレームの読み枠(0-2)
* @param {Number} inputtargetedPos  標的塩基の番号
*/
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
    this.inputtargetedPos=0;
  }else{
    this.inputtargetedPos=inputtargetedPos;
  }
  console.info("[Set] this.inputtargetedPos : "+this.inputtargetedPos);
};
/**[J]
* Setter
* @param  {StringGlobalObject_or_Number} inputData 入力データ
* @param  {StringGlobalObject} inputDataType 入力データの種類
* @return {Boolean} isSuccess 正しい処理がなされたかどうかを返す。(true:正常終了/false:異常終了)
*/
inputSequence.prototype.setData=function(inputData,inputDataType)  {
  var isSuccess=false;
  try{
    if(inputDataType==="title"){
      this.inputTitle=inputData;
    }else if(inputDataType==="sequence"){
      this.inputSeq=inputData.toUpperCase();
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
/**[J]
* Getter (private method)
* @param {StringGlobalObject} getDataType   取得データの種類
* @return {StringGlobalObject_or_Number_or_null} returnedData  取得したデータ
* このメソッドはpublicとして扱わない。publicなGetterはretrieveData()とする。
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
/**[J]
* setData()で得たデータから作成できるデータを返す
* @param {StringGlobalObject} getDataType   作成データの種類
* @return {ArrayGlobalObject_or_Number_or_null} returnedData  作成したデータ
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
/**[J]
* 入力データを取得はまたは加工したものを返す (Public getter method)
* @param {StringGlobalObject} getDataType   作成データの種類(String global object)
* @return {StringGlobalObject_or_ArrayGlobalObject_or_Number_or_null} returnedData  作成したデータ
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
/**[J]
* 相補的な塩基を取得する
* @param {StringGlobalObject} inputBase     入力した塩基(A,T,C,G,U)
* @param {StringGlobalObject} getNucType    相補的な核酸塩基の種類(DNA or RNA)
* @return {StringGlobalObject} returnedData  相補的な塩基(A,T,C,G,U)
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
/**[J]
* 塩基が同じ種類かどうか比較する
* @param {StringGlobalObject} inputBase 比較対象塩基(A,T,C,G,U)
* @param {StringGlobalObject} refBase   相参照塩基(RやKなどの複合的な表記を含む)
* @return {Boolean} isSame    同じであるかどうかの判定(true:同じ/false:異なる)
* 柔軟な仕様とは考えていないためprivate methodとする
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
/**[J]
* コドン翻訳を行う
* @param {StringGlobalObject} inputCodon 入力コドン(A,T,C,G,a,t,c,g)
* @return {StringGlobalObject} returnedAA 翻訳されたアミノ酸
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
* Namespace
*/
var designCRISPITCh = designCRISPITCh || {};
/**
* Constructor
* @param {StringGlobalObject} inputTitle        タイトル,inputSequenceからの継承
* @param {StringGlobalObject} inputSeq          PITChを適用するシーケンス,inputSequenceからの継承(A,T,C,G)
* @param {Number} shiftedFrameNum   フレームの読み枠,inputSequenceからの継承(0-2)
* @param {Number} inputtargetedPos  標的塩基の番号,inputSequenceからの継承
*/
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
* 設計オプションのSetter
* @param {StringGlobalObject_or_ArrayGlobalObject_or_Number} inputData 入力データ
* @param {StringGlobalObject} inputDataType 入力データの種類
* @return {Boolean} isSuccess 正しい処理がなされたかどうかを返す。(true:正常終了/false:異常終了)
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
* 設計オプションがすべて入力されているかチェックする
* @return {Boolean} hasAll すべてあるかどうか(true:ある/false:なし)
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
* 設計オプションのGetter
* @param {StringGlobalObject} getDataType   取得データの種類(String global object)
* @return {StringGlobalObject_or_ArrayGlobalObject_or_Number_or_null} returnedData  取得したデータ
* このメソッドはpublicとして扱わない。publicなGetterはretrieveData()とする。
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
* 設計結果のSetter
* @param {StringGlobalObject_or_Number} inputData 入力データ
* @param {StringGlobalObject} inputDataType   入力データの種類
* @param {Number} designedDraftNo 設計候補の番号
* @return {Boolean} isSuccess       正しい処理がなされたかどうかを返す。(true:正常終了/false:異常終了)
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
* 設計結果の消去
* @return {Boolean} isSuccess 正しい処理がなされたかどうかを返す。(true:正常終了/false:異常終了)
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
* 設計結果のGetter (private method)
* @param {StringGlobalObject} getDataType   取得データの種類
* @param {Number} designedDraftNo 設計候補の番号
* @return {StringGlobalObject_or_Number_or_null} returnedData  取得したデータ
* このメソッドはpublicとして扱わない。publicなGetterはretrieveDesign()とする。
* getDataTypeが"DraftMaxNum"である場合、このメンバは配列オブジェクトではないためdesignedDraftNoは何であってもよい
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
* 設計結果をもとに指定されたデータを作成する
* @param {StringGlobalObject} makeDataType    作成データの種類
* @param {Number} designedDraftNo 設計候補の番号
* @return {StringGlobalObject_or_ArrayGlobalObject_or_Number_or_null} returnedData    作成したデータ
* このメソッドはpublicとして扱わない。publicなGetterはretrieveDesign()とする。
* getDataTypeが"DraftMaxNum"である場合、このメンバは配列オブジェクトではないためdesignedDraftNoは何であってもよい
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
    Array.prototype.push.apply(pushedRearSeq, this.retrieveDesign('RightMHarray',designedDraftNo));
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
* 設計結果を取得はまたは加工したものを返す (Public getter method)
* @param {StringGlobalObject} getDataType   作成データの種類(String global object)
* @param {Number} designedDraftNo 設計候補の番号
* @return {StringGlobalObject_or_ArrayGlobalObject_or_Number_or_null} returnedData  作成したデータ
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
* 設計されたデータが一式そろっているか確認する
* @param {Number} designedDraftNo 設計候補の番号
* @param {ArrayGlobalObject} exeptedDataList 確認する上での例外リスト(Array global object)
* @return {Boolean} hasAll          全てをもっているかどうか(true:ある/false:ない)
* 候補番号をもたないので"DraftMaxNum"はこのチェックにおいては例外となる
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
* PAM配列を認識する
* @param {Number} searchPos       設計候補の番号
* @param {StringGlobalObject} designDirection 設計するgRNAの方向("plus":sence/"minus":antisence)
* @return {Boolean} isPAM           PAMであるかどうか(true:ある/false:ない)
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
* 標的塩基周辺でPITCh用のgRNAの配列設計を行う
* @param {Number} requestedDraftNum 設計する数
* @return {Boolean} hasgRNA gRNAが設計できたかどうか (戻り値:true:できた/false:できなかった)
* createDesign()の補助メソッド
* searchPosをPAM5'末端としてPAM領域の塩基と合致するか調べる。
* 導入部位を起点としてrecognizePAM_()でPAMとの合致が確認される部位を前後6bpにわたって調べる(5'方向は-NGG|3'方向はCCN-で検索)
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
