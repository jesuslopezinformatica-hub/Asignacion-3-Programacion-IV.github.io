const cuentaEstudiante = {
    nombre: "Jesús López",
    carrera: "Informática",
    token_acceso: "123456"
};

let sesion = JSON.parse(sessionStorage.getItem("estudiante"));

if (sesion == null || !sesion.token_acceso) {
    
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 100px; font-family: Arial, sans-serif;">
            <h2>Portal Estudiantil - Iniciar Sesión</h2>
            <p>No has iniciado sesión o tu sesión ha expirado.</p>
            <button id="btnIniciar" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                Ingresar como Jesús López
            </button>
        </div>
    `;

    document.getElementById("btnIniciar").addEventListener("click", function() {
        sessionStorage.setItem("estudiante", JSON.stringify(cuentaEstudiante));
        alert("Sesión iniciada con éxito.");
        window.location.reload(); 
    });

    throw new Error("Sesión no iniciada. Código detenido.");
}

document.getElementById("nombre").textContent = sesion.nombre;
document.getElementById("carrera").textContent = sesion.carrera;

const historialAcademico = [
    { materia: "Programación IV", nota: 18 },
    { materia: "Base de Datos", nota: 16 },
    { materia: "Redes", nota: 9 },
    { materia: "Matemática", nota: 8 },
    { materia: "Diseño Web", nota: 15 }
];

function mostrarTabla(lista) {
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = ""; 

    let htmlContenido = "";

    for (const materia of lista) {
        
        let claseNota = "";
        if (materia.nota < 10) {
            claseNota = "reprobada"; 
        } else {
            claseNota = "aprobada";  
        }

        
        htmlContenido += `
        <tr>
            <td>${materia.materia}</td>
            <td class="${claseNota}">${materia.nota}</td>
        </tr>
        `;
    }

    tabla.innerHTML = htmlContenido;
}


function calcularPromedio() {
    let suma = 0;
    for (const materia of historialAcademico) {
        suma += materia.nota;
    }
    let promedio = suma / historialAcademico.length;
    document.getElementById("promedio").textContent = promedio.toFixed(2);
}


mostrarTabla(historialAcademico);
calcularPromedio();


document.getElementById("btnTodas").addEventListener("click", function() {
    mostrarTabla(historialAcademico); 
});

document.getElementById("btnReprobadas").addEventListener("click", function() {
    let reprobadas = historialAcademico.filter(function(materia) {
        return materia.nota < 10;
    });
    mostrarTabla(reprobadas); 
});

document.getElementById("btnCerrar").addEventListener("click", function() 
{
    sessionStorage.clear();
    
    alert("Sesión cerrada.");
    
    window.location.reload(); 
});
