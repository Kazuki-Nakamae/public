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
//show result
document.getElementById("result").innerHTML=writtenHTML;
