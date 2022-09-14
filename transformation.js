// coordonnées équatorial type RA/DEC vers coordonnées horitzontale selon le point d'observation (lieu/temps )


 d2r = PI / 180
 r2d = 180 / PI;


function e2hDEGRE (RA,DEC){ // retourne les coordonnées horizontales az/alt d'un point en coordonnées équatoriale asc/dec

//   L'observateur est ici :   
  lng = -lonObs / d2r
  lat =  latObs / d2r
  
  
 azimuthDEGRE = 0 ;
 altitudeDEGRE = 0;
 coordHorDEGRE = new Array();
  
 GST = ts1

// VERIFIER HA car la position de RA dans la formule fait beaucoup varier le résultat : 
// en fonction des radians ou des degres ou de l'heure minute...
  HA = 15 * (GST + HEURE + (MINUTE / 60)) - RA + lng;
// HA *= -1;
  HA *= d2r
  
  lat *= d2r
  DEC *= d2r
  
  l_diviseur = cos(HA) * sin(lat) - tan(DEC) * cos(lat); 
  azimuthDEGRE  = r2d *atan(sin(HA) / l_diviseur) ;

  altitudeDEGRE = r2d * asin(   sin(DEC ) * sin(lat )  +  cos(DEC ) * cos(HA ) * cos(lat )   );  
    
 if (l_diviseur > 0)    azimuthDEGRE += 180 ; 
 if (azimuthDEGRE > 360) azimuthDEGRE -= 360;
  
  altitudeDEGRE +=90;
  azimuthDEGRE += 180;
  
//  print (" RA : " + RA  + " / HA : " + Math.floor(HA) +  " / azimuthDEGRE : " + Math.floor(azimuthDEGRE)  )
  coordHorDEGRE.push(azimuthDEGRE,altitudeDEGRE) ;
  return coordHorDEGRE; 
  }


function egoEtoileDegre(RA,DEC){
  //1. transforme les coordonnées équatoriales en horiztonales selon la position et l'heure.
  coord = e2hDEGRE (RA,DEC);
  //2. transformation en egonométrie
  vertexEgoPolaire(coord.x, coord.y);
  
}

function DMStoA(d,m,s){  return (  d + m / 60 + s / 3600);}
function HMStoA (h,m,s){    return ( 360/24 * h + 360/24/60*m +  360/24/60/60*s );  }
