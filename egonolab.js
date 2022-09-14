// variables de position de l'observateur
var maDate = new Date();
var maLatitude = 40.5;
var maLongitude = 1.5;

// variable de graphisme
largeurFrame = 396;
hauteurFrame = 485;
echelle = 1 ; 
hauteurSoleil = 0 ; // si c'est négatif, c'est la nuit !
azimuthSoleil = 0;

// pattern d'affichage
modeCouleur = true;
modeNuit = false ;
modeWatch = true ;
modeZodiac = '';
modeBouton = true;
modeConstellation = false;
sablier = 50 ; // pour mettre en oeuvre un fader sur les boutons

// variable de données à afficher
planete = new Array();

// Variable de temps
  monANNEE = 0 ;
  monMOIS = 0;
  monJOUR = 0;
  monHEURE = 0;
  maMINUTE = 0;
  maSECONDE = 0;
  monDECALAGEHORAIRE = 2;
  legendeMONTRE = ""

  voyage = 'STOP'; // MINUTE, JOUR
// nombre d'étoiles affichées en mouvement.
nbEtoile = 2000;


//

function showPosition(position) {
  obsLatitude = Math.trunc(position.coords.latitude*1000)/1000;
  obsLongitude = Math.trunc(position.coords.longitude*1000)/1000;
}

function setup() {
  charge_9kStars();
  chargeConstellations();
  maDate = new Date();
  
  if (navigator.geolocation) {   
  navigator.geolocation.getCurrentPosition(showPosition);
  print ("location : " + obsLatitude + " / " + obsLongitude);
  } else {    
      obsLatitude = 45.46 ;
  obsLongitude = 2.174;
  }
  
  angleMode(RADIANS);
  chargeDeltaT();
  largeurFrame = windowWidth;
  hauteurFrame = windowHeight;
  
  print ("Screen : " + largeurFrame + "x" + hauteurFrame)
  if (largeurFrame < 700) modeWatch = true
  else (modeWatch = false)
  if (hauteurFrame > largeurFrame)modeWatch = true

  
  canvas = createCanvas(largeurFrame, hauteurFrame);
  canvas.mouseClicked(clicSimple);
  canvas.doubleClicked(doubleClique);
  setLieuPGJ (maLatitude, maLongitude); // définit le lieu
  setPlanetes();
    egoDate = new Date();
   voyage = "MAINTENANT"
   setDate();
   voyage = "STOP"
}





function draw() {
 //0. le fond
  background('BLACK')

  
  
  
//1. calcul l'éphémeride des planetes
 setDate();
 calculerEPHEMERIDE(monJOUR,monMOIS,monANNEE,monHEURE,maMINUTE,maSECONDE);
  
//2. définition des constantes de dessin
  tailleCouronne =15;
  nombreCouronne = 2 ;
  if (modeWatch) {
    nombreCouronne = 1;
    tailleCouronne = 30;
  }
  marge = 0;
  echelle = min(largeurFrame,hauteurFrame) / (360 + tailleCouronne*(nombreCouronne+1) + marge);
  strokeWeight(0.1);
  // translation au centre (on centre gauche droite, mais on aligne en haut)
  decalageX = largeurFrame/2;
  decalageY = hauteurFrame/2 ;
  
  
//3. mise en place du repère et de l'echelle  
  translate(decalageX,hauteurFrame-Math.min(decalageY,decalageX));
  // mise à l'échelle pour qu'un cercle de 180 + bordures tienne
  scale (echelle,echelle);
  // rotation de PI pour mettre le 0 en haut et pas en BAS. donc, le NORD est en HAUT...
  rotate(PI);
  
//4. dessin du fond  avec les bagues
  if (!modeNuit)fill(255,204,77,100)
  if (modeNuit)fill(255,0,0,50)
  circle(0,0,360 + nombreCouronne*tailleCouronne);
  
  stroke (0);
  if (modeNuit)stroke ('RED');
  for (n = nombreCouronne; n > 0 ; n--){
    circle(0,0,360 + n * tailleCouronne);
   } 
  
// 3. le disque égonométrique
  dessineDisque(modeOrientation); // ou 'SOLEIL' ou 'SUD' est définit dans la zone de clic n°2
  

  
  
//5. affiche le texte dans le centre  
  textFont("Georgia");
  noStroke();
  
  if (!modeWatch){
    fill(150);
    if (modeCouleur)fill('WHITE')
    if (modeNuit)fill(220,0,0,100);
 
    textePolaireDegre(legendeJOUR + " - " + legendeHEURE + " (UTC+" + monDECALAGEHORAIRE+")", 0, 83,6);
    fill(110);
    if (modeCouleur)fill('WHITE')
    if (modeNuit)fill('RED')
    textePolaireDegre(legendeLIEU, 0, 75, 7);
    textePolaireDegre("EGONOLAB - © - ", 97, 9, 6);
  }
  
    if (modeWatch){
      if (voyage == 'STOP'){
    fill(110);
    if (modeCouleur)fill('WHITE')
    if (modeNuit)fill(255,0,0,150)
    textePolaireDegre(legendeLIEU, 5, 65, 7);
    textePolaireDegre("EGONOLAB ©", 5, 75, 8);
      textePolaireDegre(  "(UTC+"+monDECALAGEHORAIRE+")",5,55,7)
    }
  }
  
  
 
// 6. affiche les boutons
  if (modeBouton) afficheBoutons(); 

  //7. remise à l'echelle 1
    scale (1/echelle,1/echelle);

  
//8. Affiche le TITRE en mode WATCH
if (modeWatch){
  decY = - largeurFrame / 2 - (hauteurFrame - largeurFrame) /2 
  tailleTexte = 70 /500 * largeurFrame;
  textFont("Georgia");
  textAlign(CENTER);
  if (!modeNuit) fill('WHITE');
  if (modeNuit) fill(220,0,0,100);
  noStroke();
  textSize (tailleTexte);
  rotate (PI);
    translate(0,decY);
      text(legendeHEUREcourte, 0, tailleTexte/3);
      textSize (tailleTexte/4);
      text(legendeJOUR, 0, tailleTexte/1.4);
      text (modeZodiac,0,tailleTexte/1);
    translate(0,-decY);
  
  rotate (-PI);
}
  
  // ------------------------------
  // et remise à l'échelle  
  // scale (1/echelle,1/echelle);
  // et remise à en haut à droite
  translate(-decalageX,-hauteurFrame-decalageX);
  

  if (sablier > 0 )    sablier-- ;
  else {
    modeBouton = false;
    sablier = 0;
  }
 // print (sablier)
}


