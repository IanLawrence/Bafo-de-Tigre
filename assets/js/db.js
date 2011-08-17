/*
Licensed under the MIT License:
http://www.opensource.org/licenses/mit-license.php
*/


$(function(){ initDatabase();

 	// drop the tables whilst debugging
	$('#clear').click(function(){ dropTables(); });     
});
	
function initDatabase() {
	try {
	    if (!window.openDatabase) {
	        alert('Local Databases are not supported by your browser. Please use a Webkit browser');
	    } else {
	        var shortName = 'DRINKS';
	        var version = '1.0';
	        var displayName = 'DRINKS Test';
	        var maxSize = 100000; // in bytes
	        DRINKS = openDatabase(shortName, version, displayName, maxSize);
                       // dunno if this is safe? - seems ok so far
			createTables();
			selectTop10();
	    }
	} catch(e) {
	    if (e == 2) {
	        // Version mismatch.
	        console.log("Invalid database version.");
	    } else {
	        console.log("Unknown error "+ e +".");
	    }
	    return;
	} 
}


/***
**** CREATE TABLE ** 
***/
function createTables(){
	DRINKS.transaction(
        function (transaction) {
        	transaction.executeSql('CREATE TABLE IF NOT EXISTS cachaca(id INTEGER NOT NULL PRIMARY KEY, fname TEXT NOT NULL, rating NUMBER NOT NULL, description TEXT, image TEXT, gps REAL);', [], nullDataHandler, errorHandler);
        }
    );
       // add our default data
	prePopulate();

}


