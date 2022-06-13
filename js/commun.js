/*_________________________________________________________________________________________________________
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


███████╗███████╗████████╗ ██████╗██╗  ██╗
██╔════╝██╔════╝╚══██╔══╝██╔════╝██║  ██║
█████╗  █████╗     ██║   ██║     ███████║
██╔══╝  ██╔══╝     ██║   ██║     ██╔══██║
██║     ███████╗   ██║   ╚██████╗██║  ██║
╚═╝     ╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
                                         

Fait un fetch sur l'URL permettant de recuperer les objets renseignés sur le CMS headless " directus"
Récupére les objets au format json

Cette fois ci un seul tableau est utilisé pour récupérer les datas permettant l'affichage de la nav
et du contenu. 
												                ↓↓↓↓↓↓↓↓↓↓↓↓↓
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx		
___________________________________________________________________________________________________________*/

fetch("https://t5bx8bo2.directus.app/items/session1", {
  headers: { authorization: "bearer toto" },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data["data"]);
    /*__________________________________________________________________________
    Boucle sur le nombre d'items présents dans directus ( le nombre d'exercice ) ↓ */
    for (let i = 0; i < data["data"].length; i++) {
      /*____________________________________________________  
      Pointe sur l'id session_x correspondant à l'exercice i,
      x =  numéro de session renseigné dans directus
      Met le contenu dans la variavle getsession ↓ */

      var getsession = document.getElementById(
        `session_${data["data"][i].session}`
      );

      /*______________________________________________________________________________
        
                                MENU NAVIGATION DYNAMIQUE
												                  ↓↓↓↓	
		  _________________________________________________________________________________*/

      /*________________________________________________  
      Vérifie si le contenu dans getsession n'existe pas ↓ */
      if (!getsession) {
        console.log(`test`);
        // Création du premier li
        let li_parent_sousmenu = document.createElement("li");
        li_parent_sousmenu.setAttribute(
          "id",
          `li_parent_session_${data["data"][i].session}`
        );
        li_parent_sousmenu.setAttribute("class", "parent sousmenu");
        let getsessions = document.getElementById("sessions");

        //li_parent_sousmenu.innerHTML = "<a>li</a>";
        getsessions.insertAdjacentHTML(
          "beforeend",
          li_parent_sousmenu.outerHTML
        );

        // Création du premier a
        let a_parent_sousmenu = document.createElement("a");
        a_parent_sousmenu.setAttribute(
          "id",
          `session_${data["data"][i].session}`
        );

        a_parent_sousmenu.innerHTML = `Session ${data["data"][i].session}`;
        let get_a_parent_sousmenu = document.getElementById(
          `li_parent_session_${data["data"][i].session}`
        );
        get_a_parent_sousmenu.insertAdjacentHTML(
          "beforeend",
          a_parent_sousmenu.outerHTML
        );
        // Création du ul "sousrubrique"
        let ul_sous_rubrique = document.createElement("ul");
        ul_sous_rubrique.setAttribute(
          "id",
          `sousrubrique_${data["data"][i].session}`
        );
        ul_sous_rubrique.setAttribute("class", "sousrubrique");

        //ul_sous_rubrique.innerHTML = "ul";
        let get_ul_sous_rubrique = document.getElementById(
          `li_parent_session_${data["data"][i].session}`
        );
        get_ul_sous_rubrique.insertAdjacentHTML(
          "beforeend",
          ul_sous_rubrique.outerHTML
        );
      }

      // Création du li "sousrubrique"
      let exo = document.createElement("li");
      exo.setAttribute(
        "id",
        `exo_${data["data"][i].session}_${data["data"][i].exercice}`
      );
      exo.setAttribute(
        "class",
        `exo_${data["data"][i].session}_${data["data"][i].exercice}`
      );
      exo.setAttribute("directus_id", `${data["data"][i].id}`);
      exo.innerHTML = `<a>Ex ${data["data"][i].exercice}</a>`;

      let get_exo = document.getElementById(
        `sousrubrique_${data["data"][i].session}`
      );
      get_exo.insertAdjacentHTML("beforeend", exo.outerHTML);

      /*______________________________________________________________________________
        
                        Préparation à l'ajout de nouveau contenu:

		                      Création des éléments dans les const
                Ajout du contenu récupéré en HTML dans les éléments des const
												                  ↓↓↓↓	
		  _________________________________________________________________________________*/
      // exercice_num ↓
      const exercice_num = document.createElement("p");
      exercice_num.innerHTML = data["data"][i].exercice_numero;

      // enonce_exo ↓
      const enonce_exo = document.createElement("p");
      enonce_exo.innerHTML = data["data"][i].enonce_titre;

      // pseudo_algo ↓
      const pseudo_code = document.createElement("p");
      pseudo_code.innerHTML = data["data"][i].pseudo_algo;

      // javascript ↓
      // const js = document.createElement("p");
      // js.innerHTML = data["data"][i].javascript;

      // jquery ↓
      const jq = document.createElement("p");
      jq.textContent = data["data"][i].jquery;

      // jquery ↓
      const php = document.createElement("p");
      php.textContent = data["data"][i].php;

      // toggle_inputs ↓
      let toggle_input1 = data["data"][i].toggle_input1;
      let toggle_input2 = data["data"][i].toggle_input2;
      let toggle_input3 = data["data"][i].toggle_input3;
      let toggle_input4 = data["data"][i].toggle_input4;

      // resultatjs ↓
      const resultatjs = document.createElement("p");

      // Envoie le message d'erreur si le js renseigné dans directus n'est pas executable ↓
      try {
        resultatjs.textContent = data["data"][i].javascript;
      } catch (error) {
        console.error(error);
        resultatjs.textContent = error.message;
      }

      /*_________________________________________________________
      Récupére l'id du bouton correspondant au numéro de session 
      et d'exo récupéré dans directus ↓ */
      var getexobouton = document.getElementById(
        `exo_${data["data"][i].session}_${data["data"][i].exercice}`
      );

      getexobouton.addEventListener("click", show);
      /*

      ███████╗██╗  ██╗ ██████╗ ██╗    ██╗
      ██╔════╝██║  ██║██╔═══██╗██║    ██║
      ███████╗███████║██║   ██║██║ █╗ ██║
      ╚════██║██╔══██║██║   ██║██║███╗██║
      ███████║██║  ██║╚██████╔╝╚███╔███╔╝
      ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝ 
                                   
      */
      function show(e) {
        /*______________________________________________________________________________
		
                                      DOGE
												                ↓		
		    _________________________________________________________________________________*/

        let get_doge = document.getElementById("doge");
        get_doge.style.transition = "all 4s cubic-bezier(.54,.06,1,.14)";
        get_doge.style.left = "100%";
        setTimeout(function () {
          get_doge.style.transition = "none";
          get_doge.style.left = "-30%";

          setTimeout(function () {
            get_doge.style.transition = "all 3s ease-out";
            get_doge.style.left = "-100px";
          }, 1000);
        }, 4000);

        /*______________________________________________________________________________
		
		                                  INPUTS
												                ↓		
		    _________________________________________________________________________________*/

        var el_inputs = document.getElementById("inputs");
        el_inputs.innerHTML = "";

        var el_contenu_execution = document.getElementById("contenu_execution");
        el_contenu_execution.innerHTML = "";

        console.log("input_1=" + toggle_input1);
        if (toggle_input1 == true) {
          const input_1 = document.createElement("input");
          input_1.setAttribute("id", "input_1");
          input_1.placeholder = "Input 1";
          el_inputs.appendChild(input_1);
        }

        console.log("input_2=" + toggle_input2);
        if (toggle_input2 == true) {
          const input_2 = document.createElement("input");
          input_2.setAttribute("id", "input_2");
          input_2.placeholder = "Input 2";
          el_inputs.appendChild(input_2);
        }

        console.log("input_3=" + toggle_input3);
        if (toggle_input3 == true) {
          const input_3 = document.createElement("input");
          input_3.setAttribute("id", "input_3");
          input_3.placeholder = "Input 3";
          el_inputs.appendChild(input_3);
        }

        console.log("input_4=" + toggle_input4);
        if (toggle_input4 == true) {
          const input_4 = document.createElement("input");
          input_4.setAttribute("id", "input_4");
          input_4.placeholder = "Input 4";
          el_inputs.appendChild(input_4);
        }

        /*______________________________________________________________________________
		
		    Retire l'ancien contenu de --  id="exo_numero" -- et rajoute le nouveau fetché
												                ↓		
		    _________________________________________________________________________________*/

        var el_exo_numero = document.getElementById("exo_numero");

        /* 1ère méthode trouvé pour retirer le contenu enfant de l'ID sélectionné */
        while (el_exo_numero.firstChild) {
          el_exo_numero.removeChild(el_exo_numero.firstChild);
        }

        /* 1ère méthode pour ajouter le contenu dans l'enfant de l'ID sélectionné */
        exo_numero.insertAdjacentHTML("afterbegin", exercice_num.outerHTML);

        /*______________________________________________________________________________
		
		    Retire l'ancien contenu de --  id="enonce_titre" -- et rajoute le nouveau fetché
												                ↓		
		    _________________________________________________________________________________*/
        var el_enonce_titre = document.getElementById("enonce_titre");

        /* Meilleur méthode pour retirer le contenu enfant de l'ID sélectionné */
        el_enonce_titre.innerHTML = "";

        /* 2eme méthode pour ajouter le contenu dans l'enfant de l'ID sélectionné */
        enonce_titre.appendChild(enonce_exo);

        /*______________________________________________________________________________
		
		    Retire l'ancien contenu de --  id="pseudo_code_contenu" -- et rajoute le nouveau fetché
												                ↓		
		    _________________________________________________________________________________*/

        var el_pseudo_code_contenu = document.getElementById(
          "pseudo_code_contenu"
        );
        el_pseudo_code_contenu.innerHTML = "";

        /* 3eme méthode pour ajouter le contenu dans l'enfant de l'ID sélectionné 
          append permet de conserver la liason de la variable en faisant l'insertion de l'objet "js" ↓ */
        el_pseudo_code_contenu.append(pseudo_code);

        /*______________________________________________________________________________
	    	Retire l'ancien contenu de --  id="pseudo_code_contenu" -- au lancement de show()
		
		    1)	Attend une action sur le bouton "bouton_js" pour lancer la fonction code_js()
			      Retire l'ancien contenu au lancement de code_js()
			      Rajoute le nouveau fetché

		    2)	Attend une action sur le bouton "bouton_jq" pour lancer la fonction code_jq()
		    3)	Attend une action sur le bouton "bouton_php" pour lancer la fonction code_php()
		        Retire l'ancien contenu de --  id="pseudo_code_contenu" -- 
		        Rajoute le nouveau fetché
												                ↓	
		    _________________________________________________________________________________*/
        let el_js = document.getElementById("contenu_code");
        el_js.innerHTML = "";
        let phpchecked = "bouton_PHP_no_checked";
        let jschecked = "bouton_JS_no_checked";
        let jqchecked = "bouton_JQ_no_checked";

        /*		
		    1)  ↓																					
		    */
        var gEBId_bouton_JS = document.getElementById("bouton_js");
        gEBId_bouton_JS.addEventListener("click", code_js);

        function code_js() {
          jschecked = "bouton_JS_checked";
          phpchecked = "bouton_PHP_no_checked";
          el_js.innerHTML = "";
          el_js_content = data["data"][i].javascript;
          el_js.append(el_js_content);
          console.log(phpchecked);
          document.getElementById("contenu_execution");
          el_contenu_execution.innerHTML = "";
          hljs.highlightAll();
          return jschecked;
        }

        /*		
		    2)  ↓																					
		    */
        var gEBId_bouton_JQ = document.getElementById("bouton_jq");
        gEBId_bouton_JQ.addEventListener("click", code_jq);

        function code_jq() {
          jqchecked = "bouton_JQ_checked";
          phpchecked = "bouton_PHP_no_checked";
          el_js.innerHTML = "";
          el_js.append(jq);
          console.log(phpchecked);
          document.getElementById("contenu_execution");
          el_contenu_execution.innerHTML = "";
          hljs.highlightAll();
          return jqchecked;
        }

        /*		
		    3)  ↓																			
		    */

        let elementClique = e.currentTarget.getAttribute("directus_id");

        console.log("directus_id=" + elementClique);

        var gEBId_bouton_PHP = document.getElementById("bouton_php");
        gEBId_bouton_PHP.addEventListener("click", code_php);

        function code_php() {
          phpchecked = "bouton_PHP_checked";
          el_js.innerHTML = "";
          el_js.append(php);
          document.getElementById("contenu_execution");
          el_contenu_execution.innerHTML = "";
          console.log(phpchecked);
          hljs.highlightAll();
          return phpchecked;
        }

        /*______________________________________________________________________________
		
		    1)	Clone le bouton "bouton_exe"
		    2)	Attend une action sur le bouton "bouton_exe" pour lancer la fonction resultat
		    3)	Retire l'ancien contenu au lancement de resultat() 
			      Rajoute le nouveau contenu fetché en fonction du nombre d'inputs
												                ↓		
		    _________________________________________________________________________________*/
        /*
        1)  ↓	
        */

        var gEBId_bouton_exe = document.getElementById("bouton_exe");
        var newbouton = gEBId_bouton_exe.cloneNode(true);
        gEBId_bouton_exe.replaceWith(newbouton);

        /*
        2)  ↓	
        */

        newbouton.addEventListener("click", resultat);

        /*
        3)  ↓	
        */

        /*

        ██████╗ ███████╗███████╗██╗   ██╗██╗  ████████╗ █████╗ ████████╗
        ██╔══██╗██╔════╝██╔════╝██║   ██║██║  ╚══██╔══╝██╔══██╗╚══██╔══╝
        ██████╔╝█████╗  ███████╗██║   ██║██║     ██║   ███████║   ██║   
        ██╔══██╗██╔══╝  ╚════██║██║   ██║██║     ██║   ██╔══██║   ██║   
        ██║  ██║███████╗███████║╚██████╔╝███████╗██║   ██║  ██║   ██║   
        ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝  ╚═╝   ╚═╝   
                                                                        
        */

        function resultat() {
          console.log(phpchecked);
          console.log(toggle_input1);
          console.log(toggle_input2);
          console.log(toggle_input3);
          console.log(toggle_input4);
          /*___________________________________________________________________________________________________
            *****************************************************************************************************                                                                                                                                                                  
                                                     ____  _   _ ____  
                                                    |  _ \| | | |  _ \ 
                                                    | |_) | |_| | |_) |
                                                    |  __/|  _  |  __/ 
                                                    |_|   |_| |_|_|                                                                            

                                                        ↓↓↓↓↓↓↓↓↓↓	
            ___________________________________________________________________________________________________                                                 
          */
          /*
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          1                                                                                             1
          1                                           1 INPUT VALUE                                     1
          1                                                                                             1
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          */
          if (
            phpchecked == "bouton_PHP_checked" &&
            toggle_input1 == true &&
            toggle_input2 == false &&
            toggle_input3 == false &&
            toggle_input4 == false
          ) {
            console.log("1 values");
            let input_value1 = document.getElementById("input_1").value;
            //let elementClique = e.currentTarget.getAttribute("directus_id");
            fetch(
              `http://localhost/algo/php/commun.php?id=${elementClique}&input_value1=${input_value1}`
            )
              .then((response) => {
                return response.text();
              })

              .then((data) => {
                console.log(data);
                var el_contenu_execution =
                  document.getElementById("contenu_execution");
                el_contenu_execution.innerHTML = "";
                const phpdata = document.createElement("p");
                phpdata.innerHTML = "";
                phpdata.innerHTML = data;
                contenu_execution.append(phpdata);
              });
            /*
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          1                                                                                             1
          1                                           2 INPUT VALUE                                     1
          1                                                                                             1
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          */
          } else if (
            phpchecked == "bouton_PHP_checked" &&
            toggle_input1 == true &&
            toggle_input2 == true &&
            toggle_input3 == false &&
            toggle_input4 == false
          ) {
            console.log("2 values");

            let input_value1 = document.getElementById("input_1").value;
            let input_value2 = document.getElementById("input_2").value;

            fetch(
              `http://localhost/algo/php/commun.php?id=${elementClique}&input_value1=${input_value1}&input_value2=${input_value2}`
            )
              .then((response) => {
                return response.text();
              })

              .then((data) => {
                console.log(data);
                var el_contenu_execution =
                  document.getElementById("contenu_execution");
                el_contenu_execution.innerHTML = "";
                const phpdata = document.createElement("p");
                phpdata.innerHTML = "";
                phpdata.innerHTML = data;
                contenu_execution.append(phpdata);
              });
            /*
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          1                                                                                             1
          1                                           3 INPUT VALUE                                     1
          1                                                                                             1
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          */
          } else if (
            phpchecked == "bouton_PHP_checked" &&
            toggle_input1 == true &&
            toggle_input2 == true &&
            toggle_input3 == true &&
            toggle_input4 == false
          ) {
            console.log("3 values");

            let input_value1 = document.getElementById("input_1").value;
            let input_value2 = document.getElementById("input_2").value;
            let input_value3 = document.getElementById("input_3").value;

            fetch(
              `http://localhost/algo/php/commun.php?id=${elementClique}&input_value1=${input_value1}&input_value2=${input_value2}&input_value3=${input_value3}`
            )
              .then((response) => {
                //console.log(response);
                return response.text();
              })

              .then((data) => {
                console.log(data);

                var el_contenu_execution =
                  document.getElementById("contenu_execution");
                el_contenu_execution.innerHTML = "";
                const phpdata = document.createElement("p");
                phpdata.innerHTML = "";
                phpdata.innerHTML = data;
                contenu_execution.append(phpdata);
              });
            /*
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          1                                                                                             1
          1                                           4 INPUT VALUE                                     1
          1                                                                                             1
          1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
          */
          } else if (
            phpchecked == "bouton_PHP_checked" &&
            toggle_input1 == true &&
            toggle_input2 == true &&
            toggle_input3 == true &&
            toggle_input4 == true
          ) {
            console.log("4 values");

            let input_value1 = document.getElementById("input_1").value;
            let input_value2 = document.getElementById("input_2").value;
            let input_value3 = document.getElementById("input_3").value;
            let input_value4 = document.getElementById("input_4").value;

            fetch(
              `http://localhost/algo/php/commun.php?id=${elementClique}&input_value1=${input_value1}&input_value2=${input_value2}&input_value3=${input_value3}&input_value4=${input_value4}`
            )
              .then((response) => {
                //console.log(response);
                return response.text();
              })

              .then((data) => {
                console.log(data);

                var el_contenu_execution =
                  document.getElementById("contenu_execution");
                el_contenu_execution.innerHTML = "";
                const phpdata = document.createElement("p");
                phpdata.innerHTML = "";
                phpdata.innerHTML = data;
                contenu_execution.append(phpdata);
              });
          } else if (jschecked == "bouton_JS_checked") {
            /*___________________________________________________________________________________________________
            *****************************************************************************************************                                                                                                                                               
                                                          _ ____  
                                                         | / ___| 
                                                      _  | \___ \ 
                                                     | |_| |___) |
                                                      \___/|____/                                                                   
                                                                                                                                                                                                         
                                                        ↓↓↓↓↓↓↓↓↓↓	
            ___________________________________________________________________________________________________                                                 
          */
            // JS ET JQ
            var el_contenu_execution =
              document.getElementById("contenu_execution");
            el_contenu_execution.innerHTML = "";
            eval(data["data"][i].javascript);
          } else if (jqchecked == "bouton_JQ_checked") {
            /*___________________________________________________________________________________________________
            *****************************************************************************************************                                                                                                                                               
                                                           _  ___  
                                                          | |/ _ \ 
                                                       _  | | | | |
                                                      | |_| | |_| |
                                                       \___/ \__\_\
                                                                                                                                  
                                                        ↓↓↓↓↓↓↓↓↓↓	
            ___________________________________________________________________________________________________                                                 
          */
            // JS ET JQ
            var el_contenu_execution =
              document.getElementById("contenu_execution");
            el_contenu_execution.innerHTML = "";
            eval(data["data"][i].jquery);
          }
        }
      } // fin show
    } //fin boucle for

    /*______________________________________________________________________________
		
		                        MENU NAVIGATION DYNAMIQUE
												                ↓		
      _________________________________________________________________________________*/

    $(document).ready(function () {
      $("body").addClass("js");
      var $menu = $("#menu"),
        $menulink = $(".menubtn"),
        $menuTrigger = $(`.sousmenu > a`);

      $menulink.click(function (e) {
        e.preventDefault();
        $menulink.toggleClass("select");
        $menu.toggleClass("select");
      });

      $menuTrigger.click(function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass("select").next("ul").toggleClass("select");
      });
    });
    /*______________________________________________________________________________
		
		                                  ZOOMS
												                ↓		
      _________________________________________________________________________________
*/
    /* ZOOM Pseudo */
    let get_zoom_pseudo = document.getElementById("zoom_pseudo");
    get_zoom_pseudo.addEventListener("click", f_zoom_pseudo);
    let statu_zoom_pseudo = false;

    function f_zoom_pseudo() {
      if (statu_zoom_pseudo == false) {
        statu_zoom_pseudo = true;
        console.log("zoom");
        let get_zoom_pseudo = document.getElementById("zoom_pseudo");

        let get_pseudo_code_contenu = document.getElementById(
          "pseudo_code_contenu"
        );

        get_pseudo_code_contenu.firstChild.classList.add("zoom");
        get_zoom_pseudo.style.backgroundColor = "#F8A239";
      } else {
        statu_zoom_pseudo = false;
        console.log("dezoom");
        let get_zoom_pseudo = document.getElementById("zoom_pseudo");
        let get_pseudo_code_contenu = document.getElementById(
          "pseudo_code_contenu"
        );
        get_pseudo_code_contenu.firstChild.classList.remove("zoom");
        get_zoom_pseudo.style.backgroundColor = "";
      }
    }

    /* ZOOM enonce */
    let get_zoom_enonce = document.getElementById("zoom_enonce");
    get_zoom_enonce.addEventListener("click", f_zoom_enonce);
    let statu_zoom_enonce = false;

    function f_zoom_enonce() {
      if (statu_zoom_enonce == false) {
        statu_zoom_enonce = true;
        console.log("zoom");
        let get_zoom_enonce = document.getElementById("zoom_enonce");

        let get_enonce_titre = document.getElementById("enonce_titre");

        get_enonce_titre.firstChild.classList.add("zoom");
        get_zoom_enonce.style.backgroundColor = "#F8A239";
      } else {
        statu_zoom_enonce = false;
        console.log("dezoom");
        let get_zoom_enonce = document.getElementById("zoom_enonce");
        let get_enonce_titre = document.getElementById("enonce_titre");
        get_enonce_titre.firstChild.classList.remove("zoom");
        get_zoom_enonce.style.backgroundColor = "";
      }
    }
    /* ZOOM code */
    let get_zoom_code = document.getElementById("zoom_code");
    get_zoom_code.addEventListener("click", f_zoom_code);
    let statu_zoom_code = false;

    function f_zoom_code() {
      if (statu_zoom_code == false) {
        statu_zoom_code = true;
        console.log("zoom");
        let get_zoom_code = document.getElementById("zoom_code");

        let get_contenu_code = document.getElementById("contenu_code");

        get_contenu_code.classList.add("zoom");
        get_zoom_code.style.backgroundColor = "#F8A239";
      } else {
        statu_zoom_code = false;
        console.log("dezoom");
        let get_zoom_code = document.getElementById("zoom_code");
        let get_contenu_code = document.getElementById("contenu_code");
        get_contenu_code.classList.remove("zoom");
        get_zoom_code.style.backgroundColor = "";
      }
    }
  }); // fin then

