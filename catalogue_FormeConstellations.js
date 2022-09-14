// la foncion pour dessiner les constellations
//--------------------------------------------
  // 0 : Constellation
  // 1 : nom de l'étoile
  // 2 : couleur
  // 3 : magnitude
  // 4,5,6 : RA equatoriale en heure, minute,seconde
  // 7,8,9 : DEC equatoriale en Deg, Minutes, seconde
  // 10,11 : RA et DEC en degré


constellation = new Array(); // le tableau de chargement des constellations
lp = new Array(); // la liste des points x,y
etoileCouleur = "GRISMOYEN";




function c_LION(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
constellation.push(['Lion','α - Regulus',c,1.36,10,8,22.46,11,58,1.9]);
constellation.push(['Lion','η - Al Jabhah',c,3.48,10,7,19.95,16,45,45.6]);
constellation.push(['Lion','ε - Ras Elazed',c,2.97,9,45,51.10,23,46,27.4]);
constellation.push(['Lion','λ - Alterf',c,4.32,9,31,43.24,22,58,5.0]);
constellation.push(['Lion','κ- Al Minliar',c,4.47,9,24,39.28,26,10,56.8]);
constellation.push(['Lion','μ - Rasalas',c,3.88,9,52,45.96,26,0,25.5]);
constellation.push(['Lion','ζ - Adhafera',c,3.43,10,16,41.40,23,25,2.4]);
constellation.push(['Lion','γ - Algieba',c,2.01,10,19,58.16,19,50,30.7]);
constellation.push(['Lion','δ - Zosma',c,2.56,11,14,6.41,20,31,26.5]);
constellation.push(['Lion','β - Denebola',c,2.14,11,49,3.88,14,34,20.4]);
constellation.push(['Lion','θ - Chertan',c,3.33,11,14,14.44,15,25,47.1]);
constellation.push(['Lion','ι - Tsze Tseang',c,4.0,11,23,55.37,10,31,46.9]);
constellation.push(['Lion','σ - Shishimai',c,4.05,11,21,8.25,6,1,45.7]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3,4,5,6,7,1,10,9,8,7]);
 dessineFigureListe([8,10,11,12]);

  
  }

function couleur(c){
  
}

function c_VIERGE(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
constellation.push(['Vierge','γ - Porrima',c,2.74,12,41,40.0,-01,26,58.3]);
constellation.push(['Vierge','δ - Minelauva',c,3.39,12,55,36.48,03,23,51.4]);
constellation.push(['Vierge','ε - Vindemiatrix',c,2.85,13,2,10.76,10,57,32.8]);
constellation.push(['Vierge','θ',c,4.38,13,9,57.01,-05,32,20.1]);
constellation.push(['Vierge','α - Spica',c,0.98,13,25,11.60,-11,9,40.5]);
constellation.push(['Vierge','',c,0.98,14,45,11.60,2,9,40.5]);
constellation.push(['Vierge','τ',c,4.23,14,1,38.78,01,32,40.5]);
constellation.push(['Vierge','ζ - Heze',c,3.38,13,34,41.75,-0,35,45.4]);
constellation.push(['Vierge','ι - Syrma',c,4.07,14,16,0.88,-05,59,58.3]);
constellation.push(['Vierge','μ',c,3.87,14,43,3.56,-05,39,26.7]);
constellation.push(['Vierge','η - Zaniah',c,3.89,12,19,54.39,-0,40,.3]);
constellation.push(['Vierge','β - Zavijavah',c,3.59,11,50,41.29,01,45,55.4]);
constellation.push(['Vierge','ν',c,4.04,11,45,51.57,06,31,47.3]);
constellation.push(['Vierge','ο',c,4.12,12,5,12.67,08,43,58.2]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([10,11,12,13,10,0,7,6,5]);
dessineFigureListe([9,8,7]);
 dessineFigureListe([4,3,0,1,2]);
  
  }

function c_BALANCE(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
  constellation.push(['Balance','σ - Brachium',c,3.25,15,4,4.26,-25,16,54.7]);
constellation.push(['Balance','α1',c,5.15,14,50,52,-16,02,29.5]);
constellation.push(['Balance','β - Kiffa',c,2.61,15,17,0.47,-09,22,58.3]);
constellation.push(['Balance','γ - Elakrab',c,3.91,15,35,31.54,-14,47,22.4]);
constellation.push(['Balance','υ',c,3.6,15,37,1.46,-28,8,6.3]);
constellation.push(['Balance','τ',c,3.66,15,38,39.38,-29,46,39.7]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3,4,5]);
  dessineFigureListe([1,3]);
 
  
  }
