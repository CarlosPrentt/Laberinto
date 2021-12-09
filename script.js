//Variable del lienzo
let canvas;
//Variable del conexto
let ctx;
//FPS
const FPS = 50;

//Ancho de la ficha
let anchoF = 50;
let altoF = 50;


//Tipo de ficha
let pasto = "green";
let agua = "blue";
let tierra = "brown";
let llave = "yellow";

//Escenario Array - Matriz
let escenario = [
    [1,0,0,0,0,0,1,1,1,1], //Posición 0
    [1,1,1,1,1,0,0,0,0,1], //1
    [0,1,0,0,0,0,1,1,0,1], //2
    [0,1,0,1,1,1,1,1,0,1], //3
    [0,0,0,0,3,1,0,0,0,1], //4
    [1,0,1,1,1,1,0,1,0,1], //5
    [1,0,1,0,1,0,0,1,0,1], //6
    [2,0,1,0,1,1,1,1,0,0], //7
    [1,1,1,0,0,0,0,1,0,1], //8
    [2,0,0,0,1,1,0,0,0,1], //9
];

//Construir escenario
function dibujarEscenario(){
    let color;
    //Recorror el alto del escenario
    for(y = 0; y < escenario.length; y++){
        //Recorrer el ancho del escenario
        for(x = 0; x < escenario[y].length; x++){
            //Compara para reemplazar la ficha
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if(escenario[y][x] == 1){
                color = agua;
            }
            if(escenario[y][x] == 2){
                color = tierra;
            }
            if(escenario[y][x] == 3){
                color = llave;
            }
            ctx.fillStyle = color
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
        }
    }
};

//Declaramos la función del personaje
let jugador = function(){
    //Todo lo que haga parte de jugador debe ir con this para específicar que pertenece a jugador
    //Atributo de esta clase
    this.x = 0;
    this.y = 9;
    this.color = 'black';
    //Métodos
    this.dibuja = function(){
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoF, altoF);
    };

    //Para que si se oprime hacia arriba, suba
    this.arriba = function(){
        if(this.margenes(this.x, this.y -1) == false){
            this.y--;
        };
    };
    this.abajo = function(){
        if(this.margenes(this.x, this.y +1) == false){
            this.y++;
        };
    };
    this.izquierda = function(){
        if(this.margenes(this.x -1, this.y) == false){
            this.x--;
        };
    };
    this.derecha = function(){
        if(this.margenes(this.x +1, this.y) == false){
            this.x++;
        };
    }

    this.margenes = function(x, y){
        let colisiones = false;
        if(escenario[y][x] == 1){
            colisiones = true;
        };
        return(colisiones);
    }
    
};

//Vairable global
let protagonista;

//Esta funcion activa todo 
function inicializa(){
    canvas = document.getElementById("canva");
    ctx = canvas.getContext("2d");

    //Creo el objeto jugador
    protagonista = new jugador();

    //Lectura de teclado
    document.addEventListener('keydown', function(tecla){
        if(tecla.key == 'ArrowUp'){
            protagonista.arriba();
        } else if(tecla.key == 'ArrowDown'){
            protagonista.abajo();
        } 
        if(tecla.key == 'ArrowRight'){
            protagonista.derecha();
        }
         if(tecla.key == 'ArrowLeft'){
            protagonista.izquierda();
        }
        
    })
    //Cantidad de tiempo que va a usar el personaje para moverse
    setInterval(function(){
        principal()
    }, 1000/FPS)
    

}

//Esta función centraliza las demas funciones
function principal(){

    dibujarEscenario()
    protagonista.dibuja();

}


