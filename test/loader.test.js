import webpack from './helpers/compiler';

describe('loader', () => {
  it('should works without options', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {},
      },
    };

    const stats = await webpack('fixture.js', config);
    const [module] = stats.toJson().modules;
    const { source } = module;

    expect(source).toMatchSnapshot();
  });
});
