d2r = PI/180;
r2d = 180/PI;
maxIterationCourbe = 500 ;
resolution = 10;


function setCouleur(nom){

  switch (nom) { 
    case 'couleurSoleil'  : fill(254, 248, 108); break;
    case 'couleurMercure' : fill(165, 38, 10); break;
    default : color(150);
  }
}

function dessineCiel(hauteurSoleil,azimuthSoleil){
  // on va dessiner des cercles avec des pastilles de couelur autour du soleil. les cercles auront un gradien.
  fill(125)
  stroke(125)
  colorMode(HSL);
  pasH = 2;
  pasV = 3;
  largeurPave = 10
  if (voyage != 'STOP') {
    pasH = 6
    pasV = 15
  }
  puissanceSoleil = 3
  strokeWeight(1);
  for (varV = 00; varV < 180; varV += pasV){
     if (varV >0) pasH = 1+largeurPave * 180 / (2*PI* varV)
     for (varH = 0 ; varH < 180 ; varH += pasH){
      angleDegre =   varH + azimuthSoleil;
      
      H = 208 - (hauteurSoleil/180*10) ; // bleu ciel 204 clair à 248 foncé
      S = 80 ; // la saturation... 100 à l'oposé du ciel variation horizontale
      L = (100 - (180-varH)/180* (50 * (varV/180) ) ) * ((hauteurSoleil/1.5 - 40)/80) ; 
       
      fill( H , S , L);
      stroke( H , S , L);
      trapeze(angleDegre, varV, pasH , pasV);
      angleDegre =  azimuthSoleil - varH ;
      trapeze(angleDegre, varV, -pasH , pasV);
     }
  }
 
   colorMode(RGB);
}

function desineTerre(){
   colorMode(HSL);
  fill( 28 , 43 ,20,0.5);
  circle(0,0,180);
  colorMode(RGB);
  
}

function dessineArcEtoile(ra1,dec1,ra2,dec2){
    beginShape();
    arcEtoile(ra1,dec1,ra2,dec2);
    endShape(OPEN);
}

function dessineArcEtoileP(p1,p2){
  beginShape();
    arcEtoile(p1[0],p1[1],p2[0],p2[1]);
    endShape(OPEN);
  
}


function dessinePolygoneEtoileP(listePoint){
    beginShape();
  for (i = 0 ; i < listePoint.length-1 ; i++){
    p1 = new Array (listePoint[i][0], listePoint[i][1]);
    p2 = new Array (listePoint[i+1][0], listePoint[i+1][1]);
    arcEtoile(p1[0],p1[1],p2[0],p2[1]);
    }
  endShape(OPEN);
  
}

function dessineLettreF(x,y,h){
  liste = new Array();
  liste.push( [0,0])
  liste.push( [0,h])
  liste.push( [h/5 * 3 ,h])
  liste.push( [h/5 * 3 ,h - h/5])
  liste.push( [h/5,h - h/5])
  liste.push( [h/5,+h - 2*h/5])
  liste.push( [2*h/5,h - 2*h/5])
  liste.push( [2*h/5,h - 3*h/5])
  liste.push( [h/5,h - 3*h/5])
  liste.push( [h/5,0])
  liste.push( [0,0])
  
  // move 
  for (i = 0 ; i < liste.length ; i++){
    liste[i][0] = x - liste[i][0]
    liste[i][1] += y;
  }
  
  fill(255,255,255,55);
  beginShape()
  dessinePolygoneEtoileP(liste)
  endShape()

   
}

function dessineCouronneEtoile(ep,division){
  pas = 360/division;
 
  for (ra = 0 ; ra < 360 ; ra+=pas){
    stroke(255,255,255,80)
    noFill()
    p1 = new Array(ra   ,-ep);
    p2 = new Array(ra+pas,-ep)
    p3 = new Array(ra+pas,ep);
    p4 = new Array(ra,ep)
 
    dessineArcEtoileP(p1,p2)
    dessineArcEtoileP(p2,p3)
    dessineArcEtoileP(p3,p4)
    }
  }
  