// --------------------------------------------
// DISQUE AVEC LES CERCLES,PLANETES et ETOILES 
// --------------------------------------------

function dessineDisque(orientation){
  
  //0. rotation de la page
  angleDisque = PI
  if (orientation == 'SUD') angleDisque = PI
  if (orientation == 'NORD') angleDisque = 0
  if (orientation == 'SOLEIL') angleDisque = -planete[0][8] /180 * PI;
  rotate (angleDisque) 
   
  //1. Dessin du fond
  fill(0);
  circle (0,0,360); // le centre 
  if (modeCouleur) dessineCiel(hauteurSoleil,azimuthSoleil);
  
  //1. dessine voute céleste
  dessineVouteCeleste ();
//  c_PETITEOURSE();
  
  // texte des constellations
  if (modeConstellation) dessineConstellation();
  
  //2. Rose des vents
   dessineRoseVents();
    
  //3. affiche les plantetes
  for (n = 0 ; n < planete.length ; n++) dessinePlanete(n);
  
  
  //4. dessin des 3 cercles
  // le zenith
  stroke(0);
  if (modeCouleur)stroke('WHITE')
  if (modeNuit) stroke(255,0,0,120)
  noFill();
  circle (0,0,360); 
  
  // le nadir
  stroke(255);
  if (modeCouleur)stroke('WHITE')
  if (modeNuit) stroke(255,0,0,120)
  noFill();
  circle (0,0,2); 

  // horizon
  stroke(155);
  if (modeCouleur)stroke('WHITE')
  if (modeNuit) stroke(255,255,255,120)
  noFill();
  circle (0,0,180); 
  
  // terre
  desineTerre();
  
  // dessin un arc entre deux étoiles
  dessineCouronneEtoile(25,12);
//dessineLettreF(0,-25,50)

  //4. BAGUES DES ZODIACS
  // ------------------ 
  if (modeZodiac == 'EQUATORIAL') dessineCadranZodiacEquatorial();
  if (modeZodiac == 'TROPICAL')  dessineCadranZodiacTropical();
  
    
  //5. remise à l'angle original
  rotate (-angleDisque) 
}



function printConsole(){ // affiche l'ephemeride des plantetes
  tailleTexte = 8; 
  textSize(tailleTexte);
  fill('RED')
  for (n = 0 ; n < listing.length ; n++){
    text(listing[n],10,(tailleTexte*1.1)*(1+n) );
  }
}





function setDate(){
  if (voyage == 'MINUTE') maDate.setSeconds(maSECONDE +30) ;
  if (voyage == 'MINUTEretour') maDate.setSeconds(maSECONDE -30) ;
  if (voyage == 'HEURE') maDate.setMinutes(maMINUTE +10) ;
  if (voyage == 'HEUREretour') maDate.setMinutes(maMINUTE -10) ;
  if (voyage == 'JOUR') maDate.setDate(monJOUR +1) ;
  if (voyage == 'JOURretour') maDate.setDate(monJOUR -1) ;
  if (voyage == 'MAINTENANT')  {
    maDate = new Date();
    maDate.setHours(maDate.getHours()-monDECALAGEHORAIRE);
  }
  
  monANNEE = maDate.getFullYear();
  monMOIS = maDate.getMonth()+1;
  monJOUR = maDate.getDate();
  monHEURE = maDate.getHours();
  maMINUTE = maDate.getMinutes();
  maSECONDE = maDate.getSeconds();
}


