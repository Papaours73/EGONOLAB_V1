// EPHEMERIDE proposé par 
// https://pgj.pagesperso-orange.fr/position-planetes.htm
// calcul en RADIANS




var PGJ_time = 2000;
var listing = new Array();
var obsLatitude = 44;
var ll_latmin = 2;
var obsLongitude = 2;
var ll_lonmin = 1;

var    legendeJOUR  = "";
var    legendeHEURE  = "";
var    legendeHEURECourte ="";
var    legendeLIEU = "";

var Months = new Array( "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December" );
var PI = Math.PI;
var DR = PI/180;
var K1 = 15*DR*1.0027379
//var Moonrise = false;
//var Moonset  = false;
//var Rise_time = [0, 0];
var Set_time  = [0, 0];
var Rise_az = 0.0;
var Set_az  = 0.0;
var Sky = [0.0, 0.0, 0.0];
var RAn = [0.0, 0.0, 0.0];
var Dec = [0.0, 0.0, 0.0];
var VHz = [0.0, 0.0, 0.0];

nst1 = 1;
nst2 = 1;


function setPlanetes(){
  //prépare le tableau des planetes
  //planete[numero][parametre]
  
  // numéro des planetes
  // 0. Soleil
  // 1. Mercure
  // 2. Venus
  // 3. Mars
  // 4. Jupiter
  // 5. Saturne
  // 6. Uranus
  // 7. Neptune
  // 8. Pluton
  // 9. Lune
  
  
  // parametres
  // 0. nom de la plante
  // 1. signe de la planete
  // 2. zodiac de la planete
  // 3. couleur de la planete
  // 4. ascension droite de la plante (coordonnee horizontale)
  // 5. déclinaison de la plante (coordonnee horizontale)
  // 6. distance de la planete
  // 7. % vue de la planete
  // 8. azimuth egonométrique (entre 0 et 360°) avec le 0 au NORD (?)
  // 9. hauteur egonométrique (entre 0 et 180°) avec 0 le nadir
  // 10. taille dessinée de la plantete
  // 11. Distance terre/Planete
  
  planete.push(['Soleil','☉','zodiac','rgb(252,250,232)', 0,0,0,0 , 0,0, 10,0]);       
  planete.push(['Mercure','☿','zodiac','firebrick',0,0,0,0 , 0,0, 2,0]);    
  planete.push(['Venus','♀','zodiac','aliceblue',0,0,0,0 , 0,0, 2,0]);     
  planete.push(['Mars','♂','zodiac','coral',0,0,0,0 , 0,0,3,0]);        
  planete.push(['Jupiter','♃','zodiac','peachpuff',0,0,0,0 , 0,0,5,0]);       
  planete.push(['Saturne','♄','zodiac','beige',0,0,0,0 , 0,0,4,0]);    
  planete.push(['Uranus','♅','zodiac','lightsteelblue',0,0,0,0 , 0,0,2,0]);    
  planete.push(['Neptune','♆','zodiac','steelblue',0,0,0,0 , 0,0,2,0]);    
  planete.push(['Pluton','♇','zodiac','slategray',0,0,0,0 , 0,0,2,0]);    
  planete.push(['Lune','♁','zodiac','white',0,0,0,0 , 0,0,6,0]);    
    
  
}


function calculerEPHEMERIDE(ll_jour,ll_mois,ll_annee,ll_heure,ll_minute,ll_seconde) {
//--------------- Données pour circonstances locales
listing = new Array();

lev = 0;
mer = 0;
cou = 0;

// 1. CHARGE LA DATE   
{
     JOUR = ll_jour;
     MOIS = ll_mois;
     ANNEE = ll_annee;
     HEURE = ll_heure  ;
     MINUTE = ll_minute;
     SECONDE = ll_seconde;

texteSeconde = SECONDE ;
if (SECONDE < 10)  texteSeconde = "0"+SECONDE
texteMinute = MINUTE ;
if (MINUTE < 10)  texteMinute = "0"+MINUTE
  texteJour = JOUR;

  
  texteHeure = HEURE + monDECALAGEHORAIRE;
//if (HEURE < 10)  texteHeure = "0"+(HEURE+ monDECALAGEHORAIRE)
if (HEURE+monDECALAGEHORAIRE > 23)  {
  texteHeure = (HEURE -24 + monDECALAGEHORAIRE)
  texteJour += 1;}
texteTemps = ":"
 // if ( (SECONDE/2)%2 == 0) texteTemps = " "
 // if ( (SECONDE/2)%2 != 0) texteTemps = ":"
  
    legendeJOUR  = texteJour + " " + Months[MOIS-1] + " " + ANNEE;
    legendeHEURE  = texteHeure +  ":"+texteMinute+":"+texteSeconde;
    legendeHEUREcourte = texteHeure + texteTemps +texteMinute ;
    legendeMONTRE = texteHeure+ texteTemps +texteMinute ;
    legendeLIEU = "Lat. " + obsLatitude + "° / Long. " + obsLongitude + "°" ;
  
  
if (MOIS>2) {
     y = ANNEE;
     m = MOIS;
     }
else {
     y = ANNEE - 1;
     m = MOIS + 12;
     }


  a = Math.floor(y / 100);
  b = 2 - a + Math.floor(a / 4);
//--------------- Jour Julien
  heure1 = HEURE + (MINUTE / 60) +(SECONDE / 3600);

  ggg = 1;
  if( ANNEE < 1582 ) ggg = 0;
  if( ANNEE < 1582 && MOIS < 10 ) ggg = 0;
  if( ANNEE <= 1582 && MOIS == 10 && JOUR < 5 ) ggg = 0;

  jd = - 1 * tronque(7 * (tronque((MOIS + 9) / 12) + ANNEE) / 4);
  s = 1
  if ((MOIS - 9) < 0) s = - 1;
  a = Math.abs(MOIS - 9);
  j1 = tronque(y + s * tronque(a / 7));
  j2 = - 1 * tronque(((tronque(j1 / 100) + 1) * 3 / 4));
  jd1 = jd + tronque((275 * MOIS / 9) + JOUR + (ggg * j2));
  jd2dat1 = jd1 + 1721027 + 2 * ggg + 367 * ANNEE - 0.5 ;
  jj = jd2dat1 + (heure1 / 24)


listing.push ("Jour Julien = " + jj);

//--------------- Temps mesuré en siécle juliens de 36525 jours des éphémérides
// à partir du 0,5 janvier 1900 TE


  T = (jj - 2415020.0) / 36525;
  T2 = T * T;
  T3 = T2 * T;

//--------------- Jour Julien, DeltaT et Temps Terrestre

  if (ANNEE < 1620 || ANNEE >= 2024) 
       {
       T3=(ANNEE - 2000) / 100
       if (ANNEE > -391 &&  ANNEE <= +948){dtAm = + 2177 + (497 * T3) + (44.1 * T3 * T3); dtA = dtAm} //pour les ann�es de -391 � +948
       if (ANNEE > +948 && ANNEE < +1620){dtAm = + 102 + (102 * T3) + (25.3 * T3 * T3); dtA = dtAm} //pour les ann�es de +948 � +1600
       }
   
  else {
 //   chargeDeltaT();
    var dtA = deltaT[ANNEE-1620]}
  
if (ANNEE >= 2024)     //correspond � l'ann�e sup�rieure � la derni�re ann�e "estim�e" indiqu�e dans le fichier DeltaT.dat
       {
       T3=(ANNEE - 2000) / 100
       dtAm = + 102 + (102 * T3) + (25.3 * T3 * T3) + 0.56 *(ANNEE - 2100); dtA = dtAm 
       }

coeff = 86400;
jj2 = jj + (dtA / coeff);
dc_jourjulien2 = jj2
JD = dc_jourjulien2-0;

   Z = tronque(JD + 0.5);
   F = JD + 0.5 - Z;
   if (Z < 2299161) {A = Z } 
   else
      {I = tronque((Z - 1867216.25) / 36524.25);
      A = Z + 1 + I - tronque(I / 4);
      }
   B = A + 1524;
   C = tronque((B - 122.1) / 365.25);
   D = tronque(365.25 * C);
   T = tronque((B - D) / 30.6001);
   RJ = B - D - tronque(30.6001 * T) + F;
   JJ = tronque(RJ);
   RH = (RJ - tronque(RJ)) * 24;
   Hre = tronque(RH);
   Mn = tronque((RH - Hre ) * 60);
   Sec = ((RH - Hre ) * 60 - Mn ) * 60; 
   if (T < 14) {MM = T - 1}
    else
   { if ((T == 14) || (T == 15))  MM = T - 13 } 
   if (MM > 2) { AA = C - 4716 } 
    else
   { if ((MM == 1) || (MM == 2)) AA = C - 4715 }

  // finalisation du TEMPS UTC
/*
dc_utday = JJ;
dc_utmonth = MM;
dc_utyear = AA;
dc_uth = Hre;
dc_utm = Mn;
dc_uts = Math.floor(Sec);
*/
  
//---------------

r2d = 180 / PI;
y = 2 * PI;

T = (jj2 - 2415020) / 36525;
T2 = T * T;
T3 = T2 * T;

// Temps mesuré en siècle juliens de 36525 jours des �ph�m�rides
// à partir du 1,5 janvier 2000 TE

T_2000 = (jj2 - 2451545) / 36525;
T2_2000 = T_2000 * T_2000;
T3_2000 = T2_2000 * T_2000;
T4_2000 = T2_2000 * T2_2000;

//--------------- Temps sidéral à 0h00 UT

Jts = Math.floor(jj + 0.5) - 0.5; // jour julien � 0h00 UT
Tts = (Jts - 2415020.0) / 36525;
ts0 = 0.276919398 + 100.0021359 * Tts + 0.000001075 * Tts * Tts; 
ts1 = (ts0 - Math.floor(ts0)) * 24 // temps sidéral à Greenwich à 0h00 UT

//--------------- Temps sidéral à l'heure choisie

ts2 = HEURE + (MINUTE / 60) + (SECONDE/3600)
ts = ts1 + (ts2 * 1.002737908);
tsh = Math.floor(ts)
tsm = Math.floor((ts - Math.floor(ts)) * 60)
tss = (((ts - Math.floor(ts)) * 60) - tsm) * 60

  dc_ts = jh(tsh) + "h" + zero(tsm) + "m" + zero(floor(tss)) + "s";
    
  listing.push ("  - Temps sideral : " + tss);
  

}
   
// 2. CALCULER des CONSTANTES  
{ 
  

//--------------- Longitude moyenne du Soleil, rapportée à l'équinoxe moyen de la date considérée

Lo = 279.69668 + 36000.76892 * T + 0.0003025 * T2;
Lo = Lo / r2d;

//--------------- Anomalie moyenne du Soleil

M = (358.47583 + 35999.04975 * T) - 0.00015 * T2 - 0.0000033 * T3;
M = M / r2d;
anomalie_soleil = M;

//--------------- Excentricité de l'orbite terrestre

e = 0.01675104 - 0.0000418 * T - 0.000000126 * T2;

//--------------- Equation de centre C du Soleil

c = (1.919460 - 0.004789 * T - 0.000014 * T2) * Math.sin(M) + (0.020094 - 0.000100 * T) * Math.sin(2 * M) + 0.000293 * sin(3 * M);
c = c / r2d

//--------------- Longitude vraie du Soleil rapport�e � l'�quinoxe moyen de la date consid�r�, Anomalie vraie

Lov = Lo + c;
v = M + c;

//--------------- Rayon vecteur

R = 1.0000002 *(1 - e * e) / (1 + e * cos(v));

//--------------- Longitude apparente du Soleil rapportee a l'equinoxe vrai de l'epoque

omega = 259.18 / r2d - 1934.142 / r2d * T;
longapp = Lov - 0.00569 / r2d - 0.00479 / r2d * sin(omega);

longapp0 = longapp - y * floor(longapp / y);
longapp1 = longapp0 * r2d;

d1 = ((longapp1 - Math.floor(longapp1)) * 60);
d2 = ((d1 - Math.floor(d1)) * 60);

}
// 3. CALCULER de la position du SOLEIL
{
//--------Corrections à appliquer àla longitude solaire et au rayon vecteur pour une meilleur précision : 
//------- A et B sont les corrections dues à l'action de Vénus, C à celle de Jupiter, 
//------- D à celle de la Lune, alors que E est une inégalité de longue période

A = 153.23 / r2d + 22518.7541 / r2d * T;
B = 216.57 / r2d + 45037.5082 / r2d * T;
C = 312.69 / r2d + 32964.3577 / r2d * T;
D = 350.74 / r2d + 445267.1142 / r2d * T - 0.00144 / r2d * T2;
E = 231.19 / r2d + 20.20 / r2d * T;
H = 353.40 / r2d + 65928.7155 / r2d * T;

longitude = longapp + 0.00134 / r2d * cos(A) + 0.00154 / r2d * cos(B) + 0.002 / r2d * cos(C) + 0.00179 / r2d * sin(D) + 0.00178 / r2d * sin(E);
longitude1 = longapp - y * floor(longapp /y);
long1 = longitude1 * r2d;
d1 = ((long1 - Math.floor(long1)) * 60);
d2 = ((d1- Math.floor(d1)) * 60);

R = R + 0.00000543 * Math.sin(A) + 0.00001575 * Math.sin(B) + 0.00001627 * Math.sin(C) + 0.00003076 * Math.cos(D) + 0.00000927 * Math.sin(H);
// trouve la constellation devant laquelle s trouve le Soleil
  constell = trouveConstellation(long1);
    
// Obliquité de l'écliptique
obliquite = (23.452294 - 0.0130125 * T - 0.00000164 * T2 + 0.000000503 * T3 + 0.00256 * cos(omega)) / r2d;
obliquite1 = (23.452294 - 0.0130125 * T - 0.00000164 * T2 + 0.000000503 * T3) / r2d;

// Equation du Temps (formule de W.M. SMART - "Text-Book on Spherical Astronomy" page 19 - édition de 1956)
eps = obliquite ;
yT = Math.tan(eps / 2) * Math.tan(eps / 2);
eqT = - yT * Math.sin(2 * Lo) + 2 * e * Math.sin(M) - 4 * e *yT * Math.sin(M) * Math.cos(2 * Lo) + 0.5 * yT * yT * Math.sin(4 * Lo) + 5 / 4 * e * e * Math.sin(2 * M);
eqT = eqT * r2d ;
  
// Coordonnées du Soleil : Ascension droite

asc = r2d / 15 * Math.atan(Math.cos(obliquite) * Math.sin(longitude) / Math.cos(longitude));
//ADSoleil = asc * 15 / r2d;
  
if (asc < 0) {
  asc = asc + 24;}
if (Math.cos(longitude) < 0) {
  asc = asc + 12;}
if (asc > 24) {
  asc = asc - 24;}

d1 = ((asc - Math.floor(asc)) * 60);
d2 = ((d1 - Math.floor(d1)) * 60);

//dc_alphasol = Math.floor(asc) + "h" + zero(floor(d1)) + "m" + zero(Math.floor(d2 * 100 + 0.5) / 100) + "s";
ADSoleil = asc * 15 / r2d ;


//--------------- Coordonnees du Soleil : Declinaison

declin = r2d * asin(sin(obliquite) * sin(longitude));

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecSoleil = - d / r2d}
else {signe = "+"; DecSoleil = + d / r2d}

//dc_deltasol = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  
 }  
  ascSoleil = asc ;
  declinSoleil = declin;
    
// 4. CALCULER LA POSITON DES PLANETES
{
longitude_soleil = longitude - y * Math.floor(longitude / y);
longitude_terre = longitude_soleil + PI;
latitude_terre = 0;
distance_terre_soleil = R;
  // DISTANCE SOLEIL
  distanceSoleil = distance_terre_soleil;
longitude_vraie = longitude_soleil;

//--------------- Coordonnées rectangulaires équatoriales du Soleil

xs = R * cos(longitude_vraie);
ys = R * sin(longitude_vraie) * cos(obliquite);
zs = R * sin(longitude_vraie) * sin(obliquite);
}
//--------------------------------------------- 
//                  MERCURE
//--------------------------------------------- 
{
  
   const1 = 178.179078;
   const2 = 149474.07078;
   const3 = 0.0003011;
   const4 = 0.38709830982;
   const5 = 0.20561421;
   const6 = 0.00002046;
   const7 = -0.00000003;
   const8 = 7.002881;
   const9 = 0.0018608;
   const10 = -0.0000183;
   const11 = 102.27938;
   const12 = 149472.51529;
   const13 = 0.000007;
   const14 = 47.145944;
   const15 = 1.1852083;
   const16 = 0.0001739;
   const17 = 6.728;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * Math.floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * Math.floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * Math.floor(m1 / y);
m2= m2 - y * Math.floor(m2 / y);
m4 = m4 - y * Math.floor(m4 / y);
m5 = m5 - y * Math.floor(m5 / y);
m6 = m6 - y * Math.floor(m6 / y);

//--------équation de Kepler

grand_e = m;
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);
grand_e = m + e * Math.sin(grand_e);

//--------anomalie vraie

v = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * Math.cos(grand_e));

   r = r + 0.000007525 * Math.cos(2 * m5 - m1 + 53.013 / r2d);
   r = r + 0.000006802 * Math.cos(5 * m2 - 3 * m1 - 259.918 / r2d);
   r = r + 0.000005457 * Math.cos(2 * m2 - 2 * m1 - 71.188 / r2d);
   r = r + 0.000003569 * Math.cos(5 * m2 - m1 - 77.75 / r2d);

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * Math.floor(u / y);

if (Math.cos(u) != 0) {
   d = Math.atan(cos(i) * Math.tan(u));
   if (Math.cos(u) < 0) {
      d = d + PI;
   }
}
   else {d = u;}

//--------longitude écliptique

l = d + longitude_noeud;

   l = l + 0.00204 / r2d * Math.cos(5 * m2 - 2 * m1 + 12.22 / r2d);
   l = l + 0.00103 / r2d * Math.cos(2 * m2 - m1 - 160.692 / r2d);
   l = l + 0.00091 / r2d * Math.cos(2 * m5 - m1 - 37.003 / r2d);
   l = l + 0.00078 / r2d * Math.cos(5 * m2 - 3 * m1 + 10.137 / r2d);

if (l > 2 * PI) {l = l - 2 * PI;}

b = Math.asin(Math.sin(u) * Math.sin(i));

numerateur = r * Math.cos(b) * Math.sin(l - longitude_terre + PI);
denominateur = r * Math.cos(b) * Math.cos(l - longitude_terre + PI) + distance_terre_soleil;

l = Math.atan(numerateur / denominateur) + longitude_terre + PI;

if (l>2*PI) {l=l-2*PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametremerc = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------élongation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatmerc = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationMerc = elongation
elongation_planeteMerc = elongation_planete

if (elongationMerc < 10) {commentMerc = "Inobservable"; quandMerc = " "}

if (elongationMerc > 10 && elongationMerc < 20){
  commentMerc = "Difficilement visible"
  if (elongation_planeteMerc == "Ouest") {quandMerc = "peu avant le lever du Soleil"}
  if (elongation_planeteMerc == "Est") {quandMerc = "au coucher du Soleil"}}

if (elongationMerc > 20 && elongationMerc < 50){
  commentMerc = "Visible"
  if (elongation_planeteMerc == "Ouest") {quandMerc = "dans les lueurs de l'aube"}
  if (elongation_planeteMerc == "Est") {quandMerc = "au cr�puscule"}}

dc_visibmerc = commentMerc + " " + quandMerc

//--------convertion longitude et latitude en ascension droite et déclinaison

l = l - y * floor(l /y);
l1 = l * r2d;

d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longmerc = floor(l1) + "°" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
longitudeMercure = l1;
beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {
   signe = "-";
}
else
{
  signe = "+";
}

  // DISTANCE MERCURE
  dc_latmerc = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  dc_rayonmerc = floor(r * 100000 + 0.5) / 100000 + " UA"
  dc_distancemerc = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceMercure = distance_terre;
  
asc = Math.atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}
declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphamerc = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADMerc = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; 
                 DecMerc = - d / r2d}