function arcEtoile(ra1,dec1,ra2,dec2){
  // dessin un trait entre deux étoiles
  //ra et dec en degré par en heure....
  //0. parametre d'affichage
  resolution = 20;
  if (voyage == 'STOP') resolution = 2;
  // 1. calcul des coordonnées horizontales
  coordDebut = e2hDEGRE (ra1,dec1)
  coordFin = e2hDEGRE (ra2,dec2)

  //2. calcul des angles en radian
  angleRadianDebut = PI+coordDebut[0] /180 * PI;
  hauteurDebut = coordDebut[1]  ;
  
  angleRadianFin = PI+coordFin[0] /180 * PI;
  hauteurFin = coordFin[1]  ;
  
  //3. calcul des points médians

  // dessinde la courbe
  debut = getXY(angleRadianDebut,hauteurDebut);
  fin = getXY (angleRadianFin,hauteurFin);

  


   
  // on plante le premier point
  vertex(debut[0],debut[1])
  
  // next point est N
  raN = ra1;
  decN = dec1;
  
  // calcul du prochain Mid
  raM = (ra2 + raN)/2;
  decM = (dec2 + decN)/2;
  coordMid = e2hDEGRE (raM,decM)
  angleRadianMid = PI+coordMid[0] /180 * PI;
  hauteurMid = coordMid[1]  ;
  mid = getXY (angleRadianMid,hauteurMid);
  //for (i = 0 ; i < 5; i++){
    while (distance(mid,debut) > resolution){
      raM = (raM + raN)/2;
      decM = (decM + decN)/2;
      coordMid = e2hDEGRE (raM,decM)
      angleRadianMid = PI+coordMid[0] /180 * PI;
      hauteurMid = coordMid[1]  ;
      mid = getXY (angleRadianMid,hauteurMid);
      }
   // }
  vertex(mid[0],mid[1])
   
 for (b = 0 ; b < maxIterationCourbe ; b++){ 
   
  raN = raM ;
  decN = decM ;
  debut = getXY(angleRadianMid,hauteurMid);
    // calcul du prochain Mid
  raM = (ra2 + raN)/2;
  decM = (dec2 + decN)/2;
  coordMid = e2hDEGRE (raM,decM)
  angleRadianMid = PI+coordMid[0] /180 * PI;
  hauteurMid = coordMid[1]  ;
  mid = getXY (angleRadianMid,hauteurMid);
  //for (i = 0 ; i < 5; i++){
    while (distance(mid,debut) > resolution){
      raM = (raM + raN)/2;
      decM = (decM + decN)/2;
      coordMid = e2hDEGRE (raM,decM)
      angleRadianMid = PI+coordMid[0] /180 * PI;
      hauteurMid = coordMid[1]  ;
      mid = getXY (angleRadianMid,hauteurMid);
      }
   // }
  vertex(mid[0],mid[1])
  if (distance(fin,mid)<resolution) b=maxIterationCourbe
  
 }

  
 
  vertex(fin[0],fin[1])

  

  
 

}

function distance(p1,p2){
  dx = p2[0]-p1[0]
  dy = p2[1]-p1[1]
  return Math.sqrt( dx*dx + dy*dy)
}

function getXY(angleRadian,hauteur){
  xy = new Array();
  xy[0] = Math.cos(PI/2+angleRadian) * hauteur;
  xy[1] = Math.sin(PI/2+angleRadian) * hauteur;
  
  return xy
}

function avanceCurseur(angleRadian,hauteur){
  rotate (angleRadian);
   translate (0,hauteur);
}
function retourCurseur(angleRadian,hauteur){
   translate (0,-hauteur);
   rotate (-angleRadian);
  }

