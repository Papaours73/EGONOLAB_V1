constellation = new Array(); // liste des étoiles


function calcule_Constellations(){
  for (n = 0 ; n < constellation.length ; n++){
    RA = HMStoA (constellation[n][4],constellation[n][5],constellation[n][6]);
    DEC = DMStoA (constellation[n][7], constellation[n][8], constellation[n][9]);
    constellation[n][10] = RA
    constellation[n][11] = DEC
  
  }
}


function chargeConstellations(){
    // source : https://fr.wikipedia.org/wiki/Liste_des_constellations
      // 0 : Constellation
  // 1 : nom de l'étoile
  // 2 : couleur
  // 3 : magnitude
  // 4,5,6 : RA equatoriale en heure, minute,seconde
  // 7,8,9 : DEC equatoriale en Deg, Minutes, seconde
  // 10,11 : coordonnées équatoriale

  constellation.push(['Polaire','Polaire','ORANGE', 10, 2,31,49 , 89,15,79]);   
  constellation.push(['Belier','Belier','ORANGE',  10,    2,38,0,  20,47,0]);
  constellation.push(['Taureau','Taureau','ORANGE',  10,  4,42,0,  14,52,40]);
  constellation.push(['Gemeaux','Gemeaux','ORANGE', 10,   7,4,0,    22,36,0]);
  constellation.push(['Cancer','Cancer','ORANGE', 10,     8,38,0,   19,48,0]);
  constellation.push(['Lion','Lion','ORANGE',    10,     10,40,0,  13,8,8]);
  constellation.push(['Vierge','Vierge','RED', 10,    13,24,0,   -4,9,46]);
  constellation.push(['Balance','Balance','RED',10,   15,11,0,  -15,14,0]);
  constellation.push(['Scorpion','Scorpion','RED',10, 16,53,0,  -27,1,36]);
  constellation.push(['Sagittaire','Sagittaire', 10, 'RED',19,5,0,   -28,28,35]);
  constellation.push(['Capricorne','Capricorne','RED', 10, 21,2,0,   -18,1,0]);
  constellation.push(['Verseau','Verseau','RED', 10,  22,17,0,  -10,47,45]);
  constellation.push(['Poisson', 'Poisson','RED', 10, 0,28,0,   13,41,31]);
  
  
//constellation.push(['Andromède','Andromède','BLEUCIEL',1,0,48, 0,37,25,0]);
//constellation.push(['Autel','Autel','BLEUCIEL',1,17,22,0,-56,35,0]);
//constellation.push(['Baleine','Baleine','BLEUCIEL',1,1,40,0,-7,10,0]);
//constellation.push(['Boussole','Boussole','BLEUCIEL',1,8,57,0,-27,21,0]);
//constellation.push(['Bouvier','Bouvier','BLEUCIEL',1,14,42,0,31,12,0]);
//constellation.push(['Burin','Burin','BLEUCIEL',1,4,42,0,-37,52,0]);
//constellation.push(['Cameleon','Cameleon','BLEUCIEL',1,10,41,0,-79,12,0]);
//constellation.push(['Carène','Carène','BLEUCIEL',1,8,41,0,0,49,0]);
constellation.push(['Cassiopee','Cassiopee','BLEUCIEL',1,1,19,0,62,11,0]);
constellation.push(['Centaure','Centaure','BLEUCIEL',1,13,4,0,-47,20,0]);
//constellation.push(['Cephee','Cephee','BLEUCIEL',1,22,0,0,71,0,0]);
//constellation.push(['Chevelure de Berenice','Chevelure de Berenice','BLEUCIEL',1,12,47,0,-3,18,0]);
//constellation.push(['Chiens de chasse','Chiens de chasse','BLEUCIEL',1,13,6,0,40,6,0]);
constellation.push(['Cocher','Cocher','BLEUCIEL',1,6,4,0,42,1,0]);
//constellation.push(['Colombe','Colombe','BLEUCIEL',1,5,51,0,-35,5,0]);
//constellation.push(['Compas','Compas','BLEUCIEL',1,14,34,0,-63,1,0]);
//constellation.push(['Corbeau','Corbeau','BLEUCIEL',1,12,26,0,-18,26,0]);
//constellation.push(['Coupe','Coupe','BLEUCIEL',1,11,23,0,-2,55,0]);
//constellation.push(['Couronne australe','Couronne australe','BLEUCIEL',1,18,38,0,-3,8,0]);
//constellation.push(['Couronne boreale','Couronne boreale','BLEUCIEL',1,15,50,0,32,37,0]);
//constellation.push(['Croix du Sud','Croix du Sud','BLEUCIEL',1,12,26,0,-60,11,0]);
constellation.push(['Cygne','Cygne','BLEUCIEL',1,20,35,0,44,32,0]);
//constellation.push(['Dauphin','Dauphin','BLEUCIEL',1,20,41,0,11,40,0]);
//constellation.push(['Dorade','Dorade','BLEUCIEL',1,5,14,0,-59,23,0]);
//constellation.push(['Dragon','Dragon','BLEUCIEL',1,15,8,0,67,0,0]);
//constellation.push(['Ecu de Sobieski','Ecu de Sobieski','BLEUCIEL',1,18,40,0,-9,53,0]);
//constellation.push(['Eridan','Eridan','BLEUCIEL',1,3,18,0,-28,45,0]);
//constellation.push(['Flèche','Flèche','BLEUCIEL',1,19,39,0,18,51,0]);
//constellation.push(['Fourneau','Fourneau','BLEUCIEL',1,2,47,0,-31,38,0]);
//constellation.push(['Girafe','Girafe','BLEUCIEL',1,8,51,0,69,22,0]);
//constellation.push(['Grand Chien','Grand Chien','BLEUCIEL',1,6,49,0,-22,8,0]);
constellation.push(['Grande Ourse','Grande Ourse','BLEUCIEL',1,11,18,0,50,43,0]);
//constellation.push(['Grue','Grue','BLEUCIEL',1,22,27,0,-46,21,0]);
constellation.push(['Hercule','Hercule','BLEUCIEL',1,17,23,0,27,29,0]);
//constellation.push(['Horloge','Horloge','BLEUCIEL',1,3,16,0,-53,20,1]);
constellation.push(['Hydre','Hydre','BLEUCIEL',1,11,36,0,-14,31,2]);
//constellation.push(['Hydre mâle','Hydre mâle','BLEUCIEL',1,2,20,0,-69,57,3]);
//constellation.push(['Indien','Indien','BLEUCIEL',1,21,58,0,-59,42,4]);
//constellation.push(['Lezard','Lezard','BLEUCIEL',1,22,27,0,46,2,5]);
//constellation.push(['Licorne','Licorne','BLEUCIEL',1,7,3,0,0,16,6]);
//constellation.push(['Lièvre','Lièvre','BLEUCIEL',1,5,33,0,-19,2,7]);
//constellation.push(['Loup','Loup','BLEUCIEL',1,15,13,0,-42,42,9]);
constellation.push(['Lynx','Lynx','BLEUCIEL',1,7,59,0,47,28,10]);
constellation.push(['Lyre','Lyre','BLEUCIEL',1,18,51,0,36,41,11]);
//constellation.push(['Machine','Machine','BLEUCIEL',1,10,16,0,-32,29,12]);
//constellation.push(['Microscope','Microscope','BLEUCIEL',1,20,57,0,-36,16,13]);
//constellation.push(['Mouche','Mouche','BLEUCIEL',1,12,35,0,-70,9,14]);
//constellation.push(['Octant','Octant','BLEUCIEL',1,23,0,0,-82,9,15]);
//constellation.push(['Oiseau de paradis','Oiseau de paradis','BLEUCIEL',1,16,8,0,-75,18,16]);
//constellation.push(['Ophiuchus','Ophiuchus','BLEUCIEL',1,17,23,0,-7,54,17]);
constellation.push(['Orion','Orion','BLEUCIEL',1,5,34,0,5,56,18]);
//constellation.push(['Paon','Paon','BLEUCIEL',1,19,36,0,-65,46,19]);
constellation.push(['Pegase','Pegase','BLEUCIEL',1,22,41,0,19,27,20]);
//constellation.push(['Peintre','Peintre','BLEUCIEL',1,5,42,0,-53,28,21]);
constellation.push(['Persee','Persee','BLEUCIEL',1,3,10,0,45,0,22]);
//constellation.push(['Petit Cheval','Petit Cheval','BLEUCIEL',1,21,11,0,7,45,23]);
//constellation.push(['Petit Chien','Petit Chien','BLEUCIEL',1,7,39,0,6,25,24]);
//constellation.push(['Petit Lion','Petit Lion','BLEUCIEL',1,10,14,0,32,8,25]);
//constellation.push(['Petit Renard','Petit Renard','BLEUCIEL',1,20,13,0,24,26,26]);
constellation.push(['Petite Ourse','Petite Ourse','BLEUCIEL',1,15,0,0,77,41,27]);
//constellation.push(['Phenix','Phenix','BLEUCIEL',1,0,55,0,-48,34,28]);
//constellation.push(['Poisson austral','Poisson austral','BLEUCIEL',1,22,17,0,-30,38,29]);
//constellation.push(['Poisson volant','Poisson volant','BLEUCIEL',1,7,47,0,-69,48,30]);
//constellation.push(['Poupe','Poupe','BLEUCIEL',1,7,15,0,-31,10,32]);
//constellation.push(['Règle','Règle','BLEUCIEL',1,15,54,0,-51,21,33]);
//constellation.push(['Reticule','Reticule','BLEUCIEL',1,3,55,0,-59,59,34]);
//constellation.push(['Sculpteur','Sculpteur','BLEUCIEL',1,0,26,0,-32,5,37]);
//constellation.push(['Sextant','Sextant','BLEUCIEL',1,10,16,0,-2,36,38]);
//constellation.push(['Table','Table','BLEUCIEL',1,5,24,0,-77,30,39]);
//constellation.push(['Telescope','Telescope','BLEUCIEL',1,23,46,0,-65,49,41]);
constellation.push(['Toucan','Toucan','BLEUCIEL',1,2,11,0,31,28,42]);
//constellation.push(['Triangle','Triangle','BLEUCIEL',1,16,4,0,32,23,43]);
constellation.push(['Triangaustral','Triangaustral','BLEUCIEL',1,19,19,0,-51,2,44]);
//constellation.push(['Voiles','Voiles','BLEUCIEL',1,9,34,0,-47,10,47]);
constellation.push(['Aigle','Aigle','BLEUCIEL',1,19,40,0,3,24,0]);
  
  
  calcule_Constellations();
}