/***
**** INSERT INTO TABLE ** 
***/
function prePopulate(){
	DRINKS.transaction(
	    function (transaction) {
		//Starter data when page is initialized. GPS for every drink is set to Manaus :)
		var data = ['1','Abaíra - Chapada Diamantina, Bahia',10,'É uma cachaça bem forte, com 42% de álcool, mas com um sabor de carvalho, fruto do envelhecimento de três anos em barris feitos com esta madeira, que a deixa relativamente suave. É bem cristalina e deixa um excelente gosto no final.', 'assets/img/10.jpg', '(-1.603794, -48.515625)'];  
                var data1 = ['2','Claudionor - Januária, MG','20','Esta cachaça tem 48% de álcool. Está achando muito? Antes ela tinha 52% e teve que diminuir para atender à nova legislação. É cachaça de macho, com sabor bem forte e bastante gosto de cana. ideal para as noites frias e rodas de truco com os amigos', 'assets/img/9.jpg', '(-1.603794, -48.515625)']; 
		var data2 = ['3','Magnífica - Miguel Pereira, RJ','30','Tem 45% de álcool, o que não a impede de ser bem suave, já que é feita com canas jovens e envelhecida por três anos em barris de carvalho. É uma cachaça de bebida fácil e vai muito bem em drinks.', 'assets/img/8.jpg', '(-1.603794, -48.515625)']; 
                var data3 = ['4','Sapucaia Velha - Pindamonhangaba, SP','40','É uma cachaça que está no mercado desde 1930 e é bem suave. Tem só 40,5% de álcool e tem um sabor muito sutil e delicioso.', 'assets/img/7.jpg', '(-1.603794, -48.515625)'];
                var data4 = ['5','Serra Preta - Alagoa Grande, PB','50','No mercado desde 1908, é uma cachaça que não mudou muito desde então. Tem 45% de álcool, mas é bem ácida, fazendo o seu paladar ser bem restritivo para algumas pessoas. Chegou em uma boa posição no ranking pelo sabor "honesto".', 'assets/img/6.jpg', '(-1.603794, -48.515625)'];
                var data5 = ['6','Dona Beja - Araxá, MG','60','Esta cachaça tem mais de cem anos de tradição e é um verdadeiro sucesso. É uma cachaça envelhecida por três anos em barris de carvalho e tem um certo toque de canela no seu paladar. Ela deixa um sabor muito bom no final e é uma boa pedida para várias ocasiões.', 'assets/img/5.jpg', '(-1.603794, -48.515625)'];
                var data6 = ['7','Tabaroa - Bichinho, MG','70','Esta é uma cachaça envelhecida por dois anos em barris de carvalho e com 46% de graduação alcoólica. Mesmo com esta graduação alta, tem um paladar bem suave e desce muito bem. O retrogosto não fica por muito tempo, mas é bem agradável.', 'assets/img/4.jpg', '(-1.603794, -48.515625)'];
                var data7 = ['8','Cachaça da Tulha - Mococa, SP','80','É uma cachaça bem suave, com graduação alcoólica de 40%. Escura e bem amadeirada, aos olhos de qualquer pessoa até se passa por uísque. E o sabor também não fica devendo nada a nenhum scotch.', 'assets/img/3.jpg', '(-1.603794, -48.515625)'];
                var data8 = ['9','Vale Verde - Betim, MG','90','Com uma graduação de 40% de álcool, é bem encorpada e deixa aquela bela cortina no copo. Ao contrário do que parece, com o envelhecimento ela não fica doce demais e o seu sabor é muito peculiar. O álcool e o aroma são bem suaves e percebe-se o cuidado na produção desde o primeiro gole.', 'assets/img/2.jpg', '(-1.603794, -48.515625)'];
                var data9 = ['10','Piragibana - Salinas, MG','100','A Piragibana é daquelas cachaças de se beber ajoelhado.Tem um aroma delicioso e sabor inconfundível, que fica na boca por bastante tempo. É uma cachaça cara e bem difícil de encontrar, pois é envelhecida por 22 anos em barris mistos de bálsamo e carvalho. Com 47% de álcool, é uma bebida para se apreciar em ocasiões especiais. Portanto, se você tiver a oportunidade de experimentar, não rejeite.', 'assets/img/1.jpg', '(-1.603794, -48.515625)'];

	
		transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data[0], data[1], data[2], data[3], data[4],  data[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data1[0], data1[1], data1[2], data1[3], data1[4], data1[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data2[0], data2[1], data3[2], data2[3], data2[4], data2[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data3[0], data3[1], data3[2], data3[3], data3[4], data3[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data4[0], data4[1], data4[2], data4[3], data4[4], data4[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data5[0], data5[1], data5[2], data5[3], data5[4], data5[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data6[0], data6[1], data6[2], data6[3], data6[4], data6[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data7[0], data7[1], data7[2], data7[3], data7[4], data7[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data8[0], data8[1], data8[2], data8[3], data8[4], data8[5]]);
                transaction.executeSql("INSERT INTO cachaca(id, fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?, ?)", [data9[0], data9[1], data9[2], data9[3], data9[4], data9[5]]);
	    }
	);	
}

/***
**** FIND THE TOP 10 FINEST CACHACAS ** 
***/

function selectTop10(){ 
	DRINKS.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM cachaca ORDER BY rating DESC LIMIT 10;", [], dataSelectHandler, errorHandler);       
	    }
	);	
}

/***
**** EXPORT TOP 10 CACHACAS ** 
***/

function exportTop10(){ 
	DRINKS.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM cachaca ORDER BY rating DESC LIMIT 10;", [], dataExportHandler, errorHandler);       
	    }
	);	
}


function dataExportHandler(transaction, results){
        var resultSet=[];
        // loop the result set
        for (var i=0; i<results.rows.length; i++) {
         console.log('Got this many results ->' + ' ' + results.rows.length);
    	 var row = results.rows.item(i);
         resultSet[i] = row;
                                                   }
         // put it into a string
         var dataString = JSON.stringify(resultSet);
         console.log(dataString);

         $.post('http://ianlawrence.info/downloads/bafo-de-tigre/process.php', {data: dataString}, showResult, 'text');     
}

function showResult(res)
{
  html_string.html("");
  $("#fullresponse").html(html_string.html() + '<div align="center"><b>Thanks</b> for sharing your Top 10. Check out the <a href="">aggregate Top 10 list.</a></div>' + res);
}


/***
**** FIND THE TOP 10 FINEST CACHACAS ** 
***/



// get around the incorrect number of bindings supplied error from sqllite by passing the wildcards in the search term
function searchTable(){
        var searchname= document.getElementById('search'); 
        // debugging
        //alert('searchTable(' + searchname.value + ' )'); 
                           DRINKS.transaction( 
                           function (transaction) { 
transaction.executeSql("SELECT * FROM cachaca WHERE fname LIKE ?", ['%'+ searchname.value +'%'], dataSelectHandlerResult,errorHandler);                                                            
                                      }
                                        );
         
                          }


function dataSelectHandlerResult(transaction, results){
    // Handle the #results
    html_string1 = $('#searchresult');
    html_string1.html("");
 
    // loop the result set
    for (var i=0; i<results.rows.length; i++) {
        console.log('The number of results is' + ' ' + results.rows.length);
    	var row = results.rows.item(i);
    	// create an object and add the db variables to it
        var newFeature = new Object();
        newFeature.id   = row['id'];
    	newFeature.fname   = row['fname'];
        newFeature.rating = row['rating'];
        newFeature.description    = row['description'];
        newFeature.image    = row['image'];
       
        html_string1.html(html_string1.html() + '<li><div><a href="detail.html?id='+ newFeature.id + '"><img src="' +  newFeature.image + '"></a><h4>' + newFeature.fname + '</h4><p>' +  newFeature.description + '</p></div></li>');
      
                   
        }
       // make it look pretty. Use trigger create to automatically transform all the widgets into the enhanced css versions. 
       html_string1.listview().trigger( "create" );
       $('#result').hide();
       $('#top').hide();
       $('#searchresult').show();
       $('#searchresults').show();
       html_string1.listview("refresh")
}


/***
**** WE FOUND A NEW CACHACA :) ** 
***/

function confirmDelete() {
  jConfirm('Are you sure you want to delete this stuff?', 'Please Confirm', function(result){
    if (result) {
      $("form[name='action_delete']").submit();
    } else {
      return false;
    }
  });
}

function insertDrink() {
              //alert("got here on insert drink");
          
              // set variables
              var fname= document.getElementById('fname'); 
              var description = document.getElementById('description'); 
              var rating = document.getElementById('rating'); 
              var image = document.getElementById('image');
              var gps = document.getElementById('gps');
              //alert('GPS' + gps.value + '.'); 
  
              // need to do some javascript validation
              if(fname.value=='' || description.value=='' || rating.value=='')
                {
                    $('.error').show();
                    return false;
                }
       
             // debugging
             //alert('Image ' + image.value + ' rating ' + rating.value  + '.');
             else
                {
             // add a default image if one was not supplied
                if(image.value==''){
                  //alert("got to missing image");
                image.value = "assets/img/default.jpg";
                          }
                var insertStatement = "INSERT INTO cachaca (fname, rating, description, image, gps) VALUES (?, ?, ?, ?, ?)"
                //commit
                DRINKS.transaction( 
                           function (transaction) { 
                transaction.executeSql(insertStatement, [fname.value, rating.value, description.value, image.value, gps.value], backtoHome,  errorHandler);                                                            
                                      }
                                        );
                console.log('GPS' + gps.value + 'Image ' + image.value + ' rating ' + rating.value  + '.');

                  }
                  
     
                         }

// android override
function backtoHome(){
   //redirect - its a bit agricultural mind you. There has to be a much better way to do this
    window.location.href = 'index.html';
}

/***
**** UPDATE TABLE ** 
***/

function updateSetting(){
	DRINKS.transaction(
	    function (transaction) {
	    	if($('#fname').val() != '') {
	    		var fname = $('#fname').val();
	    	} else {
	    		var fname = 'none';
	    	}	
			var rating    = $('#rating').val();
			var description  = $('#description').val();    	
	    	transaction.executeSql("UPDATE cachaca SET fname=?, rating=?, description=? WHERE id = 1", [fname, rating, description]);
	    }
	);	
		selectAll();
}

function selectAll(){ 
	DRINKS.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM cachaca;", [], dataSelectHandler, errorHandler);	        
	    }
	);	
}


