/*Crear una funcion que agrege una pelicula al array de peliculas
La pelicula debera tener un ID y un Titulo
Crear una funcion que evalue antes de agregar que la pelicula no fue ingresada previamente
Crear una funcion que ordene las peliculas por Titulo y por ID
Crear una funcion que elimine una pelicula por su ID.*/

var pelis;

var Pelicula= function(id,titulo,descripcion,imagen){
	this.id=id;
	this.titulo=titulo;
	this.descripcion=descripcion;
	this.imagen=imagen;
}

var imdb=(function(){
	var instancia;
	
	function init(){
		var peliculas=[];
		var id=1;
		if(localStorage.getItem("peliculas")==null){
			localStorage.setItem("peliculas",JSON.stringify(peliculas));
		}else{
			var aux=localStorage.getItem("peliculas");
			peliculas=JSON.parse(aux);
			id=peliculas.length+1;
			for(var i=0;i<peliculas.length;i++){
				cargarPelis(peliculas[i]);
			}
		}

		function persistirPelis(){
			localStorage.setItem("peliculas",JSON.stringify(peliculas));
		}

		function reiniciarPelisTable(){
			document.getElementById("pelis-tbody").innerHTML="";
		}

		function ordenarPeliculasId(ascDesc){
			reiniciarPelisTable();
			if(ascDesc==1){
				peliculas.sort(function(a,b){
					return a.id>b.id;
				});
			}else{
				peliculas.sort(function(a,b){
					return a.id<b.id;
				});
			}
			for(var i=0;i<peliculas.length;i++){
				cargarPelis(peliculas[i]);
			}
		}

		function ordenarPeliculasTitulo(ascDesc){
			reiniciarPelisTable();
			if(ascDesc==1){
				peliculas.sort(function(a,b){
					return a.titulo>b.titulo;
				});
			}else{
				peliculas.sort(function(a,b){
					return a.titulo<b.titulo;
				});
			}
			for(var i=0;i<peliculas.length;i++){
				cargarPelis(peliculas[i]);
			}
		}

		function validarPelicula(titulo){
			var res=true;
			if(titulo!=""){
				if(peliculas.length>0){
					for(var i=0;i<peliculas.length;i++){
						if(peliculas[i].titulo==titulo){
							res=false;
							console.log("La pelicula "+titulo+"ya existe")
							break;
						}
					}
				}
			}else{
				res=false;
			}
			return res;
		}

		function cargarPelis(pelicula){
			var tabla=document.getElementById("pelis-tbody");
			var peliNueva="<tr>"+
							"<td style='padding-top:20px;padding-bottom:10px;text-align:center'><label>"+pelicula.id+"</label></td>"+
							"<td style='padding-top:20px;padding-bottom:10px;text-align:center'><img width='115px' height='185px' src='"+pelicula.imagen+"' /></td>"+
							"<td style='padding-top:20px;padding-bottom:10px;text-align:center' valign='top'><label>"+pelicula.titulo+"</label></td>"+
							"<td style='padding-top:20px;padding-bottom:10px;text-align:justify' valign='top'><label>"+pelicula.descripcion+"</label></td>"+
							"</tr>"
			tabla.innerHTML=tabla.innerHTML+peliNueva;
		}

		return{
			agregarPelicula: function(titulo,descp,img){
				var pelicula;
				if(validarPelicula(titulo)){
					pelicula=new Pelicula(id,titulo,descp,img);
					peliculas.push(pelicula)
					id++;
					cargarPelis(pelicula);
					persistirPelis();
				}
			},

			eliminarPelicula: function(id){
				for(var i=0;i<peliculas.length;i++){
					if(peliculas[i].id==id){
						peliculas.splice(i,1);
						break;
					}
				}
				persistirPelis();
			},

			ordenarPelis: function(tipoOrd,ascDesc){
				if(tipoOrd==1){
					ordenarPeliculasId(ascDesc);
					persistirPelis();
				}else if(tipoOrd==2){
					ordenarPeliculasTitulo(ascDesc);
					persistirPelis();
				}
			},

			/*mostrarPelis: function(){
				var pelis="";
				for(var i=0;i<peliculas.length;i++){
					pelis=pelis+"<div id='peli'"+peliculas[i].id+">"+
									"<h1>"+peliculas[i].titulo+"</h1>"+
									"<p>"+peliculas[i].descripcion+"</p>"+
									"<img src='"+peliculas[i].imagen+"' alt='imagen peli "+peliculas[i].id+"' />"+
								"</div>";
				}
				document.getElementById("pelis").innerHTML=pelis;
			}*/
		}
	};

	return{
		instanciar: function() {
            if (!instancia)
                instancia = new init();
            return instancia;
        }
	}

})();

function accionar(){
	document.getElementById("titulo").value="";
	document.getElementById("descripcion").value="";
	document.getElementById("imagen").value="";
}

function agregarPeliculas(){
	var titulo=document.getElementById("titulo").value;
	var descp=document.getElementById("descripcion").value;
	var img=document.getElementById("imagen").value;
	pelis.agregarPelicula(titulo,descp,img);
	accionar();
}

function eliminarPeliculas(pelis){
	var titulo="";
	do{
		titulo=prompt("Ingrese Id de la pelicula a eliminar:")
		pelis.eliminarPelicula(titulo);
	}while(titulo=="");
	accionar();
}

function ordenarPeliculasTitulo(forma){
	pelis.ordenarPelis(2,forma);
}

function ordenarPeliculasId(forma){
	pelis.ordenarPelis(1,forma);
}

function mostrarPelis(){
	document.getElementById("pelis").style="display:flex";
}

function iniciar(){
	pelis=imdb.instanciar();
}