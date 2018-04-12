const config = {
  active: 'dev',
  dev: {
    baseUrl: 'http://localhost:3001',
  },
  pro: {
    baseUrl: '',
  },
  // getActive: () => this.active,
  // setActive: active => this.active = active
};

function getConfig() {
  return config[config.active];
}

export default config;
export {getConfig};
