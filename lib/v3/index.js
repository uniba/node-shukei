'use strict';

const { join, resolve } = require('path');
const axios = require('axios');
const debug = require('debug')('shukei:v3');
const StatsMatrix = require('./stats_matrix');

function shukei({ baseUrl, uid, accessToken, organizationId }) {
  return new Shukei({ baseUrl, uid, accessToken, organizationId });
}

class Shukei {
  constructor({ baseUrl, uid, accessToken, organizationId } = {}) {
    this.baseUrl = baseUrl;
    this.uid = uid;
    this.accessToken = accessToken;
    this.organizationId = organizationId;

    this.handler = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Unidentify-Access-Token': accessToken
      }
    });
  }

  projectStats(opts) {
    return new ProjectStats(this, opts);
  }

  userStats(opts) {
    return new UserStats(this, opts);
  }

  request(url, opts = {}) {
    const absUrl = resolve('/api/v3', url);
    debug('request to %s (%j)', join(this.handler.defaults.baseURL, absUrl), opts);
    return this.handler.request(absUrl, opts).then((response) => {
      debug('response from %s (%s) %j', join(this.handler.defaults.baseURL, absUrl), response.status, response.data);
      return response;
    });
  }
}

class ProjectStats {
  constructor(client, opts) {
    this.client = client;
    this.opts = opts;
    this.projects = [];
  }

  add(opts) {
    if (Array.isArray(opts)) {
      this.projects = [this.projects, ...opts];
    } else {
      this.projects.push(opts);
    }
    return this;
  }

  request({ raw = false } = {}) {
    const orgId = this.client.organizationId;
    const query = Object.assign({}, this.opts, { tags: this.projects });

    return this.client
      .request(`organizations/${orgId}/tags/events/stats`, {
        params: {
          query: JSON.stringify(query)
        }
      })
      .then((response) => {
        const data = response.data.map((data) => new StatsMatrix(data));
        return Object.assign({}, response, { data });
      });
  }
}

class UserStats {
  constructor(client, opts) {
    this.client = client;
    this.opts = opts;
    this.users = [];
  }

  add(opts) {
    if (Array.isArray(opts)) {
      this.users = [this.users, ...opts];
    } else {
      this.users.push(opts);
    }
    return this;
  }

  request() {
    const orgId = this.client.organizationId;
    const query = Object.assign({}, this.opts, { users: this.users });

    return this.client
      .request(`organizations/${orgId}/users/events/stats`, {
        params: {
          query: JSON.stringify(query)
        }
      })
      .then((response) => {
        const data = response.data.map((data) => new StatsMatrix(data));
        return Object.assign({}, response, { data });
      });
  }
}

module.exports = shukei;
