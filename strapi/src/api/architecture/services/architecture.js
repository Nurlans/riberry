'use strict';

/**
 * architecture service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::architecture.architecture');