function trapeze(angleBaseDegre, distance, varAngle, varDistance){
    varAngle *= d2r ;
    angleBaseDegre -= 90;
    rotate (angleBaseDegre * d2r);
   //       rect (-largeur/2 , hauteurBase , largeur, hauteur);
          beginShape();
            vertex(distance, 0);
            vertex( Math.cos(varAngle * 1/3) * distance , Math.sin(varAngle* 1/3) * distance);
            vertex( Math.cos(varAngle * 2/3) * distance , Math.sin(varAngle* 2/3) * distance);
            vertex( Math.cos(varAngle * 3/3) * distance , Math.sin(varAngle *3/3) * distance);
        
            vertex( Math.cos(varAngle * 3/3) * (distance + varDistance) , Math.sin(varAngle * 3/3) * (distance + varDistance) );
            vertex( Math.cos(varAngle * 2/3) * (distance + varDistance) , Math.sin(varAngle * 2/3) * (distance + varDistance) );
            vertex( Math.cos(varAngle * 1/3) * (distance + varDistance) , Math.sin(varAngle * 1/3) * (distance + varDistance) );
            vertex( distance + varDistance, 0);
          endShape(CLOSE);
    rotate (-angleBaseDegre * d2r);
    
  }

function dessineRoseVents(){
  textFont('Helvetica');
  fill(250);
  if (modeNuit)fill(255,0,0,200)
  noStroke();
  textSize(7);
    lettrePolaireDegre("N",0,91);
    lettrePolaireDegre("E",90,91);
    lettrePolaireDegre("S",180,91);
    lettrePolaireDegre("W",270,91);

  fill(120);
  if (modeNuit)fill(255,0,0,80)
  noStroke();
  textSize(7);
    lettrePolaireDegre("NE",45,91);
    lettrePolaireDegre("SE",135,91);
    lettrePolaireDegre("SW",225,91);
    lettrePolaireDegre("NW",315,91);

  
  }