function c_CANCER(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
constellation.push(['Cancer','α - Acubens',c,4.26,8,58,29.20,11,51,28.0]);
constellation.push(['Cancer','δ - Asellus',c,3.94,8,44,41.11,18,9,17.5]);
constellation.push(['Cancer','γ',c,4.66,8,43,17.21,21,28,6.9]);
constellation.push(['Cancer','ι',c,4.03,8,46,41.83,28,45,36.0]);
constellation.push(['Cancer','β - Tarf',c,3.53,8,16,30.95,9,11,8.4]);  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3]);
  dessineFigureListe([1,4]);
 
  
  }
function c_SCORPION(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
  constellation.push(['Scorpion','Al Jabba',c,2.29,16,0,20.01,-22,37,17.8]);
constellation.push(['Scorpion','σ',c,2.90,16,21,11.32,-25,35,33.9]);
constellation.push(['Scorpion','Antares',c,0.91,16,29,24.47,-26,25,55.0]);
constellation.push(['Scorpion','Al Niyat',c,2.82,16,35,52.96,-28,12,57.5]);
constellation.push(['Scorpion','Larawag',c,2.29,16,50,10.24,-34,17,33.4]);
constellation.push(['Scorpion','Xamidimura',c,3.00,16,51,52.24,-38,2,50.4]);
constellation.push(['Scorpion','ζ2',c,3.62,16,54,35.11,-42,21,38.7]);
constellation.push(['Scorpion','η',c,3.32,17,12,9.18,-43,14,18.6]);
constellation.push(['Scorpion','Sargas',c,1.86,17,37,19.13,-42,59,52.2]);
constellation.push(['Scorpion','Apollyon',c,2.99,17,47,35.08,-40,7,37.1]);
constellation.push(['Scorpion','Girtab',c,2.39,17,42,29.28,-39,1,47.7]);
constellation.push(['Scorpion','Lesath',c,2.70,17,30,45.84,-37,17,44.7]);
constellation.push(['Scorpion','Shaula',c,1.62,17,33,36.53,-37,6,13.5]);
constellation.push(['Scorpion','Iklil',c,3.87,15,56,53.09,-29,12,50.4]);
constellation.push(['Scorpion','Nur',c,2.89,15,58,51.12,-26,6,50.6]);
constellation.push(['Scorpion','Acrab',c,2.62,16,5,26.23,-19,48,19.4]);
constellation.push(['Scorpion','χ',c,5.24,16,13,50.91,-11,50,15.8]);
constellation.push(['Scorpion','ψ',c,4.93,16,12,0.0,-10,3,51.1]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3,4,5,6,7,8,9,10,11,12]);
  dessineFigureListe([17,16,15,0,14,13]);
  
  }
