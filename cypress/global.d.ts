/// <reference types="cypress" />

declare namespace Cypress {
  import { authService } from "../src/machines/authMachine";
  import { createTransactionService } from "../src/machines/createTransactionMachine";
  import { publicTransactionService } from "../src/machines/publicTransactionsMachine";
  import { contactsTransactionService } from "../src/machines/contactsTransactionsMachine";
  import { personalTransactionService } from "../src/machines/personalTransactionsMachine";
  import {
    User,
    BankAccount,
    Like,
    Comment,
    Transaction,
    BankTransfer,
    Contact,
  } from "../src/models";

  interface CustomWindow extends Window {
    authService: typeof authService;
    createTransactionService: typeof createTransactionService;
    publicTransactionService: typeof publicTransactionService;
    contactTransactionService: typeof contactsTransactionService;
    personalTransactionService: typeof personalTransactionService;
  }

  type dbQueryArg = {
    entity: string;
    query: object | [object];
  };

  type LoginOptions = {
    rememberUser: boolean;
  };

  interface Chainable {
    /**
    * Objeto Window con propiedades adicionales utilizadas durante el test.
    */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    /**
 * Comando personalizado para facilitar la toma de capturas de pantalla con Percy con el nombre completo formado a partir del título del test + sufijo.
 */
    visualSnapshot(maybeName?): Chainable<any>;

    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;

    /**
     * Tarea de Cypress para realizar consultas directamente a la base de datos dentro de las pruebas
     */
    task(
      event: "filter:database",
      arg: dbQueryArg,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<any[]>;

    /**
     * Tarea de Cypress para realizar consultas directamente a la base de datos dentro de las pruebas
     */
    task(
      event: "find:database",
      arg?: any,
      options?: Partial<Loggable & Timeoutable>
    ): Chainable<any>;

    /**
     * Encuentra una sola entidad a través de una consulta a la base de datos
     */
    database(operation: "find", entity: string, query?: object, log?: boolean): Chainable<any>;

    /**
     * Filtra por entidades de datos a través de una consulta a la base de datos
     */
    database(operation: "filter", entity: string, query?: object, log?: boolean): Chainable<any>;

    /**
     * Obtiene la instancia de un componente React asociado con el elemento recibido
     */
    reactComponent(): Chainable<any>;

    /**
     * Selecciona un rango de fechas dentro del componente del selector de rango de fechas
     */
    pickDateRange(startDate: Date, endDate: Date): Chainable<void>;

    /**
     * Selecciona un rango de cantidades para una transacción
     */
    setTransactionAmountRange(min: number, max: number): Chainable<any>;

    /**
     * Pagina a la siguiente página en la vista de paginación de transacciones con desplazamiento infinito
     */
    nextTransactionFeedPage(service: string, page: number): Chainable<any>;

    /**
     * Inicia sesión de usuario utilizando la interfaz de usuario
     */
    login(username: string, password: string, loginOptions?: LoginOptions): void;

    /**
 * Inicia sesión de usuario utilizando una solicitud de API
 */
    loginByApi(username: string, password?: string): Chainable<Response>;

    /**
     * Inicia sesión de usuario utilizando una solicitud de API de Google
     */
    loginByGoogleApi(): Chainable<Response>;

    /**
     * Inicia sesión de usuario utilizando una solicitud de API de Okta
     */
    loginByOktaApi(username: string, password?: string): Chainable<Response>;

    /**
     * Inicia sesión de usuario navegando al inquilino de Okta con cy.origin()
     */
    loginByOkta(username: string, password: string): Chainable<Response>;

    /**
     * Inicia sesión evitando la interfaz de usuario al activar el evento de inicio de sesión de XState
     */
    loginByXstate(username: string, password?: string): Chainable<any>;

    /**
     * Cierra la sesión evitando la interfaz de usuario al activar el evento de cierre de sesión de XState
     */
    logoutByXstate(): Chainable<string>;

    /**
     * Inicia sesión a través de la página de inicio de sesión de Auth0
     */
    loginToAuth0(username: string, password: string): Chainable<any>;

    /**
     * Cambia el usuario actual cerrando la sesión del usuario actual e iniciando sesión como usuario con el nombre de usuario especificado
     */
    switchUserByXstate(username: string): Chainable<any>;

    /**
     * Crea una transacción evitando la interfaz de usuario y utilizando el servicio de creación de transacciones de XState
     */
    createTransaction(payload): Chainable<any>;

    /**
     * Inicia sesión en AWS Cognito a través de la API de autenticación de Amplify evitando la interfaz de usuario utilizando una Tarea de Cypress
     */
    loginByCognitoApi(username: string, password: string): Chainable<any>;

    /**
     * Inicia sesión en AWS Cognito Federated a través de cy.origin()
     */
    loginByCognito(username: string, password: string): Chainable<any>;
  }
}
