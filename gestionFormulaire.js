function choixAffichageAstres(){
   calque[getChoix('Planetes')][1]     = document.querySelector('#planet:checked');
   calque[getChoix('Zodiaque')][1]     = document.querySelector('#zodiac:checked');
     calque[getChoix('Constellations')][1] = document.querySelector('#constellations:checked');
}  

function choixAffichage(){

  
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    print("Geolocation is not supported by this browser.");
  }
  recupereFormulaire();
  recupereFormulaire();

}
/**
function showPosition(position) {
  document.forms["formulaire"].elements["latitude"].value = Math.trunc(position.coords.latitude*1000)/1000;
  document.forms["formulaire"].elements["longitude"].value = Math.trunc(position.coords.longitude*1000)/1000;
}
*/


function now(){
  d = new Date();
  jour = d.getDate();
  if (jour < 10){jour = "0" + jour;}
  mois = d.getMonth() + 1;
  if (mois < 10){mois = "0" + mois;}

  document.forms["formulaire"].elements["date"].value = ""+ jour + "/" + mois + "/" + d.getFullYear();
   document.forms["formulaire"].elements["time"].value = d.getHours()+":"+d.getMinutes();
  recupereFormulaire();
  
}

function recupereFormulaire() {

    formulaireCity = document.forms["formulaire"].elements["city"].value;
    formulaireLongitude = document.forms["formulaire"].elements["longitude"].value;
    formulaireLatitude = document.forms["formulaire"].elements["latitude"].value;
   

    //1. rég nom et le titre
   // texteTitre = dateToText(egoDate) + " / " + egoDate.getHours() + ":" + egoDate.getMinutes() ;
 // hemisphere = "N";
  
  //2. Ajutement du texte de localisation
  texteObsLatitude = obsLatitude ;
  texteObsLongitude = obsLongitude;
  if (obsLatitude > 0){texteObsLatitude = obsLatitude + "°N";}
  if (obsLatitude < 0){texteObsLatitude = - obsLatitude + "°S";}
  if (obsLatitude == 0){hemisphere = "°";}
  if (obsLongitude >= 0){texteObsLongitude = obsLongitude + "°E";}
  if (obsLongitude < 0){texteObsLongitude = -obsLongitude + "°O";}
  
  texteSousTitre = texteObsLongitude +" - "+ texteObsLatitude ;
    
  
  //2. régler la date et l'heure
 // d = split(formulaireDate,"/");
//  t = split(formulaireTime,":")
//  egoDateDisplay = new Date(d[2], d[1]-1, d[0], t[0], t[1], 0, 0);
//  egoDate = ajusteHeure(egoDateDisplay);

  //3. régler la position
  obsLongitude = Number(formulaireLongitude);
  obsLatitude = Number(formulaireLatitude);
  maPositionLatitude = obsLatitude;
  
   //4. regler le VOYAGE
//  utilisateurVoyage = formulaireVoyage;
  
}



