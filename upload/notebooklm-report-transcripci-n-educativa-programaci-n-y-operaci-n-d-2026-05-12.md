 ---
exported: 2026-05-12T01:55:09.209Z
source: NotebookLM
type: report
title: "Transcripción Educativa: Programación y Operación de Robots ABB (Del Entorno Virtual al Real)"
---

# Transcripción Educativa: Programación y Operación de Robots ABB (Del Entorno Virtual al Real)

导出时间: 11/5/2026, 22:55:09

---

# Transcripción Educativa: Programación y Operación de Robots ABB (Del Entorno Virtual al Real)

### 1\. Introducción y Objetivos de la Clase

Esta sesión técnica se centra en el flujo de trabajo profesional para trasladar programas desde el entorno virtual de **RobotStudio** hacia un controlador real. La precisión en la correspondencia entre lo virtual y lo físico es innegociable; cualquier discrepancia se traduce en errores de trayectoria o colisiones. Utilizaremos un pizarrón real como nuestro **Objeto de Trabajo (Work Object)** para proyectar figuras geométricas mediante una herramienta de dibujo.

**Objetivos clave:**

Dominar la sincronización de datos y la "inyección manual" de código en el controlador.

Calibrar con exactitud la herramienta (`toolpina`) y el objeto de trabajo (`wobjpina`).

Interpretar y resolver errores "paranormales" y de configuración física del robot.

Implementar protocolos de seguridad críticos durante las primeras pruebas de ejecución.

\--------------------------------------------------------------------------------

### 2\. Configuración del Entorno Virtual en RobotStudio

Antes de tocar el robot físico, debemos preparar la estación virtual de manera que sea un espejo de la realidad.

**Creación de puntos de referencia:**

**Referencia 3D:** Capture aristas o esquinas del pizarrón modelado usando el _Snap_ de geometría.

**Coordenadas manuales:** Introduzca valores específicos si conoce las dimensiones exactas del plano de trabajo.

**Orientación de ejes (El "Secreto" del Z):** Por defecto, el eje Z suele apuntar hacia arriba. Para que el fibrón interactúe con el pizarrón, debe **girar el eje Z** (usualmente 90° o 180° en X o Y) hasta que quede perpendicular a la superficie.

**Verificación de Alcance:** Compruebe mediante "Ver robot en posición" que el brazo alcanza los extremos del pizarrón sin violar límites articulares.

**Generación de Trayectorias:** Agrupe los puntos en una "Ruta vacía" para definir la secuencia lógica de movimiento.

\--------------------------------------------------------------------------------

### 3\. Conceptos de Movimiento y Trayectorias (RAPID)

El lenguaje RAPID clasifica los movimientos según su naturaleza matemática y restricciones espaciales.

| Tipo de Movimiento | Características | Caso de Uso Recomendado |
| --- | --- | --- |
| MoveJ (Joint) | Movimiento por ejes. Es el más rápido pero la trayectoria no es predecible. | Movimientos de aproximación y el primer punto de cualquier rutina. |
| MoveL (Linear) | El TCP se desplaza en línea recta. Requiere mayor cálculo computacional. | Dibujo de líneas, bordes de figuras y contacto con la superficie. |
| MoveC (Circular) | Genera un arco basado en un punto intermedio y uno final. | Creación de círculos y geometrías curvas (esencial para el examen). |
| MoveAbsJ | Mueve el robot a ángulos específicos de cada eje usando un jointtarget. | Retorno a posición "Home". Único porque no depende de datos de herramienta o WorkObject. |

**Datos de Zona:** Use **Fine** cuando necesite que el robot se detenga exactamente en el punto (ej. esquinas de un cuadrado). Use **Zone** (Z10, Z50) para movimientos fluidos donde la precisión milimétrica no sea prioritaria, permitiendo que el robot "suavice" la trayectoria.

\--------------------------------------------------------------------------------

### 4\. Sincronización y Transferencia de Datos (Paso a Paso)

