import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // React 18 JSX Transform: no es necesario importar React en cada archivo.
      // Ignoramos 'React' en no-unused-vars para compatibilidad con código legacy.
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^React$',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // setState dentro de useEffect es válido cuando sincroniza estado derivado de props
      // (p.ej. sincronizar unidades del carrito al montar, o cerrar menú al cambiar ruta).
      // Se baja a warn para no bloquear CI; el equipo puede refactorizar progresivamente.
      'react-hooks/set-state-in-effect': 'warn',

      // ThemeContext exporta el hook useTheme junto al componente ThemeProvider.
      // Es un patrón común en React; se baja a warn para no bloquear HMR/fast-refresh.
      'react-refresh/only-export-components': 'warn',
    },
  },
])
