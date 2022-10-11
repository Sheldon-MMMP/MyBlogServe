import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

export default plugin;
