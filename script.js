//https://restcountries.com/v2/all
//Bhutan
const http='https://restcountries.com/v2/all';
var repositoriosPaises=[];
var repositoriosPaisesFavoritos=[];
var repositoriosPaisesFavoritosTotal=[];
var datalista=document.getElementById("lista1");
var envio=document.getElementById("enviar"); 
var tela=document.getElementById("tela");
var telapopula=document.getElementById("telapopula");
var telaSuaLista=document.getElementById("telaSuaLista");
var telaclasmudi=document.getElementById("telaclasmudi");
var populaFavoritResultadoquan=document.getElementById("populaFavoritResultadoquan");
var populaFavoritResultado=document.getElementById("populaFavoritResultado");
var totalPopulacao=[]; var totalPopu; var totalPopufavorite;
paiss(http);
/////________________________________________________
//eventos
document.addEventListener("keydown",function(eve){
    if(eve.key == 'Enter'){ proc(repositoriosPaises); }});
envio.addEventListener("click",function(){proc(repositoriosPaises);});
/////________________________________________________
//funções__________________________________
function paiss(http){
    fetch(http).then(res => res.json()).then(pais=>{
        pais.forEach(elementoPais => {
            let paises=new Object();
            paises.Nome= elementoPais.name;
            paises.NomeNativo=elementoPais.nativeName;
            paises.TraducaoNome=elementoPais.translations.pt;
            paises.linguagens=elementoPais.languages[0].name;
            paises.sigla3= elementoPais.alpha3Code;
            paises.sigla2= elementoPais.alpha2Code;
            paises.capital= elementoPais.capital;
            paises.populacao= elementoPais.population;
            paises.bandeira=elementoPais.flags.png;
            paises.id=repositoriosPaises.length;
           repositoriosPaises.push(paises);
           totalPopulacao.push(paises.populacao);
        });
        lista();
        somaPopulacao(totalPopulacao);
        var TotalPaises=repositoriosPaises.length;
        popula2(TotalPaises,totalPopu);
    });}
    function somaPopulacao(x){
       totalPopu=x.reduce(function soma(x, y) {
        return x + y;
      });}
      function  somaPopulacaofav(x){ totalPopufavorite=x.map(x=> x.populacao).reduce(function soma(x, y) {
        return x + y;
      },0);populaFavoritResultadoquan.innerHTML=repositoriosPaisesFavoritos.length;
      populaFavoritResultado.innerHTML=totalPopufavorite;}
    
function lista(){
for(let i=0; i< repositoriosPaises.length;++i){
    let option=document.createElement('option');
    option.value=`${repositoriosPaises[i].Nome}`;
    option.innerHTML=`${repositoriosPaises[i].sigla},${repositoriosPaises[i].linguagens},${repositoriosPaises[i].TraducaoNome}`;
    datalista.appendChild(option);} }