Trasladar el código del entorno virtual al controlador real es el punto crítico donde la mayoría de los errores ocurren. Siga este flujo lógico:

**Paso 1: Sincronización a RAPID (En Virtual)**
*   En la pestaña **RAPID** de RobotStudio, haga clic en **Sincronizar -> Sincronizar con RAPID**.
*   Seleccione los módulos que desea enviar (específicamente sus trayectorias y datos como `toolpina`).
*   Esto convierte sus movimientos visuales en líneas de código RAPID legibles por el robot.

**Paso 2: Verificación de Nombres y Datos**
*   **Importante:** Asegúrese de que los nombres de las herramientas (`TOOLDATA`) y objetos de trabajo (`WOBJDATA`) coincidan EXACTAMENTE con los definidos en el controlador real.
*   Si en el simulador usó `tool0` pero el robot físico usa `toolpina`, el programa fallará. Use la herramienta de búsqueda y reemplazo si es necesario.

**Paso 3: Transferencia Física**
*   Una vez sincronizado a RAPID en el entorno virtual, use la opción **Transferir -> Cargar módulo** o simplemente **Sincronizar con Estación** si está conectado directamente al robot real.

**Dato Técnico: El Cuaternión**
RAPID define la orientación con cuatro valores `[q1, q2, q3, q4]`. Aunque no los entienda visualmente, son vitales para que el robot sepa exactamente cómo inclinar el fibrón respecto al pizarrón. No los modifique manualmente a menos que sea un experto.

\--------------------------------------------------------------------------------

### 5\. Conexión al Robot Real: Protocolo de Vinculación

Para que RobotStudio "hable" con el brazo mecánico, siga este ritual de conexión:

1.  **Conexión Física:** Enchufe el cable Ethernet al **Puerto de Servicio** (frontal del controlador).
2.  **Detección:** En RobotStudio, vaya a la pestaña **Controladora** -> **Añadir controladora** -> **Conexión con un clic**.
3.  **Solicitud de Acceso (Grant Access):**
    *   Este es el paso que más confunde. RobotStudio pedirá permiso para escribir en el robot.
    *   **Mire el FlexPendant:** Aparecerá un mensaje preguntando: *"¿Desea conceder acceso de escritura a RobotStudio?"*.
    *   **Presione "Sí"** en la pantalla táctil del FlexPendant. Sin esto, solo podrá ver el código pero no modificarlo.
4.  **Control de Estado:** Verifique que el estado en la esquina inferior derecha de RobotStudio pase de **Rojo (No conectado)** a **Verde (Conectado y con acceso)**.

\--------------------------------------------------------------------------------

### 5.1 Ejercicio Práctico: Dibujando un Triángulo (Lógica de Programación)

Para el examen, el profesor pedirá una figura. Aquí está la estructura lógica para un triángulo:

**1. Definición de Puntos:**
*   `pHome`: Posición de reposo (segura).
*   `pInicio`: Vértice 1 (donde el fibrón toca el pizarrón).
*   `p2`: Vértice 2.
*   `p3`: Vértice 3.

**2. Código RAPID Sugerido:**
```rapid
PROC DibujarTriangulo()
    ! 1. Ir a Home con movimiento de ejes (seguro y rápido)
    MoveJ pHome, v500, z50, toolpina \WObj:=wobjpina;

    ! 2. Aproximación (10cm antes de tocar) con MoveL
    MoveL Offs(pInicio, 0, 0, 100), v100, fine, toolpina \WObj:=wobjpina;

    ! 3. Tocar el pizarrón
    MoveL pInicio, v50, fine, toolpina \WObj:=wobjpina;

    ! 4. Dibujar lados (Movimiento Lineal para precisión)
    MoveL p2, v100, fine, toolpina \WObj:=wobjpina;
    MoveL p3, v100, fine, toolpina \WObj:=wobjpina;
    MoveL pInicio, v100, fine, toolpina \WObj:=wobjpina;

    ! 5. Retirada de seguridad en Z
    MoveL Offs(pInicio, 0, 0, 100), v100, fine, toolpina \WObj:=wobjpina;

    ! 6. Volver a Home
    MoveJ pHome, v500, max, toolpina \WObj:=wobjpina;
ENDPROC
```
**Nota de Oro:** El uso de `Offs(punto, x, y, z)` le permite crear puntos de aproximación sin tener que grabarlos uno por uno. ¡Esto ahorra mucho tiempo en el examen!

