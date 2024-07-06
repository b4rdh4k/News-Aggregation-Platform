export const setTheme = (theme) => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  };
  
  export const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
  };
  
  export const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);
  };
  