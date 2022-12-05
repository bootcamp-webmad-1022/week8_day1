
# Interceptores de Axios 

- A través de [los interceptores de Axios](https://axios-http.com/docs/interceptors) aseguramos que cada petición adjunta la cabecera de autorización con el token:
  ````javascript
   this.api.interceptors.request.use((config) => {

      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
          config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
  })
  ````
- En servidor, el Middleware de `express-jwt` verifica el token y genera la propiedad `req.payload` con los datos del usuario logueado:
  ````javascript
  router.post('/whatever', isAuthenticated, (req, res) => {
      console.log('ID usuario logueado:', req.payload._id)
  })
  ````

# Renderizado condicional según propietario

- A través del contexto de autorización disponemos de acceso para el ID del usuario logueado
- A través de los datos de la API disponemos del ID del creador de un item:
  ````jsx
  {
    elm.owner === user._id && <p>Is owned</p>
  }
  ````


# Rutas privadas
- El componente `<Outlet/>` de React Router Dom permite retornar las rutas anidadas dentro de otra `<Route>`. 
- De esta forma es posible crear un componente estratégico `PrivateRoute.jsx` mediante el que retornar el `<Outlet/>` del mismo según el estado de sesión del usuario:

  ````javascript
  const PrivateRoute = () => {

    const { isLoggedIn, user } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <Navigate to="/inicio-sesion" />
    }

    return <Outlet />
  }
  ````
- Este componente se comporta como una ruta superior que anida las protegidas:
  ````javascript
  <Route element={<PrivateRoute />}>
    <Route path="/perfil" element={<h1>MI PERFIL (PROTEGIDA)</h1>} />
    <Route path="/admin" element={<h1>ADMIN (PROTEGIDA)</h1>} />
  </Route>
  ````

