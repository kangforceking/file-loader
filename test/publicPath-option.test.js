import webpack from './helpers/compiler';

describe('when applied with `publicPath` option', () => {
  it('matches snapshot for `{String}` value', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          publicPath: 'public_path/',
        },
      },
    };

    const stats = await webpack('fixture.js', config);
    const [module] = stats.toJson().modules;
    const { assets, source } = module;

    expect({ assets, source }).toMatchSnapshot();
  });

  it('matches snapshot for `{String}` value without trailing slash', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          publicPath: 'public_path',
        },
      },
    };

    const stats = await webpack('fixture.js', config);
    const [module] = stats.toJson().modules;
    const { assets, source } = module;

    expect({ assets, source }).toMatchSnapshot();
  });

  it('matches snapshot for `{String}` value as URL', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          publicPath: 'https://cdn.com/',
        },
      },
    };

    const stats = await webpack('fixture.js', config);
    const [module] = stats.toJson().modules;
    const { assets, source } = module;

    expect({ assets, source }).toMatchSnapshot();
  });

  it('matches snapshot for `{Function}` value', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {
          publicPath(url) {
            return `public_path/${url}`;
          },
        },
      },
    };

    const stats = await webpack('fixture.js', config);
    const [module] = stats.toJson().modules;
    const { assets, source } = module;

    expect({ assets, source }).toMatchSnapshot();
  });
});
