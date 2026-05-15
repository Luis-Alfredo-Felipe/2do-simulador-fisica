function ejecutarMision() {
    // 1. Extraer valores de los textboxes
    const m = parseFloat(document.getElementById('masa').value);
    const F = parseFloat(document.getElementById('fuerza').value);
    const angulo = parseFloat(document.getElementById('angulo').value);
    const uk = parseFloat(document.getElementById('friccion').value);
    const g = 9.8;

    // 2. Lógica Matemática (Basado en la trigonometría específica de tu apunte)
    // Convertir grados a radianes
    const radianes = angulo * (Math.PI / 180);
    
    const W = m * g;
    // Según tu hoja 1000175841.jpg: Wx usa Coseno y Wy usa Seno
    const Wx = W * Math.cos(radianes); 
    const Wy = W * Math.sin(radianes); 
    
    const N = Wy; 
    const Ff = uk * N;

    // 3. Inciso A: Calcular aceleración con fricción
    // ΣFx = Ff - F - Wx = m * a  => a = (Ff - F - Wx) / m
    const a_con_friccion = (Ff - F - Wx) / m;

    // 4. Inciso B: Calcular aceleración sin fricción (Ff = 0)
    // ΣFx = - F - Wx = m * a => a = (-F - Wx) / m
    const a_sin_friccion = (-F - Wx) / m;

    // Inyectar los valores dinámicamente en la animación
    document.getElementById('anim-masa').innerText = m + "kg";
    document.getElementById('anim-fuerza').innerText = "F = " + F + " N";
    document.getElementById('anim-angulo').innerText = angulo + "°";

    // --- NUEVO: Dibujo matemático del arco SVG calibrado ---
    const radioArco = 50; // Arco mucho más grande y visible
    const radArco = angulo * (Math.PI / 180);
    
    // Coordenadas en un lienzo de 100x100 donde la bisagra está en (0, 100)
    const inicioX = radioArco; 
    const inicioY = 100; // Pegado al suelo del lienzo
    
    // Calculamos a dónde debe llegar la curva según los grados
    const finX = radioArco * Math.cos(radArco);
    const finY = 100 - (radioArco * Math.sin(radArco)); // Restamos porque hacia arriba es 0
    
    // Trazamos el arco
    const dPath = `M ${inicioX} ${inicioY} A ${radioArco} ${radioArco} 0 0 0 ${finX} ${finY}`;
    document.getElementById('arco-path').setAttribute('d', dPath);
    // ---------------------------------------------

    // 5. Imprimir valores en pantalla
    document.getElementById('lbl-uk').innerText = uk;
    document.getElementById('res-a').innerText = a_con_friccion.toFixed(2);
    document.getElementById('res-b').innerText = a_sin_friccion.toFixed(2);
    
    // Mostrar el panel de resultados
    document.getElementById('panel-resultados').style.display = 'block';

    // Revelar la animación
    document.getElementById('contenido-animacion').style.display = 'block';
    
    // 6. Lanzar la Animación
    animarBloque(angulo);

    // 6. Lanzar la Animación
    animarBloque(angulo);
}

function animarBloque(anguloGrados) {
    const rampa = document.getElementById('rampa');
    const bloque = document.getElementById('bloque');

    // 1. Inclinamos la rampa hacia arriba y a la derecha (usando un ángulo negativo)
    rampa.style.transform = `rotate(-${anguloGrados}deg)`;

    // 2. Posición Inicial: Colocamos el bloque en la parte alta de la rampa
    bloque.style.transition = 'none';
    bloque.style.left = '80%'; 

    // Pequeña pausa táctica para que el navegador registre la posición inicial
    setTimeout(() => {
        // 3. El Descenso: Como la fuerza empuja hacia abajo y vence a la fricción, el bloque cae
        bloque.style.transition = 'left 1.5s cubic-bezier(0.4, 0, 1, 1)';
        bloque.style.left = '5%'; // Se desliza hasta la parte baja de la rampa
    }, 50);
}