function c_SAGITTAIRE(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  

  noFill();
   //1. definition des etoiles de la constellation
  constellation.push(['Sagittaire','η',c,               3.1,18,17,37.73,-36,45,40.6]);
constellation.push(['Sagittaire','Kaus Australis',c,    1.79,18,24,10.35,-34,23,3.5]);
constellation.push(['Sagittaire','γ1 - Cépheïde',c,     4.66,18,5,1.22,-29,34,48.3]);
constellation.push(['Sagittaire','δ - Kaus Media',c,    2.72,18,20,59.62,-29,49,40.9]);
constellation.push(['Sagittaire','λ - Kaus Borealis',c, 2.82,18,27,58.27,-25,25,16.5]);
constellation.push(['Sagittaire','μ - Polis',c,         3.84,18,13,45.81,-21,3,31.8]);
constellation.push(['Sagittaire','φ',c,                 3.17,18,45,39.35,-26,59,26.8]);
constellation.push(['Sagittaire','ζ - Ascella',c,       2.6,19,2,36.72,-29,52,48.4]);
constellation.push(['Sagittaire','σ - Nunki',c,         2.05,18,55,15.92,-26,17,47.7]);
constellation.push(['Sagittaire','τ',c,                 3.32,19,6,56.44,-27,40,11.3]);
constellation.push(['Sagittaire','ξ1',c,                5.02,18,57,20.48,-20,39,22.8]);
constellation.push(['Sagittaire','π - Albaldah',c,      2.88,19,9,45.83,-21,1,24.7]);
constellation.push(['Sagittaire','ρ1',c,                3.92,19,21,40.38,-17,50,50.1]);
constellation.push(['Sagittaire','χ3',c,                5.45,19,25,29.67,-23,57,44.7]);
constellation.push(['Sagittaire','ω - Terebelum',c,     4.7,19,55,50.23,-26,17,58.9]);
constellation.push(['Sagittaire','ι',c,                 4.12,19,55,15.68,-41,52,6.3]);
constellation.push(['Sagittaire','β1 - Arkab prior',c,  3.96,19,22,38.29,-44,27,32.1]);
constellation.push(['Sagittaire','α - Rukbat',c,        3.96,19,23,53.15,-40,36,56.3]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigureListe([16,15,14,13,9,7,1,2,3,1,0]);
  dessineFigureListe([15,17]);
  
  dessineFigureListe([7,6,3,4,6,8,9]);
  dessineFigureListe([8,10,11,12]);
  dessineFigureListe([6,8]);
  dessineFigureListe([4,5]);
  
  
  
  
}
function c_BELIER(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation
  constellation.push(['Belier','Hamal',c,2,  2,7,10,   23,27,46]);
  constellation.push(['Belier','Sheratan',c,2.6 , 1,54,38 , 20,48,30]);
  constellation.push(['Belier','Mesarthim',c, 4.6 , 1,53,31 ,19,17,45]);
  constellation.push(['Belier','Bharani',c,3.6,  2,49,59,27,15,38   ]);
  constellation.push(['Belier','Botein',c,4.35,  3,11,38,19,43,36 ]);
  constellation.push(['Belier','38 Ari',c,5,     2,44,57,12,26,45 ]);
  constellation.push(['Belier','ι Ari',c,5,      1,57,21,17,49,03 ]);
  constellation.push(['Belier','λ Ari',c,5,       1,57,55,23,35,46 ]);
   
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigure(0,1);
  dessineFigure(1,2);
  dessineFigure(0,3);
  dessineFigure(3,4);
  dessineFigure(0,5);
  dessineFigure(1,6);
  dessineFigure(2,1);
  dessineFigure(1,7);
}
function c_TAURUS(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
   //1. definition des etoiles de la constellation

  constellation.push(['Taurus','Aldebaran',c,0.9, 4,35,55,16,30,35]);
  constellation.push(['Taurus','Hyadum I',c,3, 4,19,47,15,37,39]);
  constellation.push(['Taurus','Hyadum II',c,3, 4,22,56,17,32,33]);
  constellation.push(['Taurus','Oculus Borealus',c, 3 , 4,28,36,19,10,49]);
  constellation.push(['Taurus','Elnath',c,1.6, 5,26,17,28,36,28 ]);
  constellation.push(['Taurus','Tianguan',c,2.5, 5,37,38,21,8,33]);
  constellation.push(['Taurus','λ Tau',c,3.4, 4,0,40,12,29,25 ]);
  constellation.push(['Taurus','ξ Tau',c,3.7,3,27,10,9,43,58 ]);
   constellation.push(['Taurus','ν Tau',c,3.9, 4,3,9,5,59,21   ]);
  constellation.push(['Taurus','π Tau',c,4.9, 4,26,36,14,42,49   ]);
  

   
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigure(4,3);
  dessineFigure(3,2);
  dessineFigure(2,0);
  dessineFigure(0,5);
  dessineFigure(0,1);
  dessineFigure(1,2);
  dessineFigure(1,6);
  dessineFigure(6,7);
   dessineFigure(8,7);
     dessineFigure(1,9);
}
function c_ORION(c){

  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
  

  //1. definition des etoiles de la constellation
  constellation.push(['Orion','Beltegeuse',c,3,  5,55,0,   7,24,0]);
  constellation.push(['Orion','λ Ori Meissa',c,  0.5,5,35, 8.28,9,56,3]);
  constellation.push(['Orion','Bellatrix',c,2.5, 5,25,7.87,6,20,59]);
  constellation.push(['Orion','Alnitak',c,2,     5,40,45.52 ,-1,56,33.3 ]);
  constellation.push(['Orion','Alnilam',c,2,     5,36,12.81 ,-1,12,6.9 ]);
  constellation.push(['Orion','Mintaka',c,2,     5,32,0.4 , 0,17,56.7 ]);
  constellation.push(['Orion','Saiph',c,2,       5,47,45.39,-9,40,10.6 ]);
  constellation.push(['Orion','Rigel',c,3,       5,14,32.27 ,-8,12,5.9 ]);
   
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
  dessineFigure(3,6);
  dessineFigure(5,7);
  dessineFigure(0,3);
  dessineFigure(2,5);
  dessineFigure(3,4);
  dessineFigure(4,5);
  }
function c_GEMEAUX(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
  
//
  noFill();
  
  //1. definition des etoiles de la constellation
  constellation.push(['Gemeaux','CASTOR',c,3,    7,34,36 ,31,3,18 ]);
  constellation.push(['Gemeaux','POLLUX',c,3,    7,45,19 ,28,1,34 ]);
  constellation.push(['Gemeaux','θ',c,1,         6,52,47 ,33,57,40.9 ]);
  constellation.push(['Gemeaux','τ',c,1,         7,11,08.39 ,30,14,43 ]);
  constellation.push(['Gemeaux','υ',c,1,     07,35,55.37 ,26,53,45.6 ]);
  constellation.push(['Gemeaux','κ',c,1,     07,44,26.87 ,24,23,53.3 ]);
  constellation.push(['Gemeaux','ε MEBSUTA',c,1, 6,43,55.93 ,25,07,52.2 ]);
  constellation.push(['Gemeaux','δ Wasat',c,1, 7,20,7.39 ,21,58,56.4 ]);
  constellation.push(['Gemeaux','λ',c,1, 7,18,5.61 ,16,32,25.7 ]);
  constellation.push(['Gemeaux','μ',c,1, 6,22,57.59 ,22,30,49.9 ]);
  constellation.push(['Gemeaux','ν A',c,1, 6,28,57.79 ,20,12,43.8 ]);
  constellation.push(['Gemeaux','γ Alhena',c,1, 6,37,42.70 ,16,23,57.9 ]);
  constellation.push(['Gemeaux','ξ Alzirr',c,1, 6,45,17.43 ,12,53,45.8 ]);
   
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
   
  //3. dessin de la figure
 dessineFigure(0,1);
  dessineFigure(0,3);
  dessineFigure(3,6);
  dessineFigure(6,9);
  dessineFigure(6,10);
  dessineFigure(1,4);
  dessineFigure(4,7);
  dessineFigure(7,11);
  dessineFigure(8,12);
  dessineFigure(5,4);
  dessineFigure(4,3);
  dessineFigure(3,2);
  dessineFigure(7,8);

}
function c_CASSIOPE(){
    // CASSIOPE
  // --------
  
  // 1 - β Cassiopeiae (Caph)
  // coordonnées : 00h 09m 10,68s / 59° 08′ 59,2″
   couleur("BLEU");
  ra = HMStoA (0,9,10.68);
    dec = DMStoA (59,8,59.2);
    ma = 3;
    dessineEtoile(ra, dec, ma);
    az1 = etoileAzimuth ;
    el1 = etoileElevation ;
  
  // 2 - α Cassiopeiae (Schedar), la Poitrine en arabe
  // coordonnées : 00h 40m 30.5s / +56° 32′ 14.5″
    couleur("BLEUCIEL");
  ra = HMStoA (0,40,30.5);
    dec = DMStoA (56,32,14.85);
    ma = 2;
    dessineEtoile(ra, dec, ma);
    az2 = etoileAzimuth ;
    el2 = etoileElevation ;
    
  // 3 - Tsih (γ Cassiopeia)
  // coordonnées : 00h 56m 42,5s / 60° 43′ 00″
    ra = HMStoA (0,56,42.5);
    dec = DMStoA (60,43,0);
    ma = 2;
    dessineEtoile(ra, dec, ma);
    az3 = etoileAzimuth ;
    el3 = etoileElevation ;
  
  // 4 - δ Cassiopeiae
   // coordonnées : 01h 25m 49.0s / +60° 14′ 07.5″
    ra = HMStoA (1,25,49.0);
    dec = DMStoA (60,14,7.5);
    ma = 2;
    dessineEtoile(ra, dec, ma);
    az4 = etoileAzimuth ;
    el4 = etoileElevation ;
  // 5 - ε Cassiopeiae
  // coordonnées : 1h 54m 23.7s / +63° 40′ 12″
    couleur("BLEU");
  ra = HMStoA (1,54,23.7);
    dec = DMStoA (63,40,12.0);
    ma = 3;
    dessineEtoile(ra, dec, ma);
    az5 = etoileAzimuth ;
    el5 = etoileElevation ;

    couleur("BLEUCIEL");
  noFill();
  dessinLignePolaire(az1,el1,az2,el2);
  dessinLignePolaire(az2,el2,az3,el3);
  dessinLignePolaire(az3,el3,az4,el4);
  dessinLignePolaire(az4,el4,az5,el5);
   
  
  couleur("BLEUCIEL");
   textePolaire2("CASIOPE",az3,el3,4);


}
function c_VERSEAU(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
//
  noFill();
  
  //1. definition des etoiles de la constellation
constellation.push(['Verseau','Sadal',c,2.95,22, 5, 47.03,0,19, 11.4]);
constellation.push(['Verseau','Seat',c,4.8,22, 25, 16.61,1,22, 38.6]);
constellation.push(['Verseau','η',c,4.04,22, 35, 21.33,0,7, 2.5]);
constellation.push(['Verseau','Sadachbia',c,3.86,22, 21, 39.30,-1,23, 14.5]);
constellation.push(['Verseau','Ancha',c,4.17,22, 16, 49.97,-7,46, 59.7]);
constellation.push(['Verseau','Hydor',c,3.73,22, 52, 36.86,-7,34, 46.8]);
constellation.push(['Verseau','φ',c,4.22,23, 14, 19.33,-6,2, 54.7]);
constellation.push(['Verseau','ψ2',c,4.41,23, 17, 54.20,-9,10, 57]);
constellation.push(['Verseau','Skat',c,3.27,22, 54, 39.04,-15,49, 14.7]);
constellation.push(['Verseau','τ1',c,5.68,22, 47, 42.75,-14,3, 23.1]);
constellation.push(['Verseau','nn',c,6.46,23, 44, 4.02,-21,46, 27.2]);
constellation.push(['Verseau','nn',c,6.43,23, 26, 35.44,-21,44, 27]);
constellation.push(['Verseau','Sadalsud',c,2.9,21, 31, 33.52,-5,34, 16.2]);
constellation.push(['Verseau','ε',c,3.78,20, 47, 40.53,-9,29, 44.5]);
constellation.push(['Verseau','ι',c,4.29,22, 6, 26.21,-13,52, 10.3]);
constellation.push(['Verseau','nn',c,6.28,22, 2, 11.78,-17,54, 12]);
  constellation.push(['Verseau','nn',c,5,21, 50, 0,0,0, 0]);
 
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
  
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3,0,4,5,6,7,8,9,5]);
dessineFigureListe([11,7,10]);
 dessineFigureListe([0,12,14,15]);