/*_________________________________________________________________________________________________________
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Fait un fetch sur l'URL du fichier PHP 
Permet de recuperer les objets "PHP" renseignés sur le CMS headless " directus"
Récupére les objets au format json 
												                ↓↓↓↓↓↓↓↓↓↓↓↓↓
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx		
___________________________________________________________________________________________________________*/

/*_________________________________________________________________________________________________________
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    1ére solution trouvé pour faire un affichage dynamique du contenu et de la nav grace à directus
    
    Le fait d'avoir fait un tableau pour le contenu et un autre pour la nav a été bloquant pour récupérer
    les variables du bouton x et z à ma fonction show()
    Fait un fetch sur l'URL permettant de recuperer les objets renseignés sur le CMS headless " directus"
    Récupére les objets au format json 
												                ↓
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx		
___________________________________________________________________________________________________________*/

/*	
	
	fetch("https://t5bx8bo2.directus.app/items/session1")
	.then((response) => response.json())
	.then((data) => 
	{  for (let u=0; u<data["data"].length; u++) 		//	NOMBRE D'EXERCICES TOTAL
	{ 
		j=u+1;											
		console.log(data["data"]);
		console.log(u);
		
		// exercice_num
		const exercice_num = document.createElement('p');
		exercice_num.innerHTML = data["data"][u].exercice_numero;
		
		// enonce_exo
		const enonce_exo = document.createElement('p');
		enonce_exo.innerHTML = data["data"][u].enonce_titre;       
		
		// pseudo_algo
		const pseudo_code = document.createElement('p');
		pseudo_code.innerHTML = data["data"][u].pseudo_algo;
		
		// javascript
		const js = document.createElement('p');
		js.innerHTML = data["data"][u].javascript;
		
		// resultatjs
		
		/* a=10;
		var exo=new Array();
		exo[1]=new Array();
		exo[1][1]= "a="+a;*/

