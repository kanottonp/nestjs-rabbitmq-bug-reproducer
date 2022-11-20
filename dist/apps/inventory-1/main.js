/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/inventory-1/src/inventory-1.controller.ts":
/*!********************************************************!*\
  !*** ./apps/inventory-1/src/inventory-1.controller.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory1Controller = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const inventory_1_service_1 = __webpack_require__(/*! ./inventory-1.service */ "./apps/inventory-1/src/inventory-1.service.ts");
let Inventory1Controller = class Inventory1Controller {
    constructor(inventory1Service) {
        this.inventory1Service = inventory1Service;
    }
    async handleMessageItemsGet(data, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        return this.inventory1Service.getItems1();
    }
    async handleEventItemsGet(data, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        return this.inventory1Service.getItems1();
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('get-item-1'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], Inventory1Controller.prototype, "handleMessageItemsGet", null);
__decorate([
    (0, microservices_1.EventPattern)('get-item-1'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], Inventory1Controller.prototype, "handleEventItemsGet", null);
Inventory1Controller = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_1_service_1.Inventory1Service !== "undefined" && inventory_1_service_1.Inventory1Service) === "function" ? _a : Object])
], Inventory1Controller);
exports.Inventory1Controller = Inventory1Controller;


/***/ }),

/***/ "./apps/inventory-1/src/inventory-1.module.ts":
/*!****************************************************!*\
  !*** ./apps/inventory-1/src/inventory-1.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory1Module = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const inventory_1_controller_1 = __webpack_require__(/*! ./inventory-1.controller */ "./apps/inventory-1/src/inventory-1.controller.ts");
const inventory_1_service_1 = __webpack_require__(/*! ./inventory-1.service */ "./apps/inventory-1/src/inventory-1.service.ts");
const inventory_1_resolver_1 = __webpack_require__(/*! ./inventory-1.resolver */ "./apps/inventory-1/src/inventory-1.resolver.ts");
const { CLIENT_MODULE_NAME, RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;
let Inventory1Module = class Inventory1Module {
};
Inventory1Module = __decorate([
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
        controllers: [inventory_1_controller_1.Inventory1Controller],
        providers: [inventory_1_resolver_1.Inventory1Resolver, inventory_1_service_1.Inventory1Service],
    })
], Inventory1Module);
exports.Inventory1Module = Inventory1Module;


/***/ }),

/***/ "./apps/inventory-1/src/inventory-1.resolver.ts":
/*!******************************************************!*\
  !*** ./apps/inventory-1/src/inventory-1.resolver.ts ***!
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
exports.Inventory1Resolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const inventory_1_service_1 = __webpack_require__(/*! ./inventory-1.service */ "./apps/inventory-1/src/inventory-1.service.ts");
let Inventory1Resolver = class Inventory1Resolver {
    constructor(inventory1Service) {
        this.inventory1Service = inventory1Service;
    }
    async getInventory1() {
        return this.inventory1Service.getItems1();
    }
    async getInventory2() {
        return this.inventory1Service.getItems2();
    }
};
__decorate([
    (0, graphql_1.Query)('itemInventory1List'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory1Resolver.prototype, "getInventory1", null);
__decorate([
    (0, graphql_1.Query)('itemInventory2List'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Inventory1Resolver.prototype, "getInventory2", null);
Inventory1Resolver = __decorate([
    (0, graphql_1.Resolver)('Inventory1'),
    __metadata("design:paramtypes", [typeof (_a = typeof inventory_1_service_1.Inventory1Service !== "undefined" && inventory_1_service_1.Inventory1Service) === "function" ? _a : Object])
], Inventory1Resolver);
exports.Inventory1Resolver = Inventory1Resolver;


/***/ }),

/***/ "./apps/inventory-1/src/inventory-1.service.ts":
/*!*****************************************************!*\
  !*** ./apps/inventory-1/src/inventory-1.service.ts ***!
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
exports.Inventory1Service = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const { CLIENT_MODULE_NAME } = process.env;
let Inventory1Service = class Inventory1Service {
    constructor(client) {
        this.client = client;
    }
    async onApplicationBootstrap() {
        await this.client.connect();
    }
    async getItems1() {
        return [{ id: "1", name: "inventory-1-item" }];
    }
    async getItems2() {
        return this.client.send('get-item-2', new microservices_1.RmqRecordBuilder({}));
    }
};
Inventory1Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(CLIENT_MODULE_NAME)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], Inventory1Service);
exports.Inventory1Service = Inventory1Service;


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
  !*** ./apps/inventory-1/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const inventory_1_module_1 = __webpack_require__(/*! ./inventory-1.module */ "./apps/inventory-1/src/inventory-1.module.ts");
const { RABBIT_MQ_URI, RABBIT_MQ_QUEUE_NAME } = process.env;
async function bootstrap() {
    const app = await core_1.NestFactory.create(inventory_1_module_1.Inventory1Module);
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
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;