function menuVille() {	
		cityName = document.forms["formulaire"].elements["city"].value;
		idxListe = document.forms["formulaire"].elements["city"].selectedIndex;
		strLAT = "";
		strLONG = "";

		switch (idxListe) {
		case 1:
			// Coppenhage___ DANEMARK
			strLONG = "12.56";
			strLAT = "55.67";
			break;
		case 2:
			// Ajaccio___________ FRANCE (20)
			strLONG = "8.44";
			strLAT = "41.55";
			break;
		case 3:
			// Amiens____________ FRANCE (80)
			strLONG = "2.18";
			strLAT = "49.54";
			break;
		case 4:
			// Angers____________ FRANCE (49)
			strLONG = "-0.33";
			strLAT = "47.28";
			break;
		case 5:
			// Angoul�me_________ FRANCE (16)
			strLONG = "0.09";
			strLAT = "45.39";
			break;
		case 6:
			// Avignon___________ FRANCE (84)
			strLONG = "4.49";
			strLAT = "43.57";
			break;
		case 7:
			// Bastia____________ FRANCE (20)
			strLONG = "9.27";
			strLAT = "42.42";
			break;
		case 8:
			// Besan�on__________ FRANCE (25)
			strLONG = "6.02";
			strLAT = "47.15";
			break;
		case 9:
			// Bordeaux__________ FRANCE (33)
			strLONG = "-0.34";
			strLAT = "44.51";
			break;
		case 10:
			// Bourges___________ FRANCE (18)
			strLONG = "2.24";
			strLAT = "47.05";
			break;
		case 11:
			// Brest_____________ FRANCE (29)
			strLONG = "-4.29";
			strLAT = "48.23";
			break;
		case 12:
			// Caen______________ FRANCE (14)
			strLONG = "-0.22";
			strLAT = "49.11";
			break;
		case 13:
			// Calais____________ FRANCE (62)
			strLONG = "1.52";
			strLAT = "50.57";
			break;
		case 14:
			// Clermont-Ferrand__ FRANCE (63)
			strLONG = "3.05";
			strLAT = "45.47";
			break;
		case 15:
			// Dijon_____________ FRANCE (21)
			strLONG = "5.02";
			strLAT = "47.19";
			break;
		case 16:
			// Grenoble__________ FRANCE (38)
			strLONG = "5.43";
			strLAT = "45.11";
			break;
		case 17:
			// La Rochelle_______ FRANCE (17)
			strLONG = "-1.09";
			strLAT = "46.10";
			break;
		case 18:
			// Le Havre__________ FRANCE (76)
			strLONG = "0.08";
			strLAT = "49.30";
			break;
		case 19:
			// Lille_____________ FRANCE (59)
			strLONG = "3.03";
			strLAT = "50.38";
			break;
		case 20:
			// Limoges___________ FRANCE (87)
			strLONG = "1.16";
			strLAT = "45.50";
			break;
		case 21:
			// Lyon______________ FRANCE (69)
			strLONG = "4.50";
			strLAT = "45.46";
			break;
		case 22:
			// Marseille_________ FRANCE (13)
			strLONG = "5.24";
			strLAT = "43.18";
			break;
		case 23:
			// Metz______________ FRANCE (57)
			strLONG = "6.11";
			strLAT = "49.07";
			break;
		case 24:
			// Montpellier_______ FRANCE (34)
			strLONG = "3.52";
			strLAT = "43.37";
			break;
		case 25:
			// Mulhouse__________ FRANCE (68)
			strLONG = "7.20";
			strLAT = "47.45";
			break;
		case 26:
			// Nancy_____________ FRANCE (54)
			strLONG = "6.10";
			strLAT = "48.41";
			break;
		case 27:
			// Nantes____________ FRANCE (44)
			strLONG = "-1.33";
			strLAT = "47.13";
			break;
		case 28:
			// Nice______________ FRANCE (06)
			strLONG = "7.16";
			strLAT = "43.42";
			break;
		case 29:
			// N�mes_____________ FRANCE (30)
			strLONG = "4.22";
			strLAT = "43.50";
			break;
		case 30:
			// Orl�ans___________ FRANCE (45)
			strLONG = "1.54";
			strLAT = "47.54";
			break;
		case 31:
			// Paris_____________ FRANCE (75)
			strLONG = "2.21";
			strLAT = "48.52";
			break;
		case 32:
			// Perpignan_________ FRANCE (66)
			strLONG = "2.54";
			strLAT = "42.42";
			break;
		case 33:
			// Poitiers__________ FRANCE (86)
			strLONG = "0.21";
			strLAT = "46.35";
			break;
		case 34:
			// Quimper___________ FRANCE (29)
			strLONG = "-4.07";
			strLAT = "47.60";
			break;
		case 35:
			// Reims_____________ FRANCE (51)
			strLONG = "4.02";
			strLAT = "49.15";
			break;
		case 36:
			// Rennes____________ FRANCE (35)
			strLONG = "-1.41";
			strLAT = "48.06";
			break;
		case 37:
			// Rouen_____________ FRANCE (76)
			strLONG = "1.05";
			strLAT = "49.26";
			break;
		case 38:
			// Saint-�tienne_____ FRANCE (42)
			strLONG = "4.23";
			strLAT = "45.26";
			break;
		case 39:
			// Strasbourg________ FRANCE (67)
			strLONG = "7.45";
			strLAT = "48.35";
			break;
		case 40:
			// Toulon____________ FRANCE (83)
			strLONG = "5.56";
			strLAT = "43.08";
			break;
		case 41:
			// Toulouse__________ FRANCE (31)
			strLONG = "1.27";
			strLAT = "43.36";
			break;
		case 42:
			// Tours_____________ FRANCE (37)
			strLONG = "0.41";
			strLAT = "47.24";
			break;
		case 43:
			// Valence___________ FRANCE (26)
			strLONG = "4.54";
			strLAT = "44.56";
			break;
                    
        case 44:
			// Pôle Nord
			strLONG = "0";
			strLAT = "90";
			break;
        case 45:
			// Pôle Sud
			strLONG = "0";
			strLAT = "-90";
			break;
            
        case 46:
		// Equateur
			strLONG = "0";
			strLAT = "0";
			break;
            
         case 47:
		// Matera
			strLONG = "16.6059789";
			strLAT = "40.6704217";
			break;    

         case 48 : 
            // SYDNEY
            strLONG = "151.21";
            strLAT = "-33.5"; 
            break;    
            
          case 49 : 
            // Ciutadella (Espagne)
            strLONG = "3.5";
            strLAT = "40.0"; 
            break;    
            
		default: 
			// Marseille_________ FRANCE (13)
			strLONG = "5.24";
			strLAT = "43.18";
			break;
		}
		
		document.forms["formulaire"].elements["latitude"].value = strLAT; 
		document.forms["formulaire"].elements["longitude"].value = strLONG; 		recupereFormulaire();
  recupereFormulaire();
	}