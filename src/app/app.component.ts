import { Component } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'markdown-viewer';

  markdownContent: string = `
  # ¡Bienvenido al Editor Markdown! 🚀
  ## Características principales

  Este editor te permite escribir **Markdown** y ver la vista previa en **tiempo real**.

  ### ¿Qué puedes hacer?

  - Escribir texto con formato
  - Crear listas y tablas
  - Añadir código con syntax highlighting
  - Insertar enlaces y imágenes
  - ¡Y mucho más!

  ### Ejemplo de código:
  \`\`\`javascript
  function saludar(nombre) {
      return \`¡Hola, \${nombre}!\`;
  }

  console.log(saludar('Angular'));
  \`\`\`

  > 💡 **Tip:** Todo lo que escribas aquí se renderizará automáticamente en el panel de la derecha.
  `;

  htmlContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
    this.onMarkdownChange();
  }

  async onMarkdownChange(): Promise<void> {
    try {
      const rawHtml = await marked(this.markdownContent);
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml('<p>Error al procesar el markdown</p>');
    }
  }
}

