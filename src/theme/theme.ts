const palette = {
  primary: '#007bff',
  primaryDark: '#0056b3',
  secondary: '#6c757d',
  
  white: '#ffffff',
  black: '#000000',

  background: '#f8f9fa',
  surface: '#ffffff',
  
  textPrimary: '#212529',
  textSecondary: '#6c757d',

  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',

  border: '#e9ecef',
  shadow: '#000',
}


const typography = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
}
}

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
}

const radii = {
    sm: 6,
    md: 12,
    lg: 50, 
}

const shadows = {
  light: {
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  colored: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  })
}



export const theme = {
    colors: palette,
    typography,
    spacing,
    shadows,
    radii
}

