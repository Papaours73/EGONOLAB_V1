// BILBIOTHEQUE DE DESSIN DU TEXTE


function lettrePolaireDegre(t,angle,hauteur){
  textAlign(CENTER);
  rotate(angle/180*PI)   
  translate(0,hauteur)
     rotate(PI);
      text(t,0,0);
     rotate(-PI);
    translate (0,-hauteur);
 rotate(-angle/180*PI)
textAlign(LEFT);
  }



function textePolaireDegre(t,angle,hauteur,tailleFont){
  
  tableauTexte = new Array();
  textSize(tailleFont);
  
  textAlign(CENTER);
  tableauTexte = t.split("");
  
  longueurTexte = tableauTexte.length;
  largeurCaratere = tailleFont * 0.65;
  mesureTexte = longueurTexte * largeurCaratere ; // la taille graphique de la chaine de caractere

  mesureAngle = mesureTexte * 360 / (2*PI* hauteur) ; // la variation angulaire sur le dessin en DEGRE
  mesureAngleRadian = mesureAngle / 180 * PI;
  pasAngleRADIAN = (mesureAngle / longueurTexte) / 180 * PI ; // l'incrément angulaire en RADIAN
  rotate(angle/180*PI)   // l'axe du texte
    rotate (- mesureAngleRadian / 2) // déplacement au début
      for (i = 0 ; i < longueurTexte ; i++){
        rotate (pasAngleRADIAN * i);
          translate(0,hauteur)
          rotate(PI);
            text(""+tableauTexte[i],0,0);
          rotate(-PI);
         translate (0,-hauteur);
        rotate (-pasAngleRADIAN * i);
       }
 rotate ( mesureAngleRadian / 2) // déplacement au début     
 rotate(-angle/180*PI)// remise à zero de l'axe du texte
  
textAlign(LEFT);
  
  
  }