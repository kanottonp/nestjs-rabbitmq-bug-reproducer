/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/inventory-2/src/inventory-2.controller.ts":
/*!********************************************************!*\
  !*** ./apps/inventory-2/src/inventory-2.controller.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory2Controller = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const inventory_2_service_1 = __webpack_require__(/*! ./inventory-2.service */ "./apps/inventory-2/src/inventory-2.service.ts");
let Inventory2Controller = class Inventory2Controller {
    constructor(inventory2Service) {
        this.inventory2Service = inventory2Service;
    }
    async handleItemsGet(data, context) {
        const result = await this.inventory2Service.getItems2();
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        return result;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('get-item-2'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], Inventory2Controller.prototype, "handleItemsGet", null);
Inventory2Controller = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_2_service_1.Inventory2Service !== "undefined" && inventory_2_service_1.Inventory2Service) === "function" ? _a : Object])
], Inventory2Controller);
exports.Inventory2Controller = Inventory2Controller;


/***/ }),

/***/ "./apps/inventory-2/src/inventory-2.module.ts":
/*!****************************************************!*\
  !*** ./apps/inventory-2/src/inventory-2.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory2Module = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const inventory_2_controller_1 = __webpack_require__(/*! ./inventory-2.controller */ "./apps/inventory-2/src/inventory-2.controller.ts");
const inventory_2_service_1 = __webpack_require__(/*! ./inventory-2.service */ "./apps/inventory-2/src/inventory-2.service.ts");
const inventory_2_resolver_1 = __webpack_require__(/*! ./inventory-2.resolver */ "./apps/inventory-2/src/inventory-2.resolver.ts");
const { CLIENT_MODULE_NAME, RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;
let Inventory2Module = class Inventory2Module {
};
Inventory2Module = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                context: ({ req, res }) => ({ req, res }),
                formatError: (error) => error,
                driver: apollo_1.ApolloDriver,
                typePaths: ['./**/*.graphql'],
            }),
            microservices_1.ClientsModule.register([
                {
                    name: CLIENT_MODULE_NAME,
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [RABBIT_MQ_URI],
                        queue: RABBIT_MQ_QUEUE_NAME,
                        noAck: false,
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
            ]),
        ],
        controllers: [inventory_2_controller_1.Inventory2Controller],
        providers: [inventory_2_resolver_1.Inventory2Resolver, inventory_2_service_1.Inventory2Service],
    })
], Inventory2Module);
exports.Inventory2Module = Inventory2Module;


/***/ }),

/***/ "./apps/inventory-2/src/inventory-2.resolver.ts":
/*!******************************************************!*\
  !*** ./apps/inventory-2/src/inventory-2.resolver.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory2Resolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const inventory_2_service_1 = __webpack_require__(/*! ./inventory-2.service */ "./apps/inventory-2/src/inventory-2.service.ts");
let Inventory2Resolver = class Inventory2Resolver {
    constructor(inventory2Service) {
        this.inventory2Service = inventory2Service;
    }
    async getInventory1() {
        return this.inventory2Service.getItems1();
    }
    async getInventory2() {
        return this.inventory2Service.getItems2();
    }
};
__decorate([
    (0, graphql_1.Query)('itemInventory1List'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory2Resolver.prototype, "getInventory1", null);
__decorate([
    (0, graphql_1.Query)('itemInventory2List'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory2Resolver.prototype, "getInventory2", null);
Inventory2Resolver = __decorate([
    (0, graphql_1.Resolver)('Inventory2'),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_2_service_1.Inventory2Service !== "undefined" && inventory_2_service_1.Inventory2Service) === "function" ? _a : Object])
], Inventory2Resolver);
exports.Inventory2Resolver = Inventory2Resolver;


/***/ }),

/***/ "./apps/inventory-2/src/inventory-2.service.ts":
/*!*****************************************************!*\
  !*** ./apps/inventory-2/src/inventory-2.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory2Service = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const { CLIENT_MODULE_NAME } = process.env;
let Inventory2Service = class Inventory2Service {
    constructor(client) {
        this.client = client;
    }
    async onApplicationBootstrap() {
        await this.client.connect();
    }
    async getItems2() {
        return [{ id: "1", name: "inventory-1-item" }];
    }
    async getItems1() {
        return this.client.send('get-item-1', new microservices_1.RmqRecordBuilder({}));
    }
};
Inventory2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(CLIENT_MODULE_NAME)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], Inventory2Service);
exports.Inventory2Service = Inventory2Service;


/***/ }),

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************************!*\
  !*** ./apps/inventory-2/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const inventory_2_module_1 = __webpack_require__(/*! ./inventory-2.module */ "./apps/inventory-2/src/inventory-2.module.ts");
const { RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;
async function bootstrap() {
    const app = await core_1.NestFactory.create(inventory_2_module_1.Inventory2Module);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [RABBIT_MQ_URI],
            queue: RABBIT_MQ_QUEUE_NAME,
            noAck: false,
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3001);
}
bootstrap();

})();

/******/ })()
;