#KnockIn.js

KnockIn.js implements an algorithm to design gRNA targeting sequence and homology arm for KnockIn. It can be used in the browser.

Translated:  
KnockIn.jsではウェブブラウザ上で動作するようなKnockIn用のguideRNAおよびhomologyarm配列検索アルゴリズムを実装しています。

##Download

##Simple Exsample

html  
    <!DOCTYPE html>
    <head>
     <meta charset="utf-8"/>
     <title>KnockIn.js Demo</title>
     <script src="KnockIn-v1.0.7.js"></script>
    </head>
    <body>
     <header>
      <h1>KnockIn.js Demo</h1>
      <h2>OUTPUT</h2>
    </header>
    <p id="designedNum"> </p><br>
    <p id="gRNA"> </p><br>
    <p id="PAM direction"> </p><br>
    <p id="left(5'end) homology arm"> </p><br>
    <p id="right(3'end) homology arm"> </p><br>
    <p>The primers of targeting vector construction<br>5'end</p><br>
    <p id="5ForwardPrimer"> </p><br>
    <p id="5reversePrimer"> </p><br>
    <p>3'end</p><br>
    <p id="3ForwardPrimer"> </p><br>
    <p id="3ReversePrimer"> </p>
    </body>
    </html>
