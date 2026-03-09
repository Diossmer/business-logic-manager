---
title: Prueba de Multimedia (Imágenes, Enlaces, GIFs, Videos)
---

# 🚀 Resumen del Soporte Multimedia

¡Bienvenido! Este archivo Markdown ha sido diseñado específicamente para probar las nuevas capacidades multimedia introducidas en LogicManager.

A continuación, evaluaremos cómo se renderizan elementos que van desde imágenes y GIFs animados, hasta videos y enlaces a nuevas pestañas.

---

## 🔗 1. Enlaces Externos

La aplicación ahora detecta los enlaces y se asegura de que se abran en una nueva pestaña (`target="_blank"`) de forma segura, evitando que pierdas tu trabajo actual en la página de LogicManager.

- [Docs de Tailwind CSS (Abre en nueva pestaña)](https://tailwindcss.com/docs)
- [Página web de React (Abre en nueva pestaña)](https://react.dev/)

---

## 📸 2. Imágenes Estáticas

El soporte nativo para sintaxis de Markdown `![alt](url)` mapeará e inyectará imágenes con anchos dinámicos que jamás se salen del contenedor.

![Paisaje de Unsplash](https://images.unsplash.com/photo-1506744626753-dba7d41543fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)

---

## 🎭 3. GIFs Animados

Dado que los GIFs se comportan como imágenes estándar de la web, su importación no requiere de etiquetas de video. Funcionan de forma automática, brindando interactividad y humor a tus documentos de lógica de negocio.

![GIF Animado bailando](https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif)

---

## 🎥 4. Videos Vía Markdown (La Magia)

Por defecto, Markdown no soporta la etiqueta de videos nativamente con la estructura `![alt](mi-video.mp4)`. Sin embargo, he diseñado el intérprete para que **si detecta que la imagen termina en .mp4, .webm o .ogg**, la transforme automáticamente en una etiqueta de `<video controls>` jugable dentro del sistema.

*(Prueba de un pequeño clip de conejo animado libre de derechos via formato Markdown puro)*
![Video importado vía MARKDOWN](https://www.w3schools.com/html/mov_bbb.mp4)

---

## 📼 5. Videos Vía HTML Puro

Gracias a que hemos habilitado y configurado el popular plugin `rehypeRaw` en el compilador `ReactMarkdown`, ahora puedes incrustar directamente etiquetas de HTML como quieras (Iframes de youtube, Video players, etc.) y se respetarán totalmente.

<video src="https://www.w3schools.com/html/mov_bbb.mp4" controls preload="metadata" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin-top: 1rem;"></video>

---

### Conclusión

✅ Enlaces (Nueva Pestaña)  
✅ Imágenes Estáticas (Ajustadas y Seguras)  
✅ GIFs  
✅ Videos por Markdown Custom  
✅ Videos por HTML Crudo (rehype-raw)  

*¡Todo esto también es compatible tanto en el Modo Claro como en el Modo Oscuro!*