function dataSelectHandler(transaction, results){
    // Handle the #results
    html_string = $('#result');
    html_string.html("");
 
    // loop the result set
    for (var i=0; i<results.rows.length; i++) {
        console.log('The number of results is' + ' ' + results.rows.length);
    	var row = results.rows.item(i);
    	// create an object and add the db variables to it
        var newFeature = new Object();
        newFeature.id   = row['id'];
    	newFeature.fname   = row['fname'];
        newFeature.rating = row['rating'];
        newFeature.description    = row['description'];
        newFeature.image    = row['image'];
       
        html_string.html(html_string.html() + '<li><div><a href="detail.html?id='+ newFeature.id + '"><img src="' +  newFeature.image + '" width="150" height="150"></a><h4>' + newFeature.fname + '</h4><p>' +  newFeature.description + '</p></div></li>');
      
                   
        }
       // make it look pretty 
       html_string.listview();
       $('#searchresults').hide();
       $('#searchresult').hide();
       
    
}

/***
**** Get drink by ID **
***/ 

// Utility function to read a page's URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function selectDrinkie(){
   //debugging
   //alert('ID=' + id  + '.');
   // this is needed if phonegap is required on this page
   //document.addEventListener("deviceready", deviceInfo, true);
   // call the utility function
   var id = getUrlVars()['id']; 
   var uniqueSelect = "SELECT * FROM  cachaca WHERE id = ?";
   DRINKS.transaction( 
                           function (transaction) { 
transaction.executeSql(uniqueSelect, [id], dataSelectHandlerUnique, errorHandler);                                                            
                                      }
                                        );

   
}

function dataSelectHandlerUnique(transaction, results){
    // Handle the results
    html_string = $('#details');
    html_string.html("");
    // loop the result set
    for (var i=0; i<results.rows.length; i++) {
        console.log('The number of results is' + ' ' + results.rows.length);
    	var row = results.rows.item(i);
    	// create an object and add the db variables to it
        var newFeature = new Object();
        newFeature.id   = row['id'];
    	newFeature.fname   = row['fname'];
        newFeature.rating = row['rating'];
        newFeature.description    = row['description'];
        newFeature.image    = row['image'];
       
        html_string.html(html_string.html() + '<div><img src="' +  newFeature.image + '"><h4>' + newFeature.fname + '</h4><p style="white-space: normal;">' +  newFeature.description + '</p></div>');
      
                        
        }
       // make it look pretty 
       html_string.listview();
}

/***
**** Error Handling **
***/ 

function errorHandler(transaction, error){
 	if (error.code==1){
 		// DB Table already exists
 	} else {
    	// Error is a human-readable string.
	    console.log('Merda, deu pau.  Error was '+error.message+' (Code '+error.code+')');
 	}
    return false;
}


function nullDataHandler(){
	console.log("SQL Query Succeeded");
}


/***
**** DELETE DB TABLE ** 
***/
function dropTables(){

DRINKS.transaction(
	    function (transaction) {
	    	transaction.executeSql("DROP TABLE cachaca;", [], nullDataHandler, errorHandler);
	    }
	);
	console.log("Table 'cachaca' has been dropped.");
	location.reload();
	
        

}



	
