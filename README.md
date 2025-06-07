## Respuesta - Willman Adriel Marocho Ardiles

## HISTORIA DE USUARIO 1 - Ver historial de lectura de anuncios

# 📡 BACKEND: Historial de Lectura de Anuncios

## ✅ Casos de Éxito (Happy Paths)

1. **Anuncio con historial de usuarios que ya leyeron:**
   - **Entrada:** `anuncioId = 10`
   - **Descripción:** El anuncio tiene historial con usuarios que ya leyeron el contenido.
   - **Resultado esperado:** Retorna un `Map<String, List<HistorialDTO>>` con listas separadas: `"leidos"` y `"noLeidos"`.

2. **Anuncio con historial de usuarios que no han leído:**
   - **Entrada:** `anuncioId = 15`
   - **Descripción:** El anuncio tiene historial con usuarios que aún no lo han leído.
   - **Resultado esperado:** Lista `"leidos"` vacía, lista `"noLeidos"` con usuarios registrados.

3. **Anuncio con historial mixto:**
   - **Entrada:** `anuncioId = 25`
   - **Descripción:** El anuncio ha sido leído por algunos usuarios, pero no por todos.
   - **Resultado esperado:** Ambas listas (`"leidos"` y `"noLeidos"`) contienen al menos un elemento.

4. **Anuncio existente sin historial asociado:**
   - **Entrada:** `anuncioId = 30`
   - **Descripción:** El anuncio no ha sido leído por ningún usuario.
   - **Resultado esperado:** Se retorna un `Map` con ambas listas vacías.

---

## ❌ Casos de Error (Unhappy Paths)

1. **Anuncio inexistente en el sistema:**
   - **Entrada:** `anuncioId = 99999`
   - **Descripción:** El ID no corresponde a ningún anuncio registrado.
   - **Resultado esperado:** Excepción o lista vacía, según el manejo implementado en `historialCommand`.

2. **ID de anuncio nulo:**
   - **Entrada:** `anuncioId = null`
   - **Descripción:** El identificador no fue proporcionado correctamente.
   - **Resultado esperado:** Error `400 Bad Request` o excepción `IllegalArgumentException`.

3. **ID de anuncio no numérico:**
   - **Entrada:** `/historial/abc`
   - **Descripción:** El valor recibido por el endpoint no es un número.
   - **Resultado esperado:** Error `400 Bad Request` por parte del `@PathVariable`.

4. **Fallo interno del repositorio:**
   - **Entrada:** `anuncioId = válido`
   - **Descripción:** El servicio `lecturaAnuncioRepository` lanza una excepción (por ejemplo, error de base de datos).
   - **Resultado esperado:** Error `500 Internal Server Error`.


# 🖥️ FRONTEND: Historial de Lectura

## ✅ Casos de Prueba – Happy Paths

1. **Renderizado correcto de elementos principales**
   - **Descripción:** El componente renderiza correctamente los elementos básicos del modal.
   - **Resultado esperado:** Se visualiza el título del modal y ambas secciones: `"Leídos"` y `"No leídos"`.

2. **Visualización de usuarios en la lista de leídos**
   - **Descripción:** El componente muestra correctamente los usuarios que leyeron el anuncio.
   - **Resultado esperado:** Se renderiza el nombre del usuario junto con la `fechaLectura` correctamente formateada en la sección `"Leídos"`.

3. **Visualización de usuarios en la lista de no leídos**
   - **Descripción:** El componente presenta correctamente los usuarios que aún no han leído el anuncio.
   - **Resultado esperado:** Se renderiza el nombre del usuario junto con el badge `"Sin fecha"` en la sección `"No leídos"`.

4. **Cierre del modal**
   - **Descripción:** El usuario cierra el modal haciendo clic en el botón correspondiente.
   - **Resultado esperado:** Se ejecuta correctamente la función `onCerrar` (callback de cierre).

---

## ❌ Casos de Prueba – Unhappy Paths

5. **Fallo en el fetch de historial**
   - **Descripción:** Ocurre un error de red o el backend responde con error 500.
   - **Resultado esperado:** El componente no se rompe; se ejecuta `console.error` y se muestran ambas listas vacías.