function dessinePlanete(n){
  stroke(255);
  noStroke();
  angleRadian = planete[n][8] /180 * PI;
  angleDegre = planete[n][8];
  hauteur = 90 + planete[n][9]  ;
  grossissement = 1.5;
  if (modeWatch) grossissement = 2.5
  
  rotate (angleRadian);
   translate (0,hauteur);
    strokeWeight(0.5);
    if (planete[n][9]<0){
      stroke(planete[n][3]);
      noFill();
      }
  else{ fill(planete[n][3]);}
  
  circle (0,0,planete[n][10] * grossissement);
  translate (0,-hauteur);
  
  // tire ligne
  fill(planete[n][3]);
  noStroke();
  for (p = 5 + hauteur ; p < 180 ; p += 3 ){
    circle (0,p,0.8);
  }
  
  rotate (-angleRadian);

  // LE TEXTE
  textFont("Georgia");
 
  if (!modeWatch){
  textSize(8);
  fill(0);
  if (modeNuit) fill('RED');
    noStroke();
    lettrePolaireDegre (planete[n][1], angleDegre ,181);
    textePolaireDegre  (planete[n][0], angleDegre ,189,8);  
  }
  if (modeWatch){
    fill(0);
    if (modeNuit) fill('RED');
    noStroke();
    textePolaireDegre  (planete[n][0].substring(0,2), angleDegre+2 ,182,16);  
    
  }
  
}
function dessineCadranZodiacEquatorial(){
  // pour les différents zodiac dans le monde : 
  // https://www.rustico.com/blogs/news/whats-your-sign-astrological-signs-from-around-the-world

  cadran = new Array();
  //0. nom courant
  //1. symbol
  //2. nom latin
  //3. nom anlgais
  //4. longitude Debut
  //5. longitude Fin
    
 cadran.push(['Bélier','♈','Aries','anglais',28.92, 53.30 ]); //25
 cadran.push(['Taureau','♉','Taurus','anglais',53.00, 90.25] ); //
 cadran.push(['Gémeaux','♊','Gemini','anglais',90.25, 118.08] ); 
 cadran.push(['Cancer','♋','Cancer','anglais',118.08, 138.00 ]); 
 cadran.push(['Lion','♌','Leo','anglais',138.00, 173.98] ); 
 cadran.push(['Vierge','♍','Virgo','anglais',173.98, 217.62] ); 
 cadran.push(['Balance','♎','Libra','anglais',217.62, 240.96 ]);      
 cadran.push(['Scorpion','♏','Scorpius','anglais',240.96, 247.86] );      
 cadran.push(['Serpentaire','♏','Ophiuchus','anglais',247.86, 266.42] );   
 cadran.push(['Sagittaire','♐','Sagittarius','anglais',266.42, 299.55 ]);      
 cadran.push(['Capricorne','♑','Capricornus','anglais',299.55, 327.72 ]);      
 cadran.push(['Verseau','♒','Aquarius','anglais',327.72, 351.41 ]);
 cadran.push(['Poissons','♓','Pisces','anglais',351.41, 28.92 ]); 

  var coord = new Array();
  textSize(5);
  noStroke();
  for (z = 0 ; z < cadran.length-1 ; z++){

    coord = e2hDEGRE (cadran[z][4],0);
      angleDebut = coord[0];
      altDebut = coord[1];
    coord = e2hDEGRE (cadran[z][5],0);
      angleFin = coord[0];
      altFin = coord[1];
    coord = e2hDEGRE ( (cadran[z][5] + cadran[z][4] ) / 2,0);
      angleMilieu = coord[0];
      altMilieu = coord[1];
    
fill(100,80,185);
 
//  fill(0,0,255,150);
  if (modeNuit) fill (255,0,0,150);
  noStroke();
  lettrePolaireDegre ("|",angleDebut  ,160,15);
  textePolaireDegre (cadran[z][0],180+angleMilieu ,160 ,8,5);
    
  }
  
}
function dessineCadranZodiacTropical(){
  
  // pour les différents zodiac dansle monde : 
  // https://www.rustico.com/blogs/news/whats-your-sign-astrological-signs-from-around-the-world

  cadran = new Array();
  //0. nom courant
  //1. symbol
  //2. nom latin
  //3. nom anlgais
  //4. longitude Debut
  //5. longitude Fin
  //6. milieu
    
 cadran.push(['Bélier','♈','Aries','GREEN',0, 30 , 15 ]); //25
 cadran.push(['Taureau','♉','Taurus','BLUE',30, 60, 45] ); //
 cadran.push(['Gémeaux','♊','Gemini','RED',60, 90 , 75] ); 
 cadran.push(['Cancer','♋','Cancer','ORANGE',90, 120 ,105]); 
 cadran.push(['Lion','♌','Leo','YELLOW',120, 150 , 135] ); 
 cadran.push(['Vierge','♍','Virgo','GRAY',150, 180 , 165] ); 
 cadran.push(['Balance','♎','Libra','PINK',180, 210 ,195 ]);      
 cadran.push(['Scorpion','♏','Scorpius','WHITE',210, 240 , 225] );      
 cadran.push(['Sagittaire','♐','Sagittarius','BLACK',240, 270 , 255]);      
 cadran.push(['Capricorne','♑','Capricornus','CYAN',270, 300 , 285]);      
 cadran.push(['Verseau','♒','Aquarius','WHITE',300, 330 ,315 ]);
 cadran.push(['Poissons','♓','Pisces','WHITE',330, 360 , 345]); 

  var coord = new Array();
  textSize(5);
  noStroke();
  for (z = 0 ; z < cadran.length ; z++){

    coord = e2hDEGRE (cadran[z][4],0);
      angleDebut = coord[0];
      altDebut = coord[1];
  
    coord = e2hDEGRE (cadran[z][6],0);
      angleMilieu = coord[0];
      altMilieu = coord[1];
    coord = e2hDEGRE (cadran[z][5],0);
      angleFin = coord[0];
      altFin = coord[1];
    
 // dessineSecteurTropical(angleDebut,angleFin,cadran[z][3]); 

fill(100,100,155);
      if (modeNuit) fill (255,0,0,120);
  noStroke();
    lettrePolaireDegre ("|",angleDebut  ,170,15);
   textePolaireDegre (cadran[z][0],angleMilieu ,170 ,10,5);
    
  }
  
}
function dessineSecteurTropical(angleDebut,angleFin,couleur){
  fill (255,10,10,150 )
  fill (couleur);
  interieur = 100
  exterieur = 180
  marge = 1;
  angleDebut -= marge
  angleFin += marge
//  angleDebut -= 90;
//  angleFin -= 90;

  varAngle = d2r * (angleFin - angleDebut)  ;
  face = 5;
  
    rotate (d2r * angleDebut );
    beginShape();
       vertex(interieur, 0);
       for (f = 1 ; f < face+1 ; f++){
         vertex( Math.cos(varAngle * f/face) * interieur , Math.sin(varAngle* f/face) * interieur); }
        for (f = face ; f > 0 ; f--){
         vertex( Math.cos(varAngle * f/face) * (exterieur) , Math.sin(varAngle * f/face) * (exterieur) );  }
       vertex( exterieur, 0);
    endShape(CLOSE);
    rotate (-angleDebut * d2r );
    
}