--------------------------------------------------------------------------------

### 5.2 Movimiento Circular (`MoveC`): El Desafío del Círculo

Para dibujar un círculo o un arco en el examen, no basta con un punto inicial y final. El robot necesita saber la "curvatura".

**La Regla de los 3 Puntos:**
1.  **Punto de Inicio (`pStart`):** Donde comienza el arco (se llega con `MoveL`).
2.  **Punto Intermedio (`pMid`):** Un punto en la mitad del arco para definir el radio.
3.  **Punto Final (`pEnd`):** Donde termina el arco.

**Código RAPID para un Círculo Completo:**
```rapid
PROC DibujarCirculo()
    ! 1. Aproximación y contacto
    MoveL Offs(pStart, 0, 0, 100), v100, fine, toolpina;
    MoveL pStart, v50, fine, toolpina;

    ! 2. Primera mitad del círculo (Arco de 180°)
    ! Sintaxis: MoveC Punto_Intermedio, Punto_Final, velocidad, zona, herramienta;
    MoveC pMid, pEnd, v100, fine, toolpina \WObj:=wobjpina;

    ! 3. Segunda mitad para cerrar el círculo
    MoveC pMidBack, pStart, v100, fine, toolpina \WObj:=wobjpina;

    ! 4. Salida segura
    MoveL Offs(pStart, 0, 0, 100), v100, fine, toolpina;
ENDPROC
```


--------------------------------------------------------------------------------

### 7. El Checklist de Oro para el Examen: De Virtual a Real

Si sigues estos pasos en orden, es imposible que falles la transferencia:

1.  [ ] **Nombres Identicos:** Revisa que `toolpina` y `wobjpina` se llamen igual en tu PC y en el FlexPendant real.
2.  [ ] **Sincronización Total:** En RobotStudio, ve a `RAPID -> Sincronizar -> Sincronizar con RAPID`. Verifica que los módulos aparezcan en verde.
3.  [ ] **Conexión Física:** Cable Ethernet al puerto de servicio (el que está adelante). Tu IP debe estar en automático.
4.  [ ] **Petición de Acceso:** En RobotStudio, dale a "Solicitar acceso de escritura". **¡Corre al FlexPendant y dale a "Conceder" (Grant)!** Si tardas mucho, la petición caduca.
5.  [ ] **Carga del Módulo:** Si el programa no aparece, ve a `Program Editor -> Tasks -> Load Module` y busca tu archivo `.mod`.
6.  [ ] **Recalibración de WObj:** graba los 3 puntos (X1, X2, Y1) en el pizarrón real. ¡No confíes en la posición virtual!
7.  [ ] **Prueba en el Aire:** Antes de tocar el pizarrón, corre el programa con un `Z` de 50mm de seguridad para ver que la forma sea correcta.

**Recuerda:** El profesor valora más la **seguridad** y el **orden** que la velocidad. Si haces el checklist frente a él, verá que sabes lo que haces.

\--------------------------------------------------------------------------------

### 6\. Calibración en el Mundo Real: Herramientas y Objetos de Trabajo

La realidad es imperfecta; por ello, debemos "enseñar" al robot dónde está el mundo físico.

**Calibración de** `toolpina`**:** Defina la masa y el centro de gravedad. Un error aquí bloqueará el robot por seguridad.

**Calibración de** `wobjpina`**:** Defina el plano del pizarrón tocando tres puntos físicos (X1, X2 e Y1).