function proc(repositoriosPaises){
    var procura=document.getElementById("procura");
    for(let i=0; i< repositoriosPaises.length;++i){
        if(procura.value == repositoriosPaises[i].Nome){
            tela.innerHTML=`<img src="${repositoriosPaises[i].bandeira}" id="Bandeira" alt="Bandeira do pais"><table>
            <tr><td>Nome :</td> <td class="info">${repositoriosPaises[i].Nome}</td> </tr>  <tr> <td>Nome nativo:</td><td class="info">${repositoriosPaises[i].NomeNativo}</td></tr> <tr> <td>Tradução do nome para pt-br:</td><td class="info">${repositoriosPaises[i].TraducaoNome}</td> </tr><tr> <td> Sigla de 2 letras:</td><td class="info">${repositoriosPaises[i].sigla2}</td> </tr> <tr>   <td>Sigla de 3 letras:</td>  <td class="info">${repositoriosPaises[i].sigla3}</td> </tr> </table> <table id="table2">     <tr>         <td>Capital :</td>  <td class="info">${repositoriosPaises[i].capital}</td>      </tr>      <tr> <td>Linguagem:</td>    <td class="info">${repositoriosPaises[i].linguagens}</td>  </tr> <tr>         <td>População :</td>  <td class="info">${repositoriosPaises[i].populacao}</td>      </tr></table> `;
            let buttonn=document.createElement("button");
            buttonn.value=repositoriosPaises[i].id;
            buttonn.className="favorito";
            buttonn.id=repositoriosPaises[i].id;
            buttonn.innerHTML="+";
            buttonn.type="button";
            tela.appendChild(buttonn);
            buttonn.addEventListener("click", x=>modelar(buttonn));
            
                                   break;
        }
    }
}//imprimir resultados
/**/
function modelar(buttonn){
    let id=buttonn.value;
    var inde=false;
    for(let i=0; i< repositoriosPaisesFavoritos.length; ++i){ if(repositoriosPaisesFavoritos[i].id == id){inde=true; break;}}
    if(!inde){
    repositoriosPaisesFavoritos.push(repositoriosPaises[id]); let favv=new Object; 
    favv.id=repositoriosPaises[id].id; 
    favv.populacao=repositoriosPaises[id].populacao;
    repositoriosPaisesFavoritosTotal.push(favv);
    let listt=document.createElement("ul");
    listt.className="telaSuaLista2";
    listt.innerHTML=` <li><img class="conteiIMG" src="${repositoriosPaises[id].bandeira}"></li>
    <li>${repositoriosPaises[id].Nome}</li>
    <li>${repositoriosPaises[id].populacao}</li>
    <button id="m${repositoriosPaises[id].id}"type="button" class="retirarFav" value="${repositoriosPaises[id].id}">--</button>`;
    telaSuaLista.appendChild(listt);
    let REbutton=document.createElement("button");
    REbutton.value=repositoriosPaises[id].id;
    REbutton.className="retirarFav";
    REbutton.id=repositoriosPaises[id].id;
    REbutton.innerHTML="--";
    REbutton.type="button";
    listt.appendChild(REbutton);
REbutton.addEventListener("click", x=>Remodelar(REbutton));somaPopulacaofav(repositoriosPaisesFavoritosTotal);}console.log(repositoriosPaisesFavoritosTotal); }

function Remodelar(REbutton){
    let id=REbutton.value; let elementoo=repositoriosPaisesFavoritos.findIndex(x=> x.id == id); let yuki=repositoriosPaisesFavoritosTotal.findIndex(y=> y.id == id);
repositoriosPaisesFavoritos.splice(elementoo,1);repositoriosPaisesFavoritosTotal.splice(yuki,1);
telaSuaLista.innerHTML=`<ul id="telaSuaLista1"><li>Bandeira</li><li>Nome</li><li>População</li><button type="button" id="enfeite"></button></ul>`;
for(let i=0; i<repositoriosPaisesFavoritos.length;++i){   let listt=document.createElement("ul");
listt.className="telaSuaLista2";
listt.innerHTML=` <li><img class="conteiIMG" src="${repositoriosPaisesFavoritos[i].bandeira}"></li><li>${repositoriosPaisesFavoritos[i].Nome}</li><li>${repositoriosPaisesFavoritos[i].populacao}</li><button id="m${repositoriosPaisesFavoritos[i].id}"type="button" class="retirarFav" value="${repositoriosPaisesFavoritos[i].id}">--</button>`;
telaSuaLista.appendChild(listt);
let REbutton=document.createElement("button"); REbutton.value=repositoriosPaisesFavoritos[i].id; REbutton.className="retirarFav"; REbutton.id=repositoriosPaisesFavoritos[i].id; REbutton.innerHTML="--"; REbutton.type="button"; listt.appendChild(REbutton);
REbutton.addEventListener("click", x=>Remodelar(REbutton));
}somaPopulacaofav(repositoriosPaisesFavoritosTotal);}
function popula2(TotalPaises,totalPopu){
    telaclasmudi.innerHTML=`<table id="table3">     <tr>    <td class="info22">População Mundial:</td>      <td class="info2" >${totalPopu}</td>       </tr> <tr>  <td class="info22">Total de paises :</td>  <td class="info2">${TotalPaises}</td></tr></table>`;
}
/*<ul class="telaSuaLista2">       <li><img class="conteiIMG" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png"></li>       <li>Nome</li>       <li>População</li></ul>*/
/////________________________________________________
/* telaSuaLista.innerHTML+=`<ul id="m${repositoriosPaises[id].id}" class="telaSuaLista2">
    <li><img class="conteiIMG" src="${repositoriosPaises[id].bandeira}"></li>
    <li>${repositoriosPaises[id].Nome}</li>
    <li>${repositoriosPaises[id].populacao}</li>
    <button id="m${repositoriosPaises[id].id}"type="button" class="retirarFav" value="${repositoriosPaises[id].id}">--</button></ul> `; 
    */