function dessineVouteCeleste (){
  if (voyage != 'STOP') nbEtoile = 3000
  if (voyage == 'STOP') {
    nbEtoile +=50;
    if (nbEtoile > listeEtoile.length) nbEtoile = listeEtoile.length
    //print (nbEtoile)
  }
  
  for (n = 0 ; n < nbEtoile ; n++)
    {
  coord = e2hDEGRE (listeEtoile[n][10],listeEtoile[n][11])
      
  angleRadian = PI+coord[0] /180 * PI;
  angleDegre = 180+coord[0];
  hauteur = coord[1]  ;
  rotate (angleRadian);
   translate (0,hauteur);
     magnitude =  listeEtoile[n][3];         
     dessineEtoile(magnitude) // 
     translate (0,-hauteur);
  rotate (-angleRadian);
    }
  
}



function dessineEtoile(m){
  m = 2.5*(8 - m) ;
  
  //0. calibrage par rapport à l'échelle
    r = 0.8;
  // if (voyage == 'STOP') r=0.4
  s = Math.random();
  s2 = Math.random();
  //s2 = s ;

  
  if (!modeNuit){
    //2. dessine l'étoile qui scintille
    fill(255 - s*50,  255 - s2*50 , 255, m*40*s);
    noStroke();
   circle(0,0,r/2*m/5);
  
    //3. dessine l'étoile juste un point blanc  
    fill(255,255,255);
    noStroke();
    circle(0,0,r/2*m/6);
  }
  else {
      fill(255 - s*50,  0 , 0, m*30*s);
      noStroke();
circle(0,0,r/2*m/5);
      
      fill(255,0,0);
      noStroke();
       circle(0,0,r/2*m/6);
    
  }
  
}


function dessineConstellation(){
nb = constellation.length/2
  if (voyage == 'STOP') {
    nb = constellation.length
  }
  
  for (n = 0 ; n < nb ; n++)
    {
  coord = e2hDEGRE (constellation[n][10],constellation[n][11])
      
  if (!modeNuit){    
     if (n < 13)fill('ROYALBLUE')
     else {fill('WHITE')}
  }
      
  if (modeNuit){    
     if (n < 13)fill(255,0,0)
     else {fill(255,0,0,150)}
  }
      
  angleRadian = PI+coord[0] /180 * PI;
  angleDegre = 180+coord[0];
  hauteur = coord[1]  ;
  textePolaireDegre(constellation[n][0] , angleDegre, hauteur, 5)
    }
  
}
