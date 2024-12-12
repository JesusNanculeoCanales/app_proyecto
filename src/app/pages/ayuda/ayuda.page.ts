import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importación para la redirección

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const faqs = document.querySelectorAll('.faq h3');
    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        const answer = faq.nextElementSibling as HTMLElement;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
    });
  }

  // Método para redirigir al error404 al enviar
  onSubmit(event: Event) {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario
    this.router.navigate(['/error404']); // Redirigir a error404
  }
}
