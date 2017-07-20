(function(){
  var app ={
    isLoading: true,
    visibleArticulos: {},
    articuloTemplate: document.querySelector('.articuloTemplate'),
    container: document.querySelector('.container'),
    tag:['tag1','tag2','tag3','tag4'],
    containerTag: document.querySelector('.tag'),
    spinner: document.querySelector('.loader'),
    meses: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  };

  var seccion={"items": [
   {
     "titulo":"NOSOTROS",
      "contenido":"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "autor":"ComexPerú"
   },
   {
      "titulo":"SERVICIOS",
      "contenido":"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "autor":"ComexPerú"
   },
   {
      "titulo":"EVENTOS",
       "contenido":"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
       "autor":"ComexPerú"
   }
  ]}

  app.updateArt=function(data){
    // console.log("data",data);
    var key=data.items.length;
    var fecha=new Date();
    var mes=app.meses[fecha.getMonth()];
    var f= mes+' '+fecha.getDay()+','+fecha.getFullYear();
    var art=app.visibleArticulos[key];
    for(var i = 0; i < key; i++) {
      art =app.articuloTemplate.cloneNode(true);
      art.classList.remove('articuloTemplate');
      var tagLenght=app.tag;
      // console.log(tagLenght);
      for(var s=0;s<tagLenght.length;s++){
        var tg=tagLenght[s];
        // console.log(tg);
        var listTag=app.containerTag.cloneNode(true);
        listTag.classList.add('tarjetas');
        // console.log(listTag.getAttribute("class"));
        // art.querySelector('.tag').textContent+=app.tag[s];
        listTag.textContent=tg;
        art.querySelector('.containertag').appendChild(listTag);
      }

      art.querySelector('.titulo').textContent = data.items[i].titulo;
      art.querySelector('.description').textContent = data.items[i].contenido;
      var autor=data.items[i].autor;
      art.querySelector('.date').textContent ="Por "+autor+"/ "+f;
      art.querySelector('.imgArticulo').classList.add('images1');
      // art.querySelector('.imgArticulo').setAttribute('hidden', true);
      art.querySelector('.imgArticulo').removeAttribute('hidden');
      art.querySelector('.imgArticulo').setAttribute('src','images/img1.png');
      art.querySelector('.imgArticuloRela').removeAttribute('hidden');
      art.querySelector('.imgArticuloRela').setAttribute('src','images/artrelacionado.png');
      art.querySelector('.btnSaber').removeAttribute('hidden');
      art.querySelector('.btnSaber').setAttribute('src','images/img1.png');
      art.querySelector('.btnSaber').textContent ="Saber Más";
      art.querySelector('.tituloRela').textContent = "TÍTULO DEL ARTÍCULO RELACIONADO";
      art.querySelector('.descriptionRela').textContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum, neque natus! Adipisci vel atque sunt non, quidem libero delectus minima autem odit porro accusamus voluptate aperiam repudiandae. Cumque, quasi."
      app.container.appendChild(art);
      // app.visibleArticulos
    }
    if(app.isLoading){
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
    // console.log(data.items.length);
  }
  app.updateArt(seccion);
})();
