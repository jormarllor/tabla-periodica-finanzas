---
slug: 2fa
categoria: ciberseguridad
simbol: 2FA
nom: Doble factor activo
resum: La segunda barrera que protege tus cuentas
periode: 2
grup: 9
---

## En una frase

El **doble factor de autenticación** añade una segunda comprobación al iniciar sesión, de manera que tener solo tu contraseña no sea suficiente para entrar en tus cuentas de correo, banca, inversión o servicios importantes.

## Qué significa

El doble factor de autenticación —**2FA**, del inglés *two-factor authentication*— es una capa extra de seguridad.

En lugar de proteger una cuenta solo con una contraseña, el sistema te pide una segunda prueba que demuestre que eres tú.

Los factores pueden ser de tres tipos:

| Factor              | Ejemplo                                   |
| ------------------- | ------------------------------------------ |
| Algo que sabes      | Contraseña, PIN                            |
| Algo que tienes     | Móvil, app de autenticación, llave física  |
| Algo que eres       | Huella dactilar, reconocimiento facial     |

Con 2FA activo, si alguien roba tu contraseña, todavía necesita el segundo factor para entrar.

Esto es especialmente importante en finanzas personales, porque muchos ataques no empiezan por el banco: empiezan por el correo electrónico, una contraseña filtrada o una web falsa.

## No todos los segundos factores son iguales

| Método                       | Seguridad orientativa  | Comentario                                                        |
| ---------------------------- | ---------------------- | ------------------------------------------------------------------ |
| SMS                          | Mejor que nada         | Puede ser vulnerable a SIM swapping, smishing o suplantación      |
| Código por correo electrónico | Limitado              | Solo es razonable si el correo está muy bien protegido            |
| App de autenticación         | Buena                  | Genera códigos en el dispositivo, pero aún puede caer en phishing |
| Notificación push            | Buena, con prudencia   | Vigila no aprobar notificaciones que no has iniciado              |
| Passkey                      | Muy buena              | Más resistente al phishing y fácil de usar si el servicio lo permite |
| Llave física FIDO2 / U2F     | Muy alta               | Muy recomendable para cuentas críticas                            |

La regla práctica sería:

> **SMS es mejor que no tener nada. App de autenticación es mejor que SMS. Passkeys o llaves físicas son la mejor opción para las cuentas más importantes.**

## Por qué es importante

**Tu correo es la llave maestra.** Muchos servicios permiten recuperar la contraseña a través del correo. Si alguien entra en tu correo, puede intentar acceder después al banco, al bróker, al gestor de contraseñas, a redes sociales o a servicios con tarjetas guardadas.

**El banco y el bróker son objetivos evidentes.** Si alguien accede a tus cuentas financieras, puede intentar transferir dinero, cambiar datos, contratar productos o suplantarte.

También importa porque muchas contraseñas acaban filtradas. Si reutilizas contraseñas, un atacante puede probarlas automáticamente en muchos servicios distintos. El 2FA reduce mucho ese riesgo.

Y, sobre todo, porque es una protección con muy buena relación esfuerzo-beneficio: activarla puede costar pocos minutos y puede evitar un problema muy grande.

## Dónde activarlo primero

No hace falta hacerlo todo en una tarde. Hazlo por orden de riesgo.

| Prioridad | Cuenta                                              |
| --------: | ---------------------------------------------------- |
|         1 | Correo electrónico principal                         |
|         2 | Gestor de contraseñas                                |
|         3 | Banca online                                         |
|         4 | Brókers, roboadvisors y plataformas de inversión     |
|         5 | Cuenta del móvil y nube: Apple, Google, Microsoft    |
|         6 | Cuentas de compras con tarjetas guardadas            |
|         7 | Redes sociales y mensajería                          |

El correo principal debería ir primero porque es la puerta de recuperación de muchas otras cuentas.

## Cómo aplicarlo hoy

1. **Entra en la configuración de seguridad de tu correo principal** y busca "verificación en dos pasos", "autenticación de dos factores" o "autenticación multifactor".
2. **Actívala con una app de autenticación, passkey o llave física** si el servicio lo permite. Si solo hay SMS, activa SMS: es mejor que no tener nada.
3. **Guarda los códigos de recuperación.** Son los códigos que te permiten volver a entrar si pierdes el móvil, cambias de dispositivo o tienes un problema con la app. Guárdalos en un [gestor de contraseñas](/ciberseguridad/gestor-contrasenas), en una copia impresa segura o en un sitio separado del móvil.
4. **Repite el proceso** con el banco, el bróker y el gestor de contraseñas.
5. **Revisa también dispositivos conectados y sesiones abiertas.** Si ves un dispositivo que no reconoces, cierra la sesión y cambia la contraseña.

## Reglas de oro

- **No compartas nunca códigos 2FA.**
- **Ningún banco, bróker, compañía telefónica o servicio legítimo** te llamará para pedirte un código de verificación.
- **Si recibes un código que no has solicitado**, no lo uses y revisa inmediatamente la seguridad de la cuenta.
- **No apruebes notificaciones push** si no has intentado iniciar sesión tú.
- **No entres al banco desde un enlace** recibido por SMS o correo. Abre siempre la app oficial o escribe tú la dirección.
- **Si te quedas de repente sin cobertura móvil**, comprueba con tu operadora si ha habido un duplicado de SIM.

## Errores comunes

- **Proteger el banco pero no el correo electrónico.**
- **Usar SMS cuando el servicio permite** app de autenticación, passkey o llave física.
- **No guardar los códigos de recuperación.**
- **Aprobar notificaciones push por prisa o cansancio.**
- **Dar códigos 2FA por teléfono** a alguien que dice ser del banco.
- **Pensar que el 2FA elimina todo riesgo.** Lo reduce mucho, pero no sustituye el sentido común.
- **Reutilizar contraseñas en cuentas importantes.**
- **No proteger el gestor de contraseñas con 2FA.**

## Vinculado con

- [Gestor de contraseñas](/ciberseguridad/gestor-contrasenas)
- [Phishing](/ciberseguridad/phishing)
- [Copia de seguridad 3-2-1](/ciberseguridad/copia-3-2-1)
- [2-3 Bancos con función](/proteccion/bancos-diversificados)

## Recursos

📚 **[OSI — Verificación en dos pasos](https://www.osi.es/es/contrasenas)**. Guía oficial (INCIBE) que define la verificación en dos pasos como una medida adicional a la contraseña para proteger el acceso no autorizado a las cuentas.

📚 **[INCIBE — Línea de ayuda 017](https://www.incibe.es/linea-de-ayuda-en-ciberseguridad)**. Teléfono gratuito y confidencial para dudas e incidentes de ciberseguridad.

📚 **[Banco de España — Seguridad en banca digital](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/consejosseguridad/)**. Recomienda la autenticación multifactor cuando esté disponible y recuerda que ninguna entidad debe pedir contraseñas o claves completas por canales no seguros.

📚 **[NIST — Digital Identity Guidelines (SP 800-63B)](https://pages.nist.gov/800-63-3/sp800-63b.html)**. Considera restringido el uso de la red telefónica (SMS o voz) como canal de autenticación fuera de banda, por riesgos como el duplicado de SIM, la portabilidad o la interceptación.

---

> **Con 2FA, robarte la contraseña ya no debería ser suficiente para robarte la cuenta.**