**Alineación Normal (La "Magia"):** En el FlexPendant, use la opción **Alinear** seleccionando el Work Object. Esto orientará el robot de forma **perfectamente perpendicular** al pizarrón, permitiendo que el dibujo sea uniforme incluso si el pizarrón está inclinado.

**Teach Position:** Si un punto virtual no coincide con el real, lleve el robot manualmente a la posición deseada y use el comando **Teach Position** para sobrescribir las coordenadas en el código RAPID.

\--------------------------------------------------------------------------------

### 7\. Estrategias de Programación: Coordenadas Absolutas vs. Offsets

**Método Primitivo (Absoluto):** Programar cada punto (P10, P20, P30) con sus coordenadas X, Y, Z. Es tedioso y cualquier cambio en el objeto de trabajo obliga a re-enseñar todos los puntos.

**Uso de Offsets y SetFrame (Profesional):** Defina un único punto de referencia y construya la figura usando la función `Offset(punto_ref, x, y, z)`.

**Lógica de Variables:** El instructor recomienda cambiar los identificadores de `CONST` (constante) a `VAR` (variable) si planea modificar puntos en ejecución. Sin embargo, `Offset` es potente porque crea un _nuevo punto en memoria_, permitiendo operar incluso sobre posiciones constantes sin generar errores de escritura.

\--------------------------------------------------------------------------------

### 8\. Resolución de Problemas (Troubleshooting)

Errores de Masa y Centro de Gravedad (CoG)

Si el robot se bloquea al intentar moverse, verifique los datos de carga de la herramienta. Un valor de masa incorrecto activa una protección en los motores.

El "Error Silencioso"

A veces el programa no arranca y el FlexPendant no muestra ningún mensaje. **Solución:** Use la función **Check Program** o reinicie el controlador. Esto fuerza al compilador a mostrar errores ocultos, como inconsistencias en los datos de carga.

Error de Singularidad (Eje 5)

Ocurre cuando el eje 5 está cerca de los 0°, alineando los ejes 4 y 6.

**Solución:** Mueva manualmente el eje 5 para sacarlo de la posición crítica antes de reanudar.

Bug de Inicio de Sesión / Popup de Windows

Un cuadro de diálogo de inicio de sesión puede bloquear la ejecución remota.

**Solución:** Cancele la ventana en el FlexPendant o desconecte y vuelva a conectar el puerto de servicio para limpiar la sesión.

\--------------------------------------------------------------------------------

### 9\. Protocolo de Seguridad y Pruebas de Ejecución

`REGLAS DE ORO DE SEGURIDAD:`

**Velocidad de Seguridad:** Las primeras pruebas deben realizarse entre el **7% y el 25%**. Nunca al 100% en la primera corrida.

**Pulsador de Seguridad (Deadman Switch):** El pulsador tiene **tres posiciones**. Solo en la posición media el robot se moverá. Si lo suelta O si lo presiona con demasiada fuerza (reacción de pánico), el robot se detendrá inmediatamente.

**El "Dry Run" (Prueba en vacío):** Antes de tocar el pizarrón, realice una ejecución con un **Offset en Z** (ej. 50mm) para verificar la trayectoria en el aire.

**Z-Retracción:** Siempre programe un movimiento lineal de salida en Z positivo antes de realizar un `MoveJ` de retorno a Home para evitar colisiones accidentales con la superficie de trabajo.

\--------------------------------------------------------------------------------

### 10\. Conclusión y Recomendaciones del Instructor

La robótica real tiene "mañas" que el simulador no muestra. La clave para superar la evaluación final —que consistirá en figuras complejas con **arcos (**`MoveC`**) y líneas**— es la práctica exhaustiva de la calibración y el uso inteligente de `Offset`. No se desespere con los errores de comunicación; aprenda a interpretar lo que el FlexPendant le dice. El robot es infinitamente preciso, pero solo si usted le proporciona datos de calidad. ¡A practicar!