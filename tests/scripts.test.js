import { jest } from '@jest/globals';

describe('Website Navigation Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <section id="home"></section>
      <section id="about"></section>
      <section id="contact"></section>
    `;
  });

  test('should add smooth scrolling behavior on anchor click', () => {
    const scrollIntoViewMock = jest.fn();
    const anchor = document.querySelector('nav a[href="#about"]');
    const targetSection = document.getElementById('about');
    targetSection.scrollIntoView = scrollIntoViewMock;

    anchor.click();

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('should update active class on anchor click', () => {
    const anchor = document.querySelector('nav a[href="#about"]');
    anchor.click();

    expect(anchor.classList.contains('active')).toBe(true);
    expect(document.querySelector('nav a[href="#home"]').classList.contains('active')).toBe(false);
  });

  test('should redirect when section does not exist', () => {
    delete window.location;
    window.location = { href: '' };
    
    const anchor = document.querySelector('nav a[href="#about"]');
    anchor.setAttribute('href', 'nonexistent.html');
    
    anchor.click();
    
    expect(window.location.href).toBe('nonexistent.html');
  });

  test('should highlight active section while scrolling', () => {
    const aboutSection = document.getElementById('about');
    Object.defineProperty(aboutSection, 'offsetTop', { value: 500 });
    Object.defineProperty(aboutSection, 'offsetHeight', { value: 200 });
    
    window.scrollY = 550;
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(document.querySelector('nav a[href="#about"]').classList.contains('active')).toBe(true);
    expect(document.querySelector('nav a[href="#home"]').classList.contains('active')).toBe(false);
  });

  test('should handle scroll position at section boundaries', () => {
    const homeSection = document.getElementById('home');
    Object.defineProperty(homeSection, 'offsetTop', { value: 0 });
    Object.defineProperty(homeSection, 'offsetHeight', { value: 100 });
    
    window.scrollY = 0;
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    expect(document.querySelector('nav a[href="#home"]').classList.contains('active')).toBe(true);
  });
});
