# Mercado Libre Cupones 🏷 
#
## Ejercicio técnico.
#
#
Mercado Libre está implementando un nuevo beneficio para los usuarios que más usan la
plataforma con un cupón de cierto monto gratis que les permitirá comprar tantos items
marcados como favoritos que no excedan el monto total. Para esto se está analizando
construir una API que dado una lista de item_id y el monto total pueda darle la lista de items
que maximice el total gastado sin excederlo.

#### Ejemplo:
Dada la siguiente lista de precios y un cupón válido por **$500**
| Item_id | Precio |
| ------ | ------ |
| MLA1 | $100 |
| MLA2 | $210 |
| MLA3 | $260 |
| MLA4 | $80 |
| MLA5 | $90 |
La respuesta sería
```sh
[“MLA1”, “MLA2”, “MLA4”, “MLA5”]
```

#### Requerimientos
\.**1.**  Programar (en cualquier lenguaje de programación) la funcionalidad mencionada
respetando la siguiente firma: _(Lenguajes sugeridos: Java, Golang, Javascript.)_
```sh
List<String> calculate(Map<String, Float> items, Float amount)
```
\.**2.** Crear una **API REST**, con el servicio “/coupon/” en donde se pueda enviar la lista de
item_ids y el monto del cupón y devuelva los items que tendría que comprar el usuario y
el monto total gastado

`Consideraciones:`
\- Sólo se puede comprar una unidad por item_id.
\- No hay preferencia en la cantidad total de items siempre y cuando gasten el máximo posible.
\- El precio puede contener hasta 2 decimales.

**Ejemplo para solicitud: POST /coupon/**

Request Body:
```sh
{
    "item_ids": ["MLA1", "MLA2", "MLA3", "MLA4", "MLA5"],
    "amount": 500
}
```
Response:
```sh
{
    "item_ids": ["MLA1", "MLA2", "MLA4", "MLA5"],
    "total": 480
}
```


## Instalación

\.**1.** Clonar repositorio del proyecto
```sh
https://github.com/rafaelfranco9/coupon-app
```
\.**2.** Entrar en la carpeta contenedora e instalar dependencias
```sh
cd coupon-app && npm install 
```
\.**3.** Iniciar aplicación
```
npm run start:dev
```

\* Por defecto la aplicación se ejecuta en el puerto `5000`
```
http://localhost:5000/coupon
```

## Usabilidad


| Método | Endpoint | descripción |
|--|--|--|
|POST|/coupon| Obtener productos disponibles según monto del cupón

**Esquema de body**
```sh
{
    "item_ids": String[],  # Listado con ID de productos favoritos
    "amount": Number       # Monto del cupón
}
```
`Consideraciones:`
1. Si el body del mensaje no posee el formato correcto, se responderá con un código **400**
    ```sh
    {
        "statusCode": 400,
        "message": "Validation failed",
        "error": "Bad Request"
    }
    ```
2. El código de los productos debe coincidir con el siguiente formato **MLA** + **000000000**
    de lo contrario el servidor responderá con un estado **400**
    Ejemplo:  **MLA879479072**

3. Si el monto del cupón no es suficiente para comprar al menos un producto, el servidor responderá con un estado **404**

#
### Datos de prueba

```sh
{
    "items_ids": [
        "MLA879479072", "MLA903097169", "MLA836361291", "MLA877427668", "MLA901212806", "MLA904161848",
        "MLA775138148", "MLA852874834", "MLA615381414", "MLA611119572", "MLA611119572", "MLA835929721",
        "MLA611841338", "MLA886707517", "MLA862219168"
    ],
    "amount": 5607.99
}
```
# 
`response`
```sh
{
	"items_ids": [
		"MLA775138148",
		"MLA611841338",
		"MLA611119572"
	],
	"amount": 5598.00
}
```