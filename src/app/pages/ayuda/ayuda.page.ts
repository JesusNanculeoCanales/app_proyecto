import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  constructor() {}

  ngOnInit() {
    const faqs = document.querySelectorAll('.faq h3');
    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        const answer = faq.nextElementSibling as HTMLElement;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
    });
  }
}