else {signe = "+"; 
      DecMerc = + d / r2d}

dc_deltamerc = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascMerc = asc
declinMerc = declin

 
PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te
    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d
    phase = (1 + cos(FV / r2d)) * 50
magnitude = - 0.36 + 5 * (log(ray * delta))/ log(10) + 0.027 * FV + 2.2E-13 * pow(FV,6)
magnitude = ceil(magnitude * 10) / 10

//dc_magmerc = magnitude;
//dc_phasemerc = floor(phase * 10) / 10 + "%";
    
      
//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 4.34 + 5 * (log(ray * delta))/ log(10) + 0.013 * FV + 4.2E-7 * pow(FV,3)
magnitude = ceil(magnitude * 10) / 10

dc_magven = magnitude;
dc_phaseven = floor(phase * 10) / 10 + "%";

}
//--------------------------------------------- 
//                   VENUS
//--------------------------------------------- 
{
  
   const1 = 342.767053;
   const2 = 58519.21191;
   const3 = 0.0003097;
   const4 = 0.72332981996;
   const5 = 0.00682069;
   const6 = -0.00004774;
   const7 = 0.000000091;
   const8 = 3.393631;
   const9 = 0.0010058;
   const10 = -0.000001;
   const11 = 212.60322;
   const12 = 58517.80387;
   const13 = 0.001286;
   const14 = 75.779647;
   const15 = 0.89985;
   const16 = 0.00041;
   const17 = 16.688;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * floor(m1 / y);
m2= m2 - y * floor(m2 / y);
m4 = m4 - y * floor(m4 / y);
m5 = m5 - y * floor(m5 / y);
m6 = m6 - y * floor(m6 / y);

   l = l + 0.00077 / r2d * sin(237.24 / r2d + 150.27 / r2d * T);
   m = m + 0.00077 / r2d * sin(237.24 / r2d + 150.27 / r2d * T);

//--------équation de Kepler
grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie
v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur
r = a * (1 - e * cos(grand_e));
   r = r + 0.000022501 * cos(2 * m - 2 * m2 - 58.208 / r2d);
   r = r + 0.000019045 * cos(3 * m - 3 * m2 + 92.577 / r2d);
   r = r + 0.000006887 * cos(m5 - m2 - 118.09 / r2d);
   r = r + 0.000005172 * cos(m - m2 - 29.11 / r2d);
   r = r + 0.00000362 * cos(5 * m - 4 * m2 - 104.208 / r2d);
   r = r + 0.000003283 * cos(4 * m - 4 * m2 + 63.513 / r2d);
   r = r + 0.000003074 * cos(2 * m5 - 2 * m2 - 55.167 / r2d);

//--------argument de latitude
u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) { d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude écliptique
l = d + longitude_noeud;

   l = l + 0.00313 / r2d * cos(2 * m - 2 * m2 - 148.225 / r2d);
   l = l + 0.00198 / r2d * cos(3 * m - 3 * m2 + 2.565 / r2d);
   l = l + 0.00136 / r2d * cos(m - m2 - 119.107 / r2d);
   l = l + 0.00096 / r2d * cos(3 * m - 2 * m2 - 135.912 / r2d);
   l = l + 0.00082 / r2d * cos(m5 - m2 - 208.087 / r2d);

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));

numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametreven = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------élongation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI))
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatven = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationVen = elongation
elongation_planeteVen = elongation_planete

if (elongationVen < 10) {commentVen = "Inobservable"; quandVen = " "}

if (elongationVen > 10 && elongationVen < 20){
  commentVen = "Difficilement visible"
  if (elongation_planeteVen == "Ouest") {quandVen = "peu avant le lever du Soleil"}
  if (elongation_planeteVen == "Est") {quandVen = "au coucher du Soleil"}}

if (elongationVen > 20 && elongationVen < 50){
  commentVen = "Visible"
  if (elongation_planeteVen == "Ouest") {quandVen = "en toute fin de nuit"}
  if (elongation_planeteVen == "Est") {quandVen = "en tout d�but de soir�e"}}

dc_visibven = commentVen + " " + quandVen

//--------convertion longitude et latitude en ascension droite et déclinaison

l = l - y * floor(l / y);
l1 = l * r2d;

  longitudeVenus = l1;
  
d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longven = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE VENUS
  dc_latven = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  dc_rayonven = floor(r * 100000 + 0.5) / 100000 + " UA"
  dc_distanceven = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceVenus = distance_terre ;
  
asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}
declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2=  ((d1 - floor(d1)) * 60);

dc_alphaven = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADVen = asc * 15 / r2d

  
d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecVen = - d / r2d}
else {signe = "+"; DecVen = + d / r2d}

dc_deltaven = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascVen = asc
declinVen = declin

  

  }
//--------------------------------------------- 
//                   MARS
// --------------------------------------------
{

   const1 = 293.737334;
   const2 = 19141.69551;
   const3 = 0.0003107;
   const4 = 1.52367934191;
   const5 = 0.0933129;
   const6 = 0.000092064;
   const7 = -0.000000077;
   const8 = 1.850333;
   const9 = -0.000675;
   const10 = 0.0000126;
   const11 = 319.51913;
   const12 = 19139.85475;
   const13 = 0.000181;
   const14 = 48.786442;
   const15 = 0.7709917;
   const16 = -0.0000014;
   const17 = 9.368;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * floor(m1 / y);
m2= m2 - y * floor(m2 / y);
m4 = m4 - y * floor(m4 / y);
m5 = m5 - y * floor(m5 / y);
m6 = m6 - y * floor(m6 / y);

//--------corrections

   corr = -0.01133 / r2d * sin(3 * m5 - 8 * m4 + 4 * m) - 0.00933 / r2d * cos(3 * m5 - 8 * m4 + 4 * m);
   l = l + corr;
   m = m + corr;

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);


//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

   r = r + 0.000053227 * cos(m5 - m4 + 41.1306 / r2d);
   r = r + 0.000050989 * cos(2 * m5 - 2 * m4 - 101.9847 / r2d);
   r = r + 0.000038278 * cos(2 * m5 - m4 - 98.3292 / r2d);
   r = r + 0.000015996 * cos(m - m4 - 55.555 / r2d);
   r = r + 0.000014764 * cos(2 * m - 3 * m4 + 68.622 / r2d);
   r = r + 0.000008966 * cos(m5 - 2 * m4 + 43.615 / r2d);
   r = r + 0.000007914 * cos(3 * m5 - 2 * m4 - 139.737 / r2d);
   r = r + 0.000007004 * cos(2 * m5 - 3 * m4 - 102.888 / r2d);
   r = r + 0.00000662 * cos(m - 2 * m4 + 113.202 / r2d);
   r = r + 0.00000493 * cos(3 * m5 - 3 * m4 - 76.243 / r2d);
   r = r + 0.000004693 * cos(3 * m - 5 * m4 + 190.603 / r2d);
   r = r + 0.000004571 * cos(2 * m - 4 * m4 + 244.702 / r2d);
   r = r + 0.000004409 * cos(3 * m5 - m4 - 115.828 / r2d);

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) {d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude �cliptique

l = d + longitude_noeud;

   l = l + 0.00705 / r2d * cos(m5 - m4 - 48.958 / r2d);
   l = l + 0.00607 / r2d * cos(2 * m5 - m4 - 188.35 / r2d);
   l = l + 0.00445 / r2d * cos(2 * m5 - 2 * m4 - 191.897 / r2d);
   l = l + 0.00388 / r2d * cos(m - 2 * m4 + 20.495 / r2d);
   l = l + 0.00238 / r2d * cos(m - m4 + 35.097 / r2d);
   l = l + 0.00204 / r2d * cos(2 * m - 3 * m4 + 158.638 / r2d);
   l = l + 0.00177 / r2d * cos(3 * m4 - m2 - 57.602 / r2d);
   l = l + 0.00136 / r2d * cos(2 * m - 4 * m4 + 154.093 / r2d);
   l = l + 0.00104 / r2d * cos(m5 + 17.618 / r2d);

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));


numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametremars = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------�longation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatmars = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationMars = elongation
elongation_planeteMars = elongation_planete

if (elongationMars < 10) {commentMars = "Inobservable"; quandMars = " "}

if (elongationMars > 10 && elongationMars < 20){
  commentMars = "Difficilement observable"
  if (elongation_planeteMars == "Ouest") {quandMars = "peu avant le lever du Soleil"}
  if (elongation_planeteMars == "Est") {quandMars = "au coucher du Soleil"}}

if (elongationMars > 20 && elongationMars < 45){
  commentMars = "Observable"
  if (elongation_planeteMars == "Ouest") {quandMars = "en toute fin de nuit"}
  if (elongation_planeteMars == "Est") {quandMars = "en tout d�but de soir�e"}}

if (elongationMars > 45 && elongationMars < 120){
  commentMars = "Observable"
  if (elongation_planeteMars == "Ouest") {quandMars = "en seconde partie de nuit"}
  if (elongation_planeteMars == "Est") {quandMars = "en premi�re partie de nuit"}}

if (elongationMars > 120 && elongationMars < 140) {commentMars = "Observable"; quandMars = "pratiquement toute la nuit"}
if (elongationMars > 140 && elongationMars < 180) {commentMars = "Observable"; quandMars = "toute la nuit"}

dc_visibmars = commentMars + " " + quandMars

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;

d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

    longitudeMars = l ;
    
dc_longmars = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta =asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE MARS
  dc_latmars = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  dc_rayonmars = floor(r * 100000 + 0.5) / 100000 + " UA"
  dc_distancemars = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceMars = distance_terre;
  
asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}
declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphamars = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADMars = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecMars = - d / r2d}
else {signe = "+"; DecMars = + d / r2d}

dc_deltamars = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascMars = asc
declinMars = declin

    

  
//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 1.51 + 5 * (log(ray * delta))/ log(10) + 0.016 * FV
magnitude = ceil(magnitude * 10) / 10

dc_magmars = magnitude;
dc_phasemars = floor(phase * 10) / 10 + "%";


   
  }
//---------------------------------------------
//                 JUPITER
//---------------------------------------------
{
 
   const1 = 238.049257;
   const2 = 3036.301986;
   const3 = 0.0003347;
   const4 = 5.20260300002;
   const5 = 0.04833475;
   const6 = 0.00016418;
   const7 = -0.0000004676;
   const8 = 1.308736;
   const9 = -0.0056961;
   const10 = 0.0000039;
   const11 = 225.32833;
   const12 = 3034.69202;
   const13 = -0.000722;
   const14 = 99.443414;
   const15 = 1.01053;
   const16 = 0.00035222;
   const17 = 197.146;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * floor(m1 / y);
m2= m2 - y * floor(m2 / y);
m4 = m4 - y * floor(m4 / y);
m5 = m5 - y * floor(m5 / y);
m6 = m6 - y * floor(m6 / y);

//--------Termes p�riodiques

   u = T / 5 + 0.1;
   p = (237.475 + 3034.9061 * T) / r2d;
   q = (265.916 + 1222.1139 * T) / r2d;
   v = 5 * q - 2 * p;
   dzeta = q - p;

//--------perturbations dans la longitude moyenne

   granda = (0.3314 - 0.0103 * u - 0.0047 * u * u) * sin(v);
   granda = granda + (0.0032 - 0.0644 * u + 0.0021 * u * u) * cos(v);
   granda = granda + 0.0136 * sin(dzeta) + 0.0185 * sin(2 * dzeta) + 0.0067 * sin(3 * dzeta);
   granda = granda + (0.0073 * sin(dzeta) + 0.0064 * sin(2 * dzeta) - 0.0338 * cos(dzeta)) * sin(q);
   granda = granda - (0.0357 * sin(dzeta) + 0.0063 * cos(dzeta) + 0.0067 * cos(2 * dzeta)) * cos(q);

//--------perturbations dans l'excentricit�

   grandb = (361 + 13 * u) * sin(v) + (129 - 58 * u) * cos(v);
   grandb = grandb + (128 * cos(dzeta) - 676 * sin(dzeta) - 111 * sin(2 * dzeta)) * sin(q);
   grandb = grandb + (146 * sin(dzeta) - 82 + 607 * cos(dzeta) + 99 * cos(2 * dzeta) + 51 * cos(3 * dzeta)) * cos(q);
   grandb = grandb - (96 * sin(dzeta) + 100 * cos(dzeta)) * sin(2 * q) - (96 * sin(dzeta) - 102 * cos(dzeta)) * cos(2 * q);

//--------perturbations dans la longitude du p�rih�lie

   grandc = (0.0072 - 0.0031 * u) * sin(v) - 0.0204 * cos(v);
   grandc = grandc + (0.0073 * sin(dzeta) + 0.034 * cos(dzeta) + 0.0056 * cos(2 * dzeta)) * sin(q);
   grandc = grandc + (0.0378 * sin(dzeta) + 0.0062 * sin(2 * dzeta) - 0.0066 * cos(dzeta)) * cos(q);
   grandc = grandc - 0.0054 * sin(dzeta) * sin(2 * q) + 0.0055 * cos(dzeta) * cos(2 * q);

//--------perturbations dans le demi-grand axe

   grandd = -263 * cos(v) + 205 * cos(dzeta) + 693 * cos(2 * dzeta) + 312 * cos(3 * dzeta) + 299 * sin(dzeta) * sin(q) + (204 * sin(2 * dzeta) - 337 * cos(dzeta)) * cos(q);

//--------corrections

   l = l + granda / r2d;
   m = m + granda / r2d - grandc / r2d / e;
   e = e + grandb / 1000000;
   a = a + grandd / 1000000;

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) {d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude �cliptique

l = d + longitude_noeud;

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));

numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametrejup = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------�longation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatjup = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationJup = elongation
elongation_planeteJup =elongation_planete

if (elongationJup < 20) {commentJup = "Inobservable"; quandJup = " "}

if (elongationJup > 20 && elongationJup < 45){
  commentJup = "Observable"
  if (elongation_planeteJup == "Ouest") {quandJup = "en toute fin de nuit"}
  if (elongation_planeteJup == "Est") {quandJup = "en tout d�but de soir�e"}}

if (elongationJup > 45 && elongationJup < 120){
  commentJup = "Observable"
  if (elongation_planeteJup == "Ouest") {quandJup = "en seconde partie de nuit"}
  if (elongation_planeteJup == "Est") {quandJup = "en premi�re partie de nuit"}}

if (elongationJup > 120 && elongationJup < 140) {commentJup = "Observable"; quandJup = "pratiquement toute la nuit"}
if (elongationJup > 140 && elongationJup < 180) {commentJup = "Observable"; quandJup = "toute la nuit"}

dc_visibjup = commentJup + " " + quandJup

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;
longitudeJupiter = l;
  
d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longjup = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE JUPITER
  dc_latjup = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  dc_rayonjup = floor(r * 100000 + 0.5) / 100000 + " UA"
  dc_distancejup = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceJupiter = distance_terre;
  
  
asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}
declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphajup = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADJup = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecJup = - d / r2d}
else {signe = "+"; DecJup = + d / r2d}

dc_deltajup = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascJup = asc
declinJup = declin

//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 9.25 + 5 * (log(ray * delta))/ log(10) + 0.014 * FV
magnitude = ceil(magnitude * 10) / 10

dc_magjup = magnitude;
dc_phasejup = floor(phase * 10) / 10 + "%";

}
//--------------------------------------------- 
//                 SATURNE
//---------------------------------------------
{
 
   const1 = 266.564377;
   const2 = 1223.509884;
   const3 = 0.0003245;
   const4 = 9.55491173474;
   const5 = 0.05589232;
   const6 = -0.0003455;
   const7 = -0.000000728;
   const8 = 2.492519;
   const9 = -0.0039189;
   const10 = -0.00001549;
   const11 = 175.46622;
   const12 = 1221.55147;
   const13 = -0.000502;
   const14 = 112.790414;
   const15 = 0.8731951;
   const16 = -0.00015218;
   const17 = 166.194;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * floor(m1 / y);
m2= m2 - y * floor(m2 / y);
m4 = m4 - y * floor(m4 / y);
m5 = m5 - y * floor(m5 / y);
m6 = m6 - y * floor(m6 / y);

//--------Termes p�riodiques

   u = T / 5 + 0.1;
   p = (237.475 + 3034.9061 * T) / r2d;
   q = (265.916 + 1222.1139 * T) / r2d;
   v = 5 * q - 2 * p;
   dzeta = q - p;

//--------perturbations dans la longitude moyenne

   granda = (-0.8142 + 0.0181 * u + 0.0167 * u * u) * sin(v);
   granda = granda + (-0.0105 + 0.1609 * u - 0.0041 * u * u) * cos(v);
   granda = granda - 0.1488 * sin(dzeta) - 0.0408 * sin(2 * dzeta) - 0.0152 * sin(3 * dzeta);
   granda = granda + (0.0089 * sin(dzeta) - 0.0165 * sin(2 * dzeta)) * sin(q);
   granda = granda + (0.0813 * cos(dzeta) + 0.015 * cos(2 * dzeta)) * sin(q);
   granda = granda + (0.0856 * sin(dzeta) + 0.0253 * cos(dzeta) + 0.0144 * cos(2 * dzeta)) * cos(q);
   granda = granda + 0.0092 * sin(2 * dzeta) * sin(2 * q);

//--------perturbations dans l'excentricit�

   grandb = (-793 + 255 * u) * sin(v) + (1338 + 123 * u) * cos(v);
   grandb = grandb + 1241 * sin(q) + (39 - 62 * u) * sin(dzeta) * sin(q);
   grandb = grandb + (2660 * cos(dzeta) - 469 * cos(2 * dzeta) - 187 * cos(3 * dzeta) - 82 * cos(4 * dzeta)) * sin(q);
   grandb = grandb - (1270 * sin(dzeta) + 420 * sin(2 * dzeta) + 150 * sin(3 * dzeta)) * cos(q);
   grandb = grandb - 62 * sin(4 * dzeta) * cos(q);
   grandb = grandb + (221 * sin(dzeta) - 221 * sin(2 * dzeta) - 57 * sin(3 * dzeta)) * sin(2 * q);
   grandb = grandb - (278 * cos(dzeta) - 202 * cos(2 * dzeta)) * sin(2 * q);
   grandb = grandb - (284 * sin(dzeta) + 159 * cos(dzeta)) * cos(2 * q);
   grandb = grandb + (216 * cos(2 * dzeta) + 56 * cos(3 * dzeta)) * cos(2 * q);

//--------perturbations dans la longitude du p�rih�lie

   grandc = (0.0771 + 0.0072 * u) * sin(v);
   grandc = grandc + (0.0458 - 0.0148 * u) * cos(v);
   grandc = grandc - (0.0758 * sin(dzeta) + 0.0248 * sin(2 * dzeta) + 0.0086 * sin(3 * dzeta)) * sin(q);
   grandc = grandc - (0.0726 + 0.1504 * cos(dzeta) - 0.0269 * cos(2 * dzeta) - 0.0101 * cos(3 * dzeta)) * cos(q);
   grandc = grandc - (0.0136 * sin(dzeta) - 0.0136 * cos(2 * dzeta)) * sin(2 * q);
   grandc = grandc - (0.0137 * sin(dzeta) - 0.012 * sin(2 * dzeta)) * cos(2 * q);
   grandc = grandc + (0.0149 * cos(dzeta) - 0.0131 * cos(2 * dzeta)) * cos(2 * q);

//--------perturbations dans le demi-grand axe

   grandd = 2933 * cos(v) + 33629 * cos(dzeta) - 3081 * cos(2 * dzeta) - 1423 * cos(3 * dzeta) - 671 * cos(4 * dzeta) + (1098 - 2812 * sin(dzeta) + 688 * sin(2 * dzeta)) * sin(q);
   grandd = grandd + (2138 * cos(dzeta) - 999 * cos(2 * dzeta) - 642 * cos(3 * dzeta)) * sin(q) - 890 * cos(q) + (2206 * sin(dzeta) - 1590 * sin(2 * dzeta) - 647 * sin(3 * dzeta)) * cos(q) + (2885 * cos(dzeta) + 2172 * cos(2 * dzeta)) * cos(q) - 778 * cos(dzeta) * sin(2 * q) - 856 * sin(dzeta) * cos(2 * q);

//--------corrections

   l = l + granda / r2d;
   m = m + granda / r2d - grandc / r2d / e;
   e = e + grandb / 1000000;
   a = a + grandd / 1000000;

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) {d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude �cliptique

l = d + longitude_noeud;

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));

    corr = 0.000747 * cos(dzeta) * sin(q) + 0.001069 * cos(dzeta) * cos(q);
    corr = corr + 0.002108 * sin(2 * dzeta) * sin(2 * q) + 0.001261 * cos(2 * dzeta) * sin(2 * q);
    corr = corr + 0.001236 * sin(2 * dzeta) * cos(2 * q) - 0.002075 * cos(2 * dzeta) * cos(2 * q);
    b = b + corr / r2d;

numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametresat = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------élongation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatsat = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationSat = elongation
elongation_planeteSat =elongation_planete

if (elongationSat < 20) {commentSat = "Inobservable"; quandSat = " "}

if (elongationSat > 20 && elongationSat < 45){
  commentSat = "Observable"
  if (elongation_planeteSat == "Ouest") {quandSat = "en toute fin de nuit"}
  if (elongation_planeteSat == "Est") {quandSat = "en tout d�but de soir�e"}}

if (elongationSat > 45 && elongationSat < 120){
  commentSat = "Observable"
  if (elongation_planeteSat == "Ouest") {quandSat = "en seconde partie de nuit"}
  if (elongation_planeteSat == "Est") {quandSat = "en premi�re partie de nuit"}}

if (elongationSat > 120 && elongationSat < 140) {commentSat = "Observable"; quandSat = "pratiquement toute la nuit"}
if (elongationSat > 140 && elongationSat < 180) {commentSat = "Observable"; quandSat = "toute la nuit"}

dc_visibsat = commentSat + " " + quandSat

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;
  
longitudeSaturne = l;

d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longsat = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE SATURNE
  dc_latsat = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
  dc_rayonsat = floor(r * 100000 + 0.5) / 100000 + " UA"
  dc_distancesat = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceSaturne = distance_terre;
  
  
asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}

declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphasat = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADSat = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecSat = - d / r2d}
else {signe = "+"; DecSat = + d / r2d}

dc_deltasat = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascSat = asc
declinSat = declin

//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 9.0 + 5 * (log(ray * delta))/ log(10) + 0.044 * FV
magnitude = floor(magnitude * 100) / 100

los =  l1        //geocentric ecliptic longitude 
las =  b1        //geocentric ecliptic latitude

    ir = 28.06 / r2d
    Nr = (169.51 / r2d) + (3.82E-5 / r2d) * T
    B = asin( sin(las) * cos(ir) - cos(las) * sin(ir) * sin(los - Nr) )

ring_magn = -2.6 * sin(abs(B)) + 1.2 * pow(sin(B),2)
ring_magn = floor(ring_magn * 100) / 100

dc_magsat = ceil((magnitude + ring_magn) * 10) / 10;
dc_phasesat = floor(phase * 10) / 10 + "%";
  

}
//--------------------------------------------- 
//                 URANUS
//---------------------------------------------
{

   const1 = 244.19747;
   const2 = 429.863546;
   const3 = 0.000316;
   const4 = 19.21844609894;
   const5 = 0.0463444;
   const6 = -0.00002658;
   const7 = 0.000000077;
   const8 = 0.772464;
   const9 = 0.0006253;
   const10 = 0.0000395;
   const11 = 72.648778;
   const12 = 428.3791132;
   const13 = 0.0000788;
   const14 = 73.477111;
   const15 = 0.4986678;
   const16 = 0.0013117;
   const17 = 70.481;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (const1 + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne

m1 = (102.27938 + 149472.51529 * T + 0.000007 * T2) / r2d;
m2 = (212.60322 + 58517.80387 * T + 0.001286 * T2) / r2d;
m4 = (319.51913 + 19139.85475 * T + 0.000181 * T2) / r2d;
m5 = (225.32833 + 3034.69202 * T - 0.000722 * T2) / r2d;
m6 = (175.46622 + 1221.55147 * T - 0.000502 * T2) / r2d;

m1= m1 - y * floor(m1 / y);
m2= m2 - y * floor(m2 / y);
m4 = m4 - y * floor(m4 / y);
m5 = m5 - y * floor(m5 / y);
m6 = m6 - y * floor(m6 / y);

//--------Termes p�riodiques

   u = T / 5 + 0.1;
   p = (237.475 + 3034.9061 * T) / r2d;
   q = (265.916 + 1222.1139 * T) / r2d;
   g = (83.76922 + 218.4901 * T) / r2d;
   h = (284.02 + 8.51 * T) / r2d;
   s = (243.52 + 428.47 * T) / r2d;
   w = 2 * p - 6 * q + 3 * s;
   dzeta = s - p;
   eta = s - q;
   theta = (200.25 - 209.98 * T) / r2d;

//--------perturbations

   granda = (0.864319 - 0.001583 * u) * sin(h) + 0.036017 * sin(2 * h) + (0.082222 - 0.006833 * u) * cos(h) - 0.003019 * cos(2 * h) + 0.008122 * sin(w);
   grandb = 2098 * cos(h) - 335 * sin(h) + 131 * cos(2 * h);
   grandc = 0.120303 * sin(h) + (0.019472 - 0.000947 * u) * cos(h) + 0.006197 * sin(2 * h);
   grandd = -3825 * cos(h);

//--------corrections

   l = l + granda / r2d;
   m = m + granda / r2d - grandc / r2d / e;
   e = e + grandb / 1000000;
   a = a + grandd / 1000000;

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

   r = r - 0.025948 + 0.004985 * cos(dzeta) - 0.00123 * cos(s) + 0.003354 * cos(eta);
   r = r + (0.005795 * cos(s) - 0.001165 * sin(s) + 0.001388 * cos(2 * s)) * sin(eta);
   r = r + (0.001351 * cos(s) + 0.005702 * sin(s) + 0.00138 * sin(2 * s)) * cos(eta);
   r = r + 0.000904 * cos(2 * theta) + 0.000894 * (cos(theta) - cos(3 * theta));

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) {d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude �cliptique

l = d + longitude_noeud;

   l = l + ((0.010122 - 0.000988 * u) * sin(s + eta) + (-0.038581 + 0.002031 * u - 0.00191 * u * u) * cos(s + eta) + (0.034964 - 0.001038 * u + 0.000868 * u * u) * cos(2 * s + eta) - 0.014808 * sin(dzeta) - 0.005794 * sin(eta) + 0.002347 * cos(eta) + 0.009872 * sin(theta) + 0.008803 * sin(2 * theta) - 0.004308 * sin(3 * theta)) / r2d;

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));

   corr = (0.000458 * sin(eta) - 0.000642 * cos(eta) - 0.000517 * cos(4 * theta)) * sin(s);
   corr = corr - (0.000347 * sin(eta) + 0.000853 * cos(eta) + 0.000517 * sin(4 * eta)) * cos(s);
   corr = corr + 0.000403 * (cos(2 * theta) * sin(2 * s) + sin(2 * theta) * cos(2 * s));
   b = b + corr / r2d;

numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}

if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametreuran = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------�longation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) {
   elongation_planete = "Ouest";
}
          else
{
   elongation_planete = "Est";
}

dc_elongaturan = floor(elongation * 10 + 0.5) / 10 + "� "+ elongation_planete;

elongationUran = elongation
elongation_planeteUran =elongation_planete

if (elongationUran < 20) {commentUran = "Inobservable"; quandUran = " "}

if (elongationUran > 20 && elongationUran < 45){
  commentUran = "Observable"
  if (elongation_planeteUran == "Ouest") {quandUran = "en toute fin de nuit"}
  if (elongation_planeteUran == "Est") {quandUran = "en tout d�but de soir�e"}}

if (elongationUran > 45 && elongationUran < 120){
  commentUran = "Observable"
  if (elongation_planeteUran == "Ouest") {quandUran = "en seconde partie de nuit"}
  if (elongation_planeteUran == "Est") {quandUran = "en premi�re partie de nuit"}}

if (elongationUran > 120 && elongationUran < 140) {commentUran = "Observable"; quandUran = "pratiquement toute la nuit"}
if (elongationUran > 140 && elongationUran < 180) {commentUran = "Observable"; quandUran = "toute la nuit"}

dc_visiburan = commentUran + " " + quandUran

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;
longitudeUranus = l;
  
d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longuran = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE URANUS
dc_laturan = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
dc_rayonuran = floor(r * 100000 + 0.5) / 100000 + " UA"
dc_distanceuran = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
distanceUranus = distance_terre;
  
  
asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}

declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc-floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphauran = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADUran = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecUran = - d / r2d}
else {signe = "+"; DecUran = + d / r2d}

dc_deltauran = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascUran = asc
declinUran = declin

//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 7.15 + 5 * (log(ray * delta))/ log(10) + 0.001 * FV
magnitude = ceil(magnitude * 100)/100

dc_maguran = magnitude;
dc_phaseuran = floor(phase * 10) / 10 + "%";
  

}
//--------------------------------------------- 
//                 NEPTUNE
//--------------------------------------------- 
{

   const1 = 84.457994;
   const2 = 219.885914;
   const3 = 0.0003205;
   const4 = 30.11038703542;
   const5 = 0.00899704;
   const6 = 0.00000633;
   const7 = -0.000000002;
   const8 = 1.779242;
   const9 = -0.0095436;
   const10 = -0.0000091;
   const11 = 37.73063;
   const12 = 218.4613396;
   const13 = -0.00007032;
   const14 = 130.681389;
   const15 = 1.098935;
   const16 = 0.00024987;
   const17 = 68.289;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = (
  + const2 * T + const3 * T2) / r2d;
l = l - y * floor(l / y);

a = const4;

e = const5 + const6 * T + const7 * T2;
i = (const8 + const9 * T + const10 * T2) / r2d;
m = (const11 + const12 * T + const13 * T2) / r2d;
m = m - y * floor(m / y);
longitude_noeud = (const14 + const15 * T + const16 * T2) / r2d;

//--------------- Anomalie moyenne


//--------Termes p�riodiques

   u = T / 5 + 0.1;
   p = (237.475 + 3034.9061 * T) / r2d;
   q = (265.916 + 1222.1139 * T) / r2d;
   g = (83.76922 + 218.4901 * T) / r2d;
   h = (284.02 + 8.51 * T) / r2d;
   theta = (200.25 - 209.98 * T) / r2d;
   dzeta = (153.71 + 2816.42 * T) / r2d;
   eta = (182.15 + 1003.62 * T) / r2d;

//--------perturbations

   granda = (-0.589833 + 0.001089 * u) * sin(h) + (-0.056094 + 0.004658 * u) * cos(h) - 0.024286 * sin(2 * h);
   grandb = 438.9 * sin(h) + 426.2 * cos(h) + 112.9 * sin(2 * h) + 108.9 * cos(2 * h);
   grandc = 0.024039 * sin(h) - 0.025303 * cos(h) + 0.006206 * sin(2 * h) - 0.005992 * cos(2 * h);
   grandd = -817 * sin(h) + 8189 * cos(h) + 781 * cos(2 * h);

//--------corrections

   l = l + granda / r2d;
   m = m + granda / r2d - grandc / r2d / e;
   e = e + grandb / 1000000;
   a = a + grandd / 1000000;

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

   r = r - 0.040596 + 0.004992 * cos(dzeta) + 0.002744 * cos(eta) + 0.002044 * cos(theta) + 0.001051 * cos(2 * theta);

//--------argument de latitude

u = l + v - m - longitude_noeud;
u = u - y * floor(u / y);

if (cos(u) != 0) {d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {d = d + PI;}
}
   else {d = u;}

//--------longitude �cliptique

l = d + longitude_noeud;

   l = l + (0.009556 * sin(dzeta) + 0.005178 * sin(eta)) / r2d;

if (l > 2 * PI) {l = l - 2 * PI;}

b = asin(sin(u) * sin(i));

   b = b + (0.000336 * cos(2 * theta) * sin(g) + 0.000364 * sin(2 * theta) * cos(g)) / r2d;

numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;

l = atan(numerateur / denominateur) + longitude_terre + PI;

if (l > 2 * PI) {l = l - 2 * PI;}
if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametrenept = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------�longation

omega = 259.18 / r2d - 1934.142 / r2d * T;
l = l - 0.00479 / r2d * sin(omega);

elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatnept = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationNept = elongation
elongation_planeteNept =elongation_planete

if (elongationNept < 20) {commentNept = "Inobservable"; quandNept = " "}

if (elongationNept > 20 && elongationNept < 45){
  commentNept = "Observable"
  if (elongation_planeteNept == "Ouest") {quandNept = "en toute fin de nuit"}
  if (elongation_planeteNept == "Est") {quandNept = "en tout d�but de soir�e"}}

if (elongationNept > 45 && elongationNept < 120){
  commentNept = "Observable"
  if (elongation_planeteNept == "Ouest") {quandNept = "en seconde partie de nuit"}
  if (elongation_planeteNept == "Est") {quandNept = "en premi�re partie de nuit"}}

if (elongationNept > 120 && elongationNept < 140) {commentNept = "Observable"; quandNept = "pratiquement toute la nuit"}
if (elongationNept > 140 && elongationNept < 180) {commentNept = "Observable"; quandNept = "toute la nuit"}

dc_visibnept = commentNept + " " + quandNept

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;

  longitudeNeptune = l;
  
d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longnept = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);

b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

if (beta < 0) {signe = "-";}
else {signe = "+";}

  // DISTANCE NEPTUNE
dc_latnept = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
dc_rayonnept = floor(r * 100000 + 0.5) / 100000 + " UA"
dc_distancenept = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distanceNeptune = distance_terre;

asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}

declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));

asc = asc * r2d / 15;

d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphanept = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADNept = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecNept = - d / r2d}
else {signe = "+"; DecNept = + d / r2d}

dc_deltanept = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascNept = asc
declinNept = declin

//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50

magnitude = - 6.90 + 5 * (log(ray * delta))/ log(10) + 0.001 * FV
magnitude = ceil(magnitude * 100)/100

dc_magnept = magnitude;
dc_phasenept = floor(phase * 10) / 10 + "%";


  }
//--------------------------------------------- 
//                 PLUTON
//--------------------------------------------- 
{

const17 = 3.200;

//--------------- Longitude moyenne (l), demi-grand axe (a), excentricit� (e), inclinaison (i), 
//--------longitude noeud ascendant (m)

l = mod2pi((238.92881 + (522747.90 * T_2000 / 3600)) / r2d);  //longitude moyenne
l = l - y * floor(l / y);
a = 39.48168677 - (0.00076912 * T_2000);                      // demi-grand axe
e = 0.24880766 + (0.00006465 * T_2000);                       // excentricit�
i = (17.14175 + (11.07 * T_2000 / 3600)) / r2d;                 // inclinaison
ap = (224.06676 - (132.25 * T_2000 / 3600)) / r2d;            // argument du p�rih�lie
Om = (110.30347 - (37.33 * T_2000 / 3600)) / r2d;             // longitude du noeud ascendant

m = (l - ap)                                               // longitude du p�rih�lie

m = m - y * floor(m / y);

//--------�quation de Kepler

grand_e = m;
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);
grand_e = m + e * sin(grand_e);

//--------anomalie vraie

v = 2 * atan(sqrt((1 + e) / (1 - e)) * tan(grand_e / 2));
if (v < 0) {v = v + 2 * PI;}

//--------rayon vecteur

r = a * (1 - e * cos(grand_e));

//--------argument de latitude

u = l + v - m - Om;
u = u - y * floor(u / y);
if (cos(u) != 0) {
   d = atan(cos(i) * tan(u));
   if (cos(u) < 0) {
      d = d + PI;
   }
}
   else {
     d = u;
   }

//--------longitude �cliptique

l = d + Om;
if (l > 2 * PI) 
{
l = l - 2 * PI;
}
b = asin(sin(u) * sin(i));
numerateur = r * cos(b) * sin(l - longitude_terre + PI);
denominateur = r * cos(b) * cos(l - longitude_terre + PI) + distance_terre_soleil;
l = atan(numerateur / denominateur) + longitude_terre + PI;
if (l > 2 * PI)  
{l = l - 2 * PI;}
if (denominateur < 0) {l = l + PI;}

diametre = const17;

//--------conversion rectangulaire/polaire

xp = r * cos(b) * cos(l) - distance_terre_soleil * cos(latitude_terre) * cos(longitude_terre);
yp = r * cos(b) * sin(l) - distance_terre_soleil * cos(latitude_terre) * sin(longitude_terre);
zp = r * sin(b) - distance_terre_soleil * sin(latitude_terre);

distance_terre = sqrt(numerateur * numerateur + denominateur * denominateur + r * r * sin(b) * sin(b));

dc_diametrepluton = floor(diametre / distance_terre * 100 + 0.5) / 100 + "''";

//--------�longation

omega = 259.18 / r2d - 1934.142 / r2d * T_2000;
l = l - 0.00479 / r2d * sin(omega);
elongation = r2d * acos(cos(b) * cos(l - longitude_soleil));
if ((l < longitude_soleil && longitude_soleil - l < PI) || (l > longitude_soleil && l - longitude_soleil > PI)) 
{elongation_planete = "Ouest";}
else {elongation_planete = "Est";}

dc_elongatpluton = floor(elongation * 10 + 0.5) / 10 + "� " + elongation_planete;

elongationPluton = elongation
elongation_planetePluton =elongation_planete

if (elongationPluton < 20) {commentPluton = "Inobservable"; quandPluton = " "}

if (elongationPluton > 20 && elongationPluton < 45){
  commentPluton = "Observable aux instruments"
  if (elongation_planetePluton == "Ouest") {quandPluton = "en toute fin de nuit"}
  if (elongation_planetePluton == "Est") {quandPluton = "en tout d�but de soir�e"}}

if (elongationPluton > 45 && elongationPluton < 120){
  commentPluton = "Observable aux instruments"
  if (elongation_planetePluton == "Ouest") {quandPluton = "en seconde partie de nuit"}
  if (elongation_planetePluton == "Est") {quandPluton = "en premi�re partie de nuit"}}

if (elongationPluton > 120 && elongationPluton < 140) {commentPluton = "Observable aux instruments"; quandPluton = "pratiquement toute la nuit"}
if (elongationPluton > 140 && elongationPluton < 180) {commentPluton = "Observable aux instruments"; quandPluton = "toute la nuit"}


dc_visibpluton = commentPluton + " " + quandPluton

//--------convertion longitude et latitude en ascension droite et d�clinaison

l = l -y * floor(l /y);
l1 = l * r2d;
d1 =((l1 - floor(l1)) * 60);
d2 =((d1 - floor(d1)) * 60);

  longitudePluton = l ;
  
dc_longpluton = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

beta = asin(r * sin(b) / distance_terre);
b1 = abs(beta * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);
if (beta < 0) {signe = "-";}
else {signe = "+";}

  // Distance PLUTON
dc_latpluton = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
dc_rayonpluton = floor(r * 100000 + 0.5) / 100000 + " UA"
dc_distancepluton = floor(distance_terre * 100000 + 0.5) / 100000 + " UA"
  distancePluton = distance_terre;