6. **Respuesta del backend con estructura vacía**
   - **Descripción:** El backend responde con `{ leidos: [], noLeidos: [] }`.
   - **Resultado esperado:** Ambas listas se muestran vacías, sin errores en la interfaz.

7. **Datos mal formateados desde backend**
   - **Descripción:** El campo `fechaLectura` es `null` u otro formato inválido.
   - **Resultado esperado:** Se muestra el badge `"Sin fecha"` sin que la aplicación se caiga.



## HISTORIA DE USUARIO 2 - Filtrar inmuebles por precio, ubicacion, tipo y servicios

# 🏠 BACKEND: Filtros de Inmuebles

## ✅ Casos de Éxito (Happy Paths)

1. **Sin filtros**
   - **Descripción:** Se consulta sin pasar ningún parámetro.
   - **Parámetros de entrada:** _ninguno_
   - **Resultado esperado:** Retorna todos los inmuebles registrados.

2. **Filtrar por provincia**
   - **Descripción:** El usuario selecciona una provincia.
   - **Entrada:** `provincia=Lima`
   - **Resultado esperado:** Solo inmuebles ubicados en Lima.

3. **Filtrar por distrito**
   - **Descripción:** Se especifica un distrito concreto.
   - **Entrada:** `distrito=Miraflores`
   - **Resultado esperado:** Solo inmuebles ubicados en Miraflores.

4. **Filtrar por tipo de inmueble**
   - **Descripción:** Se elige un tipo de inmueble específico.
   - **Entrada:** `tipo=Departamento`
   - **Resultado esperado:** Solo inmuebles de tipo "Departamento".

5. **Filtrar por rango de precio**
   - **Descripción:** Se define un rango mínimo y máximo.
   - **Entrada:** `precioMin=1000&precioMax=3000`
   - **Resultado esperado:** Solo inmuebles cuyo precio esté dentro del rango especificado.

6. **Filtrar por servicios específicos**
   - **Descripción:** Se buscan inmuebles que cuenten con ciertos servicios.
   - **Entrada:** `servicios=Wifi,Cocina`
   - **Resultado esperado:** Solo inmuebles que incluyan **ambos** servicios.

7. **Filtros combinados**
   - **Descripción:** Se aplican múltiples filtros simultáneamente.
   - **Entrada:** `provincia=Lima&tipo=Departamento&precioMax=3000`
   - **Resultado esperado:** Se devuelven los inmuebles que cumplan **todas** las condiciones.

8. **Servicios parcialmente existentes**
   - **Descripción:** Se piden servicios comunes, aunque no todos estén disponibles en todos los inmuebles.
   - **Entrada:** `servicios=Wifi,Agua caliente`
   - **Resultado esperado:** Solo inmuebles que incluyan ambos servicios.

9. **Filtro explícitamente vacío**
   - **Descripción:** Se envía un filtro sin valor.
   - **Entrada:** `tipo=` o `distrito=`
   - **Resultado esperado:** El filtro se ignora, equivalente a no haberlo enviado.

---

## ❌ Casos de Error o Comportamiento No Esperado (Unhappy Paths)

1. **Valor inválido en el tipo**
   - **Descripción:** Se pasa un tipo de inmueble inexistente.
   - **Entrada:** `tipo=Mansion`
   - **Resultado esperado:** No lanza error, pero retorna una lista vacía.

2. **Provincia inexistente**
   - **Descripción:** Se consulta con una provincia que no figura en el sistema.
   - **Entrada:** `provincia=Atlantis`
   - **Resultado esperado:** Lista vacía.

3. **Distrito sin relación válida con la provincia**
   - **Descripción:** Se solicita un distrito que no pertenece a la provincia indicada.
   - **Entrada:** `provincia=Callao&distrito=Surco`
   - **Resultado esperado:** Lista vacía.

4. **Rango de precio invertido**
   - **Descripción:** El precio mínimo es mayor que el precio máximo.
   - **Entrada:** `precioMin=5000&precioMax=2000`
   - **Resultado esperado:** Lista vacía.

