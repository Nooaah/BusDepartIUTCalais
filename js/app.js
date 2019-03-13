function actualiser()
{
  var now = new Date();

  var heure = now.getHours();
  var minute = now.getMinutes();

  var heureActuelle = heure;
  var minuteActuelle = minute;

  var divHoraire = document.getElementById('horaire');
  var divSubtitle = document.getElementById('subtitle');
  var tableHoraires = document.getElementById('tableHoraires');


  var trouve = 0;

  ajaxGet("data/horaires.json", function (reponse) 
  {
    reponse = JSON.parse(reponse);
    longueur = reponse.length;

    if (heureActuelle > reponse[longueur - 1].heures || (heureActuelle == reponse[longueur - 1].heures && minuteActuelle > reponse[longueur - 1].minutes)) 
    {
      divSubtitle.innerHTML = `Il n'y a plus de bus à cette heure...<br>Le bus arrivera demain à `;
      divHoraire.textContent = `${reponse[0].heures}H${reponse[0].minutes}`;
      divHoraire.style.fontSize = "100px";
      divHoraire.style.marginTop = "10px";
      trouve = 1
    }
    reponse.forEach(function (horaire) 
    {
      if (heureActuelle <= horaire.heures && trouve == 0) 
      {
        if (heureActuelle == horaire.heures) 
        {
          if (minuteActuelle <= horaire.minutes) 
          {
            divHoraire.textContent = `${horaire.heures}H${horaire.minutes}`;
            divHoraire.style.fontSize = "100px";
            divHoraire.style.marginTop = "10px";
            trouve = 1
          }
        }
        else 
        {
          divSubtitle.innerHTML = "Il est encore tôt ! Le bus arrivera à "
          divHoraire.textContent = `${horaire.heures}H${horaire.minutes}`;
          divHoraire.style.fontSize = "100px";
          divHoraire.style.marginTop = "10px";
          trouve = 1
        }
      }

      if (buttonActive == 1)
      {
        tableHoraires.innerHTML += `<tr><td>${horaire.heures}H${horaire.minutes}</td></tr>`;
      }


    });
  });

}


var buttonActive = 0;

var voirTableau = document.getElementById('voirTableau');
var styleVoirTableau = getComputedStyle(voirTableau);
voirTableau.addEventListener("click", function() {
  if (buttonActive == 0)
  {
    buttonActive = 1;
  }
  else
  {
    buttonActive = 0;
  }
  tableHoraires.innerHTML = '';
  actualiser()
});

actualiser()