/*		
		const resultatjs = document.createElement('p');
		//resultatjs.innerHTML = exo[1][y];
		//console.log(exo[1]);
		
		
		//bouton_exe.addEventListener('click', resultat);
		
		
		
		console.log(u);
		console.log(j);
		
		var boutonn = document.getElementById("exo_"+x+"_"+z);
		console.log(boutonn);
		if(boutonn){
			boutonn.addEventListener('click', show);
		}
		
		
		var exercice_numjs = "exercice_numjs"+y;
		console.log(exercice_numjs);	  
		
		
		function show(e){ 				//début fonction show
			
			// Retire l'ancien contenu de --  id="exo_numero" -- et rajoute le nouveau fetché
			var el_exo_numero = document.getElementById("exo_numero");		 
			while (el_exo_numero.firstChild) {
				el_exo_numero.removeChild(el_exo_numero.firstChild);
			}
			exo_numero.insertAdjacentHTML("afterbegin", exercice_num.outerHTML);
			
			
			
			// Retire l'ancien contenu de --  id="enonce_titre" -- et rajoute le nouveau fetché
			var el_enonce_titre = document.getElementById("enonce_titre");		 
			while (el_enonce_titre.firstChild) {
				el_enonce_titre.removeChild(el_enonce_titre.firstChild);
			}
			enonce_titre.insertAdjacentHTML("afterbegin", enonce_exo.outerHTML);	
			
			
			
			// Retire l'ancien contenu de --  id="pseudo_code_contenu" -- et rajoute le nouveau fetché
			var el_pseudo_code_contenu = document.getElementById("pseudo_code_contenu");		 
			while (el_pseudo_code_contenu.firstChild) {
				el_pseudo_code_contenu.removeChild(el_pseudo_code_contenu.firstChild);
			}			 			 	 
			el_pseudo_code_contenu.insertAdjacentHTML("afterbegin", pseudo_code.outerHTML);
			
			
			
			// Retire l'ancien contenu de --  id="javascript" -- et rajoute le nouveau fetché
			var el_js = document.getElementById("contenu_code");		 
			while (el_js.firstChild) {
				el_js.removeChild(el_js.firstChild);
			}			 			 	 
			contenu_code.insertAdjacentHTML("afterbegin", js.outerHTML);
			
			// Retire l'ancien contenu de --  id="contenu_execution" -- et rajoute le nouveau fetché
			var el_contenu_execution = document.getElementById("contenu_execution");		 
			while (el_contenu_execution.firstChild) {
				el_contenu_execution.removeChild(el_contenu_execution.firstChild);
			}
			contenu_execution.insertAdjacentHTML("afterbegin", resultatjs.outerHTML);
			
			
		} 						// fin show
		
		
		
	}; 															//_______fin boucle for
	
})																								//_______fin then



// Fetch pour la NAV

fetch("https://t5bx8bo2.directus.app/items/session1?groupBy[]=session&aggregate[count]=exercice")
.then((response) => response.json())
.then((data) => 								
{  for (let i=0; i<data["data"].length; i++) 			//	NOMBRE DE SESSIONS			   	 
{ 												   		   
	const nav = document.createElement('ul');
	nav.setAttribute("id", `session_${i}`);
	
	nav.innerHTML = `Session:${data["data"][i].session}`;
	
	sessions.insertAdjacentHTML("beforebegin", nav.outerHTML);
	
	for (let y=0; y<data["data"][i]["count"]["exercice"]; y++) //	NOMBRE D'EXERCICES DANS LA SESSIONN
	{
		x = i +1;  
		z = y + 1;
		
		const exo = document.createElement('li');
		exo.setAttribute("id", `exo_${x}_${z}`);
		exo.innerHTML = `Exo:${x}.${z}`;
		var session_ = document.getElementById(`session_${i}`);
		
		session_.insertAdjacentHTML("beforeend", exo.outerHTML);
	};
	
};
})
*/