asc = atan((cos(obliquite) * sin(l) - tan(beta) * sin(obliquite)) / cos(l));
if (asc < 0) {asc = asc + 2 * PI;}
if (cos(l) < 0) {asc = asc + PI;}
if (asc > 2 * PI) {asc = asc - 2 * PI;}
declin = r2d * asin(sin(beta) * cos(obliquite) + cos(beta) * sin(obliquite) * sin(l));
asc = asc * r2d / 15;
d1 = ((asc - floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphapluton = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADPluton = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecPluton = - d / r2d}
else {signe = "+"; DecPluton = + d / r2d}

dc_deltapluton = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";
ascPluton = asc
declinPluton = declin

//Magnitude de la plan�te

PGJ_dist = R                    // rayon vecteur Soleil-Terre
ray = r                     // rayon vecteur Soleil-plan�te
delta = distance_terre      // distance Terre-plan�te

    FV = acos( (ray * ray + delta * delta - PGJ_dist * PGJ_dist ) / (2 * ray * delta) )
    FV = (FV) * r2d

    phase = (1 + cos(FV / r2d)) * 50
   
    lgrd = log(ray * delta) / log(10);
    magnitude = - 0.14 + 5 * lgrd;

dc_magpluton = floor(magnitude * 100) / 100;
dc_phasepluton = floor(phase * 10) / 10 + "%";



}
//--------------------------------------------- 
//                 LUNE 
//--------------------------------------------- 
{
 
  
ct = 0.00000484814;
longitude_soleil = longitude + 0.00134 / r2d * cos(a) + 0.00154 / r2d * cos(b) + 0.002 / r2d * cos(c) + 0.00179 / r2d * sin(d) + 0.00178 / r2d * sin(e);
longitude_soleil = longitude_soleil - y * floor(longitude_soleil / y);

e = 1 - 0.002516 * T_2000 - 0.0000074 * T2_2000
excentricite = e * 0.01675104;

mercure = (252.250906 + 149472.674636 * T_2000) / r2d;
mercure = mercure - y * floor(mercure /y);
venus = (181.979801 + 58517.815676 * T_2000) / r2d;
venus = venus - y * floor(venus / y);
longitude_moyenne_terre = (100.46645 + 35999.372854 * T_2000) / r2d;
longitude_moyenne_terre = longitude_moyenne_terre - y * floor(longitude_moyenne_terre /y);
mars = (355.433275 + 19140.299331 * T_2000) / r2d;
mars = mars - y * floor(mars / y);
jupiter = (34.351484 + 3034.905675 * T_2000) / r2d;
jupiter = jupiter - y * floor(jupiter / y);
saturne = (50.077471 + 1222.113794 * T_2000) / r2d;
saturne = saturne - y * floor(saturne /y);
uranus = ((314 + 3 / 60 + 18.01841 / 3600) + 1542481.19393 / 3600 * T_2000) / r2d;
uranus = uranus - y * floor(uranus / y);
neptune = ((304 + 20 / 60 + 55.19575 / 3600) + 786550.32074 / 3600 * T_2000) / r2d;
neptune = neptune - y * floor(neptune / y);

a1=(119.75 + 131.849 * T_2000) / r2d;
a2=(53.09 + 479264.29 * T_2000) / r2d;
a3=(313.45 + 481266.484 * T_2000) / r2d;

om = (125.044555 - 1934.1361849 * T_2000 + 0.0020762 * T2_2000 + T3_2000 / 467410 - T4_2000 / 60616000) / r2d;
longitude_noeud = om;

l = (218.3164591 + 481267.88134236 * T_2000 - 0.0013268 * T2_2000 + T3_2000 / 538841 -  T4_2000 / 65194000) / r2d;
l = l - y * floor(l / y);
w1 = l;

m = (357.5291092 + 35999.0502909 * T_2000 - 0.0001536 * T2_2000 + T3_2000 / 24490000) / r2d;
l_prime = m;
anomalie_lune = m;

f = (93.2720993 + 483202.0175273 * T_2000 - 0.0034029 * T2_2000 -  T3_2000/3526000 + T4_2000 / 863310000) / r2d;
f = f - y * floor(f / y);

n = (134.9634114 + 477198.8676313 * T_2000 + 0.008997 * T2_2000 + T3_2000 / 69699 - T4_2000 / 14712000) /r2d;
n = n - y * floor(n / y);
petit_l = n;

d = (297.8502042 + 445267.1115168 * T_2000 - 0.00163 * T2_2000 + T3_2000 / 545868 - T4_2000 / 113065000) / r2d;
d = d - y * floor(d / y);

dzeta_lune = w1 + 5029.0966 / 3600 / r2d * T_2000;

nu = (-171996 - 174.2 * T_2000) * sin(om);
nu = nu + (-13187 - 1.6 * T_2000) * sin(-2 * d + 2 * f + 2 * om);
nu = nu + (-2274 - 0.2 * T_2000) * sin(2 * f + 2 * om);
nu = nu + (2062 + 0.2 * T_2000) * sin(2 * om);
nu = nu + (1426 - 3.4 * T_2000) * sin(m);
nu = nu + (712 + 0.1 * T_2000) * sin(n);
nu = nu + (-517 + 1.2 * T_2000) * sin(-2 * d + m + 2 * f + 2 * om);
nu = nu + (-386 - 0.4 * T_2000) * sin(2 * f + om);
nu = nu - 301 * sin(n + 2 * f + 2 * om);
nu = nu + (217 - 0.5 * T_2000) * sin(-2 * d - m + 2 * f + 2 * om);
nu = nu - 158 * sin(-2 * d + n);
nu = nu + (129 + 0.1 * T_2000)  * sin (-2 * d + 2 * f + om);
nu = nu + 123  * sin (-n + 2 * f + 2 * om);
nu = nu + 63 * sin(2 * d);
nu = nu + (63 + 0.1 * T_2000)  * sin (n + om);
nu = nu - 59 * sin(2 * d - n + 2 * f + 2 * om);
nu = nu - (58 - 0.1 * T_2000) * sin(-n + om);
nu = nu - 51 * sin(n + 2 * f + om);
nu = nu + 48 * sin(-2 * d + 2 * n);
nu = nu + 46 * sin(-2 * n + 2 * f + om);
nu = nu - 38 * sin(2 * (d + f + om));
nu = nu - 31 * sin(2 * (n + f + om));
nu = nu + 29 * sin(2 * n);
nu = nu + 29 * sin(-2 * d + n + 2 * f + 2 * om);
nu = nu + 26 * sin(2 * f);
nu = nu - 22 * sin(-2 * d + 2 * f);
nu = nu + 21 * sin(-n + 2 * f + om);
nu = nu + (17 - 0.1 * T_2000) * sin(2 * m);
nu = nu + 16 * sin(2 * d - n + om);
nu = nu - (16 + 0.1 * T_2000) * sin(-2 * d + 2 * m + 2 * f + 2 * om);
nu = nu - 15 * sin(m + om);
nu = nu - 13 * sin(-2 * d + n + om);
nu = nu - 12 * sin(-m - om);
nu = nu + 11 * sin(2 * n - 2 * f);
nu = nu - 10 * sin(2 * d - n + 2 * f + om);
nu = nu - 8 * sin(2 * d + n + 2 * f + 2 * om);
nu = nu + 7 * sin(m + 2 * f + 2 * om);
nu = nu - 7 * sin(-2 * d + m + n);
nu = nu - 7 * sin(-m + 2 * f + 2 * om);
nu = nu - 7 * sin(2 * d + 2 * f + om);
nu = nu + 6 * sin(2 * d + n);
nu = nu + 6 * sin(-2 * d + 2 * n + 2 * f + 2 * om);
nu = nu + 6 * sin(-2 * d + n + 2 * f + om);
nu = nu - 6 * sin(2 * d - 2 * n + om);
nu = nu - 6 * sin(2 * d + om);
nu = nu + 5 * sin(-m + n);
nu = nu - 5 * sin(-2 * d - m + 2 * f + om);
nu = nu - 5 * sin(-2 * d + om);
nu = nu - 5 * sin(2 * n + 2 * f + om);
nu = nu + 4 * sin(-2 * d + 2 * n + om);
nu = nu + 4 * sin(-2 * d + m + 2 * f + om);
nu = nu + 4 * sin(n - 2 * f);
nu = nu - 4 * sin(-d + n);
nu = nu - 4 * sin(-2 * d + m);
nu = nu - 4 * sin(d);
nu = nu + 3 * sin(n + 2 * f);
nu = nu - 3 * sin(-2 * n + 2 * f + 2 * om);
nu = nu - 3 * sin(-d - m - n);
nu = nu - 3 * sin(m + n);
nu = nu - 3 * sin(-m + n + 2 * f + 2 * om);
nu = nu - 3 * sin(2 * d - m - n + 2 * f + 2 * om);
nu = nu - 3 * sin(3 * n + 2 * f + 2 * om);
nu = nu - 3 * sin(2 * d - m + 2 * f + 2 * om);

nutation_en_longitude = nu / 10000;

nu = (92025 + 8.9 * T_2000) * cos(om);
nu = nu + (5736 - 3.1 * T_2000) * cos(-2 * d + 2 * f + 2 * om);
nu = nu + (977 - 0.5 * T_2000) * cos(2 * f + 2 * om);
nu = nu + (-895 + 0.5 * T_2000) * cos(2 * om);
nu = nu + (54 - 0.1 * T_2000) * cos(m);
nu = nu - 7 * cos(n);
nu = nu + (224 - 0.6 * T_2000) * cos(-2 * d + m + 2 * f + 2 * om);
nu = nu + 200 * cos(2 * f + om);
nu = nu + (129 - 0.1 * T_2000) * cos(n + 2 * f + 2 * om);
nu = nu + (-95 + 0.3 * T_2000) * cos(-2 * d - m + 2 * f + 2 * om);
nu = nu - 70 * cos(-2 * d + 2 * f + om);
nu = nu - 53 * cos(-n + 2 * f + 2 * om);
nu = nu - 33 * cos(n + om);
nu = nu + 26 * cos(2 * d - n + 2 * f + 2 * om);
nu = nu + 32 * cos(-n + om);
nu = nu + 27 * cos(n + 2 * f + om);
nu = nu - 24 * cos(-2 * n + 2 * f + om);
nu = nu + 16 * cos(2 * (d + f + om));
nu = nu + 13 * cos(2 * (n + f + om));
nu = nu - 12 * cos(-2 * d + n + 2 * f + 2 * om);
nu = nu - 10 * cos(-n + 2 * f + om);
nu = nu - 8 * cos(2 * d - n + om);
nu = nu + 7 * cos(-2 * d + 2 * m + 2 * f + 2 * om);
nu = nu + 9 * cos(m + om);
nu = nu + 7 * cos(-2 * d + n + om);
nu = nu + 6 * cos(-m + om);
nu = nu + 5 * cos(2 * d - n + 2 * f + om);
nu = nu + 3 * cos(2 * d + n + 2 * f + 2 * om);
nu = nu - 3 * cos(m + 2 * f + 2 * om);
nu = nu + 3 * cos(-m + 2 * f + 2 * om);
nu = nu + 3 * cos(2 * d + 2 * f + om);
nu = nu - 3 * cos(-2 * d + 2 * n + 2 * f + 2 * om);
nu = nu - 3 * cos(-2 * d + n + 2 * f + om);
nu = nu + 3 * cos(2 * d - 2 * n + om);
nu = nu + 3 * cos(2 * d + om);
nu = nu + 3 * cos(-2 * d - m + 2 * f + om);
nu = nu + 3 * cos(-2 * d + om);
nu = nu + 3 * cos(2 * n + 2 * f + om);

nutation_en_obliquite = nu / 10000;

obliquite = (23 + 26 / 60 + 21.448 / 3600 - 46.815 / 3600 * T_2000 - 0.00059 / 3600 * T2_2000 + 0.001813 / 3600 * T3_2000) / r2d + nutation_en_obliquite * ct;

correct = 22639.55 * sin (n);
correct = correct + 4586.43061 * sin (2 * d - n);
correct = correct + 2369.91227 * sin (2 * d);
correct = correct + 769.02326 * sin (2 * n);
correct = correct + 211.65487 * sin (2 * d - 2 * n);
correct = correct + 205.44315 * sin (2 * d - m - n);
correct = correct + 191.95575 * sin (2 * d + n);
correct = correct + 164.73458 * sin (2 * d - m);
correct = correct + 55.17801 * sin (2 * d - 2 * f);
correct = correct + 39.53393 * sin (n - 2 * f);
correct = correct + 38.42974 * sin (4 * d - n);
correct = correct + 36.12364 * sin (3 * n);
correct = correct + 30.77247 * sin (4 * d - 2 * n);
correct = correct + 17.95512 * sin (d + m);
correct = correct + 14.53078 * sin (2 * d - m + n);
correct = correct + 14.37964 * sin (2 * d + 2 * n);
correct = correct + 13.89903 * sin (4 * d);
correct = correct + 13.194 * sin (2 * d - 3 * n);
correct = correct + 8.60582 * sin (2 * d - m - 2 * n);
correct = correct + 8.05076 * sin (2 * d - 2 * m);
correct = correct + 7.37173 * sin (2 * d - 2 * m - n);
correct = correct + 4.37416 * sin (4 * d - m - n);
correct = correct + 2.73198 * sin (4 * d - m - 2 * n);
correct = correct + 2.48897 * sin (2 * d + m - 2 * n);
correct = correct + 2.14619 * sin (2 * d - m - 2 * f);
correct = correct + 1.97772 * sin (4 * d + n);
correct = correct + 1.93367 * sin (4 * n);
correct = correct + 1.87083 * sin (4 * d - m);
correct = correct + 1.26186 * sin (d + m + n);
correct = correct + 1.18682 * sin (4 * d - 3 * n);
correct = correct + 1.17704 * sin (2 * d - m + 2 * n);
correct = correct + 1.07773 * sin (d + m - n);
correct = correct + 1.05949 * sin (2 * d + 3 * n);
correct = correct + .94827 * sin (2 * d - 4 * n);
correct = correct + .75173 * sin (2 * d - 2 * m + n);
correct = correct + .57156 * sin (6 * d - 2 * n);
correct = correct + .47842 * sin (2 * d - m - 3 * n);
correct = correct + .42034 * sin (4 * f);
correct = correct + .41342 * sin (m + 2 * f);
correct = correct + .40423 * sin (3 * d);
correct = correct + .39451 * sin (6 * d - n);
correct = correct + .34966 * sin (d + m - 2 * n);
correct = correct + .33983 * sin (2 * d - 3 * m);
correct = correct + .30874 * sin (4 * d - 2 * m - n);
correct = correct + .30157 * sin (m - n - 2 * f);
correct = correct + .30086 * sin (4 * d - n - 2 * f);
correct = correct + .29422 * sin (2 * d - 2 * m - 2 * n);
correct = correct + .29255 * sin (6 * d - 3 * n);
correct = correct + .28251 * sin (4 * d - m + n);
correct = correct + .27377 * sin (3 * d + m - n);
correct = correct + .26338 * sin (m + n + 2 * f);
correct = correct + .25429 * sin (d + 2 * f);
correct = correct + .24697 * sin (2 * d - 3 * m - n);
correct = correct + .21853 * sin (4 * d + 2 * n);
correct = correct + .17903 * sin (2 * d - n - 2 * f);
correct = correct + .17624 * sin (2 * d + m - 3 * n);
correct = correct + .15781 * sin (4 * d - 2 * m - 2 * n);
correct = correct + .15227 * sin (4 * d - 2 * m);
correct = correct + .1499 * sin (3 * d + m);
correct = correct + .12616 * sin (6 * d);
correct = correct + .111 * sin (5 * n);
correct = correct + .09982 * sin (4 * d - m - 3 * n);
correct = correct + .0932 * sin (2 * d - m + 3 * n);
correct = correct + .09205 * sin (d + m + 2 * n);
correct = correct + .09092 * sin (n + 4 * f);
correct = correct + .09033 * sin (6 * d - m - 2 * n);
correct = correct + .08472 * sin (2 * d + m + n - 2 * f);
correct = correct + .07765 * sin (2 * d + 4 * n);
correct = correct + .07501 * sin (m - 2 * f);
correct = correct + .07142 * sin (6 * d - m - n);
correct = correct + .0685 * sin (2 * d - 5 * n);
correct = correct + .06742 * sin (2 * d + m - n + 2 * f);
correct = correct + .06541 * sin (2 * d + m + 2 * f);
correct = correct + .06507 * sin (3 * d - m);
correct = correct + .06439 * sin (2 * d - 2 * m + 2 * n);
correct = correct + .06314 * sin (2 * d - 2 * m - 2 * f);
correct = correct + .05165 * sin (m - 2 * n - 2 * f);
correct = correct + .0445 * sin (d + n + 2 * f);
correct = correct + .04338 * sin (m + 2 * n + 2 * f);
correct = correct + .04304 * sin (d - 2 * m);
correct = correct + .039 * sin (6* d - m - 3 * n);
correct = correct + .033 * sin (2 * d - 3 * m + n);
correct = correct + .03274 * sin (4 * d - m + 2 * n);
correct = correct + .02949 * sin (2 * d - m - 4 * n);
correct = correct + .02682 * sin (4 * d + m - 3 * n);
correct = correct + .02677 * sin (m + 2 * n - 2 * f);
correct = correct + .0251 * sin (6 * d - m);
correct = correct + .02429 * sin (m - 2 * n + 2 * f);
correct = correct + .02411 * sin (4 * d - 2 * m + n);
correct = correct + .02296 * sin (d + m - 3 * n);
correct = correct + .02289 * sin (4 * d - m - n - 2 * f);
correct = correct + .02285 * sin (6 * d + n);
correct = correct + .02244 * sin (3 * d + m + n);
correct = correct + .02149 * sin (4 * d + 3 * n);
correct = correct + .01993 * sin (2 * d - n + 4 * f);
correct = correct + .01819 * sin (2 * d + m - 4 * n);
correct = correct + .01741 * sin (4 * d - 3 * m - n);
correct = correct + .01605 * sin (2 * d + m + n + 2 * f);
correct = correct + .01598 * sin (d - n + 2 * f);
correct = correct + .01544 * sin (2 * d - 2 * m - 3 * n);
correct = correct + .01376 * sin (6 * d - 4 * n);
correct = correct + .01372 * sin (2 * d + 4 * f);
correct = correct + .01331 * sin (2 * d - 4 * m);
correct = correct + .01297 * sin (2 * n + 4 * f);
correct = correct + .01215 * sin (3 * d - n + 2 * f);
correct = correct + .00971 * sin (4 * d - 3 * m);
correct = correct + .00965 * sin (2 * d - 3 * m - 2 * n);
correct = correct + .00891 * sin (3 * d + m - 2 * f);
correct = correct + .00889 * sin (2 * d + m + 2 * n - 2 * f);
correct = correct + .00866 * sin (8 * d - 2 * n);
correct = correct + .0084 * sin (8 * d - 3 * n);
correct = correct + .00836 * sin (6 * d - 2 * m - 2 * n);
correct = correct + .00812 * sin (2 * d - 4 * m - n);
correct = correct + .00755 * sin (4 * d - 3 * m - 2 * n);
correct = correct + .00744 * sin (6 * d - 2 * m - n);
correct = correct + .0073 * sin (2 * d - m + 4 * n);
correct = correct + .00679 * sin (d + m + 3 * n);
correct = correct + .00666 * sin (4 * d - m - 2 * f);
correct = correct + .00665 * sin (6 * n);
correct = correct + .00662 * sin (4 * d - 2 * n - 2 * f);
correct = correct + .00623 * sin (m - 3 * n - 2 * f);
correct = correct + .00568 * sin (2 * d + 5 * n);
correct = correct + .0056 * sin (4 * d - 2 * m - 3 * n);
correct = correct + .0054 * sin (d + 2 * n + 2 * f);
correct = correct + .00538 * sin (2 * d - 2 * m + 3 * n);
correct = correct + .00526 * sin (m + 3 * n + 2 * f);
correct = correct + .00519 * sin (2 * m + 2 * f);
correct = correct + .00518 * sin (3 * d - 2 * m);
correct = correct + .00515 * sin (2 * d + 2 * m - n + 2 * f);
correct = correct + .00497 * sin (2 * d - 6 * n);
correct = correct + .00477 * sin (6 * d - m + n);
correct = correct + .00475 * sin (5 * d + m - n);
correct = correct + .00473 * sin (2 * m - n - 2 * f);
correct = correct + .00467 * sin (2 * d - 3 * n + 2 * f);
correct = correct + .00455 * sin (8 * d - n);
correct = correct + .00439 * sin (5 * d);
correct = correct + .00392 * sin (5 * d + m - 2 * n);
correct = correct + .00375 * sin (3 * d + 2 * f);
correct = correct + .00364 * sin (6 * d - 2 * n - 2 * f);
correct = correct + .00361 * sin (d + 2 * m - 2 * n);
correct = correct + .00353 * sin (4 * d + m - n + 2 * f);
correct = correct + .00344 * sin (2 * d + n + 4 * f);
correct = correct + .00336 * sin (4 * d - m + 3 * n);
correct = correct + .0033 * sin (3 * d - m + n);
correct = correct + .00324 * sin (8 * d - 4 * n);
correct = correct + .00318 * sin (6 * d + 2 * n);
correct = correct + .00312 * sin (6 * d - 2 * m - 3 * n);
correct = correct + .00298 * sin (3 * d - 2 * n + 2 * f);
correct = correct + .00295 * sin (2 * d - 3 * m + 2 * n);
correct = correct + .0029 * sin (4 * d - 2 * m + 2 * n);
correct = correct + .00289 * sin (d - 2 * n - 2 * f);
correct = correct + .00285 * sin (6 * d - 2 * m);
correct = correct + .00282 * sin (2 * d - 2 * n + 4 * f);
correct = correct + .0027 * sin (2 * m + n + 2 * f);
correct = correct + .00262 * sin (2 * d + m + 2 * n + 2 * f);
correct = correct + .00256 * sin (3 * d + m + 2 * n);
correct = correct + .00254 * sin (d - 3 * m);
correct = correct + .00229 * sin (d - 2 * m - n);
correct = correct + .0022 * sin (4 * d + m - 2 * n + 2 * f);
correct = correct + .00198 * sin (2 * d + m - 4 * f);
correct = correct + .00198 * sin (4 * d + 4 * n);
correct = correct + .00196 * sin (8 * d - m - 2 * n);
correct = correct + .00186 * sin (4 * d + m + 2 * f);
correct = correct + .00183 * sin (4 * d + m + n - 2 * f);
correct = correct + .00181 * sin (5 * d + m);
correct = correct + .00178 * sin (2 * d - m - 5 * n);
correct = correct + .00176 * sin (6 * d - m - 4 * n);
correct = correct + .00173 * sin (2 * d + m - 5 * n);
correct = correct + .0017 * sin (8 * d - m - 3 * n);
correct = correct + .00166 * sin (m + 3 * n - 2 * f);
correct = correct + .00163 * sin (2 * d - 3 * m - 2 * f);
correct = correct + .0016 * sin (4 * d - 3 * m + n);
correct = correct + .00155 * sin (d - m + 2 * f);
correct = correct + .00155 * sin (d + m - 4 * n);
correct = correct + .00153 * sin (3 * n + 4 * f);
correct = correct + .00139 * sin (8 * d);
correct = correct + .00133 * sin (2 * d - 4 * m + n);
correct = correct + .00123 * sin (d - 4 * f);
correct = correct + .00116 * sin (3 * d + m - n - 2 * f);
correct = correct + .00112 * sin (8 * d - m - n);
correct = correct + .00108 * sin (4 * d - 2 * m - n - 2 * f);
correct = correct + .00106 * sin (m - 3 * n + 2 * f);
correct = correct + .00102 * sin (5 * d - m);
correct = correct + .001 * sin (2 * m - 2 * n - 2 * f);
correct = correct + .00096 * sin (2 * d + 2 * m + 2 * f);

correct = correct - 666.44186 * sin (m);
correct = correct - 411.60287 * sin (2 * f);
correct = correct - 147.32654 * sin (m - n);
correct = correct - 124.98806 * sin (d);
correct = correct - 109.38419 * sin (m + n);
correct = correct - 45.10032 * sin (n + 2 * f);
correct = correct - 28.3981 * sin (2 * d + m - n);
correct = correct - 24.3591 * sin (2 * d + m);
correct = correct - 18.58467 * sin (d - n);
correct = correct - 9.67938 * sin (m - 2 * n);
correct = correct - 9.36601 * sin (2 * d - n + 2 * f);
correct = correct - 8.45308 * sin (d + n);
correct = correct - 7.63041 * sin (m + 2 * n);
correct = correct - 7.44804 * sin (2 * m);
correct = correct - 6.38325 * sin (2 * d + n - 2 * f);
correct = correct - 5.7417 * sin (2 * d + 2 * f);
correct = correct - 3.99767 * sin (2 * n + 2 * f);
correct = correct - 3.20968 * sin (3 * d - n);
correct = correct - 2.91464 * sin (2 * d + m + n);
correct = correct - 2.56813 * sin (2 * m - n);
correct = correct - 2.52138 * sin (2 * d + 2 * m - n);
correct = correct - 1.75296 * sin (d - 2 * n);
correct = correct - 1.43724 * sin (2 * d + m - 2 * f);
correct = correct - 1.37259 * sin (2 * n - 2 * f);
correct = correct - 1.22412 * sin (3 * d - 2 * n);
correct = correct - 1.16177 * sin (2 * m + n);
correct = correct - .99023 * sin (2 * d + n + 2 * f);
correct = correct - .6694 * sin (m - 3 * n);
correct = correct - .63523 * sin (4 * d + m - n);
correct = correct - .58399 * sin (d + 2 * n);
correct = correct - .58332 * sin (d - 2 * f);
correct = correct - .56065 * sin (2 * d - 2 * n - 2 * f);
correct = correct - .55694 * sin (d - m);
correct = correct - .54594 * sin (m + 3 * n);
correct = correct - .53572 * sin (2* d - 2 * n + 2 * f);
correct = correct - .4538 * sin (2 * d + 2 * n - 2 * f);
correct = correct - .42624 * sin (2 * d - m - n + 2 * f);
correct = correct - .38215 * sin (2 * d - m + 2 * f);
correct = correct - .37453 * sin (2 * d - m + n - 2 * f);
correct = correct - .35759 * sin (4 * d + m - 2 * n);
correct = correct - .32866 * sin (3 * n + 2 * f);
correct = correct - .29023 * sin (2 * d + m + 2 * n);
correct = correct - .28911 * sin (4 * d + m);
correct = correct - .25304 * sin (3 * d - 2 * f);
correct = correct - .2499 * sin (2 * d + 2 * m - 2 * n);
correct = correct - .23141 * sin (3 * d - m - n);
correct = correct - .20134 * sin (4 * d - n + 2 * f);
correct = correct - .19311 * sin (2 * m - 2 * n);
correct = correct - .18576 * sin (2 * d + 2 * m);
correct = correct - .16977 * sin (4 * d - 2 * n + 2 * f);
correct = correct - .13636 * sin (d - m - n);
correct = correct - .12812 * sin (d - 3 * n);
correct = correct - .12386 * sin (2 * d + 2 * n + 2 * f);
correct = correct - .12073 * sin (d - m + n);
correct = correct - .10136 * sin (3 * m);
correct = correct - .09154 * sin (2 * d - 3 * n - 2 * f);
correct = correct - .085 * sin (4 * d + 2 * f);
correct = correct - .08311 * sin (3 * d - m - 2 * n);
correct = correct - .08282 * sin (m + n - 2 * f);
correct = correct - .08049 * sin (m - n + 2 * f);
correct = correct - .08019 * sin (n - 4 * f);
correct = correct - .07518 * sin (2 * d - 4 * f);
correct = correct - .07373 * sin (2 * d - m + n + 2 * f);
correct = correct - .06601 * sin (4 * d + n - 2 * f);
correct = correct - .06513 * sin (2 * m + 2 * n);
correct = correct - .06103 * sin (2 * d - m - n - 2 * f);
correct = correct - .05725 * sin (5 * d - 2 * n);
correct = correct - .05684 * sin (3 * n - 2 * f);
correct = correct - .05142 * sin (3 * m - n);
correct = correct - .0507 * sin (4 * d + m + n);
correct = correct - .04702 * sin (m - 4 * n);
correct = correct - .04442 * sin (3 * d - 3 * n);
correct = correct - .04189 * sin (3 * d + m - 2 * n);
correct = correct - .04074 * sin (d + 3 * n);
correct = correct - .04012 * sin (d + n - 2 * f);
correct = correct - .03968 * sin (d + 2 * m);
correct = correct - .03947 * sin (m + 4 * n);
correct = correct - .03587 * sin (d + m + 2 * f);
correct = correct - .03514 * sin (4 * d + 2 * m - 2 * n);
correct = correct - .03336 * sin (2 * d + 3 * n - 2 * f);
correct = correct - .02979 * sin (3 * d - n - 2 * f);
correct = correct - .02887 * sin (2 * d - m + 2 * n - 2 * f);
correct = correct - .02804 * sin (2 * d - m - 2 * n - 2 * f);
correct = correct - .02676 * sin (2 * d + m + 3 * n);
correct = correct - .02602 * sin (4 * n + 2 * f);
correct = correct - .02391 * sin (4 * d - 2 * f);
correct = correct - .02379 * sin (d - n - 2 * f);
correct = correct - .02349 * sin (2 * d + 2 * m - 2 * f);
correct = correct - .02273 * sin (4 * d - m - n + 2 * f);
correct = correct - .02171 * sin (4 * d + 2 * m - n);
correct = correct - .02157 * sin (2 * d - m - 2 * n + 2 * f);
correct = correct - .01948 * sin (3 * d - m - 2 * f);
correct = correct - .01875 * sin (4 * d + m - n - 2 * f);
correct = correct - .01816 * sin (2 * d - 2 * m + 2 * f);
correct = correct - .01796 * sin (3 * m + n);
correct = correct - .01781 * sin (4 * d + n + 2 * f);
correct = correct - .01686 * sin (5 * d - 3 * n);
correct = correct - .01644 * sin (2 * d - 2 * m + n - 2 * f);
correct = correct - .01541 * sin (2 * d - 2 * m - n + 2 * f);
correct = correct - .01533 * sin (4 * d - m - 2 * n + 2 * f);
correct = correct - .01514 * sin (2 * m - 3 * n);
correct = correct - .01483 * sin (d - m + 2 * n);
correct = correct - .0135 * sin (5 * d - n);
correct = correct - .01343 * sin (2 * d + 2 * m + n);
correct = correct - .01332 * sin (2 * d + 3 * n + 2 * f);
correct = correct - .01282 * sin (6 * d + m - 2 * n);
correct = correct - .01281 * sin (d - m - 2 * f);
correct = correct - .01182 * sin (3 * d - 2 * m - n);
correct = correct - .01114 * sin (4 * d - m + 2 * f);
correct = correct - .01077 * sin (2 * d - 4 * n - 2 * f);
correct = correct - .01064 * sin (6 * d + m - n);
correct = correct - .01062 * sin (3 * d + n - 2 * f);
correct = correct - .01007 * sin (2 * d - m + 2 * n + 2 * f);
correct = correct - .0098 * sin (4 * d + 2 * n - 2 * f);
correct = correct - .00955 * sin (d - 4 * n);
correct = correct - .00944 * sin (2 * d + 2 * m - 3 * n);
correct = correct - .00934 * sin (4 * d - 3 * n + 2 * f);
correct = correct - .0085 * sin (2 * d - n - 4 * f);
correct = correct - .00849 * sin (d + 2 * m + n);
correct = correct - .00732 * sin (4 * d - m + n - 2 * f);
correct = correct - .00694 * sin (d - m - 2 * n);
correct = correct - .00693 * sin (5 * d - m - 2 * n);
correct = correct - .00668 * sin (4 * d + m + 2 * n);
correct = correct - .00659 * sin (d + m + n + 2 * f);
correct = correct - .00654 * sin (2 * d + 2 * m - n - 2 * f);
correct = correct - .00623 * sin (3 * d + m - 3 * n);
correct = correct - .00509 * sin (6 * d - 2 * n + 2 * f);
correct = correct - .00478 * sin (6 * d + m - 3 * n);
correct = correct - .00434 * sin (2 * d - 2 * m - n - 2 * f);
correct = correct - .00431 * sin (4 * d - 5 * n);
correct = correct - .00416 * sin (3 * m - 2 * n);
correct = correct - .00399 * sin (3 * d - 2 * m - 2 * n);
correct = correct - .00396 * sin (6 * d + m);
correct = correct - .00389 * sin (3 * d + 2 * n);
correct = correct - .00378 * sin (2 * d - 2 * m + n + 2 * f);
correct = correct - .00369 * sin (4 * d + 2 * m - 3 * n);
correct = correct - .00365 * sin (2 * d - m - 3 * n - 2 * f);
correct = correct - .00359 * sin (6 * d - n + 2 * f);
correct = correct - .00355 * sin (2 * m - 2 * f);
correct = correct - .00354 * sin (4 * n - 2 * f);
correct = correct - .00346 * sin (2 * d + m - 2 * n - 2 * f);
correct = correct - .00341 * sin (2 * m + 3 * n);
correct = correct - .00335 * sin (5 * d - n - 2 * f);
correct = correct - .00332 * sin (m - 5 * n);
correct = correct - .003 * sin ( d + 2 * m - n);
correct = correct - .00297 * sin (3 * d - m - 3 * n);
correct = correct - .00287 * sin (m + 5 * n);
correct = correct - .00287 * sin (6 * d - 3 * n + 2 * f);
correct = correct - .00286 * sin (2 * d - m - 4 * f);
correct = correct - .00285 * sin (d + 4 * n);
correct = correct - .00274 * sin (4 * d + 2 * n + 2 * f);
correct = correct - .00251 * sin (4 * d - m + n + 2 * f);
correct = correct - .00247 * sin (2 * d + 4 * n - 2 * f);
correct = correct - .00236 * sin (2 * d + m + 4 * n);
correct = correct - .00232 * sin (2 * d - m + 3 * n - 2 * f);
correct = correct - .00228 * sin (2 * d + m - n - 2 * f);
correct = correct - .00214 * sin (6 * d - 2 * f);
correct = correct - .00212 * sin (d - m + n - 2 * f);
correct = correct - .00208 * sin (4 * d + 2 * m);
correct = correct - .00201 * sin (5 * n + 2 * f);
correct = correct - .002 * sin (2 * d + 2 * m + n - 2 * f);
correct = correct - .00191 * sin (3 * d + 2 * m);
correct = correct - .00189 * sin (3 * d - m - n - 2 * f);
correct = correct - .00189 * sin (5 * d - m - 3 * n);
correct = correct - .00188 * sin (2 * d + 3 * m - n);
correct = correct - .00174 * sin (3 * d - 4 * n);
correct = correct - .0016 * sin (4 * d - 2 * m - n + 2 * f);
correct = correct - .00157 * sin (d + m + n - 2 * f);
correct = correct - .00154 * sin (5 * d - m - n);
correct = correct - .00149 * sin (d - m + 3 * n);
correct = correct - .00142 * sin (d - 2 * n + 2 * f);
correct = correct - .00138 * sin (3 * d + m - n + 2 * f);
correct = correct - .00137 * sin (5 * d - 2 * f);
correct = correct - .00133 * sin (2 * d - 2 * m + 2 * n - 2 * f);
correct = correct - .00132 * sin (6 * d + 2 * f);
correct = correct - .00131 * sin (2 * d + 4 * n + 2 * f);
correct = correct - .00128 * sin (4 * m);
correct = correct - .00127 * sin (3 * d + 2 * m - n);
correct = correct - .00121 * sin (4 * d - m + 2 * n - 2 * f);
correct = correct - .00119 * sin (2 * m - 4 * n);
correct = correct - .00117 * sin (2 * d - m + 3 * n + 2 * f);
correct = correct - .00116 * sin (2 * d + m - 3 * n - 2 * f);
correct = correct - .00111 * sin (2 * d - 2 * m - 2 * n - 2 * f);
correct = correct - .00111 * sin (2 * d - 5 * n - 2 * f);
correct = correct - .00109 * sin (4 * d + 3 * n - 2 * f);
correct = correct - .00108 * sin (4 * m - n);
correct = correct - .00102 * sin (d + 2 * m + 2 * n);
correct = correct - .00102 * sin (3 * d - 2 * m - 2 * f);
correct = correct - .001 * sin (d - m - n - 2 * f);
correct = correct - .00098 * sin (7 * d - 3 * n);

correct = correct + 14.2488 * sin (18 * venus - 16 * longitude_moyenne_terre - n + 26.54261 / r2d);
correct = correct + 1.1431 * sin (2 * longitude_moyenne_terre - 2 * jupiter + 2 * d - n + 180.11977 / r2d);
correct = correct + 0.9011 * sin (4 * longitude_moyenne_terre - 8 * mars + 3 * jupiter + 285.98707 / r2d);
correct = correct + 0.8216 * sin (venus - longitude_moyenne_terre + 180.00988 / r2d);
correct = correct + 0.7881 * sin (18 * venus - 16 * longitude_moyenne_terre - 2 * n + 26.54324 / r2d);
correct = correct + 0.7393 * sin (18 * venus - 16 * longitude_moyenne_terre + 26.54560 / r2d);
correct = correct + 0.6437 * sin (3 * venus - 3 * longitude_moyenne_terre + 2 * d - n + 179.98144 / r2d);
correct = correct + 0.6388 * sin (longitude_moyenne_terre - jupiter + 1.22890 / r2d);
correct = correct + 0.5634 * sin (10 * venus - 3 * longitude_moyenne_terre - n + 333.30551 / r2d);
correct = correct + 0.4453 * sin (2 * longitude_moyenne_terre - 3 * jupiter + 2 * d - n + 10.07001 / r2d);
correct = correct + 0.3436 * sin (2 * venus - 3 * longitude_moyenne_terre + 269.95393 / r2d);
correct = correct + 0.3246 * sin (longitude_moyenne_terre - 2 * mars + 318.13776 / r2d);
correct = correct + 0.3016 * sin (2 * venus - 2 * longitude_moyenne_terre + 0.20448 / r2d);

correct = correct + 7.06304 * sin (dzeta_lune - f + 0.00094 / r2d);
correct = correct + 0.49331 * sin (dzeta_lune + petit_l - f + 0.00127 / r2d);
correct = correct + 0.49141 * sin (dzeta_lune - petit_l - f + 0.00127 / r2d);
correct = correct + 0.36061 * sin (dzeta_lune + f + 0.00071 / r2d);
correct = correct + 0.09642 * sin (dzeta_lune + 2 * d - f + 0.0009 / r2d);
correct = correct + 0.06569 * sin (dzeta_lune - 2 * d - f + 0.001 / r2d);
correct = correct + 0.06456 * sin (dzeta_lune + 2 * d - petit_l - f + 0.00042 / r2d);
correct = correct + 0.05036 * sin (dzeta_lune - petit_l + f + 0.00051 / r2d);
correct = correct + 0.04962 * sin (dzeta_lune - 2*d + petit_l - f + 0.00029 / r2d);
correct = correct + 0.04746 * sin (dzeta_lune - 2 * d + f + 0.00076 / r2d);
correct = correct + 0.03838 * sin (dzeta_lune + petit_l + f + 0.0007 / r2d);
correct = correct + 0.03638 * sin (2 * dzeta_lune - 2 * f + 180 / r2d);
correct = correct + 0.03402 * sin (dzeta_lune + 2 * petit_l - f + 0.00126 / r2d);
correct = correct + 0.03279 * sin (dzeta_lune - 2 * petit_l - f + 0.00128 / r2d);
correct = correct + 0.02206 * sin (2 * d - petit_l);
correct = correct + 0.01492 * sin (dzeta_lune - 3 * f + 180.00086 / r2d);
correct = correct + 0.01234 * sin (dzeta_lune + 2 * d + petit_l - f + 0.00102 / r2d);

l = l + correct / 3600 / r2d + nutation_en_longitude * ct;
longitude = l;
longitude_lune = l;
longitudeLune = l;
l1 = l * r2d;

d1 = ((l1 - floor(l1)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_longlune = floor(l1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100)+ "''";

correct = 18461.4 * sin (f);
correct = correct -6.29664 * sin (3 * f);
correct = correct + 2.79871 * sin (n - 3 * f);
correct = correct + 999.70079 * sin (n - f);
correct = correct + 1010.1743 * sin (n + f);
correct = correct - 1.01941 * sin (n + 3 * f);
correct = correct - .13035 * sin (2 * n -  3 * f);
correct = correct + 31.75985 * sin (2 * n - f);
correct = correct + 61.91229 * sin (2 * n + f);
correct = correct - .11787 * sin (2 * n +  3 * f);
correct = correct + 1.58131 * sin (3 * n - f);
correct = correct + 3.98407 * sin (3 * n + f);
correct = correct - .01181 * sin (3 * n +  3 * f);
correct = correct + .09157 * sin (4 * n - f);
correct = correct + .26325 * sin (4 * n + f);
correct = correct + .01768 * sin (5 * n + f);
correct = correct - .07479 * sin (m -  3 * n - f);
correct = correct - .02365 * sin (m -  3 * n + f);
correct = correct - .79322 * sin (m -  2 * n - f);
correct = correct - .30129 * sin (m -  2 * n + f);
correct = correct - 6.73173 * sin (m - n - f);
correct = correct - 5.6326 * sin (m - n + f);
correct = correct - 4.83983 * sin (m - f);
correct = correct - 6.46036 * sin (m + f);
correct = correct + .01157 * sin (m +  3 * f);
correct = correct - 5.07614 * sin (m + n - f);
correct = correct - 5.31151 * sin (m + n + f);
correct = correct - .31292 * sin (m +  2 * n - f);
correct = correct - .63884 * sin (m +  2 * n + f);
correct = correct - .02419 * sin (m +  3 * n - f);
correct = correct - .06176 * sin (m +  3 * n + f);
correct = correct - .01571 * sin (2 * m -  2 * n - f);
correct = correct - .11335 * sin (2 * m - n - f);
correct = correct - .09511 * sin (2 * m - n + f);
correct = correct - .01801 * sin (2 * m - f);
correct = correct - .05729 * sin (2 * m + f);
correct = correct - .06187 * sin (2 * m + n - f);
correct = correct - .05504 * sin (2 * m + n + f);
correct = correct + .01031 * sin (d - m - n - f);
correct = correct - .01346 * sin (d - m - f);
correct = correct - .01829 * sin (d - m + f);
correct = correct - .02012 * sin (d - m + n - f);
correct = correct - .01255 * sin (d -  3 * n - f);
correct = correct - .10964 * sin (d -  2 * n - f);
correct = correct - .07846 * sin (d -  2 * n + f);
correct = correct - .42989 * sin (d - n - f);
correct = correct + .13928 * sin (d - n + f);
correct = correct - .03226 * sin (d -  3 * f);
correct = correct - 4.80578 * sin (d - f);
correct = correct - 5.36844 * sin (d + f);
correct = correct - .58893 * sin (d + n - f);
correct = correct - .66741 * sin (d + n + f);
correct = correct - .03636 * sin (d +  2 * n - f);
correct = correct - .06383 * sin (d +  2 * n + f);
correct = correct + .01597 * sin (d + m -  2 * n - f);
correct = correct + .0168 * sin (d + m -  2 * n + f);
correct = correct - .0559 * sin (d + m - n + f);
correct = correct + .80426 * sin (d + m - f);
correct = correct + .80263 * sin (d + m + f);
correct = correct + .03465 * sin (d + m + n - f);
correct = correct + .10176 * sin (d + m + n + f);
correct = correct + .01016 * sin (d + m +  2 * n + f);
correct = correct + .01042 * sin (2 * d -  3 * m - n + f);
correct = correct + .03647 * sin (2 * d -  3 * m - f);
correct = correct + .01603 * sin (2 * d -  3 * m + f);
correct = correct + .02285 * sin (2 * d -  2 * m -  2 * n - f);
correct = correct + .26865 * sin (2 * d -  2 * m - n - f);
correct = correct + .31474 * sin (2 * d -  2 * m - n + f);
correct = correct + 1.08587 * sin (2 * d -  2 * m - f);
correct = correct + .38353 * sin (2 * d -  2 * m + f);
correct = correct + .06915 * sin (2 * d -  2 * m + n - f);
correct = correct + .05848 * sin (2 * d -  2 * m + n + f);
correct = correct + .05502 * sin (2 * d - m -  3 * n - f);
correct = correct + .65025 * sin (2 * d - m -  2 * n - f);
correct = correct - .06208 * sin (2 * d - m -  2 * n + f);
correct = correct + .01034 * sin (2 * d - m - n -  3 * f);
correct = correct + 7.43488 * sin (2 * d - m - n - f);
correct = correct + 8.86853 * sin (2 * d - m - n + f);
correct = correct - .01177 * sin (2 * d - m - n +  3 * f);
correct = correct + .08815 * sin (2 * d - m -  3 * f);
correct = correct + 29.57794 * sin (2 * d - m - f);
correct = correct + 7.95891 * sin (2 * d - m + f);
correct = correct - .01669 * sin (2 * d - m + n -  3 * f);
correct = correct + 1.76606 * sin (2 * d - m + n - f);
correct = correct + 1.13466 * sin (2 * d - m + n + f);
correct = correct + .12897 * sin (2 * d - m +  2 * n - f);
correct = correct + .12387 * sin (2 * d - m +  2 * n + f);
correct = correct + .01211 * sin (2 * d - m +  3 * n + f);
correct = correct + .01127 * sin (2 * d - 5 * n - f);
correct = correct + .13381 * sin (2 * d - 4 * n - f);
correct = correct + .02496 * sin (2 * d -  4 * n + f);
correct = correct + 1.51564 * sin (2 * d -  3 * n - f);
correct = correct + .25408 * sin (2 * d -  3 * n + f);
correct = correct + .02045 * sin (2 * d -  2 * n -  3 * f);
correct = correct + 15.56635 * sin (2 * d -  2 * n - f);
correct = correct - 1.62443 * sin (2 * d -  2 * n + f);
correct = correct - .06561 * sin (2 * d -  2 * n +  3 * f);
correct = correct + .32907 * sin (2 * d - n -  3 * f);
correct = correct + 166.57528 * sin (2 * d - n - f);
correct = correct + 199.48515 * sin (2 * d - n + f);
correct = correct - .24484 * sin (2 * d - n +  3 * f);
correct = correct + 2.18637 * sin (2 * d -  3 * f);
correct = correct + 623.65783 * sin (2 * d - f);
correct = correct + 117.26161 * sin (2 * d + f);
correct = correct - .14453 * sin (2 * d +  3 * f);
correct = correct - .29116 * sin (2 * d + n -  3 * f);
correct = correct + 33.35743 * sin (2 * d + n - f);
correct = correct + 15.12165 * sin (2 * d + n + f);
correct = correct - .03038 * sin (2 * d + n +  3 * f);
correct = correct + 2.14618 * sin (2 * d +  2 * n - f);
correct = correct + 1.51976 * sin (2 * d +  2 * n + f);
correct = correct + .14642 * sin (2 * d +  3 * n - f);
correct = correct + .13795 * sin (2 * d +  3 * n + f);
correct = correct + .01027 * sin (2 * d +  4 * n - f);
correct = correct + .01186 * sin (2 * d +  4 * n + f);
correct = correct + .01818 * sin (2 * d + m -  3 * n - f);
correct = correct + .07913 * sin (2 * d + m -  2 * n - f);
correct = correct + .05429 * sin (2 * d + m -  2 * n + f);
correct = correct - .79105 * sin (2 * d + m - n - f);
correct = correct - 1.31788 * sin (2 * d + m - n + f);
correct = correct - .05457 * sin (2 * d + m -  3 * f);
correct = correct - 12.0947 * sin (2 * d + m - f);
correct = correct - 1.26433 * sin (2 * d + m + f);
correct = correct - .82275 * sin (2 * d + m + n - f);
correct = correct - .23702 * sin (2 * d + m + n + f);
correct = correct - .06283 * sin (2 * d + m +  2 * n - f);
correct = correct - .03142 * sin (2 * d + m +  2 * n + f);
correct = correct - .01262 * sin (2 * d +  2 * m -  2 * n - f);
correct = correct - .10535 * sin (2 * d +  2 * m - n - f);
correct = correct - .1133 * sin (2 * d +  2 * m - n + f);
correct = correct - .13415 * sin (2 * d +  2 * m - f);
correct = correct - .01482 * sin (2 * d +  2 * m + f);
correct = correct - .02104 * sin (3 * d - m - n - f);
correct = correct - .01356 * sin (3 * d - m - n + f);
correct = correct - .02572 * sin (3 * d - m - f);
correct = correct - .03941 * sin (3 * d -  2 * n - f);
correct = correct - .04852 * sin (3 * d -  2 * n + f);
correct = correct - .30517 * sin (3 * d - n - f);
correct = correct - .20593 * sin (3 * d - n + f);
correct = correct - .01009 * sin (3 * d -  3 * f);
correct = correct - .35183 * sin (3 * d - f);
correct = correct - .0284 * sin (3 * d + f);
correct = correct - .03611 * sin (3 * d + n - f);
correct = correct + .01321 * sin (3 * d + m - n - f);
correct = correct + .02083 * sin (3 * d + m - n + f);
correct = correct + .03436 * sin (3 * d + m - f);
correct = correct + .01351 * sin (3 * d + m + f);
correct = correct + .0123 * sin (4 * d -  2 * m -  2 * n + f);
correct = correct + .03462 * sin (4 * d -  2 * m - n - f);
correct = correct + .0238 * sin (4 * d -  2 * m - n + f);
correct = correct + .02899 * sin (4 * d -  2 * m - f);
correct = correct + .0127 * sin (4 * d -  2 * m + f);
correct = correct + .05251 * sin (4 * d - m -  2 * n - f);
correct = correct + .21376 * sin (4 * d - m -  2 * n + f);
correct = correct + .5958 * sin (4 * d - m - n - f);
correct = correct + .33882 * sin (4 * d - m - n + f);
correct = correct + .41496 * sin (4 * d - m - f);
correct = correct + .15791 * sin (4 * d - m + f);
correct = correct + .05686 * sin (4 * d - m + n - f);
correct = correct + .03009 * sin (4 * d - m + n + f);
correct = correct + .02174 * sin (4 * d -  3 * n + f);
correct = correct + .63371 * sin (4 * d -  2 * n - f);
correct = correct + 2.41389 * sin (4 * d -  2 * n + f);
correct = correct + 6.57962 * sin (4 * d - n - f);
correct = correct + 2.9985 * sin (4 * d - n + f);
correct = correct + .06257 * sin (4 * d -  3 * f);
correct = correct + 3.67449 * sin (4 * d - f);
correct = correct + 1.19188 * sin (4 * d + f);
correct = correct + .47338 * sin (4 * d + n - f);
correct = correct + .21259 * sin (4 * d + n + f);
correct = correct + .04834 * sin (4 * d +  2 * n - f);
correct = correct + .02828 * sin (4 * d +  2 * n + f);
correct = correct - .02957 * sin (4 * d + m -  2 * n + f);
correct = correct - .17191 * sin (4 * d + m - n - f);
correct = correct - .05097 * sin (4 * d + m - n + f);
correct = correct - .11308 * sin (4 * d + m - f);
correct = correct - .02549 * sin (4 * d + m + f);
correct = correct - .01692 * sin (4 * d + m + n - f);
correct = correct - .01049 * sin (5 * d - n - f);
correct = correct + .01091 * sin (6 * d - m -  2 * n - f);
correct = correct + .01486 * sin (6 * d - m - n - f);
correct = correct + .03118 * sin (6 * d -  3 * n + f);
correct = correct + .08096 * sin (6 * d -  2 * n - f);
correct = correct + .05963 * sin (6 * d -  2 * n + f);
correct = correct + .09403 * sin (6 * d - n - f);
correct = correct + .04217 * sin (6 * d - n + f);
correct = correct + .03674 * sin (6 * d - f);
correct = correct + .01465 * sin (6 * d + f);

correct = correct + 8.045 * sin (dzeta_lune + 180 / r2d);
correct = correct + 0.416 * sin (dzeta_lune + petit_l + 180 / r2d);
correct = correct + 0.456 * sin (dzeta_lune - petit_l);
correct = correct + 0.326 * sin (dzeta_lune - 2 * f);

correct = correct + 0.63 * sin (18 * venus - 16 * longitude_moyenne_terre - petit_l + f + 26.54 / r2d);
correct = correct + 0.63 * sin (18 * venus - 16 * longitude_moyenne_terre-petit_l - f + 26.54 / r2d);
correct = correct + 0.14 * sin (longitude_moyenne_terre + d + 291.98 / r2d);
correct = correct + 0.07 * sin (18 * venus - 16 * longitude_moyenne_terre - 2 * petit_l - f + 26.54 / r2d);
correct = correct + 0.067 * sin (18 * venus - 16 * longitude_moyenne_terre + f + 26.54 / r2d);
correct = correct + 0.067 * sin (5 * venus - 6 * longitude_moyenne_terre + 2 * d - f + 272.3 / r2d);

correct = correct + 1.375 * sin (longitude_moyenne_terre + d + 275.13 / r2d);
correct = correct + 0.078 * sin (longitude_moyenne_terre + d - petit_l + 95.13 / r2d);

correct = correct - 0.00001754 * 3600 / r2d * sin(183.3 / r2d + 483202 / r2d * T_2000);

latitude = correct / 3600 / r2d;
b = latitude;
latitude_lune = b;

b1 = abs(b * r2d);
d1 = ((b1 - floor(b1)) * 60);
d2 = ((d1 - floor(d1)) * 60);
 
if (b < 0) {signe = "-";}
else {signe = "+";}

dc_latlune = signe + floor(b1) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

p = 385000.56 - 3.14837 * cos(2 * f) + 79.66183 * cos(n - 2 * f);
p = p - 20905.32206 * cos(n) - 0.10326 * cos(n + 2 * f);
p = p - 4.42124 * cos(2 * n - 2 * f) - 569.92332 * cos(2 * n);
p = p - 23.21032 * cos(3 * n) - 1.11693 * cos(4 * n);
p = p - 0.42242 * cos(m - 3 * n) - 7.00293 * cos(m - 2 * n);
p = p - 129.62476 * cos(m - n) + 0.33465 * cos(m - n + 2 * f);
p = p - 0.18568 * cos(m - 2 * f) + 48.89 * cos(m);
p = p - 0.15803 * cos(m + 2 * f) - 0.2481 * cos(m + n - 2 * f);
p = p + 104.75896 * cos(m + n) + 5.75105 * cos(m + 2 * n);
p = p + 0.35509 * cos(m + 3 * n) - 0.13618 * cos(2 * m - 2 * n);
p = p - 2.11728 * cos(2 * m - n) + 1.06575 * cos(2 * m);
p = p + 1.16562 * cos(2 * m + n) + 0.1141 * cos(d - m - n);
p = p + 0.49757 * cos(d - m) + 0.10998 * cos(d - m + n);
p = p - 1.73852 * cos(d - 2 * n) - 8.37909 * cos(d - n);
p = p - 0.79564 * cos(d - 2 * f) + 108.74265 * cos(d);
p = p + 6.32199 * cos(d + n) + 0.37852 * cos(d + 2 * n);
p = p + 0.33226 * cos(d + m - 2 * n) + 0.85127 * cos(d + m - n);
p = p - 16.67533 * cos(d + m) - 0.93335 * cos(d + m + n);
p = p - 0.14808 * cos(2 * d - 3 * m - n) - 0.41076 * cos(2 * d - 3 * m);
p = p + 0.34304 * cos(2 * d - 2 * m - 2 * n) - 4.95049 * cos(2 * d - 2 * m - n);
p = p - 9.88519 * cos(2 * d - 2 * m) - 0.65758 * cos(2 * d - 2 * m + n);
p = p + 0.49506 * cos(2 * d - m - 3 * n) + 10.05654 * cos(2 * d - m - 2 * n);
p = p + 0.32336 * cos(2 * d - m - n - 2 * f) - 152.14314 * cos(2 * d - m - n);
p = p + 0.657 * cos(2 * d - m - 2 * f) - 204.59357 * cos(2 * d - m);
p = p + 0.20942 * cos(2 * d - m + n - 2 * f) - 12.83185 * cos(2 * d - m + n);
p = p - 0.84883 * cos(2 * d - m + 2 * n) + 0.77854 * cos(2 * d - 4 * n);
p = p + 14.40262 * cos(2 * d - 3 * n) + 0.47263 * cos(2 * d - 2 * n - 2 * f);
p = p + 246.15768 * cos(2 * d - 2 * n) + 0.77405 * cos(2 * d - 2 * n + 2 * f);
p = p + 8.7517 * cos(2 * d - n - 2 * f) - 3699.10468 * cos(2 * d - n);
p = p + 0.59633 * cos(2 * d - n + 2 * f) + 10.32129 * cos(2 * d - 2 * f);
p = p - 2955.9665 * cos(2 * d) + 4.13118 * cos(2 * d + n - 2 * f);
p = p - 170.73274 * cos(2 * d + n) + 0.28399 * cos(2 * d + 2 * n - 2 * f);
p = p - 10.44472 * cos(2 * d + 2 * n) - 0.66968 * cos(2 * d + 3 * n);
p = p + 0.16858 * cos(2 * d + m - 3 * n) + 0.14368 * cos(2 * d + m - 2 * n);
p = p + 24.20935 * cos(2 * d + m - n) - 0.13572 * cos(2 * d + m - 2 * f);
p = p + 30.82498 * cos(2 * d + m) + 2.6165 * cos(2 * d + m + n);
p = p + 0.21252 * cos(2 * d + m + 2 * n) - 0.10888 * cos(2 * d + 2 * m - 2 * n);
p = p + 2.3538 * cos(2 * d + 2 * m - n) + 0.14764 * cos(2 * d + 2 * m);
p = p + 0.2556 * cos(3 * d - m - n) - 0.15708 * cos(3 * d - m);
p = p + 0.86243 * cos(3 * d - 2 * n) + 3.25823 * cos(3 * d - n);
p = p + 0.20099 * cos(3 * d - 2 * f) - 1.41893 * cos(3 * d);
p = p - 0.21259 * cos(3 * d + m - n) - 0.10766 * cos(3 * d + m);
p = p - 0.10834 * cos(4 * d - 2 * m - 2 * n) - 0.27906 * cos(4 * d - 2 * m - n);
p = p - 0.12806 * cos(4 * d - 2 * m) - 1.897 * cos(4 * d - m - 2 * n);
p = p - 3.95812 * cos(4 * d - m - n) - 1.57145 * cos(4 * d - m);
p = p - 0.20286 * cos(4 * d - m + n) - 0.51423 * cos(4 * d - 3 * n);
p = p - 21.63627 * cos(4 * d - 2 * n) - 0.32176 * cos(4 * d - n - 2 * f);
p = p - 34.78245 * cos(4 * d - n) - 0.50793 * cos(4 * d - 2 * f);
p = p - 11.64993 * cos(4 * d) - 1.42255 * cos(4 * d + n);
p = p - 0.13922 * cos(4 * d + 2 * n) + 0.23696 * cos(4 * d + m - 2 * n);
p = p + 0.5788 * cos(4 * d + m - n) + 0.24453 * cos(4 * d + m);
p = p - 0.18316 * cos(6 * d - 3 * n) - 0.4225 * cos(6 * d - 2 * n);
p = p - 0.28663 * cos(6 * d - n);

// DISTANCE LUNE
  distance_terre = p;
  dc_distlune = floor(distance_terre * 1000 + 0.5) / 1000 + " km";
  distanceLune = distance_terre;

p = sin(6378.136 / distance_terre) * r2d * 3600;
p = floor(p * 1000 + 0.5) / 1000;
p1 = floor(p / 60);

dc_paralune = p1 + "'" + zero(floor((p - p1 * 60) * 1000 + 0.5) / 1000) + "''";

  
  diamapparent = atan(3476 / distance_terre) * r2d * 60
diamapparent1 = floor((diamapparent - floor(diamapparent)) * 60);
dc_diamapparent = floor(diamapparent) + "'" + floor(diamapparent1 * 100 + 0.5) / 100 + "''";

  
  diametreApparentLune = diamapparent ; // permet de connaitre la forme du croissant

asc = r2d / 15 * atan((cos(obliquite) * sin (longitude) -tan(latitude) * sin (obliquite)) / cos(longitude));
if (asc<0) {asc = asc + 24;}
if (cos(longitude) < 0) {asc = asc + 12;}
if (asc > 24) {asc = asc - 24;}

declin = r2d * asin(sin(latitude) * cos(obliquite) + cos(latitude) * sin (obliquite) * sin(longitude));

d1 = ((asc-floor(asc)) * 60);
d2 = ((d1 - floor(d1)) * 60);

dc_alphalune = floor(asc) + "h" + zero(floor(d1)) + "m" + zero(floor(d2 * 100 + 0.5) / 100) + "s";
ADLune = asc * 15 / r2d

d = abs(declin);
d1 = ((d - floor(d)) * 60);
d2=  ((d1 - floor(d1)) * 60);

if (declin < 0) {signe = "-"; DecLune = - d / r2d}
else {signe = "+"; DecLune = + d / r2d}

dc_deltalune = signe + floor(d) + "�" + zero(floor(d1)) + "'" + zero(floor(d2 * 100 + 0.5) / 100) + "''";

ascLune = asc
declinLune = declin
 
d1 = acos(cos(latitude_lune) * cos(longitude_lune - longitude_soleil));
if (d1 < 0) {d1 = d1 + PI;}

p = 180 - d1 * r2d - 0.1468 * sin(d1) * ((1 - 0.0549 * sin(anomalie_lune)) / (1 - 0.0167 * sin(anomalie_soleil)));
p = p / r2d;

if ((longitude_lune < longitude_soleil && longitude_soleil - longitude_lune < PI) || (longitude_lune > longitude_soleil && longitude_lune - longitude_soleil > PI)) 
{elongation_lune = "Ouest";}
else {elongation_lune = "Est";}

dc_elonglune = floor(d1 * r2d * 10 + 0.5) / 10 + "� " + elongation_lune;

fraction_illuminee = 100 * floor(0.5 * (1 + cos(p)) * 1000 + 0.5) / 1000;
fraction_illuminee = floor(fraction_illuminee * 100 + 0.5) / 100;
elonglune=floor(d1 * r2d * 10 + 0.5) / 10

dc_fractionlune = fraction_illuminee + "%"

elong_lune = elongation_lune ; //
fraction_illumineeLune = fraction_illuminee ; // 

if (fraction_illumineeLune == 0){
  commentLune = "Inobservable.";quandLune = " C'est la Nouvelle Lune"}
if (fraction_illumineeLune > 0 && fraction_illumineeLune < 7.1){
  commentLune = "Inobservable.";quandLune = " C'est la Nouvelle Lune"}
if (fraction_illumineeLune > 7 && fraction_illumineeLune < 12.1){
  commentLune = "Tr�s fin croissant lunaire � tenter de voir"
  if (elong_lune == "Ouest") {quandLune = " avant le lever du Soleil"}
  if (elong_lune == "Est") {quandLune = " au coucher du Soleil"}}
if (fraction_illumineeLune > 12 && fraction_illumineeLune < 15.1){
  commentLune = "Fin croissant lunaire � tenter de voir"
  if (elong_lune == "Ouest") {quandLune = " avant le lever du Soleil"}
  if (elong_lune == "Est") {quandLune = " au coucher du Soleil"}}
if (fraction_illumineeLune > 15 && fraction_illumineeLune < 30.1){
  commentLune = "Croissant de Lune � voir"
  if (elong_lune == "Ouest") {quandLune = " � l'aube"}
  if (elong_lune == "Est") {quandLune = " au cr�puscule"}}
if (fraction_illumineeLune > 30 && fraction_illumineeLune < 40.1){
  commentLune = "Le gros croissant de Lune est"
  if (elong_lune == "Ouest") {quandLune = " visible en fin de nuit"}
  if (elong_lune == "Est") {quandLune = " visible en soir�e"}}
if (fraction_illumineeLune  > 40 && fraction_illumineeLune < 60.1){
  commentLune = "La Lune est en phase de"
  if (elong_lune == "Ouest") {quandLune = " Dernier Quartier"}
  if (elong_lune == "Est") {quandLune = " Premier Quartier"}}
if (fraction_illumineeLune > 60 && fraction_illumineeLune < 95.1){
  commentLune = "La Lune gibbeuse est"
  if (elong_lune == "Ouest") {quandLune = " d�croissante"}
  if (elong_lune == "Est") {quandLune = " croissante"}}
if (fraction_illumineeLune > 95 && fraction_illumineeLune < 98.1){
  commentLune = "La Lune est";
  if (elong_lune == "Ouest") {quandLune = " encore bien Pleine"}
  if (elong_lune == "Est") {quandLune = " presque Pleine"}}
if (fraction_illumineeLune > 98 && fraction_illumineeLune < 100.1){
  commentLune = "Pleine Lune"; quandLune = ""}
  

  /*
  listing.push (" ");
  listing.push ("* LUNE");
  listing.push ("  - asc. droite   : " + ascLune);
  listing.push ("  - déclination   : " + declinLune);
  listing.push ("  - constellation : " + trouveConstellation(longitudeLune) ); 
  listing.push ("  - elongation    : " + elong_lune ); 
  listing.push ("  - fract illumin : " + fraction_illumineeLune + "%" ); 
   
  planete[9][8] = ascLune;
  planete[9][9] = declinLune;
*/
}
  
// --------------------------------  
//        SEPARATION ANGULAIRE
// --------------------------------  
  {
da_Lune_Merc = sin(DecLune) * sin(DecMerc) + cos(DecLune) * cos(DecMerc) * cos(ADLune - ADMerc)
da_Lune_Merc = acos(da_Lune_Merc) * r2d

da_Lune_Ven = sin(DecLune) * sin(DecVen) + cos(DecLune) * cos(DecVen) * cos(ADLune - ADVen)
da_Lune_Ven = acos(da_Lune_Ven) * r2d

da_Lune_Mars = sin(DecLune) * sin(DecMars) + cos(DecLune) * cos(DecMars) * cos(ADLune - ADMars)
da_Lune_Mars = acos(da_Lune_Mars) * r2d

da_Lune_Jup = sin(DecLune) * sin(DecJup) + cos(DecLune) * cos(DecJup) * cos(ADLune - ADJup)
da_Lune_Jup = acos(da_Lune_Jup) * r2d

da_Lune_Sat = sin(DecLune) * sin(DecSat) + cos(DecLune) * cos(DecSat) * cos(ADLune - ADSat)
da_Lune_Sat = acos(da_Lune_Sat) * r2d

da_Lune_Uran = sin(DecLune) * sin(DecUran) + cos(DecLune) * cos(DecUran) * cos(ADLune - ADUran)
da_Lune_Uran = acos(da_Lune_Uran) * r2d

da_Lune_Nept = sin(DecLune) * sin(DecNept) + cos(DecLune) * cos(DecNept) * cos(ADLune - ADNept)
da_Lune_Nept = acos(da_Lune_Nept) * r2d

da_Lune_Pluton = sin(DecLune) * sin(DecPluton) + cos(DecLune) * cos(DecPluton) * cos(ADLune - ADPluton)
da_Lune_Pluton = acos(da_Lune_Pluton) * r2d

dc_visibLune = commentLune + "" + quandLune + "" + da_Lune_Merc + "" + da_Lune_Ven + "" + da_Lune_Mars + "" + da_Lune_Jup + "" + da_Lune_Sat + "" + da_Lune_Uran + "" + da_Lune_Nept + "" + da_Lune_Pluton;

  
  
sepanglu = new Array()
sepangme = new Array()
sepangve = new Array()
sepangma = new Array()
sepangju = new Array()
sepangsa = new Array()
sepangur = new Array()
sepangne = new Array()
sepangpl = new Array()
sepangso = new Array()
}
// --------------------------------------------------------------------------------
//         Ascension droite et Déclinaison en coordonnées HORIZONTALES
// --------------------------------------------------------------------------------
  {
AscDt = new Array(10)
Declinaison = new Array(10)

AscDt[0] = ADLune
Declinaison[0] = DecLune
  
AscDt[1] = ADMerc
Declinaison[1] = DecMerc
  
AscDt[2] = ADVen
Declinaison[2] = DecVen
  
AscDt[3] = ADMars
Declinaison[3] = DecMars
  
AscDt[4] = ADJup
Declinaison[4] = DecJup
  
AscDt[5] = ADSat
Declinaison[5] = DecSat
  
AscDt[6] = ADUran
Declinaison[6] = DecUran
  
AscDt[7] = ADNept
Declinaison[7] = DecNept
  
AscDt[8] = ADPluton
Declinaison[8] = DecPluton
  
AscDt[9] = ADSoleil
Declinaison[9] = DecSoleil


indx = floor(random() * AscDt.length);
// calcul des séparation angulaires 
for (indx = 0; indx < 10; indx++){
  ax = 0
  sepanglu [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
  sepangme [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
  sepangve [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangma [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangju [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangsa [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangur [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangne [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangpl [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
  ax = ax+1
sepangso [indx] = aff(Math.floor(100 * r2d * acos(Math.sin(Declinaison[indx]) * Math.sin(Declinaison[ax]) + Math.cos(Declinaison[indx]) * Math.cos(Declinaison[ax]) * Math.cos(AscDt[indx] - AscDt[ax]))) / 100);
}

//--------------------------------------------- Lever - Coucher - Passage au Meridien du Soleil
pi = 3.141593
dr = pi / 180
hr = pi / 12
efr0 = -0.009890199           //effet de r�fraction sur la ligne d'horizon - valeur adoptee de 0�34'
efr1 = -0.004654211           //effet de r�fraction sur la ligne d'horizon - demi-diam�tre de 0�16' pour le Soleil
ht = efr0 + efr1              //effet de r�fraction sur la ligne d'horizon pour le Soleil
parLune = 0.016580628         // parallaxe (pour la Lune)
dmLune = 0.004654211          // demi-diam�tre lunaire
ht0 = parLune - efr0 - dmLune

htc = - 6 * dr                // hauteur crepuscule civil
htn = - 12 * dr               // hauteur crepuscule nautique
hta = - 18 * dr               // hauteur crepuscule astronomique

//--------------- "Longitude (en degre, positive a l'ouest)"; 
if (nst2 == 1) {lonObs = -(obsLongitude + (ll_lonmin / 60)) * dr}
if (nst2 == 2) {lonObs = (obsLongitude + (ll_lonmin / 60)) * dr}

//--------------- "Latitude (en degr�)"; 
if (nst1 == 1){latObs = (obsLatitude + (ll_latmin / 60)) * dr}
if (nst1 == 2) {latObs = -(obsLatitude + (ll_latmin / 60)) * dr}

//--------------- Heure TU du milieu de la journ�e
h = 12 + lonObs / hr

//--------------- Coordonn�es rectangulaires du soleil dans le repere equatorial
xe = cos(Lov)
ye = cos(obliquite) * sin(Lov)
ze = sin(obliquite) * sin(Lov)

//--------------- Rotation de l'angle r autour de l'axe z
rx = cos(Lo) * xe + sin(Lo) * ye
ry = -sin(Lo) * xe + cos(Lo) * ye
xf = rx 
yf = ry 

et = atan(yf / xf)
dc = atan(ze / sqrt(1 - ze * ze))
decl = atan(ze / sqrt(1 - ze * ze)) / dr

//--------------- Heure de passage au m�ridien
pm = h + et / hr
merh = floor(pm)
pm = 60 * (pm - merh)
merm = floor(pm)
pm = floor(60 * (pm - merm))
dc_mer = notn(zero(merh)) + "h" + notn(zero(merm)) + "m";

//--------------- Angle Horaire au lever et au coucher, Lever et Coucher du Soleil,
//--------------- AH au Cr�puscule civil, Cr�puscule civil du matin et du soir, 
//--------------- AH au Cr�puscule nautique, Cr�puscule nautique du matin et du soir, 
//--------------- AH au Cr�puscule astronomique, Cr�puscule astronomique du matin et du soir

hauteur = new Array(); levh = new Array(); levm = new Array(); couh = new Array(); coum = new Array()
hauteur[0] = ht
hauteur[1] = htc
hauteur[2] = htn
hauteur[3] = hta

i = floor(random() * hauteur.length);

for (i = 0; i < 4; i++) 
   {
   cs = (sin(hauteur[i]) - sin(latObs) * sin(dc)) / cos(latObs) / cos(dc)
     if (cs == 0) { ah = pi / 2}
   {ah = atan(sqrt(1 - cs * cs) / cs)}
     if (cs < 0){ah = ah + pi}
   pm1 = h + (et - ah) / hr;
     if (pm1 < 0){pm1 = pm1 + 24}
   levh[i] = floor(pm1); 
   levm[i] = floor(60 * (pm1 - levh[i]));
   pm2 = h + (et + ah) / hr;
    if (pm2 > 24){pm2 = pm2 - 24}
   couh[i] = floor(pm2);
   coum[i] = floor(60 * (pm2 - couh[i]));
   }

//--------------- Hauteur - Azimut

RA = new Array(9)
Dec = new Array(9)
RA[0] = ascLune
Dec[0] = declinLune
RA[1] = ascMerc
Dec[1] = declinMerc
RA[2] = ascVen
Dec[2] = declinVen
RA[3] = ascMars
Dec[3] = declinMars
RA[4] = ascJup
Dec[4] = declinJup
RA[5] = ascSat
Dec[5] = declinSat
RA[6] = ascUran
Dec[6] = declinUran
RA[7] = ascNept
Dec[7] = declinNept
RA[8] = ascPluton
Dec[8] = declinPluton
RA[9] = ascSoleil
Dec[9] = declinSoleil
  

//ind = Math.floor(Math.random() * RA.length);

GST = ts1
//HEURE = HEURE;
//MINUTE = MINUTE;
//d2r = PI / 180
//r2d = 180 / PI;

lng = -lonObs / d2r
lat = latObs / d2r

alt = new Array()
az = new Array()
num = new Array()
denom = new Array()

  // ajustement au lieu > calcul des coordonnées horizontales des plantetes
  // ------------------
  
for (ind = 0; ind < 10; ind++){
  
  ra = RA[ind]
  
  HA = 15 * (GST + HEURE + (MINUTE / 60) - ra) + lng;
  alt[ind] = r2d * asin(sin(Dec[ind] * d2r) * sin(lat * d2r) + cos(Dec[ind] * d2r) * cos(HA * d2r) * cos(lat * d2r));
  
    if (nst1 == 1)
     {
       num[ind] = sin(HA * d2r); 
       denom[ind] = (cos(HA * d2r) * sin(lat * d2r) - tan(Dec[ind] * d2r) * cos(lat * d2r)); 
       azimut = num[ind]  / denom[ind];
       az[ind] = 180 + atan(azimut) * r2d;
       if (denom[ind] < 0) az[ind] = az[ind] + 180;
     }
  else  
     {
     num[ind]  = sin( - HA * d2r); 
       denom[ind] = (cos( - HA * d2r) * sin( - lat * d2r) - tan( - Dec[ind] * d2r) * cos( - lat * d2r));
     azimut = num[ind]  / denom[ind];
     az[ind] = 180 - atan( - azimut) * r2d;
     if (denom[ind] > 0) az[ind] = az[ind] - 180;
     }

  if (azimut < 0) az[ind] += 360;
  if (az[ind] > 360) {az[ind] -= 360};


}
    
  }
// --------------------------------------------------------------------------------
//        AFFECTATION DES AZIMTUH ET ALTITUDE en coordonnées HORIZONTALES
// --------------------------------------------------------------------------------
  {

// SOLEIL
  {
  planete[0][8] = az[9];
  planete[0][9] = alt[9];
  planete[0][11] = distanceSoleil;
    
  planete[0][2] = trouveConstellation(constell); 
    hauteurSoleil =  planete[0][9] + 90; // c'est l'altitude du soleil.
    azimuthSoleil =  planete[0][8]; // c'est l'altitude du soleil.

  listing.push ("SOLEIL : ");
  listing.push ("  - ascention droite : " +  planete[0][8] );
  listing.push ("  - declinaison : " +planete[0][9]);
  listing.push ("  - Constellation : " + constell);
  }
// MERCURE
  {
  planete[1][8] = az[1];
  planete[1][9] = alt[1];
  planete[1][11] = distanceMercure;
  planete[1][2] = trouveConstellation(longitudeMercure); 
  listing.push (" ");
  listing.push ("* MERCURE");
  listing.push ("  - asc. droite   : " + planete[1][8]);
  listing.push ("  - déclination   : " +   planete[1][9] );
  listing.push ("  - constellation : " + trouveConstellation(longitudeMercure)); 
  }
// VENUS
 {
  planete[2][8] = az[2];
  planete[2][9] = alt[2]; 
  planete[2][11] = distanceVenus;
     planete[2][2] = trouveConstellation(longitudeVenus); 
  listing.push (" ");
  listing.push ("* VENUS");
  listing.push ("  - asc. droite   : " + planete[2][8]);
  listing.push ("  - déclination   : " + planete[2][9]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeVenus)); 
 

}
// MARS
 {
  planete[3][8] = az[3];
  planete[3][9] = alt[3];  
     planete[3][11] = distanceMars;
  planete[3][2] = trouveConstellation(longitudeMars); 
  listing.push (" ");
  listing.push ("* MARS");
  listing.push ("  - asc. droite   : " + planete[3][8] );
  listing.push ("  - déclination   : " + planete[3][9] );
  listing.push ("  - constellation : " + trouveConstellation(longitudeMars)); 
  

}
// JUPITER
  {
  planete[4][8] = az[4];
  planete[4][9] = alt[4];
      planete[4][11] = distanceMars;
  planete[4][2] = trouveConstellation(longitudeJupiter); 
  listing.push (" ");
  listing.push ("* JUPITER");
  listing.push ("  - asc. droite   : " + az[4]);
  listing.push ("  - déclination   : " + alt[4]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeJupiter)); 


}
// SATURNE
{ 
  planete[5][8] = az[5];
  planete[5][9] = alt[5];
    planete[5][11] = distanceSaturne;
  planete[5][2] = trouveConstellation(longitudeSaturne); 
  listing.push (" ");
  listing.push ("* SATURNE");
  listing.push ("  - asc. droite   : " + az[5]);
  listing.push ("  - déclination   : " + alt[5]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeSaturne) ); 

} 
// URANUS
{ 
  planete[6][8] = az[6];
  planete[6][9] = alt[6];
    planete[6][11] = distanceUranus;
  planete[6][2] = trouveConstellation(longitudeUranus); 
  listing.push (" ");
  listing.push ("* URANUS");
  listing.push ("  - asc. droite   : " + planete[6][8]);
  listing.push ("  - déclination   : " + planete[6][9]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeUranus) ); 
  

}
// NEPTUNE
  {
  planete[7][8] = az[7];
  planete[7][9] = alt[7];
      planete[7][11] = distanceNeptune;
    planete[7][2] = trouveConstellation(longitudeNeptune); 
    listing.push (" ");
  listing.push ("* NEPTUNE");
  listing.push ("  - asc. droite   : " +  planete[7][8]);
  listing.push ("  - déclination   : " + planete[7][9]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeNeptune) ); 
     
  }
// PLUTON
  {
  planete[8][8] = az[8];
  planete[8][9] = alt[8];
      planete[8][11] = distancePluton;
    planete[8][2] = trouveConstellation(longitudePluton); 
  listing.push (" ");
  listing.push ("* PLUTON");
  listing.push ("  - asc. droite   : " + planete[8][8] );
  listing.push ("  - déclination   : " + planete[8][9] );
  listing.push ("  - constellation : " + trouveConstellation(longitudePluton) ); 
  }
// LUNE
  {
  planete[9][8] = az[0];
  planete[9][9] = alt[0];
      planete[9][11] = distanceLune;
    planete[9][2] = trouveConstellation(longitudeLune); 
  listing.push (" ");
  listing.push ("* LUNE");
  listing.push ("  - asc. droite   : " + planete[9][8]  );
  listing.push ("  - déclination   : " + planete[9][9]);
  listing.push ("  - constellation : " + trouveConstellation(longitudeLune) ); 
  listing.push ("  - elongation    : " + elong_lune ); 
  listing.push ("  - fract illumin : " + fraction_illumineeLune + "%" ); 
  
  }
}
  
//--------------- Lever et Coucher des Planetes

indh = floor(random() * RA.length);

levhP = new Array(); levmP = new Array(); couhP = new Array(); coumP = new Array(); PassMh = new Array(); PassMm = new Array();


for (indh = 0; indh < 9; indh++){
     if (indh==0) {csP = (sin(ht0) - sin(latObs) * sin(Dec[indh]*d2r)) / cos(latObs) / cos(Dec[indh]*d2r)}
     else {
     csP = (sin(efr0) - sin(latObs) * sin(Dec[indh]*d2r)) / cos(latObs) / cos(Dec[indh]*d2r)
     }
     AH = Math.acos(csP) / dr / 15

//------ Lever

    TSl = (RA[indh] - AH)
    T1l = TSl - (-lonObs / dr / 15)
    Ttl = T1l - ts1
      if (Ttl < 0) {Ttl += 24}
    Ttl = Ttl / 1.002737908
      if (Ttl < 0) {Ttl += 24}
      if (Ttl > 24) {Ttl -= 24}
    levhP[indh] = floor(Ttl); 
    levmP[indh] = floor(60 * (Ttl - levhP[indh]));

//------ Coucher

    TSc = (RA[indh] + AH)
    T1c = TSc - (-lonObs / dr / 15)
    Ttc = T1c - ts1
      if (Ttc < 0) {Ttc += 24}
    Ttc = Ttc / 1.002737908
      if (Ttc < 0) {Ttc += 24}
      if (Ttc > 24) {Ttc -= 24}
    couhP[indh] = floor(Ttc); 
    coumP[indh] = floor(60 * (Ttc - couhP[indh]));

//------ Passage au Méridien
    if (Ttc < Ttl) {Ttc += 24}
    PassM = (Ttl + Ttc) / 2
    if (PassM > 24) {PassM -= 24}

    PassMh[indh] = floor(PassM); 
    PassMm[indh] = floor(60 * (PassM - PassMh[indh]));
}

// } // fin de with(Math);

}



function setLieuPGJ(latitude,longitude){ // définit la latitude et longitude d'observation
  obsLatitude = Math.floor(latitude);
  ll_latmin = Math.round((latitude - obsLatitude) * 60 ) ;
  obsLongitude = Math.floor(longitude);
  ll_lonmin = Math.round((longitude - obsLongitude) * 60 ) ;
}
function trouveConstellation(long1){ // trouve le signe du zodiac équatorial
    constell ="";
if (long1 > 299.55 && long1 <= 327.72) constell = "Capricorne (Capricornus)";
if (long1 > 327.72 && long1 <= 351.41) constell = "Verseau (Aquarius)";
if (long1 > 351.41 || long1 <= 28.92) constell = "Poissons (Pisces)";
if (long1 > 28.92 && long1 <= 53.30) constell = "Bélier (Aries)";
if (long1 > 53.00 && long1 <= 90.25) constell = "Taureau (Taurus)";
if (long1 > 90.25 && long1 <= 118.08) constell = "Gémeaux (Gemini)";
if (long1 > 118.08 && long1 <= 138.00) constell = "Cancer (Cancer)";
if (long1 > 138.00 && long1 <= 173.98) constell = "Lion (Leo)";
if (long1 > 173.98 && long1 <= 217.62) constell = "Vierge (Virgo)";
if (long1 > 217.62 && long1 <= 240.96) constell = "Balance (Libra)";
if (long1 > 240.96 && long1 <= 247.86) constell = "Scorpion (Scorpius)";
if (long1 > 247.86 && long1 <= 266.42) constell = "Ophiuchus (Ophiuchus)";
if (long1 > 266.42 && long1 <= 299.55) constell = "Sagittaire (Sagittarius)";
    return constell;
  }
function jyear(td) {
  /*  JYEAR  --  Convert  Julian  date  to  year,  month, day, which are
               returned as an Array.  */
    var z, f, a, alpha, b, c, d, e, mm;

    td += 0.5;
    z = Math.floor(td);
    f = td - z;

    if (z < 2299161.0) {
        a = z;
    } else {
        alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }

    b = a + 1524;
    c = Math.floor((b - 122.1) / 365.25);
    d = Math.floor(365.25 * c);
    e = Math.floor((b - d) / 30.6001);
    mm = Math.floor((e < 14) ? (e - 1) : (e - 13));

    return new Array(
                     Math.floor((mm > 2) ? (c - 4716) : (c - 4715)),
                     mm,
                     Math.floor(b - d - Math.floor(30.6001 * e) + f)
                    );
}
function jhms(j) {
   /*  JHMS  --  Convert Julian time to hour, minutes, and seconds,
              returned as a three-element array.  */
 var ij;

    j += 0.5;                 /* Astronomical to civil */
    ij = (j - Math.floor(j)) * 86400.0;
    return new Array(
                     Math.floor(ij / 3600),
                     Math.floor((ij / 60) % 60),
                     Math.floor(ij % 60));
}
function dtr(d) {
/*  DTR  --  Degrees to radians.  */
 return (d * PI) / 180.0; 
}
/*  EDATE  --  Edit date and time to application specific format.  */


function edate(j) {
    var date2, PGJ_time;

    j += (30.0 / (24 * 60 * 60));     // Round to nearest minute
    date2 = jyear(j);
    PGJ_time = jhms(j);

    return "Le " + (zero(date2[2], 2, " ")) + " " + Months[date2[1] - 1] + " à " +   
           (zero(PGJ_time[0], 2, " ")) + "h" + (zero(PGJ_time[1], 2, "0")) + " UTC ";
}
function permute(){
     if (yp[0] > yp[1]) { yp[0] = pl[1]; yp[1] = pl[2]; yp[2] = pl[3]; yp[3] = pl[0];
                          yph[0] = ph[1]; yph[1] = ph[2]; yph[2] = ph[3]; yph[3] = ph[0]; }
     if (yp[1] > yp[2]) { yp[0] = pl[2]; yp[1] = pl[3]; yp[2] = pl[0]; yp[3] = pl[1];
                          yph[0] = ph[2]; yph[1] = ph[3]; yph[2] = ph[0]; yph[3] = ph[1]; }
     if (yp[2] > yp[3]) { yp[0] = pl[3]; yp[1] = pl[0]; yp[2] = pl[1]; yp[3] = pl[2];
                          yph[0] = ph[3]; yph[1] = ph[0]; yph[2] = ph[1]; yph[3] = ph[2]; }

}
function phase_lune(phase) {
with (Math) {
var d2r = PI/180;

// Les commentaires et les formules utilis�es pour le calcul des phases de la Lune proviennent du livre de Jean MEEUS
// "Calculs Astronomiques � l'usage des amateurs" Edition SAF ISBN 2-901730-03-6
// Valeur du mois synodique
        SynMonth = 29.53058868

// k peut �tre d�termin� de mani�re approch�e par :
        k = (ANNEE + fnj - 1900) * 12.3685;

// Astronomique en civil
        k += 0.5;
        k = floor(k);
        k += phase;

// t est le temps en si�cles juliens � partir du 0.5 janvier 1900
        t = (jj - 2415020) / 36525;

// Une fois que la valeur correcte de k a �t� trouv�e, t peut �tre calcul� avec une pr�cision suffisante par  :
        t = k / 1236.85;

        t2 = t * t;
        t3 = t2 * t;

// Le moment des phases moyennes de la Lune, affect� de l'aberration du Soleil est donn� par :

        pt = 2415020.75933 + SynMonth * k + 0.0001178 * t2 - 0.000000155 * t3 + 0.00033 * sin((166.56 + 132.87 * t - 0.009173 * t2) * d2r);

// Ces instants sont exprim�s en Temps des Eph�m�rides (Jours Juliens des Eph�m�rides).
// Dans la formule ci-dessus, une valeur enti�re de k donne l'instant de la Nouvelle Lune, 
// une valeur enti�re augment�e de 0.25 donne l'instant du Premier Quartier, 
// 0.50 donne l'instant de la Pleine Lune, 0.75 donne l'instant du Dernier Quartier
// N'importe quelle autre valeur de k donne un r�sultat sans signification/
// Une valeur n�gative de k correspond � une phase ant�rieure � l'ann�e 1900, une valeur 
// positive � une phase post�rieure au d�but de l'ann�e 1900.

// Anomalie moyenne du Soleil � l'instant jj
        m = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3;

// Anomalie moyenne de la Lune
        mprime = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3;

//Argument de la latitude de la Lune
        f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3;

// Pour obtenir l'instant de la phase vraie, il faut ajouter les corrections suivantes � l'instant de la phase moyenne de la Lune.
// Les coefficients suivants sont exprim�s en fractions d�cimales de jour; des quantit�s plus faibles ont �t� n�glig�es.
// Pour la Nouvelle Lune et la Pleine Lune :

        if (phase == 0||phase == 0.5) {
                pt += (0.1734 - 0.000393 * t) * sin(m * d2r);
                pt += 0.0021 * sin(2 * m * d2r);
                pt -= 0.4068 * sin(mprime * d2r);
                pt += 0.0161 * sin(2 * mprime * d2r);
                pt -= 0.0004 * sin(3 * mprime * d2r);
                pt += 0.0104 * sin(2 * f * d2r);
                pt -= 0.0051 * sin((m + mprime) * d2r);
                pt -= 0.0074 * sin((m - mprime) * d2r);
                pt += 0.0004 * sin((2 * f + m) * d2r);
                pt -= 0.0004 * sin((2 * f - m) * d2r);
                pt -= 0.0006 * sin((2 * f + mprime) * d2r);
                pt += 0.0010 * sin((2 * f - mprime) * d2r);
                pt += 0.0005 * sin((m + 2 * mprime) * d2r);
        }

// Pour le Premier et le Dernier Quartier :

        if (phase == 0.25||phase == 0.75) {
                pt += (0.1721 - 0.0004 * t) * sin(m * d2r);
                pt += 0.0021 * sin(2 * m * d2r);
                pt -= 0.6280 * sin(mprime * d2r);
                pt += 0.0089 * sin(2 * mprime * d2r);
                pt -= 0.0004 * sin(3 * mprime * d2r);
                pt += 0.0079 * sin(2 * f * d2r);
                pt -= 0.0119 * sin((m + mprime) * d2r);
                pt -= 0.0047 * sin((m - mprime) * d2r);
                pt += 0.0003 * sin((2 * f + m) * d2r);
                pt -= 0.0004 * sin((2 * f - m) * d2r);
                pt -= 0.0006 * sin((2 * f + mprime) * d2r);
                pt += 0.0021 * sin((2 * f - mprime) * d2r);
                pt += 0.0003 * sin((m + 2 * mprime) * d2r);
                pt += 0.0004 * sin((m - 2 * mprime) * d2r);
                pt -= 0.0003 * sin((2 * m + mprime) * d2r);
        }

// et, de plus,

        if (phase == 0.25) {pt += 0.0028 - 0.0004 * cos(m * d2r) + 0.0003 * cos(mprime * d2r);}
        if (phase == 0.75) {pt += - 0.0028 + 0.0004 * cos(m * d2r) - 0.0003 * cos(mprime * d2r);}
return pt;
}
}
// Local Sidereal Time for zone
function lst( lon, jd, z ){
    var s = 24110.5 + 8640184.812999999*jd/36525 + 86636.6*z + 86400*lon;
    s = s/86400;
    s = s - Math.floor(s);
    return s*360*DR;
}
// 3-point interpolation
function interpolate( f0, f1, f2, p ){
    var a = f1 - f0;
    var b = f2 - f1 - a;
    var f = f0 + p*(2*a + b*(2*p - 1));
    return f;
}

// moon's position using fundamental arguments 
// (Van Flandern & Pulkkinen, 1979)
function moon( jd ){
    var d, f, g, h, m, n, s, u, v, w;
    h = 0.606434 + 0.03660110129*jd;
    m = 0.374897 + 0.03629164709*jd;
    f = 0.259091 + 0.0367481952 *jd;
    d = 0.827362 + 0.03386319198*jd;
    n = 0.347343 - 0.00014709391*jd;
    g = 0.993126 + 0.0027377785 *jd;
    h = h - Math.floor(h);
    m = m - Math.floor(m);
    f = f - Math.floor(f);
    d = d - Math.floor(d);
    n = n - Math.floor(n);
    g = g - Math.floor(g);
    h = h*2*PI;
    m = m*2*PI;
    f = f*2*PI;
    d = d*2*PI;
    n = n*2*PI;
    g = g*2*PI;
    v = 0.39558*Math.sin(f + n);
    v = v + 0.082  *Math.sin(f);
    v = v + 0.03257*Math.sin(m - f - n);
    v = v + 0.01092*Math.sin(m + f + n);
    v = v + 0.00666*Math.sin(m - f);
    v = v - 0.00644*Math.sin(m + f - 2*d + n);
    v = v - 0.00331*Math.sin(f - 2*d + n);
    v = v - 0.00304*Math.sin(f - 2*d);
    v = v - 0.0024 *Math.sin(m - f - 2*d - n);
    v = v + 0.00226*Math.sin(m + f);
    v = v - 0.00108*Math.sin(m + f - 2*d);
    v = v - 0.00079*Math.sin(f - n);
    v = v + 0.00078*Math.sin(f + 2*d + n);
    
    u = 1 - 0.10828*Math.cos(m);
    u = u - 0.0188 *Math.cos(m - 2*d);
    u = u - 0.01479*Math.cos(2*d);
    u = u + 0.00181*Math.cos(2*m - 2*d);
    u = u - 0.00147*Math.cos(2*m);
    u = u - 0.00105*Math.cos(2*d - g);
    u = u - 0.00075*Math.cos(m - 2*d + g);
    
    w = 0.10478*Math.sin(m);
    w = w - 0.04105*Math.sin(2*f + 2*n);
    w = w - 0.0213 *Math.sin(m - 2*d);
    w = w - 0.01779*Math.sin(2*f + n);
    w = w + 0.01774*Math.sin(n);
    w = w + 0.00987*Math.sin(2*d);
    w = w - 0.00338*Math.sin(m - 2*f - 2*n);
    w = w - 0.00309*Math.sin(g);
    w = w - 0.0019 *Math.sin(2*f);
    w = w - 0.00144*Math.sin(m + n);
    w = w - 0.00144*Math.sin(m - 2*f - n);
    w = w - 0.00113*Math.sin(m + 2*f + 2*n);
    w = w - 0.00094*Math.sin(m - 2*d + g);
    w = w - 0.00092*Math.sin(2*m - 2*d);
    s = w/Math.sqrt(u - v*v);                  
  // compute moon's right ascension ...  
    Sky[0] = h + Math.atan(s/Math.sqrt(1 - s*s));
  
    s = v/Math.sqrt(u);                        
  // declination ...
    Sky[1] = Math.atan(s/Math.sqrt(1 - s*s));
  // and parallax
    Sky[2] = 60.40974*Math.sqrt( u );          
}

// determine Julian day from calendar date
// (Jean Meeus, "Astronomical Algorithms", Willmann-Bell, 1991)
function julian_day(ANNEE,MOIS,JOUR ) {
    var a, b, jd;
    var gregorian;
 //   dc_day = parseInt(JOUR);
 //   dc_month = parseInt(MOIS);
 //   dc_year = parseInt(ANNEE);

    gregorian = (dc_year < 1583) ? false : true;
    
    if ((dc_month == 1)||(dc_month == 2))
    {
        dc_year  = dc_year  - 1;
        dc_month = dc_month + 12;
    }
    a = Math.floor(dc_year/100);
    if (gregorian) b = 2 - a + Math.floor(a/4);
    else           b = 0.0;
    jd = Math.floor(365.25*(dc_year + 4716)) 
       + Math.floor(30.6001*(dc_month + 1)) 
       + dc_day + b - 1524.5;
    
    return jd;
}

// returns value for sign of argument
function sgn( x ){
    var rv;
    if (x > 0.0)      rv =  1;
    else if (x < 0.0) rv = -1;
    else              rv =  0;
    return rv;
}

// format a positive integer with leading zeroes
function zintstr( num, width ){
    var str = num.toString(10);
    var len = str.length;
    var intgr = "";
    var i;
    for (i = 0; i < width - len; i++)          // append leading zeroes
        intgr += '0';
    for (i = 0; i < len; i++)                  // append digits
        intgr += str.charAt(i);
    return intgr;
}

// format an integer
function cintstr( num, width ){
    var str = num.toString(10);
    var len = str.length;
    var intgr = "";
    var i;
    for (i = 0; i < width - len; i++)          // append leading spaces
        intgr += ' ';
    for (i = 0; i < len; i++)                  // append digits
        intgr += str.charAt(i);
    return intgr;
}

// format a real number
function frealstr( num, width, fract ){
    var str = num.toFixed(fract);
    var len = str.length;
    var real = "";
    var i;
    for (i = 0; i < width - len; i++)          // append leading spaces
        real += ' ';
    for (i = 0; i < len; i++)                  // append digits
        real += str.charAt(i);
    return real;
}





function ns1(form) {
nst1++
     if (nst1 > 2) {nst1 = 1}
     if (nst1 == 1) {form.nslat1 = "Nord"}
     if (nst1 == 2) {form.nslat1 = "Sud"}
}
function ns2(form) {
nst2++
     if (nst2 > 2) {nst2 = 1}
     if (nst2 == 1) {form.nslon1 = "Est"}
     if (nst2 == 2) {form.nslon1 = "Ouest"}
}
function dsin(x) {return Math.sin(dtr(x));}
function dcos(x) {return Math.cos(dtr(x));}
function zero(ze) {if (ze < 10) ze = "0" + ze; return ze}
function PGJ_norm(x){
    x = x - Math.floor(x); 
    if( x < 0 )
        x = x + 1;
    return x;
}
function jh(h){
     if (h >= 24){h -= 24}
     else {h = h}
return h;}
function abs_floor( x ){
    var ro;
    if (x >= 0.0) ro = Math.floor(x);
    else          ro = Math.ceil(x);
    return ro;
}
function mod2pi( x ){
    var bo = x / (2 * PI);
    var ao = (2 * PI) * (bo - abs_floor(bo));  
    if (ao < 0) ao = (2 * PI) + ao;
    return ao;
}
function notn(x){
     if (isNaN(x))x = " -- " 
return x;
}
function aff(x){
     if (x > 15)x = " -- ";
     else x = x  + "�";
return x;
}
function tronque(x) {
if (x>0.0) return(Math.floor(x));
else return Math.ceil(x);
}

