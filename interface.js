// VARIABLES

// les compteurs de clic.
clicJour = 0;
clicMinute = 0;
clicHeure = 0;
clicDoubleClic = 1 ;
clicZodiac = 1;
clicNuit = 1;
clicConstellation = 1;


// les compteurs de début pour afficher l'aide
clicDebut = 0;
clicOrientation = 1;

// Affichage
afficheListing = false;
modeOrientation = 'SUD';


// pavage BOUTONS
    /*
     c0  c1   c2  c3
l0  --------------  
      0 |  1 | 2
l1  ----+----+----  
      3 |  4 | 5
l2  ----+----+----
      6 |  7 | 8
l3  ----+----+----
      9 | 10 | 11
l4  ----+----+----   
  */
ligne   = new Array(-250 ,-180,-60,60,180)
colonne = new Array (-180,-60,60,180)
bouton = new Array ('Zodiac',
                   'Night mode',
                   'Help',
                   'Days -',
                   'Orientation',
                   'Days +',
                   'Time --',
                   'Now',
                   'Time ++',
                   'Time -',
                   'Constellation',
                   'Time +');

function clicSimple(){
  v= createVector (mouseX,mouseY);
 
  partieGauche  = false
  partieDroite  = false
  partieMilieu  = false
  
  partieTitre   = false
  partieHaute   = false
  partieBasse   = false
  partieHorizon = false
  
  numeroZone = 0 ; 
  
  // 1 . calcul du décentrement (en rapport à 180 qui est le rayon)
  largeurFrame = windowWidth;
  hauteurFrame = windowHeight;
  ligne   = new Array( 360 - hauteurFrame ,-180,-60,60,180)
  colonne = new Array (-180,-60,60,180)
  decalageVertical = hauteurFrame - Math.min(largeurFrame,hauteurFrame);
  decalageHorizontal = largeurFrame/2 - Math.min(largeurFrame,hauteurFrame)/2;

  
  v.y -= decalageVertical ;
  v.x -= decalageHorizontal ;
  // mise à l'échelle
  v.x /= echelle;
  v.y /= echelle;
  
  // recentrement
  v.x -= 180 ;
  v.y -= 180 ;
    print ("recallé X:" + v.x + " Y:"+v.y)

  
  // 2. définition de la zone de clic (hors disque)
    if (v.x > colonne[2] )      { partieDroite = true;}
    if (v.x < colonne[1])      { partieGauche = true;}
    if (v.x > colonne[1] && v.x < colonne[2]  ){ partieMilieu = true;}
    
    if (v.y < ligne[1]) { partieTitre = true;} 
    if (v.y > ligne[1] && v.y < ligne[2])      { partieHaute = true;}
    if (v.y > ligne[2] && v.y < ligne[3]) { partieHorizon = true;}
    if (v.y > ligne[3]) { partieBasse = true;}
    
  
  // 3. identification de la zone 
  if (partieGauche && partieTitre  )   {numeroZone = 0;}
  if (partieMilieu && partieTitre  )   {numeroZone = 1;}
  if (partieDroite && partieTitre  )   {numeroZone = 2;}
  
  if (partieGauche && partieHaute)   {numeroZone = 3;}
  if (partieMilieu && partieHaute)   {numeroZone = 4;}
  if (partieDroite && partieHaute)   {numeroZone = 5;}

  if (partieGauche && partieHorizon) {numeroZone = 6;}
  if (partieMilieu && partieHorizon) {numeroZone = 7;}
  if (partieDroite && partieHorizon) {numeroZone = 8;}
  
  if (partieGauche && partieBasse)   {numeroZone = 9;}
  if (partieMilieu && partieBasse)   {numeroZone = 10;}
  if (partieDroite && partieBasse)   {numeroZone = 11;}

  print ("zone cliquée = " + numeroZone);
  
  // trouver la fonction selon et le bouton
  switch (numeroZone){
    case 0:       zone0();
      break;  
    case 1:       zone1();
      break;
    case 2:       zone2();
      break;
    case 3:       zone3();
      break;
    case 4:       zone4();
      break;
    case 5:       zone5();
      break;  
    case 6:       zone6();
      break;
    case 7:       zone7();
      break;
    case 8:       zone8();
      break;
    case 9:       zone9();
      break;
    case 10:       zone10();
      break;
    case 11:       zone11();
      break;

        
  }
}

 function zone0(){ // affiche Zodiac
        clicZodiac++;
    if (clicZodiac ==0) modeZodiac = '';
    if (clicZodiac ==1) modeZodiac = 'TROPICAL';
    if (clicZodiac ==2) modeZodiac = 'EQUATORIAL';

   
    if (clicZodiac >=2) clicZodiac = -1;
    modeBouton = false;

    }

  function zone1(){ // mode nuit
    
      clicNuit++;
  if (clicNuit == 1)  modeNuit = false ;
  if (clicNuit == 2)  {modeNuit = true ;}
  if (clicNuit == 3)  {modeNuit = false ; modeWatch = false ;}
  if (clicNuit == 4)  {modeNuit = false ; modeWatch = true ;}

   
  voyage = 'STOP'  ;
  if (clicNuit >= 4) {
    clicNuit = 0;
   }
  modeBouton = false;
  }

  function zone2(){ // affiche Bouton
    modeBouton = !modeBouton;
    sablier = 50;
   }

  function zone3(){ // Jour -
    clicJour++
    if (clicJour == 1) voyage = "JOURretour"
    if (clicJour == 2) {voyage = "STOP" ; clicJour = 0} 
    modeBouton = false;
   }

  function zone4(){ // Orientation en fonction du soleil ou Sud
    clicOrientation++;
    if (clicOrientation==1) modeOrientation ='SUD';
    if (clicOrientation==2) modeOrientation ='SOLEIL';
    if (clicOrientation==3) modeOrientation ='NORD';
    
    if (clicOrientation >=3) clicOrientation = 0
     modeBouton = false;

   }

  function zone5(){// jour +
    clicJour++
    if (clicJour == 1) voyage = "JOUR"
    if (clicJour == 2) {voyage = "STOP" ; clicJour = 0}
    modeBouton = false;
   }

  function zone6(){ // heure -
    clicHeure++
    if (clicHeure == 1) voyage = "HEUREretour"
    if (clicHeure == 2) {voyage = "STOP" ; clicHeure = 0}
    modeBouton = false;
  
   }

  function zone7(){ // maintenant
   egoDate = new Date();
   voyage = "MAINTENANT"
   setDate();
   voyage = "STOP"
     modeBouton = false;
   
   }

  function zone8(){ // heure+
    clicHeure++
    if (clicHeure == 1) voyage = "HEURE"
    if (clicHeure == 2) {voyage = "STOP" ; clicHeure = 0}
     modeBouton = false;
   
   }

  function zone9(){// minute -
    clicMinute++
    if (clicMinute == 1) voyage = "MINUTEretour"
    if (clicMinute == 2) {voyage = "STOP" ; clicMinute = 0}
    
     modeBouton = false;
  }

 function zone10(){ // 
   clicConstellation++;
   
   if (clicConstellation == 1) modeConstellation = false;
    if (clicConstellation == 2) modeConstellation = true;
      if (clicConstellation >=2) clicConstellation = 0
   voyage = "STOP" ; // constellations 
 
   modeBouton = false;
    } 

function zone11(){ // minute+
    clicMinute++
    if (clicMinute == 1) voyage = "MINUTE"
    if (clicMinute == 2) {voyage = "STOP" ; clicMinute = 0}
    modeBouton = false;


    } 


function doubleClique() {
  }


function afficheBoutons(){
 textSize(20)
  textAlign(CENTER);
  rectMode(CORNERS);
  n = 0
  marge = 1
  
  for (l = 0 ; l < ligne.length-1 ; l++){
    for (c = 0 ; c < colonne.length -1 ; c++){
     rotate (PI)
        fill (50,77,255,80)
      rect (colonne[c] + marge, ligne[l] + marge, colonne[c +1]- marge, ligne[l+1] -marge)
        fill ('WHITE')
      text ( bouton[n],    (colonne[c] + colonne[c+1]) /2, (ligne[l] + ligne[l+1]) / 2 )
      rotate (-PI)
      n++;
      }
  }
   
}