5. **Servicios inexistentes**
   - **Descripción:** Se envía un servicio que no está registrado.
   - **Entrada:** `servicios=Internet5G`
   - **Resultado esperado:** Lista vacía.

6. **Parámetros duplicados**
   - **Descripción:** Se repite un parámetro como lista.
   - **Entrada:** `tipo=Casa&tipo=Cuarto`
   - **Resultado esperado:** Se interpreta como un OR lógico. Retorna inmuebles que sean "Casa" **o** "Cuarto".

7. **Lista de tipos malformada como string plano**
   - **Descripción:** Se pasa una lista como string CSV en lugar de parámetros separados.
   - **Entrada:** `tipo=Departamento,Casa`
   - **Resultado esperado:** Spring puede interpretarlo correctamente solo si el `@RequestParam` está configurado para eso. De lo contrario, puede lanzar error de conversión.

8. **Servicios como texto plano en lugar de lista**
   - **Descripción:** La API REST recibe el cuerpo como texto sin parsear JSON o parámetros.
   - **Entrada:** `servicios=Wifi,Cocina` (en cuerpo `raw text`)
   - **Resultado esperado:** Puede no parsearse correctamente si no se formatea como lista válida (`[]` o parámetros repetidos).


# Laboratorio 04: Pruebas Unitarias con Jest en React

Este laboratorio tiene como objetivo proporcionar una introducción práctica a las pruebas unitarias en aplicaciones React utilizando Jest y React Testing Library.

## Aplicación Todo List

La aplicación desarrollada es una lista de tareas (Todo List) con las siguientes funcionalidades:

- Añadir nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar tareas por estado (todas, activas, completadas)
- Ver estadísticas de tareas
- Borrar todas las tareas completadas

## Estructura del Proyecto

```
app/
├── components/
│   ├── Todo.tsx               # Componente principal que integra todos los demás
│   ├── TodoForm.tsx           # Formulario para añadir nuevas tareas
│   ├── TodoItem.tsx           # Componente individual para cada tarea
│   ├── TodoList.tsx           # Lista de tareas
│   ├── TodoFilter.tsx         # Filtros para las tareas
│   ├── TodoStats.tsx          # Estadísticas de tareas
│   └── __tests__/             # Directorio de pruebas
│       ├── TodoItem.test.tsx  # Pruebas para TodoItem
│       ├── TodoForm.test.tsx  # Pruebas para TodoForm
│       └── TodoList.test.tsx  # Pruebas para TodoList
├── page.tsx                   # Página principal
└── layout.tsx                 # Layout de la aplicación
```

## Instrucciones del Laboratorio

En este laboratorio, exploraremos cómo escribir pruebas unitarias efectivas siguiendo el patrón **Prepare, Execute and Validate**:

1. **Prepare**: Configurar el entorno de prueba y los datos necesarios
2. **Execute**: Realizar la acción que queremos probar
3. **Validate**: Verificar que el resultado es el esperado

### Ejercicios

#### Ejercicio 1: Completar prueba de TodoItem

Completa el test para verificar que el componente `TodoItem` muestra correctamente el texto de una tarea con caracteres especiales.

Archivo: `app/components/__tests__/TodoItem.test.tsx`

#### Ejercicio 2: Completar prueba de TodoForm

Completa el test para verificar que el componente `TodoForm` maneja correctamente la entrada de texto con espacios al inicio o final.

Archivo: `app/components/__tests__/TodoForm.test.tsx`

#### Ejercicio 3: Completar prueba de TodoList

Completa el test para verificar que el componente `TodoList` pasa correctamente las funciones onToggle y onDelete a cada TodoItem.

Archivo: `app/components/__tests__/TodoList.test.tsx`

## Casos de Prueba

En las pruebas existentes, podrás encontrar ejemplos de:

- **Happy Path**: Pruebas que verifican el comportamiento correcto cuando todo funciona como se espera
- **Unhappy Path**: Pruebas que verifican el comportamiento cuando hay situaciones inesperadas o errores

## Ejecución de Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm test
```

Para ejecutar las pruebas en modo observador (útil durante el desarrollo):

```bash
npm run test:watch
```

## Recursos Adicionales

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Testing Library](https://github.com/testing-library/jest-dom)