dessineFigureListe([12,13]);  
  dessineFigureListe([0,16]);  
}
function c_CARPICORNE(c){
    //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
//
  noFill();
  
  //1. definition des etoiles de la constellation
  constellation.push(['Capricorne','Dorsum',c,4.08,21, 05, 56.78,-17,13, 57.8]);
constellation.push(['Capricorne','Algedi Prima',c,4.30,20, 17, 38.86,-12,30, 29.6]);
constellation.push(['Capricorne','Dabih',c,3.05,20, 21, 0.65,-14,46, 53.0]);
constellation.push(['Capricorne','Okul',c,5.08,20, 27, 19.20,-18,12, 42.1]);
constellation.push(['Capricorne','Baten',c,4.12,20, 51, 49.30,-26,55, 8.9]);
constellation.push(['Capricorne','Marakk',c,3.77,21, 26, 40.03,-22,24, 41.0]);
constellation.push(['Capricorne','Castra',c,4.51,21, 37, 4.82,-19,27, 57.6]);
constellation.push(['Capricorne','Deneb Algedi',c,2.85,21, 47, 2.29,-16,7, 35.6]);
  
    //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
  
  //3. dessin de la figure
  dessineFigureListe([2,3,4,5,6,7,0,2,1]);

  
}
function c_PISCES(c){
  //0. initialisation
  constellation = new Array();
  lp = new Array(); // liste de point
//
  noFill();
  
  //1. definition des etoiles de la constellation
constellation.push(['Poissons','Alrescha',c,4,2, 2, 2.80,2, 45, 49.5]);
constellation.push(['Poissons','Torcular',c,4,1, 45, 23.59,9, 9, 27.5]);
constellation.push(['Poissons','Alpherg',c,3,1, 31, 28.99,15, 20, 45.0]);
constellation.push(['Poissons','φ Psc',c,4,1, 13, 44.94,24, 35, 1.6]);
constellation.push(['Poissons','ν Psc',c,4, 1, 3, 25 ,27, 50, 15.4]);
constellation.push(['Poissons','τ Psc',c,4,1, 11, 39.59,30, 5, 23.0]);
constellation.push(['Poissons','υ Psc',c, 4, 1,30,11,6,8,38]);
constellation.push(['Poissons','ε Psc',c,4,1, 2, 56.66,7, 53, 24.3]);
constellation.push(['Poissons','δ Psc',c,4,0, 48, 40.90,7, 35, 6.7]);
constellation.push(['Poissons','ω Psc',c,4,23, 59, 18.60,6, 51, 48.9]);
constellation.push(['Poissons','ι Psc',c,4,23, 39, 56.82,5, 37, 38.5]);
constellation.push(['Poissons','θ Psc',c,4,23, 27, 58.17,6, 22, 44.8]);
constellation.push(['Poissons','γ Psc',c,3,23, 17, 09.49,3, 16, 56.1]);
constellation.push(['Poissons','κ Psc',c,5,23, 26, 55.91,1, 15, 21.0]);
constellation.push(['Poissons','λ Psc',c,5,23, 42, 2.88,1, 46, 49.5]);
 
  //2. calcul des coordonnées égonométrique des étoiles
  calculeConstellation();
  
  //3. dessin de la figure
  dessineFigureListe([0,1,2,3,4,5,3]);
  dessineFigureListe([0,6,7,8,9,10,11,12,13,14,10]);
  
}
function c_PETITEOURSE(){
   //0. initialisation
  constellation = new Array();
  c=0;
    //1. definition des etoiles de la constellation
  constellation.push(['Petite Ourse','Polaris',c,1,2,21,47,89,15,51]);
  constellation.push(['Petite Ourse','Yildun',c,3,17,32,13,86,35,11]);
  constellation.push(['Petite Ourse','ε',c,3,16,45,58,82,2,14]);
  constellation.push(['Petite Ourse','ζ',c,3,15,44,3,77,47,40]);
  constellation.push(['Petite Ourse','Kochab',c,1.5,14,50,42,74,9,19]);
  constellation.push(['Petite Ourse','Pherkad',c,2,15,20,43,71,50,2]);
  constellation.push(['Petite Ourse','Alsaco',c,3,16,17,30,75,45,17]);
 
  //2. calcul des coordonnées égonométrique des étoiles
  noeud = new Array();
  for (i = 0 ; i < i.length ; i++){
   noeud.push( [ liste[1][4] * 15 + liste[1][5]/60 + liste[1][6]/3600 ,
                      liste[1][7] + liste[1][8]/60 + liste[1][9]/3600 ])
   }
   
  //3. decrit la figure
  ordre = [0,1,2,3,4,5,6,3]
  //4. dessine
  dessineFigure (noeud,ordre)
  
  
}



function dessineFigure(noeud,ordre){
  for (o = 0 ; o < ordre.length-1; o++){
   dessineArcEtoileP (noeud[ordre[o]], noeud[ordre[o+1]]);
  }
 }




