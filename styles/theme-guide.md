# 🎨 Theme Customization Guide

Questa guida spiega come personalizzare facilmente l'aspetto dell'applicazione usando le CSS variables.

## 📍 Dove Modificare

Tutte le variabili CSS si trovano in `app/globals.css` nella sezione `:root`.

## 🎨 Colori

### Colori Base
```css
--background: 0 0% 100%;        /* Sfondo principale */
--foreground: 222.2 84% 4.9%;   /* Testo principale */
```

### Colori Primary (Azioni Principali)
```css
--primary: 221.2 83.2% 53.3%;         /* Colore principale (bottoni, link) */
--primary-foreground: 210 40% 98%;    /* Testo su sfondo primary */
--primary-hover: 221.2 83.2% 48%;     /* Hover state */
--primary-active: 221.2 83.2% 43%;    /* Active/pressed state */
```

**Esempio personalizzazione (Teal):**
```css
--primary: 180 83% 53%;
--primary-hover: 180 83% 48%;
--primary-active: 180 83% 43%;
```

### Colori di Stato
```css
--success: 142 76% 36%;    /* Verde per successo */
--warning: 38 92% 50%;     /* Giallo per avvisi */
--destructive: 0 84.2% 60.2%;  /* Rosso per errori */
--info: 199 89% 48%;       /* Blu per informazioni */
```

## 📝 Typography

### Font Families
```css
--font-sans: system-ui, ...;   /* Font principale */
--font-serif: Georgia, ...;     /* Font serif */
--font-mono: Consolas, ...;     /* Font monospace (codice) */
```

**Esempio con Google Fonts:**
```css
/* Aggiungi nel <head> di layout.tsx */
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

/* Poi in globals.css */
--font-sans: 'Inter', system-ui, sans-serif;
```

### Font Sizes
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
/* ... fino a 6xl */
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 📐 Border Radius (Forme)

### Radius Globale
```css
--radius: 0.5rem;  /* 8px - default per la maggior parte degli elementi */
```

**Esempio per design più arrotondato:**
```css
--radius: 1rem;           /* 16px */
--radius-button: 1.5rem;  /* 24px per bottoni pill-shaped */
--radius-card: 1.5rem;    /* 24px per card */
```

**Esempio per design squadrato:**
```css
--radius: 0.25rem;        /* 4px - angoli leggermente arrotondati */
--radius-button: 0.25rem;
--radius-card: 0.5rem;
```

**Esempio per design completamente squadrato:**
```css
--radius: 0;
--radius-button: 0;
--radius-card: 0;
--radius-input: 0;
```

### Radius Specifici per Componente
```css
--radius-button: var(--radius);    /* Bottoni */
--radius-card: var(--radius-lg);   /* Card */
--radius-input: var(--radius);     /* Input fields */
--radius-badge: var(--radius);     /* Badge/Tag */
```

## 📏 Spacing

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
/* ... fino a 5xl */
```

**Uso:**
```css
padding: var(--spacing-md);
margin: var(--spacing-lg);
gap: var(--spacing-sm);
```

## 🌓 Shadows

```css
--shadow-sm: ...;   /* Ombra piccola */
--shadow: ...;      /* Ombra media (default) */
--shadow-lg: ...;   /* Ombra grande */
--shadow-xl: ...;   /* Ombra extra large */
```

**Esempio per ombre più morbide:**
```css
--shadow: 0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06);
--shadow-lg: 0 8px 12px -2px rgb(0 0 0 / 0.08), 0 3px 5px -3px rgb(0 0 0 / 0.08);
```

## ⚡ Transitions

```css
--transition-fast: 150ms;    /* Transizioni veloci */
--transition-base: 200ms;    /* Transizioni standard */
--transition-slow: 300ms;    /* Transizioni lente */

--ease-out: cubic-bezier(0, 0, 0.2, 1);  /* Easing naturale */
```

## 🏗️ Componenti

### Sidebar
```css
--sidebar-width: 16rem;              /* 256px */
--sidebar-width-collapsed: 4rem;     /* 64px */
```

### Header/Topbar
```css
--header-height: 4rem;  /* 64px */
```

### Input & Button
```css
--input-height: 2.5rem;        /* 40px */
--button-height: 2.5rem;       /* 40px */
--button-padding-x: 1rem;
```

## 🎯 Esempi di Temi Completi

### Tema Teal/Turquoise (come negli screenshot)
```css
:root {
  --primary: 180 83% 53%;
  --primary-hover: 180 83% 48%;
  --primary-active: 180 83% 43%;
  --primary-foreground: 0 0% 100%;
  
  --radius: 0.5rem;
  --radius-card: 0.75rem;
  --radius-button: 0.5rem;
}
```

### Tema Purple/Violet
```css
:root {
  --primary: 262 83% 58%;
  --primary-hover: 262 83% 53%;
  --primary-active: 262 83% 48%;
  --primary-foreground: 0 0% 100%;
}
```

### Tema Orange/Coral
```css
:root {
  --primary: 25 95% 53%;
  --primary-hover: 25 95% 48%;
  --primary-active: 25 95% 43%;
  --primary-foreground: 0 0% 100%;
}
```

### Tema Minimalist (Design squadrato)
```css
:root {
  --radius: 0.125rem;          /* Quasi squadrato */
  --radius-button: 0.125rem;
  --radius-card: 0.25rem;
  --radius-input: 0.125rem;
  
  --shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-lg: 0 2px 4px -1px rgb(0 0 0 / 0.1);
}
```

### Tema Soft/Rounded (Design molto arrotondato)
```css
:root {
  --radius: 1rem;
  --radius-button: 2rem;      /* Pill-shaped buttons */
  --radius-card: 1.5rem;
  --radius-input: 0.75rem;
  
  --shadow: 0 4px 12px -2px rgb(0 0 0 / 0.08);
  --shadow-lg: 0 12px 24px -4px rgb(0 0 0 / 0.12);
}
```

## 🌙 Dark Mode

Tutte le variabili possono essere sovrascritte per il dark mode nella sezione `.dark`:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... altre variabili */
}
```

## 💡 Tips

1. **Colori HSL**: I colori sono in formato HSL (Hue, Saturation, Lightness) separati da spazi
   - Hue: 0-360 (ruota cromatica)
   - Saturation: 0-100%
   - Lightness: 0-100%

2. **Consistency**: Mantieni coerenza modificando variabili correlate insieme
   - Se cambi `--primary`, aggiorna anche hover/active states
   - Se cambi `--radius`, considera di modificare tutti i radius dei componenti

3. **Testing**: Testa le modifiche sia in light che dark mode

4. **Brand Colors**: Usa un tool come [Coolors](https://coolors.co) o [ColorBox](https://colorbox.io) per generare palette coerenti

## 🔧 Come Applicare un Tema

1. Apri `app/globals.css`
2. Cerca la sezione `:root`
3. Modifica le variabili che vuoi personalizzare
4. Salva il file
5. Il browser aggiornerà automaticamente (hot reload)

## 📚 Risorse Utili

- [HSL Color Picker](https://hslpicker.com/)
- [Tailwind Color Generator](https://uicolors.app/create)
- [Realtime Colors](https://realtimecolors.com/)
- [Design System Checklist](https://www.designsystemchecklist.com/)
