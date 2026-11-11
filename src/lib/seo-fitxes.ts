/**
 * SEO de las fichas: lo que Google muestra y el título principal de cada página.
 *
 * - h1: el concepto que la gente busca (el valor de la celda queda como etiqueta encima).
 * - titol: <title> de la página, sin el sufijo " | Tabla financiera" (se añade solo).
 *   Máximo ~42 caracteres para que el total no se corte en Google (~60).
 * - descripcio: meta description, 130-160 caracteres: respuesta + promesa concreta.
 *
 * Clave = id del elemento (src/lib/elements.ts).
 */
export interface SeoFitxa {
  h1: string;
  titol: string;
  descripcio: string;
  /** Si es true, el título se usa tal cual, sin el sufijo " | Tabla financiera". */
  titolAbsolut?: boolean;
}

export const SEO_FITXES: Record<number, SeoFitxa> = {
  // ── Ahorro ───────────────────────────────────────────────────────────────
  1: {
    h1: "Tasa de ahorro",
    titol: "Tasa de ahorro: cómo calcular la tuya",
    descripcio: "Qué es la tasa de ahorro, cómo se calcula con tus ingresos netos y qué porcentaje es razonable según el momento vital. Con ejemplos y pasos.",
  },
  2: {
    h1: "Fondos previsibles",
    titol: "Fondos previsibles para gastos irregulares",
    descripcio: "Vacaciones, IBI, seguros, Navidad: cómo repartir durante el año los gastos que sabes que llegarán para que no te descuadren el mes. Método y ejemplo.",
  },
  3: {
    h1: "El sistema de las 3 cuentas",
    titol: "El sistema de las 3 cuentas bancarias",
    descripcio: "Una cuenta para los gastos necesarios, otra para vivir y otra para ahorrar: cómo montar este sistema sencillo y por qué te ahorra decisiones cada mes.",
  },
  4: {
    h1: "Mini-fondo inicial de 1.000 €",
    titol: "Mini-fondo de emergencia de 1.000 €",
    descripcio: "Por qué el primer objetivo de ahorro es tener unos 1.000 € líquidos, dónde guardarlos y cómo llegar antes de pensar en el fondo de emergencia completo.",
  },
  5: {
    h1: "Aumentar el ahorro un punto cada año",
    titol: "Aumentar el ahorro un 1% cada año",
    descripcio: "La forma progresiva de ganar margen: subir un punto tu tasa de ahorro cada año, sobre todo cuando te suben el sueldo. Qué supone a largo plazo.",
  },
  6: {
    h1: "Ahorrar 1 € al día",
    titol: "Ahorrar 1 € al día: 365 € al año",
    descripcio: "Apartar 1 € al día son 365 € al año. Por qué empezar con poco funciona para crear el hábito de ahorrar y cómo convertirlo en un sistema automático.",
  },
  7: {
    h1: "Págate primero (pay yourself first)",
    titol: "Págate primero: ahorra el día que cobras",
    descripcio: "Qué significa pagarte primero: separar el ahorro automáticamente el día que cobras, antes de gastar. Cómo configurarlo en tu banco y qué importe elegir.",
  },

  // ── Presupuesto ──────────────────────────────────────────────────────────
  8: {
    h1: "Regla 50/30/20: gastos necesarios",
    titol: "Regla 50/30/20: cuánto dedicar a los gastos necesarios",
    titolAbsolut: true,
    descripcio: "Cuánto dedicar a los gastos necesarios u obligatorios según la regla 50/30/20, qué cuenta como necesario y qué hacer si hoy pasas del 50%. Con calculadora.",
  },
  9: {
    h1: "Regla 50/30/20: el 30% de estilo de vida",
    titol: "Regla 50/30/20: el 30% para disfrutar",
    descripcio: "El 30% de la regla 50/30/20: cuánto puedes gastar en ocio, viajes y caprichos sin culpa y cómo encajarlo con tu margen real. Con ejemplos.",
  },
  10: {
    h1: "Regla 50/30/20: el 20% de ahorro",
    titol: "Regla 50/30/20: el 20% para ahorrar",
    descripcio: "El 20% de la regla 50/30/20: cómo repartirlo entre fondo de emergencia, deudas e inversión, y qué hacer si hoy no llegas. Con ejemplos concretos.",
  },
  11: {
    h1: "La regla de las 24 horas",
    titol: "La regla de las 24 horas antes de comprar",
    descripcio: "Esperar 24 horas antes de una compra importante evita que el impulso decida por ti. Por qué funciona, cuándo aplicarla y cómo convertirla en hábito.",
  },
  12: {
    h1: "Cuánto debería costar la vivienda",
    titol: "Vivienda: no más del 30% de los ingresos",
    descripcio: "Qué parte del sueldo debería ir al alquiler o la hipoteca: la referencia del 30%, cómo calcular la tuya y qué hacer si en tu ciudad es imposible.",
  },
  13: {
    h1: "La regla 80/20 de Pareto en los gastos",
    titol: "Pareto 80/20 aplicado a los gastos",
    descripcio: "Pocas categorías (vivienda, transporte, alimentación) explican el 80% de lo que gastas. Cómo detectarlas y dónde recortar para que se note de verdad.",
  },
  14: {
    h1: "Gastos hormiga",
    titol: "Gastos hormiga: cuánto te cuestan al año",
    descripcio: "Cafés, suscripciones, comisiones: los gastos hormiga se comen entre el 5% y el 10% de los ingresos. Cómo detectarlos y calcular su coste real.",
  },

  // ── Inversión ────────────────────────────────────────────────────────────
  15: {
    h1: "Rendimiento real de la bolsa",
    titol: "Rendimiento real de la bolsa a largo plazo",
    descripcio: "Cuánto ha rentado la bolsa descontando la inflación: por qué el 7% es un dato de EE. UU. y el 5% una referencia global más prudente para planificar.",
  },
  16: {
    h1: "Diversificar las inversiones",
    titol: "Diversificar: activos, sectores y países",
    descripcio: "Qué significa diversificar de verdad (activos, sectores, países y momento de entrada), qué errores la deshacen y cómo hacerlo fácil con fondos indexados.",
  },
  17: {
    h1: "La regla del 72",
    titol: "Regla del 72: cuándo se duplica el dinero",
    descripcio: "La regla del 72 calcula de cabeza en cuántos años se duplica el dinero: 72 entre el rendimiento anual. Ejemplos, límites y cómo aplicarla a la inflación.",
  },
  18: {
    h1: "DCA: aportaciones periódicas",
    titol: "DCA: invertir la misma cantidad cada mes",
    descripcio: "Qué es el DCA (dollar-cost averaging): aportar la misma cantidad cada mes pase lo que pase en el mercado. Ventajas, límites y cómo automatizarlo.",
  },
  19: {
    h1: "Interés compuesto",
    titol: "Interés compuesto: qué es y calculadora",
    descripcio: "Qué es el interés compuesto y por qué el tiempo es la variable clave. Ejemplos con cifras y una calculadora para ver cuánto pueden crecer tus ahorros.",
  },
  20: {
    h1: "Qué es el TER de un fondo",
    titol: "Qué es el TER de un fondo y cuál es bueno",
    descripcio: "Qué es el TER de un fondo, por qué uno indexado bueno lo tiene por debajo del 0,20% y cuánto te cuesta a 30 años una comisión más alta. Con ejemplos.",
  },
  21: {
    h1: "TER de los fondos de gestión activa",
    titol: "Fondos de gestión activa: cuánto cuestan",
    descripcio: "Los fondos de gestión activa cobran entre el 1% y el 2% al año y la mayoría no bate a su índice. Cómo comparar costes y cuándo puede tener sentido pagarlos.",
  },
  22: {
    h1: "Regla de 120 menos la edad",
    titol: "Regla de 120 menos la edad: cómo funciona y sus limitaciones",
    titolAbsolut: true,
    descripcio: "Cómo funciona la regla de 120 menos la edad para repartir entre bolsa y renta fija, una tabla por edades y sus limitaciones: perfil, horizonte y revisión.",
  },
  23: {
    h1: "Horizonte mínimo para invertir en bolsa",
    titol: "Cuántos años hacen falta para la bolsa",
    descripcio: "Por qué el horizonte mínimo para invertir en bolsa es de 10 años, e idealmente 15 o más. Qué dicen los datos históricos y qué hacer con el dinero a corto plazo.",
  },
  24: {
    h1: "Inflación media",
    titol: "Inflación: media histórica y dato actual",
    descripcio: "Cuál ha sido la inflación media en España, el dato actual del IPC y cuánto pierde el dinero parado en 30 años. Con tabla y ejemplos en euros.",
  },
  25: {
    h1: "Inversión ESG (inversión sostenible)",
    titol: "Inversión ESG: qué es y cómo elegir",
    descripcio: "Qué es la inversión ESG o sostenible (criterios ambientales, sociales y de buen gobierno), cómo elegir fondos ESG sin caer en el greenwashing.",
  },

  // ── Deuda ────────────────────────────────────────────────────────────────
  26: {
    h1: "Ratio de endeudamiento",
    titol: "Ratio de endeudamiento: cómo calcularlo y cuánto es recomendable",
    titolAbsolut: true,
    descripcio: "Cómo calcular el ratio de endeudamiento (cuotas de deuda entre ingresos netos), por qué el 35% es solo una referencia y en qué se diferencia del alquiler.",
  },
  27: {
    h1: "TAE de la tarjeta de crédito y revolving",
    titol: "TAE de la tarjeta de crédito y revolving",
    descripcio: "Qué TAE tienen las tarjetas de crédito, por qué el revolving es tan caro (ejemplo con 2.000 € al 22%) y cómo salir. Incluye la nueva ley de 2026.",
  },
  28: {
    h1: "TAE de una hipoteca: fija o variable",
    titol: "Hipoteca fija o variable: TAE y simulador",
    descripcio: "Qué TAE tienen hoy las hipotecas, cómo elegir entre fija, variable y mixta, y un simulador para ver cómo cambia tu cuota si sube el Euríbor.",
  },
  29: {
    h1: "TAE de un préstamo personal",
    titol: "TAE de un préstamo personal: qué significa y cómo compararla",
    titolAbsolut: true,
    descripcio: "Qué significa la TAE de un préstamo personal, una tabla con las TAE habituales según el perfil y cómo comparar ofertas para no pagar de más.",
  },
  30: {
    h1: "Tarjeta de crédito a 0 € cada mes",
    titol: "Tarjeta de crédito: págala entera cada mes",
    descripcio: "Por qué el saldo ideal de una tarjeta de crédito es 0 € a final de mes, cómo configurar el pago total y qué hacer si ya tienes saldo pendiente.",
  },
  31: {
    h1: "Coste real de los intereses",
    titol: "Coste real de una deuda: el total que pagas",
    descripcio: "Cómo calcular el coste total de una deuda más allá de la cuota mensual: por qué un préstamo caro puede acabar costando dos o tres veces lo que compraste.",
  },
  32: {
    h1: "Método avalancha para pagar deudas",
    titol: "Método avalancha para pagar deudas",
    descripcio: "El método avalancha prioriza la deuda con la TAE más alta y es el que menos intereses te hace pagar. Cómo aplicarlo, con simulador para compararlo.",
  },
  33: {
    h1: "Método bola de nieve para pagar deudas",
    titol: "Método bola de nieve para pagar deudas",
    descripcio: "El método bola de nieve empieza por la deuda más pequeña para ganar motivación. Cuándo conviene más que la avalancha y un simulador para comparar ambos.",
  },

  // ── Jubilación ───────────────────────────────────────────────────────────
  34: {
    h1: "La regla del 25×",
    titol: "Regla del 25×: cuánto necesitas",
    descripcio: "La regla del 25× calcula qué patrimonio necesitas para vivir de las inversiones: 25 veces el gasto anual. Con calculadora de independencia financiera.",
  },
  35: {
    h1: "La regla del 4%",
    titol: "Regla del 4%: qué es y cuánto retirar",
    descripcio: "Qué dice la regla del 4% (estudio Trinity), cuánta renta puedes sacar cada año de un patrimonio invertido y por qué en España conviene ser más prudente.",
  },
  36: {
    h1: "Edad de jubilación",
    titol: "Edad de jubilación: tabla por años",
    descripcio: "Tabla de la edad de jubilación por años: 66 años y 10 meses en 2026 y 67 años en 2027, o 65 si tienes suficientes años cotizados. Con ejemplos.",
  },
  37: {
    h1: "Tasa de sustitución de la pensión",
    titol: "Tasa de sustitución de la pensión: qué es y cómo calcularla",
    titolAbsolut: true,
    descripcio: "Qué es la tasa de sustitución (o de reemplazo) de la pensión, cómo calcularla con tu último sueldo y por qué planificar con un 65-70% es prudente.",
  },
  38: {
    h1: "Informe de vida laboral",
    titol: "Vida laboral y días cotizados",
    descripcio: "Cómo consultar tu vida laboral y los días cotizados en la Seguridad Social, qué debes revisar y por qué es la base para calcular la pensión.",
  },
  39: {
    h1: "Plan de pensiones: límite y ahorro fiscal",
    titol: "Plan de pensiones: límite y calculadora",
    descripcio: "Cuánto puedes aportar al plan de pensiones (1.500 €, hasta 10.000 € con planes de empleo y de autónomos), cuánto ahorras en la renta y cuándo compensa.",
  },

  // ── Protección ───────────────────────────────────────────────────────────
  40: {
    h1: "Fondo de emergencia",
    titol: "Fondo de emergencia: cuánto ahorrar",
    descripcio: "Cuánto debe ser el fondo de emergencia (3-6 meses de gastos necesarios), dónde guardarlo y cómo calcular el tuyo con una calculadora gratuita.",
  },
  41: {
    h1: "Fondo de emergencia para autónomos",
    titol: "Fondo de emergencia para autónomos",
    descripcio: "Por qué un autónomo o freelance necesita un fondo de emergencia de 6 a 12 meses de gastos, cómo calcularlo y cómo separarlo del dinero del negocio.",
  },
  42: {
    h1: "Cuánto seguro de vida necesitas",
    titol: "Seguro de vida: cuánto capital contratar",
    descripcio: "Qué cobertura de seguro de vida necesitas si alguien depende de ti: la referencia de 7-10 veces el sueldo, cómo afinarla y qué evitar al contratar.",
  },
  43: {
    h1: "Dónde guardar el fondo de emergencia",
    titol: "Dónde guardar el fondo de emergencia",
    descripcio: "Dónde poner el fondo de emergencia para que sea líquido y seguro: cuenta remunerada, depósitos, fondos monetarios o letras del Tesoro. Ventajas y riesgos.",
  },
  44: {
    h1: "Fondo de Garantía de Depósitos (FGD)",
    titol: "FGD: garantía de 100.000 € por banco",
    descripcio: "Qué cubre el Fondo de Garantía de Depósitos: 100.000 € por titular y entidad. Ejemplos con cuentas conjuntas, qué queda fuera y cómo repartir el exceso.",
  },
  45: {
    h1: "Hacer testamento",
    titol: "Testamento: por qué hacerlo y revisarlo",
    descripcio: "Por qué hacer testamento es sencillo y asequible, qué pasa si no lo tienes y cuándo conviene actualizarlo: hijos, pareja, vivienda o herencias.",
  },
  46: {
    h1: "Cuántos bancos tener",
    titol: "Cuántas cuentas bancarias conviene tener",
    descripcio: "Por qué puede convenir tener dos o tres bancos, cada uno con una función clara: más seguridad, mejores condiciones y el FGD repartido, sin complicarte.",
  },
  47: {
    h1: "Revisar los seguros cada año",
    titol: "Revisar los seguros una vez al año",
    descripcio: "Cómo revisar una vez al año los seguros de hogar, coche, vida o salud para pagar un precio justo y no arrastrar coberturas que ya no te hacen falta.",
  },

  // ── Psicología financiera ────────────────────────────────────────────────
  48: {
    h1: "Aversión a la pérdida",
    titol: "Aversión a la pérdida: qué es y ejemplos",
    descripcio: "Qué es la aversión a la pérdida, por qué una pérdida nos duele más que una ganancia igual y cómo afecta a las decisiones de ahorro e inversión.",
  },
  49: {
    h1: "Cuánto se tarda en crear un hábito",
    titol: "Crear un hábito: 66 días de media",
    descripcio: "Cuánto se tarda en crear un hábito según los estudios (unos 66 días de media) y cómo aplicarlo al ahorro y a las finanzas personales sin rendirte.",
  },
  50: {
    h1: "Mejora continua de las finanzas",
    titol: "Mejora continua de las finanzas personales",
    descripcio: "Cómo mejorar las finanzas personales con pequeños ajustes repetidos en lugar de grandes cambios: el método del 1% aplicado al ahorro, la deuda y la inversión.",
  },
  51: {
    h1: "Automatizar las finanzas",
    titol: "Automatizar el ahorro y las finanzas",
    descripcio: "Cómo automatizar el ahorro, las aportaciones y los pagos para que la disciplina no dependa de la fuerza de voluntad. Pasos concretos en tu banco.",
  },
  52: {
    h1: "Descuento hiperbólico",
    titol: "Descuento hiperbólico: qué es y ejemplos",
    descripcio: "Qué es el descuento hiperbólico, el sesgo que nos hace preferir ahora antes que mañana aunque perdamos, y cómo contrarrestarlo para ahorrar e invertir.",
  },
  53: {
    h1: "Coste de oportunidad",
    titol: "Coste de oportunidad: qué es y ejemplos",
    descripcio: "Cada decisión con el dinero descarta otra. Qué es el coste de oportunidad, ejemplos cotidianos y una pregunta sencilla para decidir mejor.",
  },

  // ── Educación ────────────────────────────────────────────────────────────
  54: {
    h1: "Libros de finanzas personales",
    titol: "Libros de finanzas personales recomendados",
    descripcio: "Los libros de finanzas personales que vale la pena leer: ahorro, inversión, psicología del dinero y fundamentos para empezar con buen pie.",
  },
  55: {
    h1: "Pódcasts de finanzas personales",
    titol: "Pódcasts de finanzas personales",
    descripcio: "Pódcasts para aprender finanzas personales e inversión mientras caminas o conduces. Una selección por niveles y temas para empezar a escuchar hoy.",
  },
  56: {
    h1: "Cursos de finanzas personales",
    titol: "Cursos de educación financiera",
    descripcio: "Cursos de educación financiera para pasar de saber cosas sueltas a tener un método: opciones gratuitas y de pago, y qué mirar antes de apuntarte.",
  },
  57: {
    h1: "Newsletters de finanzas personales",
    titol: "Newsletters de finanzas personales",
    descripcio: "Newsletters y boletines sobre dinero, finanzas personales e inversión que vale la pena recibir: quién los escribe, de qué hablan y para quién son.",
  },

  // ── Ciberseguridad ───────────────────────────────────────────────────────
  58: {
    h1: "Doble factor de autenticación (2FA)",
    titol: "Doble factor (2FA): cómo activarlo",
    descripcio: "Qué es el doble factor de autenticación, por qué es la protección más eficaz para el correo y el banco, y cómo activarlo paso a paso con una app.",
  },
  59: {
    h1: "Gestor de contraseñas",
    titol: "Gestor de contraseñas: por qué y cuál",
    descripcio: "Por qué usar un gestor de contraseñas, cómo funciona, qué opciones hay y cómo pasar tus claves a él sin perder el acceso a nada.",
  },
  60: {
    h1: "Phishing: cómo detectarlo",
    titol: "Phishing: cómo detectar estafas del banco",
    descripcio: "Cómo detectar un phishing o una estafa que se hace pasar por tu banco por SMS, correo o llamada, y qué hacer si ya has caído. Señales y pasos.",
  },
  61: {
    h1: "La regla 3-2-1 de copias de seguridad",
    titol: "Copia de seguridad: la regla 3-2-1",
    descripcio: "La regla 3-2-1 para no perder nunca los documentos importantes: 3 copias, 2 soportes, 1 fuera de casa. Cómo aplicarla en casa de forma sencilla.",
  },
};
